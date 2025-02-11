const express=require("express");
const dotenv=require("dotenv");
const mongoose=require("mongoose");
const cors=require("cors");
const authRoutes=require("./routes/auth")
const mailVerify=require("./routes/mail-verify");
const path=require("path");
const tokenAuth=require('./middleware/token-auth')


dotenv.config(); // For Loading config files

const app=express();
const PORT=process.env.PORT || 3500;

app.use(express.static(path.join(__dirname,"public")));
app.use(express.json());
app.use(cors()); // For allowing the request from Frontend

mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("MongoDB connection Successfull");
    })
    .catch((err)=>{
        console.error(`MongoDB is not Connected due to the ${err}`);
    })

app.get("/signin",(req,res)=>{
    res.sendFile(path.join(__dirname,"public","sign-in.html"));
})

app.use("/api/protected",tokenAuth);
app.get("/api/protected/homepage",(req,res)=>{
    res.send("HomePage is protected with JWT auth.")
})

app.use("/api/auth",authRoutes);
app.use("/api/verification",mailVerify);

app.listen(PORT,()=>{
    console.log(`Server is running on the port ${PORT}`);
})