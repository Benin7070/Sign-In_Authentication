
document.addEventListener("DOMContentLoaded",()=>{
    const signInForm =document.querySelector(".main_form");

    signInForm.addEventListener('submit',async(event)=>{
        event.preventDefault();
        const email=document.getElementById("Email").value;
        const password=document.getElementById("Password").value;
        try{
            const responce= await fetch("http://localhost:3000/api/auth/signIn",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body: JSON.stringify({email,password})
            });

            const data=await responce.json();
            if (responce.ok){
                const randomId=generateRandomId();
                console.log(randomId);
                alert("Login Successfull");
                localStorage.setItem("token",data.token);

                window.location.href=`homepage.html?session=${randomId}`;
            }
            else{
                alert(data.message);
            }
        }
        catch(error){
            console.log("Error",error);
            alert(`Something went wrong${error}`);
        }
    })
})

function generateRandomId(){
    return 'xxxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxx'.replace(/[xy]/g, function(c){
        var r=Math.random()*16|0,
        v=c==='x'? r:(r & 0x3 |0x8);
        return v.toString(16);
    })
}
