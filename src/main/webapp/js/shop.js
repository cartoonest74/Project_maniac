// TODO page number create
$(function(){
    const ShopMenu_Content = $("#shopMenuContent");

    const shop_menu_page = (data, review_limit)=>{
        let string_to_json = JSON.parse(data);
        let all_reviewCount = string_to_json.allCount;
        // review & qna tag data
        let tag_data = string_to_json.content;
        ShopMenu_Content.html(tag_data);
        // page 번호 처리
        const countNum = document.getElementById("shop_pageCount_num")
        if(all_reviewCount < 20){
            countNum.style.display="none";
            return '';
        }
        countNum.style.display="inline-block";

        const pageCount_num = $("#shop_pageCount_num")
        const arr_page = [];

        // page 5개씩
        const regular_pageLimit = 5;

        // 1 page = data n개
        const regular_pageDataLimit = 20;

        let page_increase= Math.floor(review_limit / 5) ? Math.floor(review_limit / 5) : 0

        // page_increase * n
        // n = 1p에 보여질 페이지 넘버 * 1p에 보여질 데이터 개수
        const remaining_reviewCount = all_reviewCount - (page_increase * 100)
        console.log(page_increase)

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

        // 한페이지에 보여질 개수 n개
        // all_reviewCount > prev_num * n;
        console.log("all_reviewCount=",all_reviewCount,"prev_num=", prev_num)
        if(all_reviewCount > prev_num * 20){
            page_tag = `<button id="d_lastPageId" class="info_nextPrev" type="button" data-last-page-id="${prev_num}">
                <i data-last-page-id="${prev_num}" class="fa-solid fa-angle-right fa-lg"></i></button>`
            arr_page.push(page_tag);
        }
        let create_tags = arr_page.join(" ");
        pageCount_num.html(create_tags)

        $('button[data-page-id='+review_limit+']').addClass("fontWeight_bold")
    }

    const first_view = (review_limit=0, onOff="on", category) => {
            let current_url = location.href;
            if(category != null){
                let findCategory_start = current_url.lastIndexOf("/")+1;
                let findCategory_end = current_url.lastIndexOf("?");
                let current_category = current_url.substring(findCategory_start,findCategory_end)
                current_url = current_url.replace(current_category, category.toLowerCase())
            }
            if(typeof(history.pushState)=='function' && onOff == "on"){
                current_url = current_url.replace(/\?page=([0-9]+)/ig,'')
                current_url += "?page="+(Number(review_limit)+1)
                history.pushState({page:review_limit},null,current_url)
            }

    		const SHOP_CONTROLLER_URL = current_url;
    		// 한페이지에 보여질 개수 n개
    		// review_limit * n;
            let _pageData_limit = review_limit * 20;
    		$.ajax({
    			type: "post",
    			async: true,
    			url: SHOP_CONTROLLER_URL,
    			dataType: "text",
    			data: {
    				limit: _pageData_limit
    			},
    			success: function(data, textStatus) {
                    shop_menu_page(data,review_limit)
    			}
    		});
    		return;
    	}
//    뒤로가기, 앞으로 클릭시 이벤트
    window.onpopstate=function(event){
        let current_url = document.location;
        let review_limit = event.state.page;
        const onOff = "off";
        first_view(review_limit, onOff);
    }

// page number 클릭
    $(document).on("click","button[data-page-id]",function(e){
    	    let review_limit = $(e.target).attr("data-page-id")
            first_view(review_limit)
        });

    $(document).on("click","button[data-last-page-id]",function(e){
        let last_pageNum = $(e.target).attr("data-last-page-id")
        first_view(last_pageNum)
    });

// category click
    $(document).on("click","button[data-btn-category]",function(e){
        let category_title = $(e.target).attr("data-btn-category");
        category_title = category_title.toUpperCase();
        $(".shopEtc_headerTitle").html(category_title)
        first_view(0,"on",category_title)
    });

    first_view();
});

