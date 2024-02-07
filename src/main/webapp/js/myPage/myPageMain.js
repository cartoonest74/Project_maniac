$(function(){
    const editTelPage = document.getElementById("editTelPage")
    const editDeliveryPage = document.getElementById("editDeliveryPage")
    const editPwdPage = document.getElementById("editPwdPage")
    const editEmailPage = document.getElementById("editEmailPage")
    const authNum
    const editUserInfo_obj={
        editPwd:{header_title:"비밀번호 변경",
                edit_content:`<div data-edit-pwd="current_pwd" class="myPageEditContentBox">
                                  <h2 class="myPageEditContent_header">현재 비밀번호</h2>
                                  <div class="myPageEditContent">
                                      <input type="password" data-edit-pwd="current_pwd">
                                  </div>
                              </div>
                              <div data-edit-pwd="new_pwd" class="myPageEditContentBox">
                                  <h2 class="myPageEditContent_header">새로운 비밀번호</h2>
                                  <div class="myPageEditContent">
                                      <input type="password" data-edit-pwd="new_pwd">
                                  </div>
                              </div>
                              <div data-edit-pwd="new_check" class="myPageEditContentBox">
                                  <h2 class="myPageEditContent_header">새로운 비밀번호 확인</h2>
                                  <div class="myPageEditContent">
                                      <input type="password" data-edit-pwd="new_check">
                                  </div>
                              </div>
                              <button id="myPageEdit_pwdBtn" class="myPageEdit_btn" type="button">ok</button>
                              `,
                value:{
                    current_pwd:"",
                    new_pwd:"",
                    new_check:""
                },
                reg:/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[\$\!\@\#\%\^\&\*\(\)\\\<\>\?\/\+\_\-]).{8,16}$/g
        },
        editDelivery:{
            header_title:"주소 변경",
            edit_content:`<div class="myPageEditContentBox">
                             <h2 class="myPageEditContent_header">주소</h2>
                             <div style="position:relative;" class="myPageEditContent relative">
                                 <input style="padding-left:20px;" data-registry-name="mainAddr" type="text" value="" id="mainAddr" placeholder="주소" readonly>
                                 <button onclick="addr_execDaumPostcode()" type="button" class="editAddr_icon">
                                     <i class="fa-solid fa-magnifying-glass"></i>
                                 </button>
                             </div>
                             <div class="myPageEditContent">
                                <input type="text" data-registry-name="detailAddr" value="" id="detailAddr" placeholder="상세주소">
                             </div>
                             <span data-registry-val="detailAddr" class="none orInfo_errMsg"></span>
                         </div>
                         <div class="myPageEditContentBox">
                            <h2 class="myPageEditContent_header">우편번호</h2>
                            <div class="myPageEditContent">
                                <input style="cursor:not-allowed" type="text" data-registry-name="postNum" value="" id="postNum" placeholder="우편번호" readonly>
                            </div>
                        </div>
                        <button id="myPageEdit_pwdBtn" class="myPageEdit_btn" type="button">ok</button>
                         `,
            value:"",
            reg:/^[가-힣a-zA-Z0-9\s]+$/g
        },
        editEmail:{
            header_title:"이메일 변경",
            edit_content:`<div data-edit-email="new" class="myPageEditContentBox">
                              <h2 class="myPageEditContent_header">Email</h2>
                              <div class="myPageEditContent">
                                  <input data-edit-email="new" type="email" id="editEmail" placeholder="Email">
                                  <button style="cursor:pointer; border:0px; background:black; color:white;" id="editEmailCheck" type="button" >인증번호 요청</button>
                              </div>
                          </div>
                          <button id="myPageEdit_emailBtn" class="myPageEdit_btn" type="button">ok</button>`,
            value:"",
            reg:/^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/g
        },
        editTel:{
            header_title:"전화번호 변경",
            edit_content:`<div data-edit-tel="new" class="myPageEditContentBox">
                                <h2 class="myPageEditContent_header">새로운 전화번호</h2>
                                <div class="myPageEditContent">
                                    <input type="tel" data-edit-tel="new">
                                </div>
                            </div>
                            <button id="myPageEdit_telBtn" class="myPageEdit_btn" type="button">ok</button>`,
            value:"",
            reg:/^01(?:0|1|[6-9])-(?:[1-9]{1})(?:\d{2}|\d{3})-\d{4}$/
        }
    }
    const body_append = (position, tag)=>{
        const body = document.querySelector("body");
        body.insertAdjacentHTML(position, tag);
    }
    const create_blockGrammarly   = (byId,splitPoint) =>{
        const block_target = document.getElementById(byId);
        const block_target_val = block_target.innerText;
        const arr_trans_block = block_target_val.split(splitPoint)
                        .map((val,index)=>{
                            if(index == 0){
                                return val;
                            }
                            let trans_text = val[0]
                            for(let i=0; i<val.length; i++){
                                if(i == 0){
                                    continue;
                                }
                                    trans_text += "*"
                            }
                            return trans_text;
                        });
        const trans_block = arr_trans_block.join(splitPoint)
        block_target.innerText = trans_block;
    };
    const block_main =()=>{
        const myPageTel = "myPageTel";
        const myPageAddr = "myPageAddr";
        const telSplitPoint = "-";
        const addrSplitPoint = " ";
        create_blockGrammarly(myPageTel,telSplitPoint)
        create_blockGrammarly(myPageAddr,addrSplitPoint)

        const myPageEmail = document.getElementById("myPageEmail");
        const myPageEmail_text = myPageEmail.innerText;
        const arr_trans_addrBlock = myPageEmail_text.split("@")
            .map((val,index)=>{
                    if(index == 0){
                        let trans_text = val.substring(0,1)
                        for(let i=0; i<val.length; i++){
                            if(i>1){
                                trans_text += "*"
                                continue;
                            }
                        }
                        return trans_text;
                    }
                    return val;
            });
        const trans_addrBlock = arr_trans_addrBlock.join("@")
        myPageEmail.innerText = trans_addrBlock;
    }
    block_main();

    const create_edit_UserInfo=(header_title,edit_content)=>{

        const edit_userInfoTag = `<div id="myPageEditBOX" class="myPageEdit_box">
                                        <div class="myPageEdit">
                                            <header class="myPageEdit_header">
                                                <h1>${header_title}</h1>
                                                <button id="myPageEdit_Exit"><i class="fa-solid fa-xmark fa-lg"></i></button>
                                            </header>
                                            <section class="myPageEditSection">
                                                ${edit_content}
                                             </section>
                                        </div>
                                    </div>`
        return edit_userInfoTag;
    }
    // TODO Edit userInfo
    editTelPage.addEventListener("click",function(){
        const header_title = editUserInfo_obj.editTel.header_title;
        const edit_content = editUserInfo_obj.editTel.edit_content;
        const edit_Tag = create_edit_UserInfo(header_title,edit_content);
        body_append("afterBegin",edit_Tag)
    });

    editDeliveryPage.addEventListener("click",function(){
        const header_title = editUserInfo_obj.editDelivery.header_title;
        const edit_content = editUserInfo_obj.editDelivery.edit_content;
        const edit_Tag = create_edit_UserInfo(header_title,edit_content);
        body_append("afterBegin",edit_Tag)
    });

    editPwdPage.addEventListener("click",function(){
        const header_title = editUserInfo_obj.editPwd.header_title;
        const edit_content = editUserInfo_obj.editPwd.edit_content;
        const edit_Tag = create_edit_UserInfo(header_title,edit_content);
        body_append("afterBegin",edit_Tag)
    });

    editEmailPage.addEventListener("click",function(){
        const header_title = editUserInfo_obj.editEmail.header_title;
        const edit_content = editUserInfo_obj.editEmail.edit_content;
        const edit_Tag = create_edit_UserInfo(header_title,edit_content);
        body_append("afterBegin",edit_Tag)
    });

    const edit_pageBox_remove = ()=>{
        const myPageEditBOX = document.querySelector("#myPageEditBOX");
        myPageEditBOX.remove();
    }
    // edit page exit
    $(document).on("click","button#myPageEdit_Exit",function(){
       edit_pageBox_remove();
    });

    // TODO 비동기 server
    // mail 인증 server
    const mail_server = async (resolve_mapping, formData) =>{
        const res = await axios.post(
                                resolve_mapping,
                                formData
                            ).then((response)=>response.data)
                            .then(data =>{
                                return data;
                            }).catch((error)=>console.log(error));
        return res;
    }

    // patch
    const patch_userInfo = async (resolve_mapping, formData)=>{
        const res = await axios.patch(
            resolve_mapping,
            formData
        ).then((response)=>response.data)
        .then(data=>{
            return data;
        }).catch((error)=>console.log(error));
        return res;
    }

    // TODO edit page input

    // edit pwd errorMsg_tag
    const create_ErrorMsg = (attr_key,errorMsg)=>{
        const pwd_containerBox = document.querySelector(`div.myPageEditContentBox[${attr_key}]`)
        const error_pwd_tag = document.querySelector(`p[${attr_key}]`)
        let pwd_regErrorMsg = `<p style="color:red;" ${attr_key}>
                               ${errorMsg}</p>`
        if(error_pwd_tag == null){
            pwd_containerBox.insertAdjacentHTML("beforeend",pwd_regErrorMsg);
        }else{
            error_pwd_tag.innerText = errorMsg;
        }
    }

    // pwd
    $(document).on("focusout","input[data-edit-pwd]",function(e){
        const pwdTag_attr = e.target.getAttribute("data-edit-pwd");
        const pwd_tag_vale = e.target.value;
        const pwd_reg = editUserInfo_obj.editPwd.reg;
        const pwd_errorMsg1 = "비밀번호를 입력해주세요";
        const pwd_errorMsg2 = "비밀번호: 8~16자의 영문 대/소문자, 숫자, 특수문자를 사용해 주세요";
        const attr_key = `data-edit-pwd="${pwdTag_attr}"`
        const error_pwd_tag = document.querySelector(`p[${attr_key}]`);

        // 초기화
        editUserInfo_obj.editPwd.value[pwdTag_attr] = '';
        if(pwd_tag_vale == ''){
            create_ErrorMsg(attr_key, pwd_errorMsg1);
            return;
        }
        if(pwd_tag_vale.search(pwd_reg) == -1){
            create_ErrorMsg(attr_key, pwd_errorMsg2);
            return;
        }

        if(error_pwd_tag != null){
            error_pwd_tag.remove();
        }

        // 검증 구간 다 통과하면 값 넣기
        editUserInfo_obj.editPwd.value[pwdTag_attr] = pwd_tag_vale;
    });


    // final pwd 확인
    $(document).on("click","button#myPageEdit_pwdBtn",function(){
        const editPwd_key =Object.keys(editUserInfo_obj.editPwd.value);
        const pwd_errorMsg1 = "비밀번호를 입력해주세요.";
        const pwd_errorMsg2 = "현재 비밀번호와 다른 비밀번호를 입력해주세요.";
        const pwd_errorMsg3 = "새로운 비밀번호와 일치하지 않습니다.";
        editPwd_key.forEach(key=>{
            const val = editUserInfo_obj.editPwd.value[key];
            const attr_key = `data-edit-pwd="${key}"`
            if(val == ""){
                create_ErrorMsg(attr_key,pwd_errorMsg1);
            }
        });

        const arr_pwd = editPwd_key.map(val=>editUserInfo_obj.editPwd.value[val])
        .filter(val=> val != "");

        if(arr_pwd.length != editPwd_key.length){
            return;
        }
        const current_pwdVal = arr_pwd[0]
        const new_pwdVal = arr_pwd[1]
        const newCheck_pwdVal = arr_pwd[2]
        if(current_pwdVal == new_pwdVal){
            attr_key = "new_pwd"
            return;
        }
        if(new_pwdVal != newCheck_pwdVal){
            attr_key = "new_check"
            return;
        }
    });

    // email
    $(document).on("focusout",'input[data-edit-email="new"]',function(e){
        const email_tag_vale = e.target.value;
        const emailReg = editUserInfo_obj.editEmail.reg;
        const attr_key = `data-edit-email="new"`;
        const error_email_tag = document.querySelector(`p[${attr_key}]`);
        const email_errorMsg1 ="Email 입력해주세요.";
        const email_errorMsg2 ="Email 양식에 맞게 입력해주세요.";

        editUserInfo_obj.editEmail.value ="";
        if(email_tag_vale == ""){
           create_ErrorMsg(attr_key, email_errorMsg1);
           return;
        }

        if(email_tag_vale.search(emailReg) == -1){
           create_ErrorMsg(attr_key, email_errorMsg2);
           return;
        }

        if(error_email_tag != null){
            error_email_tag.remove();
        }

        editUserInfo_obj.editEmail.value = email_tag_vale;
    });

    // 인증번호 시간
    const five_time = (Hour, minute, auth_parentId)=>{
        const hour_tag = document.querySelector(`${auth_parentId}>p>span:first-child`);
        const minute_tab = document.querySelector(`${auth_parentId}>p>span:last-child`);

        hour_tag.innerText = Hour;
        minute_tab.innerText =minute;
        const is_finish_time = Number(Hour) + Number(minute);
        const auth_parentId_tag = document.querySelector(`${auth_parentId}`);

        if(is_finish_time == 0){
            auth_parentId_tag.remove();
            return;
        }

        setTimeout(()=>{
            let set_hour = Number(Hour);
            let set_minute = Number(minute);
            if((set_hour+set_minute) == 0){
                return;
            }
            if(set_minute == 0){
                set_hour = set_hour -1;
                set_minute = 59;
                set_hour = "0"+set_hour;
                return five_time(set_hour,set_minute, auth_parentId);
            }

            set_minute = set_minute -1;
            set_minute = String(set_minute).length == 1? "0"+set_minute:set_minute;
            set_hour = "0"+set_hour;
            return five_time(set_hour,set_minute, auth_parentId);
        },1000);
    };

    // 인증번호 확인 btn
    $(document).on("click","button#editEmailCheck",async function(){
        const editEmailCheck_v = editUserInfo_obj.editEmail.value;
        console.log("editEmailCheck_v",editEmailCheck_v);
        const email_containerBox = document.querySelector(`div[data-edit-email="new"]`);
        const error_email_tag = document.querySelector(`p[data-edit-email="new"]`);
        const emailReg = editUserInfo_obj.editEmail.reg;
        let email_regErrorMsg = `<p style="color:red;" data-edit-email="new">
                                          Email 확인해주세요.</p>`;

        const authEmail = document.querySelector("#authEmail");
        const authEmailTime = document.querySelector("#authEmailTime");
        const authNumber_tag = `<div id="authEmail" style="position:relative;" class="myPageEditContent">
                                    <input id="authEmailNum" type="text" value="">
                                    <p id="authEmailTime" style="position:absolute; display:flex; align-items:center; right:0; top:10%; font-size:1.2em; padding:5px 5px; color:#959999;">
                                    <span>05</span>:<span>00</span>
                                    </p>
                                </div>`;

        if(editEmailCheck_v == ""){
            if(error_email_tag == null){
                email_containerBox.insertAdjacentHTML("beforeend",email_regErrorMsg);
            }
            if(authEmail != null){
                authEmail.remove();
            }
            return;
        }

        if(error_email_tag != null){
            error_email_tag.remove();
        }
        const get_CodeFormData = new FormData();
        const resolve_getCodeMapping = "/mail/get-code";
        get_CodeFormData.append("userEmail",editEmailCheck_v);
        get_CodeFormData.append("type","email");
        // axios
        const get_codeRes = await mail_server(resolve_getCodeMapping, get_CodeFormData);
        if(get_codeRes != "ok"){
            alert("존재하지 않는 Email 주소 입니다.");
            return "";
        }

        alert("인증번호를 보냈습니다.");
        // 인증번호 입력 태그 진입 부분
        if(authEmail == null){
            email_containerBox.insertAdjacentHTML("beforeend",authNumber_tag);
        }else{
            authEmail.remove();
            email_containerBox.insertAdjacentHTML("beforeend",authNumber_tag);
        }

        const set_hour = "05";
        const set_minute = "00";
        const auth_parentId = "#authEmail";
        five_time(set_hour,set_minute,auth_parentId);
    });

    // final email 변경 확인
    $(document).on("click","button#myPageEdit_emailBtn", async function(){
        const authEmailNum = document.querySelector("#authEmailNum");
        const authEmailNum_v = authEmailNum.value;
        const authCode_resolveMapping = "/mail/auth-code";
        const path_resolveMapping = "/myPage/1/edit_email";

        const autCode_formData = new FormData();
        autCode_formData.append("userCode",authEmailNum_v)
        autCode_formData.append("type","email")

        const authCode_res = await mail_server(authCode_resolveMapping,autCode_formData);
        if(authCode_res != "match"){
            alert("인증번호가 일치하지 않습니다.");
            return;
        }

        clearTimeout(five_time);
        const changed_emailVal = editUserInfo_obj.editEmail.value;
        const patch_formData = new FormData();
        patch_formData.append("edit_email",changed_emailVal);
        const email_res = await patch_userInfo(path_resolveMapping,patch_formData);
        if(email_res != "ok"){
            alert("처린ㄴㄴㄴㄴ");
            return;
        }
        edit_pageBox_remove();

        const myPageEmail = document.querySelector("p#myPageEmail");
        myPageEmail.innerText=changed_emailVal;
        block_main();
    });

    //addr
});