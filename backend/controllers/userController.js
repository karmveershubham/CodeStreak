import UserModel from '../models/User.js'
import bcrypt from 'bcrypt'
import EmailVerificationModel from '../models/EmailVerification.js';
import sendEmailVerificationOTP from '../utils/sendEmailOTP.js';
import generateTokens from '../utils/generatetokens.js';
import setTokensCookies from '../utils/setTokenCookies.js';
import refreshAccessToken from '../utils/refreshAcessToken.js';
import UserRefreshTokenModel from '../models/UserRefreshToken.js';
import jwt from 'jsonwebtoken';
import transporter from '../config/emailConfig.js';
class UserController {

//user Registeration 

    static userRegistration = async (req, res)=>{
        try{
            const { name, email, password, password_confirmation } = req.body;

            if (!name || !email || !password || !password_confirmation) {
                return res.status(400).json({ status: "failed", message: "All fields are required" });
            }

            if (password !== password_confirmation) {
                return res.status(400).json({ status: "failed", message: "Password and Confirm Password don't match" });
            }

            const existingUser = await UserModel.findOne({ email });
            
            if (existingUser) {
                return res.status(409).json({ status: "failed", message: "Email already exists" });
            }
            // generate salt and hash password
            const salt = await bcrypt.genSalt(Number(process.env.SALT));
            const hashedPassword = await bcrypt.hash(password, salt);
            
            const newUser = await new UserModel({ name, email, password: hashedPassword }).save();
            
            sendEmailVerificationOTP(req, newUser);
            
            res.status(201).json({
            status: "success",
            message: "Registration Success",
            user: { id: newUser._id, email: newUser.email }
            });

        }catch(error){
            console.log(error);
            res.status(500).json({status: "failed", message: "unable to Register, please try again later"});
        }
    }


    //user email verification 

    static verifyEmail = async (req, res) => {
    try {

      // Extract request body parameters
      const { email, otp } = req.body;

      // Check if all required fields are provided
      if (!email || !otp) {
        return res.status(400).json({ status: "failed", message: "All fields are required" });
      }

      const existingUser = await UserModel.findOne({ email });

      // Check if email doesn't exists
      if (!existingUser) {
        return res.status(404).json({ status: "failed", message: "Email doesn't exists" });
      }

      // Check if email is already verified
      if (existingUser.is_verified) {
        return res.status(400).json({ status: "failed", message: "Email is already verified" });
      }

      // Check if there is a matching email verification OTP
      const emailVerification = await EmailVerificationModel.findOne({ userId: existingUser._id, otp });
      if (!emailVerification) {
        if (!existingUser.is_verified) {
          // console.log(existingUser);
          await sendEmailVerificationOTP(req, existingUser);
          return res.status(400).json({ status: "failed", message: "Invalid OTP, new OTP sent to your email" });
        }
        return res.status(400).json({ status: "failed", message: "Invalid OTP" });
      }

      // Check if OTP is expired
      const currentTime = new Date();
      // 15 * 60 * 1000 calculates the expiration period in milliseconds(15 minutes).
      
      const expirationTime = new Date(emailVerification.createdAt.getTime() + 15 * 60 * 1000);
      if (currentTime > expirationTime) {
        // OTP expired, send new OTP
        await sendEmailVerificationOTP(req, existingUser);
        return res.status(400).json({ status: "failed", message: "OTP expired, new OTP sent to your email" });
      }

      // OTP is valid and not expired, mark email as verified
      existingUser.is_verified = true;
      await existingUser.save();

      // Delete email verification document
      await EmailVerificationModel.deleteMany({ userId: existingUser._id });
      
      return res.status(200).json({ status: "success", message: "Email verified successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: "failed", message: "Unable to verify email, please try again later" });
    }
  }

  //user login attempt with acess token and refresh token

  static userLogin = async (req, res) => {
    try {
      const { email, password } = req.body
      // Check if email and password are provided
      if (!email || !password) {
        return res.status(400).json({ status: "failed", message: "Email and password are required" });
      }
      // Find user by email
      const user = await UserModel.findOne({ email });

      // Check if user exists
      if (!user) {
        return res.status(404).json({ status: "failed", message: "Invalid Email or Password" });
      }

      // Check if user exists
      if (!user.is_verified) {
        return res.status(401).json({ status: "failed", message: "Your account is not verified" });
      }

      // Compare passwords / Check Password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ status: "failed", message: "Invalid email or password" });
      }

      // Generate tokens
      const { accessToken, refreshToken, accessTokenExp, refreshTokenExp } = await generateTokens(user)

      // Set Cookies
      setTokensCookies(res, accessToken, refreshToken, accessTokenExp, refreshTokenExp)

      // Send success response with tokens
      res.status(200).json({
        user: { id: user._id, email: user.email, name: user.name, roles: user.roles[0] },
        status: "success",
        message: "Login successful",
        access_token: accessToken,
        refresh_token: refreshToken,
        access_token_exp: accessTokenExp,
        is_auth: true
      });

      console.log("User login succesful")


    } catch (error) {
      console.error(error);
      res.status(500).json({ status: "failed", message: "Unable to login, please try again later" });
    }
  }

  //Get new acess token or refresh token 

   static getNewAccessToken = async (req, res) => {
    try {
      // Get new access token using Refresh Token
      const { newAccessToken, newRefreshToken, newAccessTokenExp, newRefreshTokenExp } = await refreshAccessToken(req, res)

      // Set New Tokens to Cookie
      setTokensCookies(res, newAccessToken, newRefreshToken, newAccessTokenExp, newRefreshTokenExp)

      res.status(200).send({
        status: "success",
        message: "New tokens generated",
        access_token: newAccessToken,
        refresh_token: newRefreshToken,
        access_token_exp: newAccessTokenExp
      });

    } catch (error) {
      console.error(error);
      res.status(500).json({ status: "failed", message: "Unable to generate new token, please try again later" });
    }
  }

  // Profile OR Logged in User
  static userProfile = async (req, res) => {
    res.send({ "user": req.user })
  }
  
  // Change Password
  static changeUserPassword = async (req, res) => {
    try {
      const { password, password_confirmation } = req.body;

      // Check if both password and password_confirmation are provided
      if (!password || !password_confirmation) {
        return res.status(400).json({ status: "failed", message: "New Password and Confirm New Password are required" });
      }

      // Check if password and password_confirmation match
      if (password !== password_confirmation) {
        return res.status(400).json({ status: "failed", message: "New Password and Confirm New Password don't match" });
      }

      // Generate salt and hash new password
      const salt = await bcrypt.genSalt(10);
      const newHashPassword = await bcrypt.hash(password, salt);

      // Update user's password
      await UserModel.findByIdAndUpdate(req.user._id, { $set: { password: newHashPassword } });

      // Send success response
      res.status(200).json({ status: "success", message: "Password changed successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: "failed", message: "Unable to change password, please try again later" });
    }
  }

  // Send Password Reset Link via Email
  static sendUserPasswordResetEmail = async (req, res) => {
    try {
      const { email } = req.body;
      // Check if email is provided
      if (!email) {
        return res.status(400).json({ status: "failed", message: "Email field is required" });
      }
      // Find user by email
      const user = await UserModel.findOne({ email });
      if (!user) {
        return res.status(404).json({ status: "failed", message: "Email doesn't exist" });
      }
      // Generate token for password reset
      const secret = user._id + process.env.JWT_ACCESS_TOKEN_SECRET_KEY;
      const token = jwt.sign({ userID: user._id }, secret, { expiresIn: '15m' });
      // Reset Link
      const resetLink = `${process.env.FRONTEND_HOST}/account/reset-password-confirm/${user._id}/${token}`;
      console.log(resetLink);
      // Send password reset email  
      await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: user.email,
        subject: "Password Reset Link",
        html: `<p>Hello ${user.name},</p><p>Please <a href="${resetLink}">click here</a> to reset your password.</p>`
      });
      // Send success response
      res.status(200).json({ status: "success", message: "Password reset email sent. Please check your email." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: "failed", message: "Unable to send password reset email. Please try again later." });
    }
  }

  // Password Reset
  static userPasswordReset = async (req, res) => {
    try {
      const { password, password_confirmation } = req.body;
      const { id, token } = req.params;
      // Find user by ID
      const user = await UserModel.findById(id);
      if (!user) {
        return res.status(404).json({ status: "failed", message: "User not found" });
      }
      // Validate token
      const new_secret = user._id + process.env.JWT_ACCESS_TOKEN_SECRET_KEY;
      jwt.verify(token, new_secret);

      // Check if password and password_confirmation are provided
      if (!password || !password_confirmation) {
        return res.status(400).json({ status: "failed", message: "New Password and Confirm New Password are required" });
      }

      // Check if password and password_confirmation match
      if (password !== password_confirmation) {
        return res.status(400).json({ status: "failed", message: "New Password and Confirm New Password don't match" });
      }

      // Generate salt and hash new password
      const salt = await bcrypt.genSalt(10);
      const newHashPassword = await bcrypt.hash(password, salt);

      // Update user's password
      await UserModel.findByIdAndUpdate(user._id, { $set: { password: newHashPassword } });

      // Send success response
      res.status(200).json({ status: "success", message: "Password reset successfully" });

    } catch (error) {
      console.log(error);
      if (error.name === "TokenExpiredError") {
        return res.status(400).json({ status: "failed", message: "Token expired. Please request a new password reset link." });
      }
      return res.status(500).json({ status: "failed", message: "Unable to reset password. Please try again later." });
    }
  }



  //logout
  static userLogout = async (req, res) => {
    try {

      // Optionally, you can blacklist the refresh token in the database
      const refreshToken = req.cookies.refreshToken;
      await UserRefreshTokenModel.findOneAndUpdate(
        { token: refreshToken },
        { $set: { blacklisted: true } }
      );

      //clear access token and refresh token cookies
      res.clearCookie('accesToken');
      res.clearCookie('refreshToken');
      res.clearCookie('is_auth');

      res.status(200).json({ status: "success", message: "Logout successful" });
      
    }catch(error){
      console.error(error);
      res.status(500).json({ status: "failed", message: "Unable to logout, please try again later" });
    }
  }
}

export default UserController;