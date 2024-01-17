window.onload =function(){
    const about_obj = {
        member_swiper:()=>{
            const swiper = new Swiper(".memberSwiper", {
                spaceBetween:30
            });
            return swiper
        }
    }
    const create_aboutImage_windowTag=(data_about_menu)=>{
        let aboutImage_windowTag=`<div id="aboutImage_Window" class="about_imageWindow">
                                    <div class="swiper memberSwiper">
                                        <div class="swiper-wrapper">`;

        let aboutImage_windowContent ="";
        data_about_menu.forEach((item,i)=>{
            const src = item.getAttribute("src");
            const alt = item.getAttribute("alt");
            aboutImage_windowContent += `<div class="swiper-slide">
                                            <img src="${src}" alt="${alt}">
                                        </div>`
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

    $(document).on("click","button[data-swiper-num]",function(e){
        const artistImg_num = $(e.target).attr("data-swiper-num");
        const arr_artistImgs = document.querySelectorAll('img[data-swiper-num]')
        const aboutImage_windowTag = create_aboutImage_windowTag(arr_artistImgs);

        body_append("afterbegin",aboutImage_windowTag)

        const swiper = about_obj.member_swiper()
        swiper.slideTo(artistImg_num,0,"")
    });

    $(document).on("click","button#aiwExit",function(){
        const aboutImage_Window = document.getElementById("aboutImage_Window")
        aboutImage_Window.remove();
    });
}