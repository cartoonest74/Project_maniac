/**
 * add review
 */

$(function() {
	const PREVIEW_IMG = "#previewImg";
	const PREVIEW_NAME = "#previewName";
	const PREVIEW_REMOVE = "#previewRemove";
	const ON = "on";
	const OFF = "off";

    const previewRemove = document.getElementById("previewRemove");
	previewRemove.addEventListener("click",function() {
		document.getElementById("reviewImgFile").value='';
		tag_visible(PREVIEW_IMG, OFF);
		tag_visible(PREVIEW_NAME, OFF);
		tag_visible(PREVIEW_REMOVE, OFF);
	});
	
	$("#reviewImgFile").change(function(e) {
		const FILE = e.target.files[0];
//		const READER = new FileReader();
		const REVIEWIMGFILE_VAL = document.getElementById("reviewImgFile").value;
		const REVIEWIMGFILE_VALS = REVIEWIMGFILE_VAL.split('\\');
		const REVIEWIMGFILE_NAME = REVIEWIMGFILE_VALS[REVIEWIMGFILE_VALS.length - 1].trim();
		const IMAGE_REG = /(.*?)\.(jpg|jpeg|png|gif|bmp)$/;
		const IMG_SIZE = Math.floor(FILE.size/1024);

		// upload file img 형식인지 검사
		if (!IMAGE_REG.test(REVIEWIMGFILE_VALS)) {
			alert("use only img Format!!");
			return;
		}

		// upload file img size가 100 초과x
		if(IMG_SIZE > 100){
			alert("Over Size 100MB!!");
			return;			
		}
//		READER.onload = function(e) {
//			$("#previewImg").attr("src", e.target.result);
//			$("#previewName").text(REVIEWIMGFILE_NAME);
//		}
//		READER.readAsDataURL(FILE);
        const previewSrc = URL.createObjectURL(FILE);
        document.getElementById("previewImg").setAttribute("src",previewSrc);
        document.getElementById("previewName").innerHTML=REVIEWIMGFILE_NAME;
        tag_visible(PREVIEW_IMG, ON);
        tag_visible(PREVIEW_NAME, ON);
        tag_visible(PREVIEW_REMOVE, ON);
	});

	const tag_visible = (tagid, visible) => {
		if (visible == "on") {
		    document.querySelector(tagid).classList.remove("none");
		    document.querySelector(tagid).classList.add("inlineblock");
			return;
		}
		if (visible == "off") {
		    document.querySelector(tagid).classList.remove("inlineblock");
		    document.querySelector(tagid).classList.add("none");
			return;
		}
	}

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

	document.getElementById("sendBtn_qna").addEventListener("click",async function(){
		const reviewImgFile_val = document.getElementById("reviewImgFile").value;
		const TEXTAREA_ID_val = document.getElementById("qnaText").value;
		const REG_TEXT = /[a-zA-Z가-힣ㄱ-ㅎ!\\.~]+/g;

		if (reviewImgFile_val.length <= 1) {
		    create_errorMsgTag("이미지를 첨부해주세요.");
			return;
		}

		if (!REG_TEXT.test(TEXTAREA_ID_val)) {
			create_errorMsgTag("글자를 작성해주세요.");
			return;
		}
		if (!TEXTAREA_ID_val.trim().length >= 10) {
			create_errorMsgTag("10자 이상 작성해주세요.");
			return;
		}

        const productNo = document.querySelector('input[name="productNo"]').value;
        const artistId = document.querySelector('input[name="artistId"]').value;
        const content = document.getElementById('qnaText').value;
        const reviewImgFile = document.getElementById('reviewImgFile').files[0];

        const resolve_addReview =`/product-review/${artistId}/add-review`

        const formData = new FormData();
        formData.append("productNo",productNo);
        formData.append("artistId",artistId);
        formData.append("content",content);
        formData.append("reviewImgFile",reviewImgFile);

		const res = await fetch(resolve_addReview,{
		    method:"PUT",
		    body:formData
		})
		.then(response =>response.text())
		.then(data =>{
		    if(data=="ok"){
                location.href=`/product/${artistId}/find-product/${productNo}`;
		    }
		}).catch(error=>console.log(error));
	});
});
