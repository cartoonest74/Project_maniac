$(function(){
    const LikeMenu_Content = $("#LikeMenu_Content");

    // page number
    const like_menu_page = (data, review_limit)=>{
        let string_to_json = JSON.parse(data);
        let all_reviewCount = string_to_json.allCount;
        console.log(all_reviewCount)
        // review & qna tag data
        let tag_data = string_to_json.content;
        LikeMenu_Content.html(tag_data);
        // page 번호 처리
        const countNum = document.getElementById("like_pageCount_num")
        if(all_reviewCount < 10){
            countNum.style.display="none";
            return '';
        }
        countNum.style.display="inline-block";

        const pageCount_num = $("#like_pageCount_num")
        const arr_page = [];

        // page 5개씩
        const regular_pageLimit = 5;

        // 1 page = data n개
        const regular_pageDataLimit = 20;

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

        // 한 페이지에 보여질 목록 n개
        // all_reviewCount > prev_num * n
        if(all_reviewCount > prev_num *20){
            page_tag = `<button id="d_lastPageId" class="info_nextPrev" type="button" data-last-page-id="${prev_num}">
                <i data-last-page-id="${prev_num}" class="fa-solid fa-angle-right fa-lg"></i></button>`
            arr_page.push(page_tag);
        }
        let create_tags = arr_page.join(" ");
        pageCount_num.html(create_tags)

        $('button[data-page-id='+review_limit+']').addClass("fontWeight_bold")
    }

    const first_view = (review_limit=0, onOff="on") => {
            // click category id
            let _categoryId = 0;
            $("button[data-like-category]").each(function(e){
                let SelectCategory = $(this).hasClass("select_categoryColor");
                if(SelectCategory){
                    _categoryId = $(this).attr("data-like-category");
                    return _categoryId;
                }
            });

            let current_url = location.href;
            if(typeof(history.pushState)=='function' && onOff == "on"){
                current_url = current_url.replace(/\?page=([0-9]+)/ig,'')
                current_url += "?page="+(Number(review_limit)+1)
                history.pushState({page:review_limit},null,current_url)
            }
            const REVIEW_CONTROLLER_URL = current_url;
            // 한 페이지에 보여질 목록 n개
            // review_limit * n
            let _pageData_limit = review_limit * 20;
            $.ajax({
                type: "post",
                async: true,
                url: REVIEW_CONTROLLER_URL,
                dataType: "text",
                data: {
                    limit: _pageData_limit,
                    categoryId: _categoryId
                },
                success: function(data, textStatus) {
                    like_menu_page(data,review_limit)
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
    first_view();

    // like category
    $(document).on("click","button[data-like-category]",function(e){
        const categoryId = $(e.target).attr("data-like-category");
        $("button[data-like-category]").removeClass("select_categoryColor");
        $('input[name="all"]').prop("checked",false)
        $(e.target).addClass("select_categoryColor");
        first_view()
    });

    // check
    $(document).on("click","input[type=checkbox]",function(e){
        const check_name = $(e.target).attr("name");
        const is_check = $(e.target).is(":checked");
        if(check_name == "all"){
            is_check? $("input:checkbox").prop("checked",true): $("input:checkbox").prop("checked",false);
        }
    });

    // delete
    const likeDel_btn = document.getElementById("likeDel");
    likeDel_btn.addEventListener("click",(e)=>{
        const like_json = new Object();
        const arr_check = [];
        const is_likeDel = window.confirm("선택하신 목록을 삭제하시겠습니까?");
        const DelLikeMapping = "/del-like";
        if(! is_likeDel){
            return "";
        }
        $("input[data-check-product]").each(function(i){
            const is_delCheck = $(this).is(":checked");
            if(is_delCheck){
                let true_checkName = $(this).attr("data-check-product");
                arr_check.push({"productId":Number(true_checkName)})
            }
        });
        like_json.like = arr_check
        const _strLike_json = JSON.stringify(like_json);
        console.log(_strLike_json)
        $.ajax({
            type:"DELETE",
            async:true,
            url:DelLikeMapping,
            dataType:"text",
            data:{
                like_json:_strLike_json
            },
            success: function(data, status){
                // all check init
                $('input[name="all"]').prop("checked",false)
                // category 재정비
                $("#Like_category").html(data);
                first_view()
            }
        });
    });

});