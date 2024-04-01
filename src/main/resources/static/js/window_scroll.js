$(function(){
    let currentScene = 0;
    let yOffset =0;
    let prevScrollHeight = 0;
    window.addEventListener("scroll",()=>{
        yOffset = window.scrollY
        const hiddenMenu_noneLine = document.querySelector("#hiddenMenu_noneLine");
        const hiddenMenu_line = document.querySelector("#hiddenMenu_line");
        const appear_hiddenMenu_val = hiddenMenu_line.offsetHeight + hiddenMenu_noneLine.offsetHeight + 140

        const stickyInfo=document.querySelector("#stickyInfo")
        let keyframes =[
                {opacity:0, transform: "translate(0,10px)"},
                {opacity:0.2, transform: "translate(0,2px)"},
                {opacity:1, transform: "translate(0,0)"}
            ];
        let options={
                delay:100,
                duration: 1000,
                easing: "ease-in",
                iterations: 1,
                fill: "forwards"
            }
        if(yOffset > appear_hiddenMenu_val){
            stickyInfo.animate(keyframes, options)
        }else{
        }
    });
});