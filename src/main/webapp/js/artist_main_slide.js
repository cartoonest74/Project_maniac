const swiper = new Swiper('.swiper-container', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    speed:500,
    slidePerView:2,
    autoplay:{
        delay:2500,
        disableOnInteraction: false,
    },
    // If we need pagination
    pagination:{
        el: '.swiper-pagination',
        type:'bullets',
        clickable:true
    },
    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    // And if we need scrollbar
    scrollbar: {
        hide:true
    }
});

$(".swiper-container").mouseover(function(){
    swiper.autoplay.stop();
});
$(".swiper-container").mouseout(function(){
    swiper.autoplay.start();
});