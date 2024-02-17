/**
 * shopInfo 서브 이미지 내용 부분
 */

$(function() {
	const PRODUCT_NO = $("input[data-artistId]").val();
	const CONTEXTPATH = $("#contextPath").val();
	const SHOPINFO_BOARDCONTENT = $("#shopInfo_boardContent");
	const ARTIST_ID =$("input[data-artistId]").attr("data-artistId");

    // resolve
	const resolve_view_review = `/product-review/${ARTIST_ID}/view-review`
	const resolve_view_qna= `/product-qna/${ARTIST_ID}/view-qna`
	const resolve_view_addQna = `/product-qna/${ARTIST_ID}/view-addQna`
	const resolve_view_addReview = `/product-review/${ARTIST_ID}/view-addReview`

	// review * qna menu btn
	const SHOPINFO_REVIEW ="#shopInfo_review";
	const SHOPINFO_QNA ="#shopInfo_qa";

	// review & qna add btn
	const SHOP_QNA_ADD_BTN = "#shopInfo_createQna";
	const SHOP_REVIEW_ADD_BTN = "#shopInfo_createReview";

	const ON = "on";
	const OFF = "off";

	// review * qna add form
	const ADD_FORM = $("#add_form");

    // TODO page number create
    const qna_review_page = (data, review_limit)=>{
        let string_to_json = JSON.parse(data);
        let all_reviewCount = string_to_json.allCount;
        // review & qna tag data
        let tag_data = string_to_json.content;
        SHOPINFO_BOARDCONTENT.html(tag_data);

        // page 번호 처리
        const countNum = document.getElementById("pageCount_num")
        if(all_reviewCount < 10){
            countNum.style.display="none";
            return '';
        }
        countNum.style.display="inline-block";

        const pageCount_num = $("#pageCount_num")
        const arr_page = [];

        // page 5개씩
        const regular_pageLimit = 5;

        // 1 page = data 10개
        const regular_pageDataLimit = 10;

        let page_increase= Math.floor(review_limit / 5) ? Math.floor(review_limit / 5) : 0

        const remaining_reviewCount = all_reviewCount - (page_increase * 50)


        // page 개수
        let pageCount =  remaining_reviewCount / regular_pageDataLimit;
        let floor_pageCount = Math.floor(pageCount)
        let ceil_pageCount = Math.ceil(pageCount)
        let review_pageCount = floor_pageCount ? floor_pageCount : ceil_pageCount
        let review_page = review_pageCount > 5 ? 5 : review_pageCount

        let prev_num = regular_pageLimit * page_increase

        if(regular_pageDataLimit * 5 >= remaining_reviewCount){
            review_page = ceil_pageCount
        }

        let page_tag = '';
        if(all_reviewCount > remaining_reviewCount){
            page_tag = `<button class="info_nextPrev" type="button" data-last-page-id="${prev_num-1}">
                            <i data-last-page-id="${prev_num-1}" class="fa-solid fa-angle-left fa-lg"></i>
                        </button>`
            arr_page.push(page_tag);
        }

        for(let i = 0; i < review_page; i++){
            page_tag =`<button type="button" data-page-id="${prev_num}" class="info_pageNum">${prev_num+1}</button>`
            arr_page.push(page_tag);
            prev_num++
        }
        if(all_reviewCount > prev_num *10){
            page_tag = `<button id="d_lastPageId" class="info_nextPrev" type="button" data-last-page-id="${prev_num}">
                <i data-last-page-id="${prev_num}" class="fa-solid fa-angle-right fa-lg"></i></button>`
            arr_page.push(page_tag);
        }
        let create_tags = arr_page.join(" ");
        pageCount_num.html(create_tags)
    }

	const visible_tag = (tagId, status) => {
		if (status == "on") {
			$(tagId).removeClass("none");
			$(tagId).addClass("inlineblock");
			return;
		}
		$(tagId).removeClass("inlineblock");
		$(tagId).addClass("none");
	};
	
	const change_bgColor = (tagId, status) =>{
		if (status == "on") {
			$(tagId).removeClass("bgWcolorB");
			$(tagId).addClass("bgBcolorW");
			return;
		}
		$(tagId).removeClass("bgBcolorW");
		$(tagId).addClass("bgWcolorB");
	}

	const first_view = (review_limit=0) => {
		const REVIEW_CONTROLLER_URL = CONTEXTPATH.concat(resolve_view_review);
        let _pageData_limit = review_limit * 10;
		$.ajax({
			type: "post",
			async: true,
			url: REVIEW_CONTROLLER_URL,
			dataType: "text",
			data: {
				productNo: PRODUCT_NO,
				limit: _pageData_limit
			},
			success: function(data, textStatus) {
                qna_review_page(data,review_limit)
				visible_tag(SHOP_QNA_ADD_BTN, OFF);
				visible_tag(SHOP_REVIEW_ADD_BTN, ON);
				change_bgColor(SHOPINFO_QNA, OFF);

				change_bgColor(SHOPINFO_REVIEW, ON);
			}
		});
		return;
	}
    first_view();

	//  Q&A
	$("#shopInfo_qa").click(function() {
		let _qna_limit = 0;
		let _pageData_limit = _qna_limit * 10;
		const QNA_CONTROLLER_URL = CONTEXTPATH.concat(resolve_view_qna);
		$.ajax({
			type: "post",
			async: true,
			url: QNA_CONTROLLER_URL,
			dataType: "text",
			data: {
				productNo: PRODUCT_NO,
				limit: _pageData_limit
			},
			success: function(data, textStatus) {
                qna_review_page(data)
				visible_tag(SHOP_REVIEW_ADD_BTN, OFF);
				visible_tag(SHOP_QNA_ADD_BTN, ON);
				change_bgColor(SHOPINFO_REVIEW, OFF);
				

				change_bgColor(SHOPINFO_QNA, ON);

			}
		});
	});

	// Review
	$("#shopInfo_review").click(function() {
		first_view();
	});

    $(document).on("click","button[data-page-id]",function(e){
	    let review_limit = $(e.target).attr("data-page-id")
        first_view(review_limit)
    });

    $(document).on("click","button[data-last-page-id]",function(e){
        let last_pageNum = $(e.target).attr("data-last-page-id")
        first_view(last_pageNum)
    });

	const loginAfter_addBtn_visible=()=>{

		const loginUserId_tag =document.querySelector("[data-login]");
		const login_exist = document.body.contains(loginUserId_tag);
		if(! login_exist){
			alert("로그인후 이용가능");
			return false;
		}
		return true;
	}
	
	$(document).on("click","button[class=shopInfo_qna_re_btn]",function(){
		alert("관리자만 작성가능");
	});

	// add review
	$("#shopInfo_createQna").click(function() {
		if(! loginAfter_addBtn_visible()){
			return;	
		};
		
		const CREATE_QNAURL = CONTEXTPATH.concat(resolve_view_addQna);
		ADD_FORM.attr("action", CREATE_QNAURL.trim());
		ADD_FORM.submit();
	});
	// add qna
	$("#shopInfo_createReview").click(function() {
		if(! loginAfter_addBtn_visible()){
			return;	
		};
		
		const CREATE_REVIEWURL = CONTEXTPATH.concat(resolve_view_addReview);
		ADD_FORM.attr("action", CREATE_REVIEWURL.trim());
		ADD_FORM.submit();
	});
});