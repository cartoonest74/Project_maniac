$(function(){
    const text = document.getElementById("main_typingText");
    const typewriter = new Typewriter(text, {
        loop: false,
    });
    const reset_obj = {resetDate:""};

    const popupExitBtn= document.getElementById("popupExitBtn");
    popupExitBtn.addEventListener("click",function(){
        const popup = document.getElementById("popup");
        popup.remove()
    });

    typewriter.typeString('Search for your favorite artist')
        .pauseFor(2000)
        .start();

    // 실시간 검색 순위
    let rankContent_top = 0;
    async function rank_callBack (){
        const rankContent = document.getElementById("RankContent");
        const rankContent_top_intervalNum = 40;
        const rankContent_top_finish = rankContent_top_intervalNum * 9
        const rankDate_tag = document.getElementById("rankDate");

        const today = new Date();
        const year = today.getFullYear();

        let month = (today.getMonth()+1).toString();
        month = month.length==1? "0"+month:month;

        let date = today.getDate().toString();
        date = date.length==1? "0"+date:date;

        const hours = today.getHours();

        const today_date = `${year}/${month}/${date}`
        const resolve_rankReset = `/search-reset?today_date="${today_date}"`;

        // rank top position 값이 전체 rank box 높이 값 이상이면 0으로 초기화
        // 그렇지 않을 경우 40씩 top position 값이 증가
        rankContent_top = rankContent_top >= rankContent_top_finish ? 0 :rankContent_top + 40
        rankContent.style.top = `-${rankContent_top}px`;
        // return already reset;
        if(reset_obj.resetDate == today_date){
            return;
        }

        // 18시 기준으로 아티스트 조회수 초기화 시킨후 업데이트
        if(hours == 18){
            await fetch(resolve_rankReset,{method:"put"})
            .then(response=>response.text())
            .then(data=>{
                // 업데이트 시간 rankDate_tag에 표시
                const res_date = data.replace(/[\'"']/g,"");
                reset_obj.resetDate=res_date;
                rankDate_tag.innerText=res_date+" 18:00"
            })
            .catch(error=>console.log(error));
        }
    }

    const rank_interval_time = 5000
    let main_rank_interval = setInterval(rank_callBack,rank_interval_time)

    $(document).on("click",'button[data-rank-btn]',function(e){
        const rank_class_val = $(e.target).attr("data-rank-btn");
        const $rankBtn =$("button[data-rank-btn]");
        const rankContentBox = document.getElementById("RankContentBox");
        const rankContent = document.getElementById("RankContent")

        if(rank_class_val.includes("open")){
            rankContent.classList.remove("transition3s")
            clearInterval(main_rank_interval);
            $rankBtn.html(`<i data-rank-btn="close" class="fa-solid fa-chevron-down fa-rotate-180 fa-lg"></i>`)
            rankContentBox.classList.remove('rankContentClose');
            rankContent.style.top ="0px";
        }else{
            $rankBtn.html(`<i data-rank-btn="open" class="fa-solid fa-chevron-down fa-lg"></i>`)
            rankContentBox.classList.add('rankContentClose');

            rankContent.classList.add('transition3s');
            rankContent.style.top = `-${rankContent_top}px`;

            main_rank_interval = setInterval(rank_callBack,rank_interval_time);
        }
    })
});