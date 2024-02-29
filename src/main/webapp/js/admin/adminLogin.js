$(function(){
    const rootLoginBtn = document.getElementById("rootLoginBtn");
    rootLoginBtn.addEventListener("click",async function(){
        const rootId = document.getElementById("rootId").value;
        const rootPwd = document.getElementById("rootPwd").value;
        const resolve_inspect = "/admin/login"
        const resolve_manager = "/admin/resolve_manager"
        if(rootId == "" || rootPwd == ""){
            return;
        }

        const formData = new FormData();
        formData.append("adminId",rootId);
        formData.append("pwd",rootPwd);

        const res = await fetch(resolve_inspect,{method:"POST", body:formData}).then(response=>response.text())
        .then(data=>console.log(data)).catch(error=>console.log(error))

        location.href ="/admin/manager";
    });
});