$(function(){
    const name_reg = /^[가-힣A-Za-z]{0,40}$/g;
    const id_reg = /^[a-z]+[a-z0-9_-]{5,19}$/g;
    const tel_reg = /^01(?:0|1|[6-9])-(?:[1-9]{1})(?:\d{2}|\d{3})-\d{4}$/g;
    const email_reg = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/g;
    const forgotPwd_obj={
        id:{
            val:"",
            msg:"아이디: 필수 정보입니다.",
            reg:id_reg,
            msg2:"아이디: 아이디 형식에 맞지 않습니다."
        },
        tel:{
            val:"",
            msg:"전화번호: 필수 정보입니다.",
            reg:tel_reg,
            msg2:"전화번호: -를 넣어 기입해주세요"
        },
        email:{
            val:"",
            msg:"이메일: 필수 정보입니다.",
            reg:email_reg,
            msg2:"이메일: 이메일 형식에 맞게 입력해주세요."
        }
    };

    const forgotId_obj={
        name:{
            val:"",
            msg:"이름: 필수 정보입니다.",
            reg:name_reg,
            msg2:"이름: 형식에 맞지 않습니다."
        },
        tel:{
            val:"",
            msg:"전화번호: 필수 정보입니다.",
            reg:tel_reg,
            msg2:"전화번호: -를 넣어 기입해주세요"
        },
        email:{
            val:"",
            msg:"이메일: 필수 정보입니다.",
            reg:email_reg,
            msg2:"이메일: 이메일 형식에 맞게 입력해주세요."
        }
    };
    // alert Msg
    const create_alertMsg_tag=(msgTag)=>{
        const body = document.querySelector("body");
        const alertMsg_tag =`<div id="confirmBox" class="confirm_box">
                                <div class="confirmContainer">
                                    <h2>
                                        <i class="fa-solid fa-circle-question fa-lg"></i>&nbsp;알림
                                    </h2>
                                    ${msgTag}
                                    <p style="color:#ef6969;">가입정보가 정확하지 않습니다.</p>
                                    <div class="confirmBtn">
                                        <button id="confirmOk" type="button">ok</button>
                                    </div>
                                </div>
                            </div>`;
        body.insertAdjacentHTML("afterbegin",alertMsg_tag);
    }

    $(document).on("click","button#confirmOk",function(){
        const confirmBox = document.querySelector("confirmBox");
        confirmBox.remove();
    });

    // TODO forgotId
    $(document).on("focusout",'input[data-forgotId-name]',function(e){
        const input_name = e.target.getAttribute("data-forgotId-name");
        const input_val = e.target.value.trim();
        const reg = forgotId_obj[input_name].reg;
        const input_msg = forgotId_obj[input_name].msg;
        const input_msg2 = forgotId_obj[input_name].msg2;
        const msg_tag = `<p data-forgotId-msg="${input_name}" style="color:red;">${input_msg}</p>`
        const msg2_tag = `<p data-forgotId-msg="${input_name}" style="color:red;">${input_msg2}</p>`
        const forgotId_msg = document.querySelector(`[data-forgotId-msg="${input_name}"]`);
        if(input_val == ""){
            if(forgotId_msg ==null){
                e.target.insertAdjacentHTML("afterend",msg_tag);
            }
            return;
        }

        if(input_val.search(reg) == -1){
            if(forgotId_msg !=null){
                forgotId_msg.remove();
            }
            e.target.insertAdjacentHTML("afterend",msg2_tag);
            return;
        }

        if(forgotId_msg != null){
            forgotId_msg.remove();
        }
        forgotId_obj[input_name].val =input_val;
    });

    const forgotIdBtn = document.getElementById("forgotIdBtn");
    forgotIdBtn.addEventListener("click",async function(){
        const resolve_forgotId = "/login-action/forgot_id";
        const data_forgotIds = document.querySelectorAll("input[data-forgotId-name]");
        const arr_values = new Array();
        for(let i=0; i<data_forgotIds.length; i++){
            const data_forgotId = data_forgotIds[i]
            const input_val = data_forgotId.value;
            const input_name = data_forgotId.getAttribute("data-forgotId-name");
            const input_msg = forgotId_obj[input_name].msg;
            const msg_tag = `<p data-forgotId-msg="${input_name}" style="color:red;">${input_msg}</p>`
            const forgotId_msg = document.querySelector(`p[data-forgotId-msg="${input_name}"]`)
            const errorMsgTag = `<p style="color:#ef6969;">가입정보가 정확하지 않습니다.</p>`;

            if(input_val==""){
                if(forgotId_msg == null){
                    data_forgotId.insertAdjacentHTML("afterend",msg_tag);
                }
                continue;
            }
            arr_values.push(input_val);
        }
        if(arr_values.length != data_forgotIds.length){
            return;
        }
        console.log(forgotId_obj.name.val);
        const formData = new FormData();
        formData.append("name",forgotId_obj.name.val);
        formData.append("phone",forgotId_obj.tel.val);
        formData.append("email",forgotId_obj.email.val);

        const res = await axios.post(resolve_forgotId,formData)
                        .then(response=>response.text())
                        .then(data=>{
                            if(data==""){
                                create_alertMsg_tag(errorMsgTag);
                                return;
                            }
                            const msgTag = `<p>아이디는</p>
                                            <p style="font-weight:600;">${data}</p>`;
                            create_alertMsg_tag(msgTag);
                        });
    });

    // TODO forgotPwd

    $(document).on("focusout",'input[data-forgotPwd-name]',function(e){
        const input_name = e.target.getAttribute("data-forgotPwd-name");
        const input_val = e.target.value.trim();
        const reg = forgotPwd_obj[input_name].reg;
        const input_msg = forgotPwd_obj[input_name].msg;
        const input_msg2 = forgotPwd_obj[input_name].msg2;
        const msg_tag = `<p data-forgotPwd-msg="${input_name}" style="color:red;">${input_msg}</p>`
        const msg2_tag = `<p data-forgotPwd-msg="${input_name}" style="color:red;">${input_msg2}</p>`
        const forgotPwd_msg = document.querySelector(`[data-forgotPwd-msg="${input_name}"]`);
        if(input_val == ""){
            if(forgotPwd_msg ==null){
                e.target.insertAdjacentHTML("afterend",msg_tag);
            }
            return;
        }

        if(input_val.search(reg) == -1){
            if(forgotPwd_msg !=null){
                forgotPwd_msg.remove();
            }
            e.target.insertAdjacentHTML("afterend",msg2_tag);
            return;
        }

        if(forgotPwd_msg != null){
            forgotPwd_msg.remove();
        }
        forgotPwd_obj[input_name].val =input_val;
    });

    const forgotPwdBtn = document.getElementById("forgotPwdBtn");
    forgotPwdBtn.addEventListener("click",async function(){
        const resolve_forgotPwd = "/login-action/forgot_pwd"
        const data_forgotPwds = document.querySelectorAll("input[data-forgotPwd-name]");
        const arr_values = new Array();
        for(let i=0;i<data_forgotPwds.length;i++){
            const data_forgotPwd = data_forgotPwds[i]
            const input_val = data_forgotPwd.value;
            const input_name = data_forgotPwd.getAttribute("data-forgotPwd-name");
            const input_msg = forgotPwd_obj[input_name].msg;
            const msg_tag = `<p data-forgotPwd-msg="${input_name}" style="color:red;">${input_msg}</p>`
            const forgotPwd_msg = document.querySelector(`p[data-forgotPwd-msg="${input_name}"]`)

            if(input_val==""){
                if(forgotPwd_msg == null){
                    data_forgotPwd.insertAdjacentHTML("afterend",msg_tag);
                }
                continue;
            }
            arr_values.push(input_val);
        }

        if(arr_values.length != data_forgotPwds.length){
            return;
        }

        const formData = new FormData();
        formData.append("userId",forgotPwd_obj.id.val);
        formData.append("phone",forgotPwd_obj.tel.val);
        formData.append("email",forgotPwd_obj.email.val);

        const res = await fetch(resolve_forgotPwd,{
                            method:"post",
                            headers:{"Content-Type":"application/json",},
                            body:JSON.stringify(formData),
                        })
                        .then(response=>response.text())
                        .then(data=>{
                            if(data==""){
                            const errorMsgTag = `<p style="color:#ef6969;">가입정보가 정확하지 않습니다.</p>`;
                            create_alertMsg_tag(msgTag);
                                return;
                            }
                            const msgTag = `<p>해당 이메일로 임시 비밀번호 발송했습니다.</p>
                                            <p>확인 후 로그인 해주세요.</p>`;
                            create_alertMsg_tag(msgTag);
                        });
    });
})