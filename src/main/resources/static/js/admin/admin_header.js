$(function(){
    const rootLogOut = document.getElementById("rootLogOut");
    rootLogOut.addEventListener("click",async function(){
        const resolve_admin_logOut ="/admin/logout";
        const res = await fetch(resolve_admin_logOut,{
            method:"post"
        })
        .then(response=>response.text())
        .then(data=>{
            if(data=="ok"){
                location.href="/admin"
            }
        })
    })
});