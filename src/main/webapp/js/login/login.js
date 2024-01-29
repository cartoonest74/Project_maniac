/**
 * login
 */
$(function() {
    const subMenu_none =()=>{
        const resize_login_btn = document.getElementById("resize_login_btn");
        resize_login_btn.style.display = "resize_login_btn";
        const header_login_btn = document.getElementById("header_login_btn");
        header_login_btn.style.display = "none";
        const header_cart_btn = document.getElementById("header_cart_btn");
        header_cart_btn.style.display = "none";
        const header_heart_btn = document.getElementById("header_heart_btn");
        header_heart_btn.style.display = "none";
    }
    resize_login_btn.addEventListener("click",function(e){
        e.preventDefault();
    })
    subMenu_none();
    const CONTEXTPATH = $("#contextPath").val();
	const LOGINACTION_URL = "/login-action/login-inspect";
	const LOGINFORM_ERR_ID = "#LoginIdFormErr";
	const LOGINFORM_ERR_PWD = "#loginPwdFormErr";
	const ON = 'on';
	
	$("#loginActionBtn").click(async function() {
		const ID = $("#loginId").val();
		const PWD = $("#loginPwd").val();
		const LOGINFORM = $("#loginForm");
		const OFF = 'off';

		const LOGINFORM_ERR_ID_MSG = "id는 양식에 맞게 다시 입력해주세요";
		const LOGINFORM_ERR_PWD_MSG = "비밀번호 양식에 맞게 다시 입력해주세요.";
		const LOGINFORM_ERR_AND_MSG = "id 또는 비밀번호 정보가 정확하지 않습니다.";

		LOGINFORM_ERR_VISIBLE(LOGINFORM_ERR_ID, '', OFF);
		if (ID.trim().length < 5) {
			LOGINFORM_ERR_VISIBLE(LOGINFORM_ERR_ID, LOGINFORM_ERR_ID_MSG, ON);
		}
		if (PWD.trim().length < 8) {
			LOGINFORM_ERR_VISIBLE(LOGINFORM_ERR_PWD, LOGINFORM_ERR_PWD_MSG, ON);
			return;
		}
		if(ID.trim().length < 5 || PWD.trim().length < 8){
			return;
		}
		const formData = new FormData();
		formData.append("id",ID)
		formData.append("pwd",PWD)
        const res_login = await axios.post(LOGINACTION_URL,formData)
            .then((response)=>response.data).then(data=>{
                    if (data != "") {
                        LOGINFORM_ERR_VISIBLE(LOGINFORM_ERR_ID, '', OFF);
                        LOGINFORM_ERR_VISIBLE(LOGINFORM_ERR_PWD, LOGINFORM_ERR_AND_MSG, ON);
                        return;
                    }
                    LOGINFORM.submit();
        });
	});

	const LOGINFORM_ERR_VISIBLE = (err_id, err_msg, onoff) => {
		switch (onoff) {
			case 'on':
				$(err_id).removeClass("none");
				$(err_id).addClass("inlineblock");
				$(err_id).text(err_msg);
				break;
			case 'off':
				$(err_id).text('');
				$(err_id).addClass("none");
				$(err_id).removeClass("inlineblock");
				break;
		}

	};
});