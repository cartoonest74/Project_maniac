$(function(){
    const second_resizeMenu_partBox = document.getElementById("second_resizeMenu_partBox");
    const first_resizeMenu_partBox = document.getElementById("first_resizeMenu_partBox");
    const resize_menu = document.getElementById("resize_menu");
    const resizeMenu_Btn = document.getElementById("resizeMenu_Btn");
    const resizeMenu_on = document.getElementById("resizeMenu_on");
    const resizeMenu_off = document.getElementById("resizeMenu_off");
    const shop_btn = document.querySelector("button[data-btn-hmtype=shop]");
    const $resizeMenu_Relative=document.getElementById("resizeMenuRelative");

    // animation
    const front_keyframes ={left:"0%"};
    const back_keyframes ={left:"-100%"};
    const options={
        delay:100,
        duration:400,
        easing:"linear",
        iterations:1,
        fill:"forwards"
    }

    const resize_menu_ON_btn_fn = () =>{
        $("#resize_menu").addClass("resizeMenu_1024");
        $("#resizeMenu_Btn").addClass("none");

        $("#resizeMenu_on").removeClass("inlineblock");
        $("#resizeMenu_on").addClass("none");

        $("#resizeMenu_off").removeClass("none");
        $("#resizeMenu_off").addClass("inlineblock");
        $("#resizeMenu_off").addClass("resizeMenu_Btn_off");

        $("#first_resizeMenu_partBox").removeClass('none');
    };

    const resize_menu_OFF_btn_fn = () =>{
        $("#first_resizeMenu_partBox").addClass('none');

        $("#resize_menu").removeClass("resizeMenu_1024");
        $("#resizeMenu_Btn").removeClass("none");

        $("#resizeMenu_off").addClass("none");
        $("#resizeMenu_off").removeClass("inlineblock");
        $("#resizeMenu_off").removeClass("resizeMenu_Btn_off");

        $("#resizeMenu_on").removeClass("none");
        $("#resizeMenu_on").addClass("inlineblock");

    };

    $resizeMenu_Relative.addEventListener("click",function(e){
        if(e.target.classList.contains("resizeMenu_Relative")){
           resize_menu_OFF_btn_fn();
        }
    });

    // first
    // resize menu on
    resizeMenu_on.addEventListener("click",function(){
        resize_menu_ON_btn_fn();
    });
    // resize menu off
    resizeMenu_off.addEventListener("click",function(){
        resize_menu_OFF_btn_fn();
    });

    // second
    second_resizeMenu_off.addEventListener("click",function(){

        second_resizeMenu_partBox.animate(back_keyframes,options);
        first_resizeMenu_partBox.animate(front_keyframes,options);

        second_resizeMenu_off.classList.add("none");
        second_resizeMenu_off.classList.remove("resizeMenu_Btn_off");
    });

    shop_btn.addEventListener("click",function(){
        second_resizeMenu_partBox.classList.remove('none');
        second_resizeMenu_partBox.animate(front_keyframes,options);
        first_resizeMenu_partBox.animate(back_keyframes,options);

        second_resizeMenu_off.classList.remove('none');
        second_resizeMenu_off.classList.add('resizeMenu_Btn_off');
    });
});