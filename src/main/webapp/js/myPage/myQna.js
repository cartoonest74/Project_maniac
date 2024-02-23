$(function(){
    const artistId = document.getElementById("artistId").value;
    const obj_qnaParam = {
        page:0,
        categoryId:0,
        searchList:new Array()
    }

    // create userReview tag
    const create_userReview_tag=(shopQnas)=>{
        let userReview_tag ="";
        if(shopQnas.length == 0){
            userReview_tag = `<div style="text-align:center; padding:10vh; font-size:1.5em;">
                작성한 상품문의가 없습니다.
            </div>`
            return userReview_tag;
        }
        shopQnas.forEach(str_json=>{
            const shopQna = JSON.parse(str_json);
            const qnaId = shopQna.writer_id;
            const title = shopQna.title;
            const content = shopQna.content;
            const date = shopQna.date;
            const answer_check = shopQna.answer_check;

            // true 답장 O
            // false 답장 x
            if(Boolean(answer_check)){
                const rootDate = shopQna.root_date;
                const rootContent = shopQna.root_content;
                userReview_tag += `<div class="myQnaContainer">
                                       <dt class="myQnaDate">
                                           <h2>${date}</h2>
                                           <button data-myqna-del="${qnaId}" type="button">
                                                <i data-myqna-del="${qnaId}" class="fa-solid fa-trash fa-lg"></i>
                                           </button>
                                       </dt>
                                       <dd class="myQnaInfo">
                                           <div class="QnaTitle">
                                               <h3>${title}</h3>
                                               <span style="width:50px; font-size:1.3em; color:#4ec7e9;">답변완료</span>
                                           </div>
                                           <div class="myQnaContent">
                                               <div class="QnaText">
                                                   <p>${content}</p>
                                               </div>
                                           </div>
                                       </dd>
                                   </div>
                                   <div class="myQnaContainer">
                                       <dd class="reMyQnaInfo">
                                           <div class="reQnaTitle">
                                               <h3><i class="fa-solid fa-arrow-turn-up fa-rotate-90 fa-lg" aria-hidden="true"></i>RE:관리자</h3>
                                               <span style="font-size:1.3em;">${rootDate}</span>
                                           </div>
                                           <div class="reMyQnaContent">
                                               <div class="reQnaText">
                                                   <p>${rootContent}</p>
                                               </div>
                                           </div>
                                       </dd>
                                   </div>
                                   `;
            }else{
                userReview_tag += `<div class="myQnaContainer">
                                       <dt class="myQnaDate">
                                           <h2>${date}</h2>
                                           <button data-myqna-del="${qnaId}" type="button">
                                                <i data-myqna-del="${qnaId}" class="fa-solid fa-trash fa-lg"></i>
                                           </button>
                                       </dt>
                                       <dd class="myQnaInfo">
                                           <div class="QnaTitle">
                                               <h3>${title}</h3>
                                               <span style="width:50px; font-size:1.3em; color:green;">대기중</span>
                                           </div>
                                           <div class="myQnaContent">
                                               <div class="QnaText">
                                                   <p>${content}</p>
                                               </div>
                                           </div>
                                       </dd>
                                   </div>`;
            }
        });
        return userReview_tag;
    }
    const body_append = (position, tag) =>{
        const body = document.querySelector("body");
        body.insertAdjacentHTML(position, tag);
    }

    // searchType box열기
    const myQnaSearch = document.getElementById("myQnaSearch");
    myQnaSearch.addEventListener("click",function(){
        const searchList = obj_qnaParam.searchList;
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
        const categoryId = obj_qnaParam.categoryId;
        document.querySelector(`input[type="radio"][value="${categoryId}"]`).checked = true;
    });

    const remove_searchType=()=>{
        const searchType = document.querySelector("div#searchType");
        searchType.remove();
    }

    // search
    $(document).on("click","button#searchType_btn",async function(){
        const check_radio = document.querySelector('input[name="searchType"]:checked');
        const searchTypeName = document.getElementById("searchTypeName");
        const cr_value = check_radio.value;
        const cr_text = document.querySelector(`label[for="${cr_value}"]`).innerText;

        obj_qnaParam.categoryId = cr_value;
        searchTypeName.innerText = cr_text;

        const res = await post_review();
        remove_searchType();
    });
    // exit Search type box
    $(document).on("click","button#exitSearchType",function(){
        remove_searchType();
    });


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
        obj_qnaParam.page = Number(event.state.page)-1;
        obj_qnaParam.categoryId = event.state.category;

        const onOff = "off";
        const res = await post_review(onOff);
    }

    // page number 클릭
    $(document).on("click","button[data-page-id]",async function(e){
        let review_limit = $(e.target).attr("data-page-id")
        obj_qnaParam.page = review_limit;
        const res = await post_review();
    });

    $(document).on("click","button[data-last-page-id]",async function(e){
        let last_pageNum = $(e.target).attr("data-last-page-id")
        obj_qnaParam.page = last_pageNum;
        const res = await post_review();
    });

    // TODO post review
    const post_review= async (onOff="on")=>{
        const resolve_postQna = `/myPage/${artistId}/product_question`;
        const categoryId=obj_qnaParam.categoryId
        const review_limit= obj_qnaParam.page;
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
        await axios.post(resolve_postQna,formData)
                    .then(response=>response.data)
                    .then(data=>{
                        const json_array = data.qnaList;
                        const all_reviewCount = data.allCount;
                        const userReview_tag = create_userReview_tag(json_array);
                        obj_qnaParam.searchList = data.searchList;
                        const reviewContainer = document.getElementById("QnaContainer");
                        reviewContainer.innerHTML = userReview_tag;
                        menu_page(all_reviewCount,review_limit)
                    }).catch(error=>console.log(error))
    };
    post_review();

    // delete
    $(document).on("click","button[data-myqna-del]",async function(e){
        const qnaId = e.target.getAttribute("data-myqna-del");
        const resolve_delQna = `/myPage/${artistId}/del_qna`;
        const formData = new FormData();
        formData.append("qnaId",qnaId);

        const del_review = await axios.delete(resolve_delQna,{
            params:{qnaId:Number(qnaId)}
        }).then(response=>response.data)
        .then(data=>console.log(data))
        .catch(error=>console.log(error));

        const res = await post_review();
    });
});