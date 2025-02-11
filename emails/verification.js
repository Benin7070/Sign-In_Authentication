function verificationEmail(verificationLink,fname,lname){
 return `<div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
    <h2>Welcome, ${fname} ${lname}!</h2>
    <p>Thank you for signing up. Please verify your email by clicking the button below:</p>
    <a href="${verificationLink}" style="
      display: inline-block;
      padding: 10px 20px;
      font-size: 16px;
      color: white;
      background-color: #007BFF;
      text-decoration: none;
      border-radius: 5px;
    ">Verify Email</a>
    <p>If the button doesn't work, you can also copy and paste this link into your browser:</p>
    <p><a href="${verificationLink}">${verificationLink}</a></p>
    <p>Thank you!<br>Team</p>
  </div>`
}

module.exports=verificationEmail;