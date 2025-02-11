const express=require('express');
const router=express.Router();
const jwt=require("jsonwebtoken");
const User=require("../models/user");

router.get("/verify-email/:token", async(req,res)=>{
    const {token} =req.params;

    try{
        const decoded =jwt.verify(token,process.env.JWT_SECRET);
        const user=await User.findById(decoded.id)
        if(!user){
            return res.status(400).json({message:"User not found"});
        }
        if(user.isVerified){
            return res.status(400).json({message:"User is already verified"});
        }
        user.isVerified=true;
        await user.save();

        res.redirect("http://localhost:3000/sign-in.html");        }
    catch(error){
        if (error.name === "TokenExpiredError") {
            return res.status(400).json({ message: "Verification link has expired. Please request a new one." });
        }
        res.status(400).json({message:`Invalid or expired token, ${error}`});
    }
});

module.exports=router;