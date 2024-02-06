$(function(){
    const editTelPage = document.getElementById("editTelPage")
    const editDeliveryPage = document.getElementById("editDeliveryPage")
    const editPwdPage = document.getElementById("editPwdPage")
    const editEmailPage = document.getElementById("editEmailPage")

    const editUserInfo_obj={
        editPwd:{header_title:"비밀번호 변경",
                edit_content:`<div data-edit-pwd="current" class="myPageEditContentBox">
                                  <h2 class="myPageEditContent_header">현재 비밀번호</h2>
                                  <div class="myPageEditContent">
                                      <input type="password" data-edit-pwd="current">
                                  </div>
                              </div>
                              <div data-edit-pwd="new" class="myPageEditContentBox">
                                  <h2 class="myPageEditContent_header">새로운 비밀번호</h2>
                                  <div class="myPageEditContent">
                                      <input type="password" data-edit-pwd="new">
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
                value:"",
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

    // edit page exit
    $(document).on("click","button#myPageEdit_Exit",function(){
       const myPageEditBOX = document.querySelector("#myPageEditBOX");
       myPageEditBOX.remove();
    });

    // TODO edit page input
    // pwd
    $(document).on("focusout","input[data-edit-pwd]",function(e){
        const pwdTag_attr = e.target.getAttribute("data-edit-pwd");
        const pwd_tag_vale = e.target.value;
        const pwd_reg = editUserInfo_obj.editPwd.reg;
        const pwd_containerBox = document.querySelector(`div.myPageEditContentBox[data-edit-pwd="${pwdTag_attr}"]`)
        const error_pwd_tag = document.querySelector(`p[data-edit-pwd="${pwdTag_attr}"]`)
        let pwd_regErrorMsg = `<p style="color:red;" data-edit-pwd="${pwdTag_attr}">
                               비밀번호를 입력해주세요.</p>`
        editUserInfo_obj.editPwd = '';
        if(pwd_tag_vale == ''){
            if(error_pwd_tag == null){
                pwd_containerBox.insertAdjacentHTML("beforeend",pwd_regErrorMsg);
            }else{
                error_pwd_tag.innerText="비밀번호를 입력해주세요";
            }
            return;
        }

        if(! pwd_reg.test(pwd_tag_vale)){
            if(error_pwd_tag == null){
                pwd_regErrorMsg = `<p style="color:red;" data-edit-pwd="${pwdTag_attr}">
                    비밀번호: 8~16자의 영문 대/소문자, 숫자, 특수문자를 사용해 주세요.</p>`;
                pwd_containerBox.insertAdjacentHTML("beforeend",pwd_regErrorMsg);
            }else{
                error_pwd_tag.innerText ="비밀번호: 8~16자의 영문 대/소문자, 숫자, 특수문자를 사용해 주세요";
            }
            return;
        }

        if(error_pwd_tag != null){
            error_pwd_tag.remove();
        }

        editUserInfo_obj.editPwd = pwd_tag_vale
        console.log(editUserInfo_obj.editPwd);
    });

    // email
    $(document).on("focusout",'input[data-edit-email="new"]',function(e){
        const email_tag_vale = e.target.value;
        const emailReg = editUserInfo_obj.editEmail.reg;
        const email_containerBox = document.querySelector(`div[data-edit-email="new"]`);
        const error_email_tag = document.querySelector(`p[data-edit-email="new"]`);

        editUserInfo_obj.editEmail.value ="";
        if(email_tag_vale == ""){
           if(error_email_tag == null){
               email_containerBox.insertAdjacentHTML("beforeend",email_regErrorMsg);
           }else{
               error_email_tag.innerText = "Email 입력해주세요.";
           }
           return;
        }

        if(! emailReg.test(email_tag_vale)){
           if(error_email_tag == null){
               email_regErrorMsg=`<p style="color:red;" data-edit-email="new">
                                        Email 양식에 맞게 입력해주세요.</p>`;
               email_containerBox.insertAdjacentHTML("beforeend",email_regErrorMsg);
           }else{
               error_email_tag.innerText = "Email 양식에 맞게 입력해주세요.";
           }
           return;
        }

        if(error_email_tag != null){
            error_email_tag.remove();
        }

        editUserInfo_obj.editEmail.value = email_tag_vale;
    });

    const five_time = (Hour, minute)=>{
        setTimeout(()=>{
            let Hour_set = Number(Hour);
            let minute_set = Number(minute);
            if((Hour_set+minute_set) == 0){
                return;
            }
            if(minute_set == 0){
                Hour_set = Hour_set -1;
                minute_set = 59;
                Hour_set = "0"+Hour_set;
                return five_time(Hour_set,minute_set);
            }

            minute_set = minute_set -1;
            console.log(String(minute_set).length)
            minute_set = String(minute_set).length == 1? "0"+minute_set:minute_set;
            Hour_set = "0"+Hour_set;
            return five_time(Hour_set,minute_set);
        },1000);
    };
    five_time(1,5)
    $(document).on("click","button#editEmailCheck",function(){
        const editEmailCheck_v = editUserInfo_obj.editEmail.value;
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

        if(authEmail == null){
            email_containerBox.insertAdjacentHTML("beforeend",authNumber_tag);
        }else{
            authEmail.remove();
            email_containerBox.insertAdjacentHTML("beforeend",authNumber_tag);
        }

    });
});