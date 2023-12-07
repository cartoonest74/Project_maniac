/**
 * 
 */		$(function(){
            $("#sendBtn_qna").click(function(){
                const TEXTAREA_ID = "#qnaText";
                const TEXTAREA_VAL = $(TEXTAREA_ID).val();
                const REG_TEXT = /[a-zA-Z가-힣ㄱ-ㅎ]+/g;
                const QNA_FORM_ID = $("#WriterQnaForm");
                if(! REG_TEXT.test($(TEXTAREA_ID).val())){
                    alert("글자를 작성!!!");
                    return;
                }
                console.log(TEXTAREA_VAL.trim().length);
                if(! TEXTAREA_VAL.trim().length >= 10){
                    alert("10자 이상 작성!!!");
                    return;
                }
                QNA_FORM_ID.submit();
            });
        });