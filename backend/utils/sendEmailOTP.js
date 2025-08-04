import transporter from "../config/emailConfig.js";
import logger from '../../logger.js';
import EmailVerificationModel from "../models/EmailVerification.js";
const sendEmailVerificationOTP= async(req,user)=>{
    
    const otp = Math.floor(1000+Math.random()*9000);
    
    //save otp in db
    await new EmailVerificationModel({userId: user._id, otp:otp}).save();

    
    const otpVerificationLink=`${process.env.FRONTEND_HOST}/account/verify-email`;

    try{
        await transporter.sendMail({
            from: process.env.EMAIL_FROM,
            to: user.email,
            subject: "Verify your CodeStreak account",
            html: `
                <p>Hi ${user.name},</p>
                <p>Thank you for registering with <b>CodeStreak</b>!</p>
                <p>Your email verification code is:</p>
                <h2>${otp}</h2>
                <p>This code is valid for 15 minutes. Please enter it on the verification page:</p>
                <p><a href="${otpVerificationLink}">${otpVerificationLink}</a></p>
                <p>If you did not request this, you can safely ignore this email.</p>
                <br>
                <p>Best regards,<br>CodeStreak Team</p>
            `
        })

    }
    catch(error){
        logger.error("Error sending email:", error.message);
    }

    return otp
}

export default sendEmailVerificationOTP;