document.addEventListener('DOMContentLoaded',()=>{
    const form=document.querySelector(".main_form");
    form.addEventListener('submit',async (event)=>{
        event.preventDefault();
        const fname=document.getElementById("fname").value;
        const lname=document.getElementById("lname").value;
        const email=document.getElementById("Email").value;
        const password=document.getElementById("Password").value;
        const confirm=document.getElementById("confirm").value;

        if(password!==confirm){ //Password confirmation
            alert("Password did no Match!");
            return;
        }

        try{
            const responce=await fetch("http://localhost:3000/api/auth/signup",{
                method: "POST",
                headers: { "Content-Type":"application/json"},
                body: JSON.stringify({fname,lname,email,password})
            });
            const data= await responce.json();

            if(responce.ok){
                alert("Sign-up Successfull");
                window.location.href="sign-in.html";            }
            else{
                alert(data.message);
            }
        }
        catch (error){
            console.log(`Error: ${error}` );
            alert("Error in Sgn-up");
        }
    });
});