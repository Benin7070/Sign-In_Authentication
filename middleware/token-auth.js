const jwt = require('jsonwebtoken');

const tokenAuth = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1]; 

    if (!token) {
        return res.status(401).json({ message: "Access Denied" });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);  // Verify the token
        req.user = verified;  // Add the verified user to the request object
        next();  // Pass control to the next middleware or route handler
    } catch (err) {
        res.status(400).json({ message: "Invalid Token" });
    }
};

module.exports=tokenAuth;
