$(function(){
    const obj_reviewParam = {
        page:0,
        categoryId:0,
        searchList:new Array()
    }
    const body_append =(position, tag)=>{
        const body = document.querySelector("body");
        body.insertAdjacentHTML(position,tag);
    }
    // create userReview tag
    const create_userReview_tag=(shopReviews)=>{
        let userReview_tag ="";
        if(shopReviews.length == 0){
            userReview_tag = `<div style="padding:10vh; font-size:1.5em;">
                작성한 상품후기가 없습니다.
            </div>`
            return;
        }
        shopReviews.forEach(str_json=>{
            const shopReview = JSON.parse(str_json);
            const reviewId = shopReview.id;
            const content = shopReview.content;
            const date = shopReview.date;
            const title = shopReview.title;
            const url = shopReview.url;
            const userId = shopReview.user_id;
            const userNo = shopReview.user_no;

            userReview_tag += `<div class="myReviewContainer">
                                      <dt class="myReviewDate">
                                          <h2>${date}</h2>
                                      </dt>
                                      <dd class="myReviewInfo">
                                          <div data-myReview-title="${reviewId}" class="reviewTitle">
                                              <h3>${title}</h3>
                                              <p data-myReview-userNo="${userNo}" style="font-size:0.8em; color:#918d8d; line-height:normal;">ID&#58;${userId}</p>
                                          </div>
                                          <div class="myReviewContent">
                                              <div class="reviewImg">
                                                  <img src="${url}" alt="${reviewId}">
                                              </div>
                                              <div data-myReview-text="${reviewId}" class="reviewText">
                                                  <p>${content}</p>
                                              </div>
                                          </div>
                                          <div class="myReviewOptionBtn">
                                              <button data-myReview-del="${reviewId}" type="button">Delete</button>
                                          </div>
                                      </dd>
                                  </div>`
        });
        return userReview_tag;
    }

    // TODO 상품후기 검색 조건
    const myReviewSearch = document.getElementById("myReviewSearch");
    myReviewSearch.addEventListener("click",function(){
        const searchList = obj_reviewParam.searchList;
        let create_searchContentTag = "";
        searchList.forEach(json_artist=>{
            const artist = JSON.parse(json_artist);
            const artist_id = artist.id;
            const artist_name = artist.name;
            create_searchContentTag += `<nav class="radio_item">
                                           <input type="radio" name="searchType" value="${artist_id}">
                                           <label for="${artist_id}">${artist_name}</label>
                                       </nav>`;
        });

        const create_searchTag = `
            <div id="searchType" class="searchTypeBox">
                    <div class="searchTypeContainer">
                        <header class="searchTypeHeader">
                            <button id="exitSearchType" type="button"><i class="fa-solid fa-xmark fa-lg" aria-hidden="true"></i></button>
                            <h2>분류</h2>
                        </header>
                        <div class="searchTypeContent">
                            <nav class="radio_item">
                                <input type="radio" name="searchType" value="0">
                                <label for="0">전체</label>
                            </nav>
                            ${create_searchContentTag}
                        </div>
                        <div class="searchTypeBtn">
                            <button id="searchType_btn" type="button">검색</button>
                        </div>
                    </div>
                </div>
        `;

        body_append("afterbegin",create_searchTag);
        const categoryId = obj_reviewParam.categoryId;
        document.querySelector(`input[type="radio"][value="${categoryId}"]`).checked = true;
    });

    // remove
    const remove_searchType=()=>{
        const searchType = document.querySelector("div#searchType");
        searchType.remove();
    }

    $(document).on("click","button#exitSearchType",function(){
        remove_searchType();
    });

    // search
    $(document).on("click","button#searchType_btn",async function(){
        const check_radio = document.querySelector('input[name="searchType"]:checked');
        const searchTypeName = document.getElementById("searchTypeName");
        const cr_value = check_radio.value;
        const cr_text = document.querySelector(`label[for="${cr_value}"]`).innerText;

        obj_reviewParam.categoryId = cr_value;
        searchTypeName.innerText = cr_text;
        const res = await post_review();
        remove_searchType();
    });

    // TODO page number
    const menu_page = (all_reviewCount, review_limit)=>{
        // page 번호 처리
        const countNum = document.getElementById("review_pageCount_num")
        if(all_reviewCount < 10){
            countNum.style.display="none";
            return '';
        }
        countNum.style.display="inline-block";

        const arr_page = [];

        // page 5개씩
        const regular_pageLimit = 5;

        // 1 page = data n개
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

        // 한 페이지에 보여질 목록 n개
        // all_reviewCount > prev_num * n
        if(all_reviewCount > prev_num *10){
            page_tag = `<button id="d_lastPageId" class="info_nextPrev" type="button" data-last-page-id="${prev_num}">
                <i data-last-page-id="${prev_num}" class="fa-solid fa-angle-right fa-lg"></i></button>`
            arr_page.push(page_tag);
        }
        let create_tags = arr_page.join(" ");
        countNum.innerHTML=create_tags;

        $('button[data-page-id='+review_limit+']').addClass("fontWeight_bold")
    }

    //    뒤로가기, 앞으로 클릭시 이벤트
    window.onpopstate= async function(event){
        let current_url = document.location;
        obj_reviewParam.page = Number(event.state.page)-1;
        obj_reviewParam.categoryId = event.state.category;

        const onOff = "off";
        const res = await post_review(onOff);
    }

    // page number 클릭
    $(document).on("click","button[data-page-id]",async function(e){
        let review_limit = $(e.target).attr("data-page-id")
        obj_reviewParam.page = review_limit;
        const res = await post_review();
    });

    $(document).on("click","button[data-last-page-id]",async function(e){
        let last_pageNum = $(e.target).attr("data-last-page-id")
        obj_reviewParam.page = last_pageNum;
        const res = await post_review();
    });

    // post_review
    const post_review = async(onOff="off")=>{
        const artist_id = obj_reviewParam.categoryId;
        const review_limit = obj_reviewParam.page;
        const resolve_postAdminReview = "/admin/main/review"
        const page_limit=Number(review_limit) * 10;

        let current_url = location.href;
        if(typeof(history.pushState)=='function' && onOff == "on"){
            current_url = current_url.replace(/\?page=([0-9]+)&category=([0-9]+)/ig,'')
            current_url += "?page="+(Number(review_limit)+1)+"&category="+(Number(categoryId))
            history.pushState({page:review_limit,category:categoryId},null,current_url)
        }

        const formData = new FormData();
        formData.append("categoryId",artist_id);
        formData.append("page",page_limit);

        const res = await fetch(resolve_postAdminReview,{
                method:"post",
                body:formData})
                .then(response=>response.json())
                .then(data=>{
                    const json_array = data.reviewList;
                    const all_reviewCount = data.allCount;
                    const userReview_tag = create_userReview_tag(json_array);
                    const reviewContainer = document.getElementById("reviewContainer");
                    // 검색타입 리스트
                    obj_reviewParam.searchList = data.searchList;
                    reviewContainer.innerHTML = userReview_tag;
                    menu_page(all_reviewCount,review_limit)
                }).catch(error=>console.log(error))
    }
    post_review();

    // delete
    $(document).on("click","[data-myReview-del]",async function(e){
        const reviewId = e.target.getAttribute("data-myReview-del");
        const resolve_delReview = `/admin/del_review`;
        const imgTag = document.querySelector(`img[alt="${reviewId}"]`)
        const imgUrl = imgTag.src.split("/img")[1]

        const formData = new FormData();
        formData.append("reviewId",reviewId);
        formData.append("imgUrl",imgUrl);

        const del_review = await fetch(resolve_delReview,{
                                    method:"DELETE",
                                    body:formData})
                                    .then(response=>response.text())
                                    .then(data=>console.log(data))
                                    .catch(error=>console.log(error));
        const res = await post_review();
    });
});