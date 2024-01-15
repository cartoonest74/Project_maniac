window.onload =function(){
    const create_aboutImage_contentTag = (num,src,alt)=>{
        let aboutImage_windowContent =`<div data-swiper-slide="${num}" class="swiper-slide">
                                            <img src="${src}" alt="${alt}">
                                        </div>`
        return aboutImage_windowContent;
    }
    const create_aboutImage_windowTag=()=>{
        const data_about_artistImg = document.querySelectorAll("img[data-about-artistImg]");

        let aboutImage_windowTag=`<div id="aboutImage_Window" class="about_imageWindow">
                                    <div class="swiper mySwiper">
                                        <div class="swiper-wrapper">`;

        let aboutImage_windowContent ="";
        data_about_artistImg.forEach((item,i)=>{
            const num = i + 1;
            const src = item.getAttribute("src");
            const alt = item.getAttribute("alt");
            aboutImage_windowContent += create_aboutImage_contentTag(num, src, alt)
        });
        aboutImage_windowTag += aboutImage_windowContent;
        aboutImage_windowTag +=`</div>
                                    </div>
                                    <button id="aiwExit" class="aiw_exit" type="button">
                                        <i class="fa-solid fa-x"></i>
                                    </button>
                                </div>`;
        return aboutImage_windowTag;
    }

    function body_append(position, text){
        const body = document.querySelector("body");
        body.insertAdjacentHTML(position,text);
    }

    $(document).on("click","button[data-about-artistImg]",function(e){
        const arr_artistImgs = document.querySelectorAll("button[data-about-artistImg]")
        const artistImg_num = $(e.target).attr("data-about-artistImg");
        const aboutImage_windowTag = create_aboutImage_windowTag();
        body_append("afterbegin",aboutImage_windowTag)
        const swiper = new Swiper(".mySwiper", {
            spaceBetween:30
            // navigation: {
            //     nextEl: ".swiper-btn-next",
            //     nextEl: ".swiper-btn-prev",
            //     nextEl: ".swiper-btn-active",
            //     prevEl: ".swiper-btn-prev",
            // },
        });
        swiper.slideTo(artistImg_num-1,0,"")
    });

    $(document).on("click","button#aiwExit",function(){
        const aboutImage_Window = document.getElementById("aboutImage_Window")
        aboutImage_Window.remove();
    });

}