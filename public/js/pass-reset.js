function goBack(){
    window.location.href='./sign-in.html';
}

const closeBtn=document.querySelector(".close-btn");
closeBtn.addEventListener('click',()=>{
    goBack();
})

document.querySelector(".submit-button").addEventListener('click',async (event)=>{
    event.preventDefault();
    const email=document.getElementById("Email").value;

    try{
        const responce=await fetch("http://localhost:3000/api/auth/password-reset-request",{
            method:"POST",
            headers:{"content-Type":"application/json"},
            body: JSON.stringify({email})
        });

        const data=await responce.json();
        if(responce.ok){
            alert(data.message);
        }
        else{
            alert(data.message);
        }
    }
    catch(error){
        alert(`Error sending password request. due to the ${error}`);
    }
})