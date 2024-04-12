// TODO page number create
$(function(){
    // TODO CREATE discography tag
    const create_discographyTag =(modelObject)=>{
        let discography_tag = "";
        const artistId = document.getElementById("artistId");
        modelObject.forEach((model_json,i)=>{
            const artistAlbum = JSON.parse(model_json);
            const rowNum = artistAlbum.row_num;
            const album_href = `/about/${artistId}/discography/${rowNum}`;
            const albumSrc = artistAlbum.album_src;
            const albumName = artistAlbum.album_name;
            const albumDate = artistAlbum.album_date;
            discography_tag +=`<div class="discography_content">
                                    <a class="discography_img" href="${album_href}">
                                        <img src="${albumSrc}" alt="${albumName}">
                                    </a>
                                    <nav>
                                        <p class="content_name">${albumName}</p>
                                        <p class="content_date">${albumDate}</p>
                                    </nav>
                                </div>`
        });
        return discography_tag;
    }

    //TODO CREATE gallery tag
    const crate_galleryTag=(modelObject)=>{

        let galleryTag = "";

        modelObject.forEach((model_json,i)=>{
            const artistImg = JSON.parse(model_json);
            const artistImg_num = artistImg.row_num;
            const artistImg_src = artistImg.artist_src;
            galleryTag += `<div class="discography_content">
                            <button data-swiper-num="${i}" class="discography_img" type="button">
                                <img data-swiper-num="${i}" src="${artistImg_src}" alt="${artistImg_num}">
                            </button>
                        </div>`
        });

        return galleryTag;
    }

    const about_subMenu_page = (data, review_limit)=>{
        const AboutSubMenu_content = document.getElementById("aboutSubMenuContent");
        // 전체 게시물개수
        let all_reviewCount = data.allCount;
        const aboutMenu = data.about_menu;
        const modelObject = data.modelObject;
        const tag_data = aboutMenu=="gallery"? crate_galleryTag(modelObject):create_discographyTag(modelObject);

        // review & qna tag data
        AboutSubMenu_content.innerHTML=tag_data;
        // page 번호 처리
        const countNum = document.getElementById("aboutSubMenu_pageCount_num");
        if(all_reviewCount < 10){
            countNum.style.display="none";
            return '';
        }
        countNum.style.display="inline-block";

        const pageCount_num = document.getElementById("aboutSubMenu_pageCount_num");
        const arr_page = [];

        // page 5개씩
        const regular_pageLimit = 5;

        // 1 page = 보여질 게시물 data 10개
        const regular_pageDataLimit = 10;
        // Math.floor(review_limit / 5) 0 이면 0 아닐경우 Math.floor(review_limit / 5)
        let page_increase= Math.floor(review_limit / 5) ? Math.floor(review_limit / 5) : 0
        // 현재 게시물 페이징에서 남은 전체 게시물 개수
        const remaining_reviewCount = all_reviewCount - (page_increase * 50)


        // 현재 총 페이징 개수
        let pageCount =  remaining_reviewCount / regular_pageDataLimit;
        let floor_pageCount = Math.floor(pageCount)
        let ceil_pageCount = Math.ceil(pageCount)
        // floor_pageCount 0일경우 ceil_pageCount 아닐경우 floor_pageCount
        let review_pageCount = floor_pageCount ? floor_pageCount : ceil_pageCount
        // 보여질 페이징 개수
        let review_page = review_pageCount > 5 ? 5 : review_pageCount

        //페이징 시작넘버
        let prev_num = regular_pageLimit * page_increase

        // 남아있는 게시물 전체 개수가 regular_pageDataLimit * 5 이하일 경우
        // 현재 총 페이징 개수 올림한값으로 변경
        if(regular_pageDataLimit * 5 >= remaining_reviewCount){
            review_page = ceil_pageCount
        }

        let page_tag = '';
        // left(<) 페이징 btn
        if(all_reviewCount > remaining_reviewCount){
            page_tag = `<button class="info_nextPrev" type="button" data-last-page-id="${prev_num-1}">
                            <i data-last-page-id="${prev_num-1}" class="fa-solid fa-angle-left fa-lg"></i>
                        </button>`
            arr_page.push(page_tag);
        }
        // 페이징 넘버
        for(let i = 0; i < review_page; i++){
            page_tag =`<button type="button" data-page-id="${prev_num}" class="info_pageNum">${prev_num+1}</button>`
            arr_page.push(page_tag);
            prev_num++
        }
        // right(>) 페이징 btn
        if(all_reviewCount > prev_num *10){
            page_tag = `<button id="d_lastPageId" class="info_nextPrev" type="button" data-last-page-id="${prev_num}">
                <i data-last-page-id="${prev_num}" class="fa-solid fa-angle-right fa-lg"></i></button>`
            arr_page.push(page_tag);
        }
        let create_tags = arr_page.join(" ");
        pageCount_num.innerHTML=create_tags;

        document.querySelector(`button[data-page-id='${review_limit}']`).classList.add('fontWeight_bold');
//        $('button[data-page-id='+review_limit+']').addClass("fontWeight_bold")
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

            const formData =new FormData();
            formData.append("limit",_pageData_limit);

            const res = await fetch(REVIEW_CONTROLLER_URL,{
                                    method:"post",
                                    body:formData
                                })
                                .then(response=>response.json())
                                .then(data=>about_subMenu_page(data,review_limit))
                                .catch(error=>console.log(error));
    		return;
    }
//   브라우저 뒤로가기, 앞으로 클릭시 이벤트
    window.onpopstate=async function(event){
        let review_limit = event.state.page;
        const onOff = "off";
        first_view(review_limit, onOff);
    }

// page number 클릭
    $(document).on("click","button[data-page-id]",async function(e){
    	    let review_limit = $(e.target).attr("data-page-id")
            first_view(review_limit)
        });

    $(document).on("click","button[data-last-page-id]",async function(e){
        let last_pageNum = $(e.target).attr("data-last-page-id")
        first_view(last_pageNum)
    });
    first_view();
});
