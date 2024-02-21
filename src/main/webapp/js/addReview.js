/**
 * add review
 */

$(function() {
	const PREVIEW_IMG = "#previewImg";
	const PREVIEW_NAME = "#previewName";
	const PREVIEW_REMOVE = "#previewRemove";
    const ARTIST_ID =$("#shopInfoCategory").attr("data-artistId");
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
		const READER = new FileReader();
		const REVIEWIMGFILE_VAL = document.getElementById("reviewImgFile").value;
		const REVIEWIMGFILE_VALS = REVIEWIMGFILE_VAL.split('\\');
		const REVIEWIMGFILE_NAME = REVIEWIMGFILE_VALS[REVIEWIMGFILE_VALS.length - 1].trim();
		const IMAGE_REG = /(.*?)\.(jpg|jpeg|png|gif|bmp)$/;
		const IMG_SIZE = Math.floor(FILE.size/1024);
		
		if (!IMAGE_REG.test(REVIEWIMGFILE_VALS)) {
			alert("use only img Format!!");
			return;
		}
		
		if(IMG_SIZE > 100){
			alert("Over Size 100MB!!");
			return;			
		}
		READER.onload = function(e) {
			$("#previewImg").attr("src", e.target.result);
			$("#previewName").text(REVIEWIMGFILE_NAME);
			tag_visible(PREVIEW_IMG, ON);
			tag_visible(PREVIEW_NAME, ON);
			tag_visible(PREVIEW_REMOVE, ON);
		}
		READER.readAsDataURL(FILE);
	});

	const tag_visible = (tagid, visible) => {
		if (visible == "on") {
			$(tagid).removeClass("none");
			$(tagid).addClass("inlineblock");
			return;
		}
		if (visible == "off") {
			$(tagid).removeClass("inlineblock");
			$(tagid).addClass("none");
			return;
		}
	}

	document.getElementById("sendBtn_qna").addEventListener("click",async function(){
		const reviewImgFile_val = document.getElementById("reviewImgFile").value;
		const TEXTAREA_ID_val = document.getElementById("qnaText").value;
		const product_artistId = document.querySelector('input[name="artistId"]').value;
		const productNo = document.querySelector('input[name="productNo"]').value;
		const REG_TEXT = /[a-zA-Z가-힣ㄱ-ㅎ!\\.~]+/g;
        const WriterQnaForm = document.getElementById("WriterQnaForm");

		if (reviewImgFile_val.length <= 1) {
			alert("이미지를 첨부해주세요");
			return;
		}

		if (!REG_TEXT.test(TEXTAREA_ID_val)) {
			alert("글자를 작성!!!");
			return;
		}
		if (!TEXTAREA_ID_val.trim().length >= 10) {
			alert("10자 이상 작성!!!");
			return;
		}

		WriterQnaForm.submit();
	});
});