function logout(){
    localStorage.removeItem("token");
    window.location.href="sign-in.html";
}
const logOut=document.getElementById("logout-button");
    logOut.addEventListener('click',()=>{
    logout();
})