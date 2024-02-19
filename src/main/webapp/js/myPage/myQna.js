$(function(){
    const artistId = document.getElementById("artistId").value;
    const obj_reviewParam = {
        page:0,
        categoryId:0,
    }
    // create userReview tag
    const create_userReview_tag=(shopQnas)=>{
        let userReview_tag ="";
        if(shopQnas.length == 0){
            userReview_tag = `<div style="padding:10vh; font-size:1.5em;">
                작성한 상품문의가 없습니다.
            </div>`
            return;
        }
        shopQnas.forEach(str_json=>{
            const shopQna = JSON.parse(str_json);
            const reviewId = shopQna.id;
            const content = shopQna.content;
            const date = shopQna.date;
            const title = shopQna.title;

            userReview_tag += `<div class="myQnaContainer">
                                               <dt class="myQnaDate">
                                                   <h2>2014-02-17</h2>
                                                   <button data-myQna-del="" type="button"><i class="fa-solid fa-trash fa-lg"></i></button>
                                               </dt>
                                               <dd class="myQnaInfo">
                                                   <div class="QnaTitle">
                                                       <h3>Official Light Stick Special Edition</h3>
                                                       <span style="width:50px; font-size:1.3em; color:green;">대기중</span>
                                                   </div>
                                                   <div class="myQnaContent">
                                                       <div class="QnaText">
                                                           <p>good</p>
                                                       </div>
                                                   </div>
                                               </dd>
                                           </div>
                                           <div class="myQnaContainer">
                                               <dd class="reMyQnaInfo">
                                                   <div class="reQnaTitle">
                                                       <h3><i class="fa-solid fa-arrow-turn-up fa-rotate-90 fa-lg" aria-hidden="true"></i>RE:관리자</h3>
                                                       <span style="font-size:1.3em;">2024-02-14</span>
                                                   </div>
                                                   <div class="reMyQnaContent">
                                                       <div class="reQnaText">
                                                           <p>good</p>
                                                       </div>
                                                   </div>
                                               </dd>
                                           </div>`
        });
        return userReview_tag;
    }



 // TODO page number
    const menu_page = (all_reviewCount, review_limit)=>{
        // page 번호 처리
        const countNum = document.getElementById("qna_pageCount_num")
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

    // TODO post review
    const post_review= async (onOff="on")=>{
        const resolve_postReview = `/myPage/${artistId}/product_question`;
        const categoryId=obj_reviewParam.categoryId
        const review_limit= obj_reviewParam.page;
        const page_limit=Number(review_limit) * 10;

        const formData = new FormData();

        formData.append("category",categoryId);
        formData.append("page",page_limit);
        let current_url = location.href;
        if(typeof(history.pushState)=='function' && onOff == "on"){
            current_url = current_url.replace(/\?page=([0-9]+)&category=([0-9]+)/ig,'')
            current_url += "?page="+(Number(review_limit)+1)+"&category="+(Number(categoryId))
            history.pushState({page:review_limit,category:categoryId},null,current_url)
        }

        await axios.post(resolve_postReview,formData)
                    .then(response=>response.data)
                    .then(data=>{
                        const json_array = data.reviewList;
                        const all_reviewCount = data.allCount;
                        const userReview_tag = create_userReview_tag(json_array);

                        const reviewContainer = document.getElementById("QnaContainer");
                        reviewContainer.innerHTML = userReview_tag;
                        menu_page(all_reviewCount,review_limit)
                    }).catch(error=>console.log(error))
    };
    post_review();
    // delete
    $(document).on("click","[data-myQna-del]",async function(e){
        const reviewId = e.target.getAttribute("data-myQna-del");
        const resolve_delReview = `/myPage/${artistId}/del_review`;
        const formData = new FormData();
        formData.append("reviewId",reviewId);

        const del_review = await axios.delete(resolve_delReview,formData)
                                    .catch(error=>console.log(error));
        const res = await post_review();
    });
});