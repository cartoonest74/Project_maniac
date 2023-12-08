$(function(){
    let currentScene = 0;
    let yOffset =0;
    let prevScrollHeight = 0;
    window.addEventListener("scroll",()=>{
        yOffset = window.scrollY
        const hiddenMenu_noneLine = document.querySelector("#hiddenMenu_noneLine");
        const hiddenMenu_line = document.querySelector("#hiddenMenu_line");
        const appear_hiddenMenu_val = hiddenMenu_line.offsetHeight + hiddenMenu_noneLine.offsetHeight + 140
        if(yOffset > appear_hiddenMenu_val){
            $("#stickyInfo").removeClass("none")
        }else{
            $("#stickyInfo").addClass("none")
        }
    });
});