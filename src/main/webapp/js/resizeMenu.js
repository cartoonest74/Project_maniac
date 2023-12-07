const live_window_size_fn = ()=>{

    var screen_width = screen.availWidth;
    var screen_height = screen.availHeight;
    var window_inwidth = window.innerWidth;

    if(window_inwidth < 1024){
    }
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

window.onresize =()=>{
    live_window_size_fn();
}

$(function(){

   $(document).mouseup(function(e){
        const $resizeMenu_Relative= $(".resizeMenu_Relative");
        if($resizeMenu_Relative.has(e.target).length == 0){
            resize_menu_OFF_btn_fn()
        }
    });

    // first
    $('#resizeMenu_on').click(function(){
        resize_menu_ON_btn_fn();
    });
    $('#resizeMenu_off').click(function(){
        resize_menu_OFF_btn_fn();
    });

    // second
    $('#second_resizeMenu_off').click(function(){
        $("#second_resizeMenu_partBox").animate({left:'-100%'},'slow');
        $("#first_resizeMenu_partBox").animate({left:'0%'},'slow');

        $("#second_resizeMenu_off").addClass('none');
        $("#second_resizeMenu_off").removeClass('resizeMenu_Btn_off');

        $("#second_resizeMenu_partBox").clearQueue();
    });

    $('button[data-btn-hmtype=shop]').off('click').on("click",function(){
        $("#second_resizeMenu_partBox").removeClass('none');
        $("#second_resizeMenu_partBox").animate({left:'0%'},'slow');

        $("#first_resizeMenu_partBox").animate({left:'-100%'},'slow');

        $("#second_resizeMenu_off").removeClass('none');
        $("#second_resizeMenu_off").addClass('resizeMenu_Btn_off');

        $("#second_resizeMenu_partBox").clearQueue();
        $("#first_resizeMenu_partBox").clearQueue();
    });
});