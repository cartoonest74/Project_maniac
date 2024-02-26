$(function(){
    let text = document.getElementById("main_typingText")
    let typewriter = new Typewriter(text, {
        loop: false,
    });
//    function get_today(){
//     let today = new Date();
//     const hour = today.getHours();
//     const minute = today.getMinutes();
//     console.log(hour)
//     console.log(minute)
//     return today;
//    }
//    get_today();
    typewriter.typeString('Search for your favorite artist')
        .pauseFor(2000)
        .start()

    // 실시간 검색 순위
    let rankContent_top = 0;
    function rank_callBack (){
        const rankContent = document.getElementById("RankContent");
        const rankContent_top_intervalNum = 40;
        const rankContent_top_finish = rankContent_top_intervalNum * 9

        rankContent_top = rankContent_top >= rankContent_top_finish ? 0 :rankContent_top + 40
        rankContent.style.top = `-${rankContent_top}px`;
        console.log(111);
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