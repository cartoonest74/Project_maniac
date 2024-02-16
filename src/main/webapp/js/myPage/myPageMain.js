$(function(){
    const editTelPage = document.getElementById("editTelPage")
    const editDeliveryPage = document.getElementById("editDeliveryPage")
    const editPwdPage = document.getElementById("editPwdPage")
    const editEmailPage = document.getElementById("editEmailPage")
    const authTime_obj = {auth_obj:new Object()};
    const orderStatus_obj = [
            {name:"전체"},
            {name:"미입금"},
            {name:"상품대기"},
            {name:"배송중"},
            {name:"배송완료"},
            {name:"취소/교환/반품"}
        ]
    const create_statusTitle_tag =()=>{
        const statusAll_arr = document.querySelectorAll("dt[data-deliveryStatus-num]");
        statusAll_arr.forEach(val=>{
            const status_num= val.getAttribute("data-deliveryStatus-num");
            val.innerText = orderStatus_obj[status_num].name;
        })
    }
    create_statusTitle_tag();
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
            edit_content:`<div data-edit-addr="mainAddr" class="myPageEditContentBox">
                             <h2 class="myPageEditContent_header">주소</h2>
                             <div style="position:relative;" class="myPageEditContent relative">
                                 <input style="padding-left:20px;" data-edit-addr="mainAddr" type="text"     id="mainAddr" placeholder="주소" readonly>
                                 <button onclick="addr_execDaumPostcode()" type="button" class="editAddr_icon">
                                     <i class="fa-solid fa-magnifying-glass"></i>
                                 </button>
                             </div>
                             <div class="myPageEditContent">
                                <input type="text" data-edit-addr="detailAddr" id="detailAddr" placeholder="상세주소">
                             </div>
                         </div>
                         <div data-edit-addr="postNum" class="myPageEditContentBox">
                            <h2 class="myPageEditContent_header">우편번호</h2>
                            <div class="myPageEditContent">
                                <input style="cursor:not-allowed" type="text" data-edit-addr="postNum" id="postNum" placeholder="우편번호" readonly>
                            </div>
                        </div>
                        <button id="myPageEdit_addrBtn" class="myPageEdit_btn" type="button">ok</button>
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
                            let trans_text = "";
                            for(let i=0; i<val.length; i++){
                                if(i == 0 || i == val.length -1){
                                    trans_text += val[i];
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
    // edit alert create tag
    const create_alertTag = (errorAlertMsg)=>{
        const edit_alertTag =`<div id="editAlertBox" class="overErrorMsgBox">
                                    <div class="overErrorMsg">
                                        <section class="overErrorMsg_content">
                                            <h2><i class="fa-solid fa-bell fa-lg"></i>알림</h2>
                                            <p style="color:rgb(243, 103, 103);">${errorAlertMsg}</p>
                                        </section>
                                        <button id="exitEditAlertBox" class="exitErrorMsgBtn" type="button">ok</button>
                                    </div>
                                </div>`;
        body_append("afterbegin",edit_alertTag);
    }
    const create_completeAlertTag = (completeAlertMsg)=>{
            const edit_completeAlertTag =`<div id="editAlertBox" class="overErrorMsgBox">
                                        <div class="overErrorMsg">
                                            <section class="overErrorMsg_content">
                                                <h2><i class="fa-solid fa-bell fa-lg"></i>알림</h2>
                                                <p>${completeAlertMsg}</p>
                                            </section>
                                            <button id="exitEditAlertBox" class="exitErrorMsgBtn" type="button">ok</button>
                                        </div>
                                    </div>`;
            body_append("afterbegin",edit_completeAlertTag);
    }
    $(document).on("click","button#exitEditAlertBox",function(){
        const editAlertBox = document.querySelector("div#editAlertBox");
        editAlertBox.remove();
    });
    // edit errorMsg_tag
    const create_ErrorMsg = (attr_key,errorMsg)=>{
        const containerBox = document.querySelector(`div.myPageEditContentBox[${attr_key}]`)
        const error_tag = document.querySelector(`p[${attr_key}]`)
        const regErrorMsg = `<p style="color:red;" ${attr_key}>
                               ${errorMsg}</p>`
        if(error_tag == null){
            containerBox.insertAdjacentHTML("beforeend",regErrorMsg);
        }else{
            error_tag.innerText = errorMsg;
        }
    }
    //TODO tel
    $(document).on("focusout",'input[data-edit-tel="new"]',function(e){
        const tel_reg = editUserInfo_obj.editTel.reg;
        const input_tel = e.target.value;
        const attr_key = `data-edit-tel="new"`;
        const tel_errorMsg1 = "전화번호를 입력해주세요.";
        const tel_errorMsg2 = "전화번호: 숫자, - 형식으로 작성해주세요.";
        const tel_errorMsg3 = "전화번호 형식에 맞게 다시 입력해주세요";
        const error_tag = document.querySelector(`p[${attr_key}]`);

        editUserInfo_obj.editTel.value = "";
        if(input_tel == ""){
            create_ErrorMsg(attr_key, tel_errorMsg1);
            return;
        }

        if(input_tel.search(tel_reg) == -1){
            create_ErrorMsg(attr_key, tel_errorMsg2);
            return;
        }

        if(error_tag != null){
            error_tag.remove();
        }

        editUserInfo_obj.editTel.value = input_tel;
    });

    $(document).on("click","button#myPageEdit_telBtn",async function(){
        const tel_val = editUserInfo_obj.editTel.value;
        const path_resolveMapping = "/myPage/1/edit_tel";
        const completeMsg = "전화번호가 변경되었습니다."
        if(tel_val == ""){
            create_alertTag(tel_errorMsg1);
            return;
        }

        const formData = new FormData();
        formData.append("edit_tel",tel_val);
        const res = await patch_userInfo(path_resolveMapping,formData);

        edit_pageBox_remove();
        create_completeAlertTag(completeMsg);

        // 바뀐 이메일 적용
        const myPageTel = document.querySelector("p#myPageTel");
        myPageTel.innerText=tel_val;
        block_main();
    })

    //TODO addr
    // detail addr
    $(document).on("focusout",'input[data-edit-addr="detailAddr"]',function(e){
        const detailAddr_value = e.target.value
        const detailAddr_reg = editUserInfo_obj.editDelivery.reg;
        const attr_key = `data-edit-addr="mainAddr"`;
        const error_tag = document.querySelector(`p[${attr_key}]`);
        const detailAddr_errorMsg1 = "상세주소를 입력해주세요.";
        const detailAddr_errorMsg2 = "상세주소: 한글, 영문 대/소문자, 숫자를 사용해 주세요.";

        editUserInfo_obj.editDelivery.value ="";
        if(detailAddr_value==""){
            create_ErrorMsg(attr_key, detailAddr_errorMsg1);
            return;
        }

        if(detailAddr_value.search(detailAddr_reg) == -1){
            create_ErrorMsg(attr_key, detailAddr_errorMsg2);
            return;
        }

        if(error_tag != null){
            error_tag.remove();
        }

        editUserInfo_obj.editDelivery.value =detailAddr_value;
    });
    // final addr btn
    $(document).on("click","button#myPageEdit_addrBtn",async function(){
        const arr_nodeAddr = document.querySelectorAll("input[data-edit-addr]");
        const obj_noneValue = new Object();
        const path_resolveMapping = "/myPage/1/edit_addr";
        const errorMsg1 = "주소를 기입해주세요."
        const errorMsg2 = "상세주소를 제대로 작성해주세요."
        const arr_completeAddr = new Array();
        const detailAddr_value = editUserInfo_obj.editDelivery.value;
        const completeMsg = "주소가 변경되었습니다."
        if(detailAddr_value == ""){
            const attr_key=`data-edit-addr="mainAddr"`;
            create_ErrorMsg(attr_key,errorMsg2);
            return;
        }

        for(let i=0; i<arr_nodeAddr.length; i++){
            const addr_value = arr_nodeAddr[i].value;
            const attr_key = arr_nodeAddr[i].getAttribute("data-edit-addr");
            if(addr_value == ""){
                create_alertTag(errorMsg1);
                return;
            }
            if(attr_key == "postNum"){
                arr_completeAddr.push("("+addr_value+")");
                continue;
            }
            arr_completeAddr.push(addr_value);
        }

        const str_completeAddr = arr_completeAddr.join(" ");
        const formData = new FormData();
        formData.append("edit_addr",str_completeAddr);
        const res = await patch_userInfo(path_resolveMapping,formData);

        edit_pageBox_remove();
        create_completeAlertTag(completeMsg);

        // 바뀐 주소 적용
        const myPageAddr = document.querySelector("p#myPageAddr");
        myPageAddr.innerText=str_completeAddr;
        block_main();
     });

    //TODO pwd
    $(document).on("focusout","input[data-edit-pwd]",function(e){
        const pwdTag_attr = e.target.getAttribute("data-edit-pwd");
        const pwd_tag_vale = e.target.value;
        const pwd_reg = editUserInfo_obj.editPwd.reg;
        const pwd_errorMsg1 = "비밀번호를 입력해주세요.";
        const pwd_errorMsg2 = "비밀번호: 8~16자의 영문 대/소문자, 숫자, 특수문자를 사용해 주세요.";
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
    $(document).on("click","button#myPageEdit_pwdBtn",async function(){
        const editPwd_key =Object.keys(editUserInfo_obj.editPwd.value);
        const pwd_errorMsg1 = "비밀번호를 입력해주세요.";
        const pwd_errorMsg2 = "현재 비밀번호와 다른 비밀번호를 입력해주세요.";
        const pwd_errorMsg3 = "새로운 비밀번호와 일치하지 않습니다.";
        const pwd_errorMsg4 = `현재 비밀번호가 맞지 않습니다.<br>다시 입력해주세요.`;
        const completeMsg = "비밀번호가 변경되었습니다.";
        const path_resolveMapping = "/myPage/1/edit_pwd";

        editPwd_key.forEach(key=>{
            const val = editUserInfo_obj.editPwd.value[key];
            const attr_key = `data-edit-pwd="${key}"`
            if(val == ""){
                create_ErrorMsg(attr_key,pwd_errorMsg1);
            }
        });

        const arr_isOkayPwd = editPwd_key.map(val=>editUserInfo_obj.editPwd.value[val])
        .filter(val=> val != "");

        if(arr_isOkayPwd.length != editPwd_key.length){
            return;
        }
        const current_pwdVal = arr_isOkayPwd[0]
        const new_pwdVal = arr_isOkayPwd[1]
        const newCheck_pwdVal = arr_isOkayPwd[2]
        if(current_pwdVal == new_pwdVal){
            create_alertTag(pwd_errorMsg2);
            return;
        }
        if(new_pwdVal != newCheck_pwdVal){
            create_alertTag(pwd_errorMsg3);
            return;
        }
        const formData = new FormData();
        formData.append("edit_pwd",newCheck_pwdVal);
        formData.append("current_pwd",current_pwdVal);

        const res = await patch_userInfo(path_resolveMapping,formData);
        if(res != "ok"){
            create_alertTag(pwd_errorMsg4);
            return;
        }

        edit_pageBox_remove();

        create_completeAlertTag(completeMsg);
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
        const time_tag = document.querySelector(`${auth_parentId}`);
        const hour_tag = document.querySelector(`${auth_parentId}>span:first-child`);
        const minute_tab = document.querySelector(`${auth_parentId}>span:last-child`);

        if(time_tag != null){
            hour_tag.innerText = Hour;
            minute_tab.innerText =minute;
            const is_finish_time = Number(Hour) + Number(minute);
            const auth_parentId_tag = document.querySelector(`${auth_parentId}`);

            if(is_finish_time == 0){
                auth_parentId_tag.remove();
                return;
            }
        }else{
            return;
        }

        let ticTok = setTimeout(()=>{
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
        const editEmail_tag = document.querySelector("input#editEmail");
        const editEmailCheck_v = editUserInfo_obj.editEmail.value;
        const email_containerBox = document.querySelector(`div[data-edit-email="new"]`);
        const error_email_tag = document.querySelector(`p[data-edit-email="new"]`);
        const emailReg = editUserInfo_obj.editEmail.reg;
        const error_emailMsg1 ="존재하지 않는 Email 주소 입니다.";
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
            create_alertTag(error_emailMsg1);
            return "";
        }

        alert("인증번호를 보냈습니다.");
        editEmail_tag.readOnly = true;
        editEmail_tag.style.background="rgb(157, 156, 156,0.8)";
        editEmail_tag.style.color="rgb(109 104 104)";
        // 인증번호 입력 태그 진입 부분
        if(authEmail == null){
            email_containerBox.insertAdjacentHTML("beforeend",authNumber_tag);
        }else{
            authEmail.remove();
            email_containerBox.insertAdjacentHTML("beforeend",authNumber_tag);
        }

        const set_hour = "05";
        const set_minute = "00";
        const auth_parentId = "#authEmailTime";
        five_time(set_hour,set_minute,auth_parentId);
    });

    // final email 변경 확인
    $(document).on("click","button#myPageEdit_emailBtn", async function(){
        const authEmailNum = document.querySelector("#authEmailNum");
        const authEmailNum_v = authEmailNum.value;
        const authCode_resolveMapping = "/mail/auth-code";
        const path_resolveMapping = "/myPage/1/edit_email";
        const email_errMsg1 = "인증번호가 일치하지 않습니다.";
        const email_errMsg2 = "다시 시도해 주시기 바랍니다.";
        const completeMsg = "Email 변경되었습니다."
        if(authEmailNum == null){
            return;
        }
        const autCode_formData = new FormData();
        autCode_formData.append("userCode",authEmailNum_v)
        autCode_formData.append("type","email")

        const authCode_res = await mail_server(authCode_resolveMapping,autCode_formData);
        if(authCode_res != "match"){
            create_alertTag(email_errMsg1);
            return;
        }

        const changed_emailVal = editUserInfo_obj.editEmail.value;
        const patch_formData = new FormData();
        patch_formData.append("edit_email",changed_emailVal);
        const email_res = await patch_userInfo(path_resolveMapping,patch_formData);
        if(email_res != "ok"){
            create_alertTag(email_errMsg2);
            return;
        }
        edit_pageBox_remove();
        create_completeAlertTag(completeMsg);

        // 바뀐 이메일 적용
        const myPageEmail = document.querySelector("p#myPageEmail");
        myPageEmail.innerText=changed_emailVal;
        block_main();
    });
});