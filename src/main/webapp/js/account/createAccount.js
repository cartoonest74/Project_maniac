/**
 * jquery lib 필요
 * creat accont input 정규식 조건부분
 */
$(function() {
    //	Id
	const idInspectIMessage = '#idInspectIMessage';
    //	Name
    const nameInspectMessage = '#nameInspectMessage';
	// email
    const RESULT_EMAIL = $("#result_Email");
    const EmailInspectMessage = '#EmailInspectMessage';
    const TYPE_EMAIL = "email";
    const TYPE_TEL = "tel";
    const result_obj = [
        {
            id:"#result_id",
            msg_id:"#idInspectIMessage",
            msg:"아이디: 아이디를 입력해주세요",
            value:""
        },
        {
            id:"#result_pwd",
            msg_id:"#pwdInspectMessgae",
            msg:"비밀번호: 비밀번호를 입력해주세요",
            value:""
        },
        {
            id:"#result_name",
            msg_id:"#nameInspectMessage",
            msg:"아이디: 아이디를 입력해주세요",
            value:""
        },
        {
            id:"#result_birth",
            msg_id:"#birthInspectMessage",
            msg:"생일: 생일를 입력해주세요",
            value:""
        },
        {
            id:"#result_Email",
            msg_id:"#EmailInspectMessage",
            msg:"Email: Email를 입력해주세요",
            value:""
        },
        {
            id:"#result_gender",
            msg_id:"#genderInspectMessgae",
            msg:"성별: 성별를 입력해주세요",
            value:""
        },
        {
            id:"#result_post",
            msg_id:"#addrInspectMessgae",
            msg:"주소: 주소를 입력해주세요",
            value:""
        },
        {
            id:"#result_tel",
            msg_id:"#telInspectMessage",
            msg:"전화번호: 전화번호를 입력해주세요",
            value:""
        },
    ];

	document.addEventListener('keydown', function(event) {
		if (event.keyCode === 13) {
			event.preventDefault();
		};
	}, true);

	// id
	$('#id').focusout(function() {
		const REGID = /^[a-z]+[a-z0-9_-]{5,19}$/g;
		const INSEPECT_VAL = $('#id').val();
		const IDERR1 = "아이디: 필수 정보입니다.";
		const IDERR2 = "아이디: 5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.";
		const IDLENGTHMAX = 20
		const RESULT_ID = $("#result_id");

		inspect_fn(REGID, idInspectIMessage, INSEPECT_VAL, IDERR1, IDERR2, IDLENGTHMAX, RESULT_ID);
		if (RESULT_ID.val() == "ok") {
			$.ajax({
				type: "post",
				async: true,
				url: "0/member/duple_check",
				dataType: "text",
				data: {
					id: INSEPECT_VAL
				},
				success: function(data, textStatus) {
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
					;
				}
			});
		}
	});
	//  pwd
	$('#pwd').focusout(function() {
		const pwdInspectMessgae = '#pwdInspectMessgae';
		const REGPWD = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[\$\!\@\#\%\^\&\*\(\)\\\<\>\?\/\+\_\-]).{8,16}$/g;
		const INSEPECT_VAL = $('#pwd').val();
		const PWDERR1 = "비밀번호: 필수 정보입니다";
		const PWDERR2 = "비밀번호: 8~16자의 영문 대/소문자, 숫자, 특수문자를 사용해 주세요.";
		const PWDlENGTHMAX = 20;
		const RESULT_PWD = $("#result_pwd");
		inspect_fn(REGPWD, pwdInspectMessgae, INSEPECT_VAL, PWDERR1, PWDERR2, PWDlENGTHMAX, RESULT_PWD);
	});

	// name
	$('#name').focusout(function() {
        const REGNAME = /[가-힣A-Za-z]{0,40}$/g;
		const INSEPECT_VAL = $('#name').val();
		//console.log(INSEPECT_VAL.length);
		const NAMEERR1 = "이름: 필수 정보입니다";
		const NAMEERR2 = "이름: 한글, 영문 대/소문자를 사용해 주세요. (특수기호, 공백 사용 불가).";
		const NAMELENGTHMAX = 40;
		const RESULT_NAME = $("#result_name");
		inspect_fn(REGNAME, nameInspectMessage, INSEPECT_VAL, NAMEERR1, NAMEERR2, NAMELENGTHMAX, RESULT_NAME);
	});

//    email
    const email_invalid_fn = () =>{

        const REGNAME = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/g;
        const INSEPECT_VAL = $('#Email').val();
                //console.log(INSEPECT_VAL.length);
        const EMAILERR1 = "Email: 필수 정보입니다";
        const EMAILERR2 = "Email: Email 형식이 잘못되어 있습니다. 다시 작성해주세요";
        const EMAILLENGTHMAX = 64;
        inspect_fn(REGNAME, EmailInspectMessage, INSEPECT_VAL, EMAILERR1, EMAILERR2, EMAILLENGTHMAX, RESULT_EMAIL);
        return INSEPECT_VAL;
   }

//   email 인증검사 부분
    $("#AuthEmailBtn").click(function(){
        _userEmail = email_invalid_fn();
        if(RESULT_EMAIL.val() != "ok"){
            return '';
        }
        $.ajax({
            type: "post",
				async: true,
				url: "/mail/get-code",
				dataType: "text",
				data: {
				    userEmail:_userEmail,
				    type:TYPE_EMAIL
				},
				success: function(data, textStatus) {
					if (data == 'ok') {
						$(EmailInspectMessage).text('');
						$(EmailInspectMessage).removeClass("inlineblock");
						$(EmailInspectMessage).addClass("none");
						RESULT_EMAIL.attr("value", "ok");
						alert("인증번호를 요청하였습니다.");
					} else {
						emailCode_status = "Email: Email 형식이 잘못되어 있습니다. 다시 작성해주세요";
						RESULT_EMAIL.attr("value", "none");
						$(EmailInspectMessage).removeClass("none");
						$(EmailInspectMessage).addClass("inlineblock");
						$(EmailInspectMessage).text(emailCode_status);
					}
                }
        });
    });

	// birth
	$('#birth').focusout(function() {
		const TODAY = new Date();
		const YEAR = TODAY.getFullYear();
		const MONTH = ("0" + (TODAY.getMonth() + 1)).slice(-2);
		const DAY = ("0" + TODAY.getDate()).slice(-2);

		const TODAY_TIME = new Date(YEAR, MONTH, DAY);
		const TODAY_GETTIME = TODAY_TIME.getTime();

		const CURRENTDAYS = parseInt(YEAR.toString().concat(MONTH.concat(DAY)));
		const birthInspectMessage = '#birthInspectMessage';
		const REGBIRTH = /^(19[^0-1.][0-9]|20\d{2})(0[1-9]|1[0-2])([0-2][1-9]|3[01])$/g;

		const INSEPECT_VAL = $('#birth').val();
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
		const RESULT_BIRTH = $("#result_birth");


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
	$('#tel').focusout(function() {
		console.log();
		const telInspectMessage = '#telInspectMessage';
		const REGPHONE1 = /^01(?:0|1|[6-9])-(?:[1-9]{1})(?:\d{2}|\d{3})-\d{4}$/;
		const REGPHONE2 = /^01(?:0|1|[6-9])(?:[1-9]{1})(?:\d{2}|\d{3})\d{4}$/;
		const INSEPECT_VAL = $('#tel').val();
		const NAMEERR1 = "휴대전화번호: 필수 정보입니다";
		const NAMEERR2 = "휴대전화번호: 휴대전화번호가 정확한지 확인해 주세요.";
		const RESULT_TEL = $("#result_tel");
		inspect_tel(REGPHONE1, REGPHONE2, telInspectMessage, INSEPECT_VAL, NAMEERR1, NAMEERR2, RESULT_TEL);
	});

	const inspect_tel = (regmsg1, regmsg2, id, test_value, errmsg1, errmsg2, result_tel) => {
		const TEL_INPUT = $("#tel");
		const INSPECTId = $(id);
		if (test_value == '') {
			INSPECTId.removeClass("none");
			INSPECTId.addClass("inlineblock");
			INSPECTId.text(errmsg1);
			return;
		}
		if (regmsg1.test(test_value) || regmsg2.test(test_value)) {
			let telfirst;
			let telsecond;
			let tellast;
			let telslashmode;

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
				TEL_INPUT.val(telslashmode);
			};
			INSPECTId.removeClass("inlineblock");
			INSPECTId.addClass("none");
			result_tel.attr("value", "ok");
			return;

		} else {
			INSPECTId.removeClass("none");
			INSPECTId.addClass("inlineblock");
			INSPECTId.text(errmsg2);
			result_tel.attr("value", "none");
			return;
		}
	};

	// 생년월일 현재 날짜와 입력된 날짜 비교 
	const inspect_birth = (only_age_date, birthInspectMessage, currentDays, inputDays, BIRTHERR3, BIRTHERR4, TRANS_BIRTH_DOT, RESULT_BIRTH) => {
		const INSPECTDate = $(birthInspectMessage);
		const only_age_date_year = only_age_date.getFullYear();
		const only_age_14 = 1984;
		const SENDBTN = $("#sendBtn");
		const BIRTH_INPUT = $("#birth");

		RESULT_BIRTH.attr("value", "none");
		if (parseInt(currentDays) >= parseInt(inputDays)) {

			// 만나이 체크부분
			if (parseInt(only_age_date_year) < only_age_14) {
				INSPECTDate.removeClass("none");
				INSPECTDate.addClass("inlineblock");
				INSPECTDate.text(BIRTHERR4);
				SENDBTN.attr("hidden", "hidden");
				return;
			}
			BIRTH_INPUT.val(TRANS_BIRTH_DOT.trim());
			SENDBTN.removeAttr("hidden");
			INSPECTDate.removeClass("inlineblock");
			RESULT_BIRTH.attr("value", "ok");
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
    const EMAIL_CODE_CHECK = () =>{
        _userCode = $("input[name=authEmailCode]").val();
        var email_check_bl = false;
        $.ajax({
                   type: "post",
       				async: false,
       				url: "/mail/auth-code",
       				dataType: "text",
       				data: {
                        userCode:_userCode,
                        type:TYPE_EMAIL
       				},
       				success: function(data, textStatus) {
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
                       }
        });
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
		const RESULT_INPUT_V = $(obj.id).val();
		if (RESULT_INPUT_V != "ok") {
			$(obj.msg_id).removeClass("none");
			$(obj.msg_id).addClass("inlineblock");
			$(obj.msg_id).text(obj.msg);
			obj.value = "";
			return "";
		}
		obj.value = RESULT_INPUT_V;
		return "";
	}
	//sendBtn
	$("#sendBtn").click(function() {
		const POST_NUM = $("#postNum").val();
		const MAIN_ADDR = $("#mainAddr").val();
		const DETAIL_ADDR = $("#detailAddr").val();

		if(POST_NUM == '' && MAIN_ADDR == ''&& DETAIL_ADDR == ''){
			$("#result_post").attr("value","none");
		}
        result_obj.forEach(obj=>{
		    RESULT_CHECK_FN(obj);
        })
        const arr_finalValue = result_obj.filter(obj => obj.value != "")
        console.log(arr_finalValue.length)
        if(result_obj.length != arr_finalValue.length){
            console.log(result_obj.length)
            return '';
        }
		if(! EMAIL_CODE_CHECK()){
		   console.log("false");
		    return '';
		};
        // 이 순서로 보내야 이상적인 주소가 나옴
        full_addr = CREATE_ADDR_FN(MAIN_ADDR, DETAIL_ADDR, POST_NUM);
        $("#Addr").attr("value", full_addr);

		return $("#createAccountForm").submit();
	});

});
