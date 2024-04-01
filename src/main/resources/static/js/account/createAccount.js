$(function() {
    const artistId = document.getElementById("artistId").value;
    //	Id
	const idInspectIMessage = '#idInspectIMessage';
    //	Name
    const nameInspectMessage = '#nameInspectMessage';
	// email
    const RESULT_EMAIL = document.getElementById("result_Email");
    const EmailInspectMessage = '#EmailInspectMessage';
    const TYPE_EMAIL = "email";
    const TYPE_TEL = "tel";
    const result_obj = {
        userId:{
            id:"#result_id",
            msg_id:"#idInspectIMessage",
            msg:"아이디: 아이디를 입력해주세요",
            value:""
        },
        pwd:{
            id:"#result_pwd",
            msg_id:"#pwdInspectMessgae",
            msg:"비밀번호: 비밀번호를 입력해주세요",
            value:""
        },
        name:{
            id:"#result_name",
            msg_id:"#nameInspectMessage",
            msg:"이름: 이름을 입력해주세요",
            value:""
        },
        birth:{
            id:"#result_birth",
            msg_id:"#birthInspectMessage",
            msg:"생일: 생일를 입력해주세요",
            value:""
        },
        email:{
            id:"#result_Email",
            msg_id:"#EmailInspectMessage",
            msg:"Email: Email를 입력해주세요",
            value:""
        },
        gender:{
            id:"#result_gender",
            msg_id:"#genderInspectMessgae",
            msg:"성별: 성별를 입력해주세요",
            value:""
        },
        addr:{
            id:"#result_post",
            msg_id:"#addrInspectMessgae",
            msg:"주소: 주소를 입력해주세요",
            value:""
        },
        phone:{
            id:"#result_tel",
            msg_id:"#telInspectMessage",
            msg:"전화번호: 전화번호 중복 검사를 해주세요",
            value:""
        },
    };
    const body_append =(position,tag)=>{
        const body=document.querySelector("body");
        body.insertAdjacentHTML(position,tag);
    }

    // confirm msg
     const confirm_msg=(msg_tag)=>{
        const reply_okTag = `<div id="confirmBox" class="confirm_box">
                                        <div class="confirmContainer">
                                            <h2>
                                                <i class="fa-solid fa-circle-question fa-lg"></i>&nbsp;알림
                                            </h2>
                                            ${msg_tag}
                                            <div class="confirmBtn">
                                                <button id="confirmOk" type="button">OK</button>
                                            </div>
                                        </div>
                                    </div>`;
        body_append("afterbegin",reply_okTag);
    }
    $(document).on("click","button#confirmOk",function(){
        const confirmBox = document.querySelector("div#confirmBox");
        confirmBox.remove();
    });

	document.addEventListener('keydown', function(event) {
		if (event.keyCode === 13) {
			event.preventDefault();
		};
	}, true);

	// id
	const input_id = document.getElementById("id");
	input_id.addEventListener("focusout",async ()=> {
		const REGID = /^[a-z]+[a-z0-9_-]{5,19}$/g;
		const INSEPECT_VAL = input_id.value;
		const IDERR1 = "아이디: 필수 정보입니다.";
		const IDERR2 = "아이디: 5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.";
		const IDLENGTHMAX = 20
		const RESULT_ID = $("#result_id");
        const resolve_dupleCheck = "/0/member/duple_check";

        const formData =new FormData();
        formData.append("id",INSEPECT_VAL);

		inspect_fn(REGID, idInspectIMessage, INSEPECT_VAL, IDERR1, IDERR2, IDLENGTHMAX, RESULT_ID);
		if (RESULT_ID.val() == "ok") {
		    const res = await fetch(resolve_dupleCheck,{
                            method:"post",
                            body:formData
                        })
                        .then(response=>response.text())
                        .then(data=>{
                            if (data == 'notDuple') {
                                $(idInspectIMessage).text('');
                                $(idInspectIMessage).removeClass("inlineblock");
                                $(idInspectIMessage).addClass("none");
                                RESULT_ID.attr("value", "ok");
                            } else {
                                idDuple_status = "아이디: 사용할 수 없는 아이디입니다. 다른 아이디를 입력해 주세요.";
                                RESULT_ID.attr("value", "none");
                                $(idInspectIMessage).removeClass("none");
                                $(idInspectIMessage).addClass("inlineblock");
                                $(idInspectIMessage).text(idDuple_status);
                            }
                        });
		}
	});
	//  pwd
	const input_pwd = document.getElementById("pwd");
	input_pwd.addEventListener("focusout",()=> {
		const pwdInspectMessgae = '#pwdInspectMessgae';
		const REGPWD = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[\$\!\@\#\%\^\&\*\(\)\\\<\>\?\/\+\_\-]).{8,16}$/g;
		const INSEPECT_VAL = input_pwd.value;
		const PWDERR1 = "비밀번호: 필수 정보입니다";
		const PWDERR2 = "비밀번호: 8~16자의 영문 대/소문자, 숫자, 특수문자를 사용해 주세요.";
		const PWDlENGTHMAX = 20;
		const RESULT_PWD = $("#result_pwd");
		inspect_fn(REGPWD, pwdInspectMessgae, INSEPECT_VAL, PWDERR1, PWDERR2, PWDlENGTHMAX, RESULT_PWD);
	});

	// name
	const input_name = document.getElementById("name");
	input_name.addEventListener("focusout",()=>{
        const REGNAME = /[가-힣A-Za-z]{0,40}$/g;
		const INSEPECT_VAL = input_name.value;
		const NAMEERR1 = "이름: 필수 정보입니다";
		const NAMEERR2 = "이름: 한글, 영문 대/소문자를 사용해 주세요. (특수기호, 공백 사용 불가).";
		const NAMELENGTHMAX = 40;
		const RESULT_NAME = $("#result_name");
		inspect_fn(REGNAME, nameInspectMessage, INSEPECT_VAL, NAMEERR1, NAMEERR2, NAMELENGTHMAX, RESULT_NAME);
	});

//    email
    const email_invalid_fn = () =>{
        const REGNAME = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/g;
        const INSEPECT_VAL = document.getElementById("email").value;
                //console.log(INSEPECT_VAL.length);
        const EMAILERR1 = "Email: 필수 정보입니다";
        const EMAILERR2 = "Email: Email 형식이 잘못되어 있습니다. 다시 작성해주세요";
        const EMAILLENGTHMAX = 64;
        inspect_fn(REGNAME, EmailInspectMessage, INSEPECT_VAL, EMAILERR1, EMAILERR2, EMAILLENGTHMAX, RESULT_EMAIL);
        return INSEPECT_VAL;
   }

//   email 인증검사 부분
    const AuthEmailBtn = document.getElementById("AuthEmailBtn");
    AuthEmailBtn.addEventListener("click",async function(){
        const resolve_getCode = "/mail/get-code";
        _userEmail = email_invalid_fn();
        if(RESULT_EMAIL.value != "ok"){
            return '';
        }

        // loading
        const loading_tag='<div id="loadingTag" style="position:fixed; width:100%; height:100%; background:rgba(0,0,0,0.5); z-index:10;"></div>'
        body_append("afterbegin",loading_tag);
        const loadingTag =  document.querySelector("div#loadingTag");

        const formData = new FormData();
        formData.append("userEmail",_userEmail);
        formData.append("type",TYPE_EMAIL);
        const res =await fetch(resolve_getCode,{method:"POST",body:formData})
                        .then(response=>response.text())
                        .then(data=>{
                            if (data == 'ok') {
                                $(EmailInspectMessage).text('');
                                $(EmailInspectMessage).removeClass("inlineblock");
                                $(EmailInspectMessage).addClass("none");
                                RESULT_EMAIL.setAttribute("value", "ok");
                                alert("인증번호를 요청하였습니다.");
                            } else {
                                emailCode_status = "Email: Email 형식이 잘못되어 있습니다. 다시 작성해주세요";
                                RESULT_EMAIL.setAttribute("value", "none");
                                $(EmailInspectMessage).removeClass("none");
                                $(EmailInspectMessage).addClass("inlineblock");
                                $(EmailInspectMessage).text(emailCode_status);
                            }
                        })
                        .catch(error=>console.log(error));
        loadingTag.remove();
    });

	// birth
	const input_birth = document.getElementById("birth");
	input_birth.addEventListener("focusout",()=>{
		const TODAY = new Date();
		const YEAR = TODAY.getFullYear();
		const MONTH = ("0" + (TODAY.getMonth() + 1)).slice(-2);
		const DAY = ("0" + TODAY.getDate()).slice(-2);

		const TODAY_TIME = new Date(YEAR, MONTH, DAY);
		const TODAY_GETTIME = TODAY_TIME.getTime();

		const CURRENTDAYS = parseInt(YEAR.toString().concat(MONTH.concat(DAY)));
		const birthInspectMessage = '#birthInspectMessage';
		const REGBIRTH = /^(19[^0-1.][0-9]|20\d{2})(0[1-9]|1[0-2])([0-2][1-9]|3[01])$/g;

		const INSEPECT_VAL = input_birth.value;
		const valYear = INSEPECT_VAL.split(/^((19|20)\d{2})(0[1-9]|1[0-2])([0-2][1-9]|3[01])$/g);
		//console.log(valYear);
		const INPUT_GETTIME = new Date(valYear[1], valYear[3], valYear[4]).getTime();
		const INSPECT_SPLICE = INSEPECT_VAL.substr(0, INSEPECT_VAL.length);
		const INPUTDAYS = parseInt(INSPECT_SPLICE);

		const TRANS_BIRTH_DOT = valYear[1] + "." + valYear[3] + "." + valYear[4];
		const BIRTHERR1 = "생년월일: 필수 정보입니다";
		const BIRTHERR2 = "생년월일: 생년월일은 8자리 숫자로 입력해 주세요.";
		const BIRTHERR3 = "생년월일: 잘못된 정보입니다. 다시 한번 확인해주세요";
		const BIRTHERR4 = "만 14세 이상부터 가입할 수 있습니다.";
		const BIRTHLENGTHMAX = 9;
		const RESULT_BIRTH = document.getElementById("result_birth");


		inspect_fn(REGBIRTH, birthInspectMessage, INSEPECT_VAL, BIRTHERR1, BIRTHERR2, BIRTHLENGTHMAX, RESULT_BIRTH);
		if (INSEPECT_VAL.length == 8) {
			const ONLY_AGE = TODAY_GETTIME - INPUT_GETTIME
			const ONLY_AGE_DATE = new Date(ONLY_AGE);

			// 만나이 검사
			inspect_birth(ONLY_AGE_DATE, birthInspectMessage, TODAY_GETTIME, INPUT_GETTIME, BIRTHERR3, BIRTHERR4, TRANS_BIRTH_DOT, RESULT_BIRTH);
		}
		// console.log(ONLY_AGE);
		// console.log(TODAY_GETTIME);
		// console.log(INPUT_GETTIME);

	});


	// tel

	const input_tel = document.getElementById("tel");
	input_tel.addEventListener("focusout",function() {
		const REGPHONE1 = /^01(?:0|1|[6-9])-(?:[0-9]{1})(?:\d{2}|\d{3})-\d{4}$/;
		const REGPHONE2 = /^01(?:0|1|[6-9])(?:[0-9]{1})(?:\d{2}|\d{3})\d{4}$/;
		const INSEPECT_VAL = input_tel.value;
		const NAMEERR1 = "휴대전화번호: 필수 정보입니다";
		const NAMEERR2 = "휴대전화번호: 휴대전화번호가 정확한지 확인해 주세요.";
		result_obj["phone"].value = "";
		inspect_tel(REGPHONE1, REGPHONE2, INSEPECT_VAL, NAMEERR1, NAMEERR2);
	});

	const inspect_tel = (regmsg1, regmsg2,test_value, errmsg1, errmsg2) => {
	    const telInspectMessage = document.getElementById("telInspectMessage");
		const TEL_INPUT = document.getElementById("tel");
		const result_tel = document.getElementById("result_tel");
		if (test_value == '') {
			telInspectMessage.classList.remove("none");
			telInspectMessage.classList.add("inlineblock");
			telInspectMessage.innerText=errmsg1;
			result_tel.setAttribute("value", "none");
			return;
		}

		if (regmsg1.test(test_value) || regmsg2.test(test_value)) {
			let telfirst,telsecond,tellast ="";
			let telslashmode = test_value;
			// 전화번호 - 없으면 - 넣어서 완성
			if (test_value.indexOf('-') + 1 == 0) {
				if (test_value.length == 10) {
					telfirst = test_value.substr(0, 3);
					telsecond = test_value.substr(3, 3);
					tellast = test_value.substr(6, 4);
				} else {
					telfirst = test_value.substr(0, 3);
					telsecond = test_value.substr(3, 4);
					tellast = test_value.substr(7, 4);
				};

				telslashmode = telfirst + "-" + telsecond + "-" + tellast;
//				TEL_INPUT.setAttribute("value",telslashmode);
				TEL_INPUT.value=telslashmode;
			};
			if(result_obj["phone"].value != telslashmode){
                result_tel.setAttribute("value", "none");
			}
			telInspectMessage.classList.remove("inlineblock");
			telInspectMessage.classList.add("none");
			result_obj["phone"].value = telslashmode;
			return;

		} else {
			telInspectMessage.classList.remove("none");
			telInspectMessage.classList.add("inlineblock");
			telInspectMessage.innerText=errmsg2;
			result_tel.setAttribute("value", "none");
			return;
		}
	};
	// 전화번호 중복검사
    const AuthTelBtn = document.getElementById("AuthTelBtn");
    AuthTelBtn.addEventListener("click",async ()=>{
        const resolve_duplePhoneCheck = "/0/member/duple_phoneCheck";
        const input_phoneVal =result_obj["phone"].value;
        console.log(input_phoneVal)
	    const telInspectMessage = document.getElementById("telInspectMessage");
        const result_tel = document.getElementById("result_tel");

	    const msg_tag = `<p style="color:red;">전화번호를 작성해주세요.</p>`;
	    const msg_tag2 = `<p style="color:red;">이미 가입된 번호입니다.</p>`;
	    const msg_tag3 = `<p>사용가능한 번호입니다.</p>`;
        if(input_phoneVal == ""){
            confirm_msg(msg_tag);
            return;
        }

        const formData = new FormData();
        formData.append("phone",input_phoneVal);

        // loading
        const loading_tag='<div id="loadingTag" style="position:fixed; width:100%; height:100%; background:rgba(0,0,0,0.5); z-index:10;"></div>'
        body_append("afterbegin",loading_tag);
        const loadingTag =  document.querySelector("div#loadingTag");

        const res = await fetch(resolve_duplePhoneCheck,{
                method:"POST",
                body:formData
            })
            .then(response=>response.text())
            .then(data=>{
                console.log(data);
                if(data=="notDuple"){
                    confirm_msg(msg_tag3);
    			    result_tel.setAttribute("value", "ok");
    			    return;
                }
                confirm_msg(msg_tag2);
            }).catch(error=>{console.log(error)});
        loadingTag.remove()
    });

	// 생년월일 현재 날짜와 입력된 날짜 비교
	const inspect_birth = (only_age_date, birthInspectMessage, currentDays, inputDays, BIRTHERR3, BIRTHERR4, TRANS_BIRTH_DOT, RESULT_BIRTH) => {
		const INSPECTDate = $(birthInspectMessage);
		const only_age_date_year = only_age_date.getFullYear();
		const only_age_14 = 1984;
		const sendBtn = document.getElementById("sendBtn");
		const BIRTH_INPUT = $("#birth");

		RESULT_BIRTH.setAttribute("value", "none");
		if (parseInt(currentDays) >= parseInt(inputDays)) {

			// 만나이 체크부분
			if (parseInt(only_age_date_year) < only_age_14) {
				INSPECTDate.removeClass("none");
				INSPECTDate.addClass("inlineblock");
				INSPECTDate.text(BIRTHERR4);
				sendBtn.setAttribute("hidden", "hidden");
				return;
			}
			BIRTH_INPUT.val(TRANS_BIRTH_DOT.trim());
			sendBtn.classList.remove("hidden");
			INSPECTDate.removeClass("inlineblock");
			RESULT_BIRTH.setAttribute("value", "ok");
			return;

		} else {
			INSPECTDate.removeClass("none");
			INSPECTDate.addClass("inlineblock");
			INSPECTDate.text(BIRTHERR3);
			return;
		}
	};

	const inspect_fn = (regmsg, id, test_value, errmsg1, errmsg2, lengthMax, resultId) => {
		const REGMSG = regmsg;
		const INSPECTId = $(id);
		const RESULTID = $(resultId);

		RESULTID.attr("value", "none");
		if (test_value == '') {
			INSPECTId.removeClass("none");
			INSPECTId.addClass("inlineblock");
			INSPECTId.text(errmsg1);
			return;
		}
		if (REGMSG.test(test_value) && test_value.length < lengthMax) {
			INSPECTId.removeClass("inlineblock");
			INSPECTId.addClass("none");
			RESULTID.attr("value", "ok");
			return;
		} else {
			INSPECTId.removeClass("none");
			INSPECTId.addClass("inlineblock");
			INSPECTId.text(errmsg2);
			return;
		}
	};

	//gender
	$(".radio_item").click(function() {
		const IDENTIFYGENDER1 = $("#identifyGender1");
		const IDENTIFYGENDER2 = $("#identifyGender2");
		const REUSLT_GENDER = $("#result_gender");

		const CHECK_M = IDENTIFYGENDER1.is(':checked');
		const CHECK_W = IDENTIFYGENDER2.is(':checked');

		CHECK_M || CHECK_W ? REUSLT_GENDER.attr("value", "ok") : REUSLT_GENDER.attr("value", "none");
	});


    //email code check
    const EMAIL_CODE_CHECK = async() =>{
        const _userCode = document.querySelector("input[name=authEmailCode]").value;
        const resolve_inspectCode = "/mail/auth-code";
        let email_check_bl = false;

        const formData = new FormData();
        formData.append("userCode",_userCode);
        formData.append("type",TYPE_EMAIL);

        const res =await fetch(resolve_inspectCode,{
                    method:"post",
                    body:formData
                })
                .then(response=>response.text())
                .then(data=>{
                    if (data == 'match') {
                        $(EmailInspectMessage).text('');
                        $(EmailInspectMessage).removeClass("inlineblock");
                        $(EmailInspectMessage).addClass("none");
                        email_check_bl = true;
                    } else {
                        emailCode_status = "Email: 인증번호가 맞지 않습니다. 다시 입력해주세요";
                        $(EmailInspectMessage).removeClass("none");
                        $(EmailInspectMessage).addClass("inlineblock");
                        $(EmailInspectMessage).text(emailCode_status);
                    }
                })
                .catch(error=>console.log(error));
        return Boolean(email_check_bl);
    }

// full 주소 만들기
  const CREATE_ADDR_FN = (...addr) =>{
          let addr_arr = [];
          let full_addr = "";
          addr.forEach((address, index)=>{
              index == (addr.length - 1)?
                  addr_arr.push(`(${address})`) :
                  addr_arr.push(address)
          });
         full_addr = addr_arr.join(" ");
         return full_addr;
      }

//   결과부분 유효성 체크
    const RESULT_CHECK_FN = (obj) => {
        const obj_input = result_obj[obj];
		const RESULT_INPUT_V = document.querySelector(`${obj_input.id}`).value;
		const msg_idTag = document.querySelector(`${obj_input.msg_id}`);
		if (RESULT_INPUT_V != "ok") {
			msg_idTag.classList.remove("none");
			msg_idTag.classList.add("inlineblock");
			msg_idTag.innerText=obj_input.msg;
			obj_input.value = "";
			return "";
		}
		obj_input.value = RESULT_INPUT_V;
		return "";
	}
	//sendBtn
	sendBtn.addEventListener("click",async ()=>{
		const POST_NUM = document.getElementById("postNum").value;
		const MAIN_ADDR = document.getElementById("mainAddr").value;
		const DETAIL_ADDR = document.getElementById("detailAddr").value;
		const resolve_accountUrl = `/${artistId}/member/complete-account`

		if(POST_NUM == '' && MAIN_ADDR == ''&& DETAIL_ADDR == ''){
			document.getElementById("result_post").setAttribute("value","none");
		}
        const obj_keys = Object.keys(result_obj);
		for(let i=0;i<obj_keys.length;i++){
		    const key= obj_keys[i]
		    RESULT_CHECK_FN(key);
		}
        const arr_finalValue = obj_keys.filter(key =>result_obj[key].value != "")
        if(obj_keys.length != arr_finalValue.length){
            return '';
        }
		if(! EMAIL_CODE_CHECK()){
		    return '';
		};

        const formData = new FormData();
        arr_finalValue.forEach(val=>{
            let input_val = "";
            switch(val){
                case "gender":
                    input_val = document.querySelector('input[name="gender"]:checked').value;
                    break;
                case "userId":
                    input_val = document.getElementById("id").value;
                    break;
                case "phone":
                    input_val = document.getElementById("tel").value;
                    break;
                case "addr":
                    input_val = CREATE_ADDR_FN(MAIN_ADDR, DETAIL_ADDR, POST_NUM);
                    break;
                default:
                    input_val = document.getElementById(`${val}`).value;
            }
            console.log(input_val);
            formData.append(`${val}`,input_val);
        });
        // 이 순서로 보내야 이상적인 주소가 나옴
        const res = await fetch(resolve_accountUrl,{
                        method:"PUT",
                        body:formData
                    }).then(response=>response.text())
                    .then(data=>{
                        console.log(data);
                        if(data =="ok"){
                            location.href=resolve_accountUrl;
                        }
                    }).catch(error=>console.log(error));
	});

});
