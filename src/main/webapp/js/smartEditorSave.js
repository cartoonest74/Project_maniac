submitPost = function(){
	oEditors.getById["txtContent"].exec("UPDATE_CONTENTS_FIELD", []);
    		//스마트 에디터 값을 텍스트컨텐츠로 전달
	var content = document.getElementById("txtContent").value;
	if(content == ''){
	    oEditors.getById["txtContent"].exec("FOCUS")
	    alert("내용 입력!!");
	}else{
	    console.log(content);
	}
}
