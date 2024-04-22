// TODO page number create
$(function(){

    const create_noticeTag=(jArray_notice)=>{
        let noticeTag = "";
        jArray_notice.forEach(val=>{
            const notices = JSON.parse(val);
            console.log(notices)
            const notice_id = notices.id;
            const notice_artistId = notices.artist_id;
            const notice_category = notices.category;
            const notice_title = notices.title;
            const notice_date = notices.date;

            const location_noticeView =`/main/${notice_artistId}/notice/view?noticeId=${notice_id}`;

            noticeTag +=`<li class="notice_menu">
                             <a href="${location_noticeView}">
                                 <nav>${notice_category}</nav>
                                 <nav>${notice_title}</nav>
                                 <nav>${notice_date}</nav>
                             </a>
                        </li>`;

        });

        return noticeTag;

    }

    const notice_menu_page = (data, review_limit)=>{
        let all_reviewCount = data.allCount;
        let jArray_notice = data.notice_list;
        console.log(jArray_notice)
        // notice tag
        let tag_data = create_noticeTag(jArray_notice);
        const NoticeMenu_Content = document.getElementById("noticeMenuContent");
        NoticeMenu_Content.innerHTML=tag_data;

        //TODO page 번호 처리
        const countNum = document.getElementById("notice_pageCount_num")
        if(all_reviewCount < 10){
            countNum.style.display="none";
            return '';
        }
        countNum.style.display="inline-block";

        const pageCount_num = $("#notice_pageCount_num")
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

        $('button[data-page-id='+review_limit+']').addClass("fontWeight_bold")
    }

    const first_view = async (review_limit=0, onOff="on") => {

        let current_url = location.href;
        if(typeof(history.pushState)=='function' && onOff == "on"){
            current_url = current_url.replace(/\?page=([0-9]+)/ig,'')
            current_url += "?page="+(Number(review_limit)+1)
            history.pushState({page:review_limit},null,current_url)
        }

        const REVIEW_CONTROLLER_URL = current_url;
        let _pageData_limit = review_limit * 10;

        const formData = new FormData();
        formData.append("limit",_pageData_limit);

        const res = await fetch(REVIEW_CONTROLLER_URL,{
            method: "post",
            body:formData
            }).then(response=>response.json())
            .then(data=>{
                notice_menu_page(data,review_limit)
            }).catch(error=>console.log(error));
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
});
