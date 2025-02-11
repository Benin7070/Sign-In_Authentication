const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get("token");

document.querySelector(".main_form").addEventListener('submit', async(event)=>{
    event.preventDefault();
    const newPass=document.getElementById("newPass").value;
    const confirmPass=document.getElementById("confirmPass").value;

    if(newPass!==confirmPass){
        alert("New password and confirm password are not same");
        return;
    }
    try{
        const responce=await fetch(`http://localhost:3000/api/auth/password-reset/${token}`,{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({newPass})
        });
        const data=await responce.json();
        if(responce.ok){
            alert(data.message);
            window.location.href="sign-in.html";
        }
        else{
            alert(data.message);
        }
    }
    catch(error){
        alert("Error resetting Password");
    }
})