📌 Project Name: User Authentication & Password Reset System    
     A secure authentication system with email verification and password reset using Node.js, Express.js, MongoDB, and JWT.

🚀 Features

✅ User Signup & Login (with JWT authentication)

✅ Email Verification (via Nodemailer)

✅ Password Reset via Email (Secure token-based)

✅ Protected Routes (Only verified users can access)

✅ MongoDB for Data Storage

✅ Express.js as Backend Framework

📂 Project Structure
bash

Copy

Edit

/project-root

│── /emails               # Email templates

│── /middleware           # JWT authentication middleware

│── /models               # Mongoose models (User schema)

│── /public               # Frontend files (HTML, CSS, JS)

│── /routes               # API routes (auth, verification, password reset)

│── .env                  # Environment variables

│── README.md             # Project documentation

│── server.js             # Main backend server file

⚡ Technologies Used

Frontend: HTML, CSS, JavaScript
Backend: Node.js, Express.js
Database: MongoDB (Mongoose ORM)
Authentication: JWT (JSON Web Tokens)
Email Service: Nodemailer (Gmail SMTP)

📥 Installation

1️⃣ Clone the Repository

git clone https://github.com/Benin7070/Sign-In_Authentication

cd repo-name

2️⃣ Install Dependencies

npm install

3️⃣ Set Up Environment Variables

Create a .env file and add:

PORT=3000

MONGO_URI=your-mongodb-uri

JWT_SECRET=your-secret-key

EMAIL_USER=your-email@gmail.com

EMAIL_PASS=your-app-password

4️⃣ Run the Server

npm start
or (for auto-restart)


nodemon server.js

Server will run at http://localhost:3000.

🔑 API Endpoints

Method	Endpoint	Description

POST	/api/auth/signup	Register a new user

POST	/api/auth/signin	Log in a user

POST	/api/auth/password-reset-request	Request password reset

POST	/api/auth/password-reset/:token	Reset password

GET	/api/verification/verify-email/:token	Verify email

GET	/api/protected/homepage	Access protected page

📧 Email Templates

✅ Verification Email (Sent after signup)

✅ Password Reset Email (Sent when requesting a password reset)


🔍 Testing
Signup a user and check if a verification email is sent.

Click the email link to verify the account.

Try logging in before and after verification.

Reset the password using the email reset feature.

📌 Deployment
1️⃣ Host Backend on Render/Vercel
Use Render or Vercel for hosting Express.js.

2️⃣ Deploy MongoDB on MongoDB Atlas
Create a free MongoDB Atlas database.

3️⃣ Deploy Frontend on GitHub Pages/Netlify
Push /public to GitHub Pages or Netlify.

👨‍💻 Author

👤 BENIN A F

📧 Email: benin7070@gmail.com

🔗 GitHub: https://github.com/Benin7070

📜 License
This project is MIT Licensed – free to use and modify.

