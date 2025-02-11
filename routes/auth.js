const express=require("express");
const User =require("../models/user");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const nodemailer=require("nodemailer");
const verificationEmail=require("../emails/verification");
const resetEmail=require("../emails/pass-reset");
const dotenv=require("dotenv");

dotenv.config();
const router=express.Router();

router.post("/signIn",async(req,res)=>{
    const {email,password}=req.body;

    try{
        const Email= await User.findOne({email});
        if(!Email) return res.status(400).json({message:"User not found"});

        const isMatch = await bcrypt.compare(password, Email.password);
        if(!isMatch) return res.status(400).json({message:"Invalid credentials"});
        
        if(!Email.isVerified) return res.status(400).json({message :"Email is not verified"});

        const token =jwt.sign({id:Email._id},process.env.JWT_SECRET,{expiresIn:"1h"});

        res.json({token,userId:Email._id});
    }
    catch(err){
        res.status(500).json({message:`Server Error:${err}`});
    }
})

//for mailing purpose-SMPT transporter
const transporter=nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.userMail,
        pass:process.env.userPass,
    },
    debug: true, // Enables debug mode
    logger: true // Logs the SMTP activity
});

router.post("/signup", async(req,res)=>{
    const {fname,lname,email,password}=req.body;
    try{
        const userExists=await User.findOne({email});
        if(userExists) return res.status(400).json({message:"User already Exists!"});

        if (!password || password.trim() === "") {
            return res.status(400).json({ message: "Password is required" });
          }

        const hashed= await bcrypt.hash(password,10);
        const newUser = new User({
            fname,
            lname,
            email,
            password: hashed
        }) 

        await newUser.save();

        const verificationToken = jwt.sign(
            { id: newUser._id },
            process.env.JWT_SECRET,  // Secret key for signing the token
            { expiresIn: "15m" }      // Token expiration time (1 hour)
          );
        
        const verificationLink=`http://localhost:${process.env.PORT}/api/verification/verify-email/${verificationToken}`;

        const mailOption={
            from:process.env.userMail,
            to:email,
            subject: "Welcome to our new testing app",
            html: verificationEmail(verificationLink,fname,lname),
        }

        //sending the mail
        transporter.sendMail(mailOption,(error,info)=>{
            if(error){
                console.log(`Error sending email:${error}`)
            }
            else{
                alert(`Confirmation mail sent to:${email}`);
            }
        })
        const token=jwt.sign({id:newUser._id},process.env.JWT_SECRET,{expiresIn:"1h"});
        res.status(201).json({token,userId:newUser._id});
    }
    catch(error){
        console.log(`Sign-up Error: ${error}`)
        res.status(500).json({message:`Server error: ${error}`});
    }
});

router.post("/password-reset-request", async(req,res)=>{
    const {email}=req.body;
    try{
        const user=await User.findOne({email});
        if(!user) return res.status(400).json({message:"User not Exists"});

        const resetToken=jwt.sign(
            {id: user._id},
            process.env.JWT_SECRET,
            {expiresIn: "15m"}
        );

        const resetLink=`http://localhost:${process.env.PORT}/new-pass.html?token=${resetToken}`;

        const mailOption={
            from:process.env.userMail,
            to:email,
            subject:"Password reset",
            html:resetEmail(resetLink),
        };
        transporter.sendMail(mailOption,(error,info)=>{
            if(error){
                return res.status(500).json({message:"Error sending reset email"});
                
            }
            res.json({message:"Password reset link sent to your email"});

        });
    }
        catch(error){
            res.status(500).json({message:`Error processing the password reset due to ${error}`});
        }
})


router.post('/password-reset/:token', async(req,res)=>{
    const {token} =req.params;
    const {newPass}=req.body;

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        const user = await User.findById(decoded.id);
        if (!user) return res.status(400).json({ message: "User not found" });

        const hashedPassword = await bcrypt.hash(newPass, 10);
        user.password = hashedPassword;
        await user.save();
        res.json({ message: "Password has been successfully reset. Please log in with your new password." });

    } catch (error) {
        res.status(400).json({ message: "Invalid or expired reset token" });
    }
});


module.exports=router;