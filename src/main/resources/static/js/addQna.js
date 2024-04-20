$(function(){
        const body_append = (tag)=>{
            const body = document.querySelector("body");
            body.insertAdjacentHTML("afterbegin",tag);
        }

        const create_errorMsgTag = (msg)=>{
            const errorMsgTag = `
                <div id="errorMsgBox" class="overErrorMsgBox">
                    <div class="overErrorMsg">
                        <div class="overErrorMsg_content">
                            <h2>알림</h2>
                            <p>${msg}</p>
                        </div>
                        <button id="exitErrorBtn" type="button" class="exitErrorMsgBtn">ok</button>
                    </div>
                </div>
            `;
            body_append(errorMsgTag);
        }

        $(document).on("click","button#exitErrorBtn",function(){
            const errorMsgBox = document.querySelector("#errorMsgBox");
            errorMsgBox.remove();
        });

        $("#sendBtn_qna").click(async function(){
            const TEXTAREA_VAL = document.getElementById("qnaText").value;
            const REG_TEXT = /[a-zA-Z가-힣ㄱ-ㅎ]+/g;

            if(! REG_TEXT.test(TEXTAREA_VAL)){
                create_errorMsgTag("글자를 작성해주세요");
                return;
            }

            const productNo = document.querySelector('input[name="product_no"]').value;
            const artistId = document.querySelector('input[name="artistId"]').value;
            const content = document.getElementById('qnaText').value;
            const resolve_addQna = `/product-qna/${artistId}/add-qna`

            const formData = new FormData();
            formData.append("product_no",productNo);
            formData.append("artistId",artistId);
            formData.append("content",content);

            const res = await fetch(resolve_addQna,{
                method:"PUT",
                body:formData
            })
            .then(response=>response.text())
            .then(data=>{
                if(data=="ok"){
                    location.href = `/product/${artistId}/find-product/${productNo}`;
                }
            }).catch(error=>console.log(error));
        });
    });