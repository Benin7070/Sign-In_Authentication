function resetEmail(resetLink){
    return `<div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
                    <h2>Password Reset Request</h2>
                    <p>Click the button below to reset your password:</p>
                    <a href="${resetLink}" style="
                        display: inline-block;
                        padding: 10px 20px;
                        font-size: 16px;
                        color: white;
                        background-color: #007BFF;
                        text-decoration: none;
                        border-radius: 5px;
                    ">Reset Password</a>
                    <p>If the button doesn't work, you can also copy and paste this link into your browser:</p>
                    <p><a href="${resetLink}">${resetLink}</a></p>
                </div>`
}
module.exports=resetEmail;