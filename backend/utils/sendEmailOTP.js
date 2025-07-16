import transporter from "../config/emailConfig.js";
import EmailVerificationModel from "../models/EmailVerification.js";
const sendEmailVerificationOTP= async(req,user)=>{
    
    const otp = Math.floor(1000+Math.random()*9000);
    
    //save otp in db
    await new EmailVerificationModel({userId: user._id, otp:otp}).save();

    
    const otpVerificationLink=`${process.env.FRONTEND_HOST}/account/verify-email`;

    await transporter.sendMail({
        from:process.env.EMAIL_FROM,
        to:user.email,
        subject: "🛍️ Let’s Get Shopping! Verify Your Trustify Account",
        // html: `<p>Dear ${user.name},</p><p>Thank you for signing up with our website. 
        //     To complete your registration, please verify your email address by entering 
        //     the following one-time password (OTP): ${otpVerificationLink} </p>
        //     <h2>OTP: ${otp}</h2>
        //     <p>This OTP is valid for 15 minutes. If you didn't request this OTP, please ignore this email.</p>`
        html:`Hi ${user.name},
            <p></p>Welcome to Trustify—your one-stop shop for amazing products and unbeatable deals! 🛒✨ Before we roll out the red carpet to your personalized shopping experience, we just need to verify it’s really you.</p>

            Your Verification Code (OTP):
            <h2>OTP: ${otp}</h2>

            This OTP is valid for 15 minutes only, so be sure to verify soon! Click the link below to enter your OTP and unlock the world of Trustify :
            ${otpVerificationLink}

            <p>Didn’t request this code? No worries—just ignore this email, and we’ll keep your account secure.</p>

            <p>Happy Shopping,</p>
            <p>The Trustify Team</p>

            <p>P.S. If you need any assistance, our support team is just a click away at support@trustify.com.</p>`
    })

    return otp
}

export default sendEmailVerificationOTP;