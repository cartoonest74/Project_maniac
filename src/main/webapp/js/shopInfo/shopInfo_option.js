$(function(){
    const option_quantity_obj = new Array();
    const selectOption_tag_obj = new Array();


    function order_add_btn_allowed_bg (allow){
        const $order_add_btn = $('button[data-productNo]')
        if(allow.includes("ok")){
            $order_add_btn.removeClass('order_box_not_allowed')
            $order_add_btn.addClass('order_box_allowed')
            return
        }
        $order_add_btn.removeClass('order_box_allowed')
        $order_add_btn.addClass('order_box_not_allowed')
    }

    const create_selectOption = () =>{
        const selectOption_tag_nodeList = document.querySelectorAll("[data-option-value]")
        const add_selectOption_tag = []
        for(let i=0; i<selectOption_tag_nodeList.length; i++){
            const selectOption_val = selectOption_tag_nodeList.item(i).getAttribute('data-option-value').trim()
            const selectOption_tag = `
                <span data-option-value="${selectOption_val}">
                    ${selectOption_val}
                </span>
            `
            add_selectOption_tag.push(selectOption_tag)
        }
        selectOption_tag_obj["SelectOption"] = add_selectOption_tag
    }
    // 1번 실행되면서 select option 부분들을 미리 생성
    create_selectOption()

    const create_option_priceTotal = ()=>{
        const option_priceTotal_Tag=`<h3 data-option_priceTotal="total"></h3>`;
        // main
        $("div.option_price_total").html(option_priceTotal_Tag);

        // sticky
        $("nav.sticky_total_price").html(option_priceTotal_Tag);
    }

    const create_optionTag = (option_val) =>{
        const option_tag = `<div data-option-container="${option_val}" class="shoInfo_quantity">
                                <button data-option-part-close="${option_val}" type="button">
                                    <i data-option-part-close="${option_val}" class="fa-solid fa-xmark fa-sm"></i>
                                </button>
                                <nav class="shoInfo_quantity_header">
                                    <h2>
                                        ${option_val}
                                    </h2>
                                </nav>
                                <nav class="quantity_btn_box">
                                    <button data-minus-quantity="${option_val}" type="button">
                                        <img data-minus-quantity="${option_val}" src="/img/icon/quantity_down.jpg" alt="quantity_down">
                                    </button>
                                    <input type="text" data-quantity-name="${option_val}"  value="1" name="${option_val}" maxlength="3" disabled>
                                    <button data-plus-quantity="${option_val}" type="button">
                                        <img data-plus-quantity="${option_val}" src="/img/icon/quantity_up.jpg" alt="quantity_up">
                                    </button>
                                </nav>
                            </div>`;

        const sticky_option_tag = `<div data-option-container="${option_val}" class="sticky_shoInfo_quantity">
                                        <button data-option-part-close="${option_val}" type="button">
                                            <i data-option-part-close="${option_val}" class="fa-solid fa-xmark fa-sm"></i>
                                        </button>
                                        <nav class="sticky_optionTitle">
                                            <h2>
                                                ${option_val}
                                            </h2>
                                        </nav>
                                        <nav class="sticky_quantityBox">
                                            <button data-minus-quantity="${option_val}" type="button">
                                                <img data-minus-quantity="${option_val}" src="/img/icon/quantity_down.jpg" alt="quantity_down">
                                            </button>
                                            <input type="text" data-quantity-name="${option_val}"  value="1" name="${option_val}" maxlength="3" disabled>
                                            <button data-plus-quantity="${option_val}" type="button">
                                                <img data-plus-quantity="${option_val}" src="/img/icon/quantity_up.jpg" alt="quantity_up">
                                            </button>
                                        </nav>
                                    </div>`;
        // 중복 생성 방지
        if(document.querySelector(`[data-option-container="${option_val}"]`)){
            return "";
        }
        create_option_priceTotal()
        const $option_priceTotal = $('h3[data-option_priceTotal="total"]')
        trans_price_calc(option_val,1,$option_priceTotal)
        $("#shopInfoOptionBox").append(option_tag)
        $("#sticky_optionContent").append(sticky_option_tag)
        order_add_btn_allowed_bg("ok")
    }

    // select 아이콘 animation
    const select_switch_fn =(display, rotate, select_optionContent, e)=>{
        const select_option_part = document.querySelector(select_optionContent)
        const $select_option_part = $(select_optionContent)
        select_option_part.style.display=display
        e.children[1].style.transform=rotate
        if(display.includes("none")){
            $select_option_part.html()
            return ""
        }
        $select_option_part.html(selectOption_tag_obj["SelectOption"].join(""))
    }

    // select option click
    $(document).on("click","#SelectOption>nav:first-child",function(){
        const select_close_open = this.children[1].style.transform
        ! select_close_open.includes("180deg")? select_switch_fn("flex","rotate(180deg)","#select_optionContent",this) :select_switch_fn("none","rotate(0deg)", "#select_optionContent",this)
    })

    // sticky select option click
    $(document).on("click","#sticky_selectOption>nav:first-child",function(){
        const select_close_open = this.children[1].style.transform
        ! select_close_open.includes("180deg")? select_switch_fn("flex","rotate(180deg)","#sticky_select_optionContent",this) :select_switch_fn("none","rotate(0deg)", "#sticky_select_optionContent",this)
    });

    $(document).on("click","span[data-option-value]",function(e){
        const option_val = $(e.target).attr('data-option-value')
        create_optionTag(option_val)
    });

    // option part close
    $(document).on("click","button[data-option-part-close]",function(e){
        const option_close_name = $(e.target).attr('data-option-part-close').trim();
        const $option_container = $(`div[data-option-container='${option_close_name}']`)
        const option_containers = document.querySelectorAll("[data-option-container]");
        const price_total_tag = document.querySelector('[data-option_priceTotal="total"]')

        $option_container.remove();
        const $option_priceTotal = $('h3[data-option_priceTotal="total"]')
        trans_price_calc(option_close_name,0,$option_priceTotal)
        if(option_containers.length == 2){
            $option_priceTotal.remove()
            order_add_btn_allowed_bg("No")
        }
    });

    function option_dictionary(){
        const option_nodeList =  document.querySelectorAll("[data-option-value]")
        for(let i=0; i<option_nodeList.length; i++){
            let option_name = option_nodeList.item(i).getAttribute('data-option-value').trim()
            const option_quantity = option_name.includes("single") ? 1:0
            option_quantity_obj[option_name] = [0,option_quantity]
        }
    }
    option_dictionary();

    // 수량 계산 부분
    function trans_price_calc (target_quantity_name, quantity_val, $option_priceTotal){
        // ch1 string to trans number price
        const currency_unit = $("#basic_productPrice").text()[0]
        const str_product_price = $("#basic_productPrice").text().substring(1).replace(/,/g,"")
        const product_price = parseInt(str_product_price)

        // ch2 quantity calculation
        let calc_product_price = product_price * quantity_val
        // ch3 multiple & single quantity total
        option_quantity_obj[target_quantity_name][0]=calc_product_price
        option_quantity_obj[target_quantity_name][1]=quantity_val
        let quantity_total = 0
        for(let key in option_quantity_obj){
            quantity_total += option_quantity_obj[key][0]
        }

        const arr_complete_calc_price = []
        quantity_total.toString()
            .split('')
            .reverse()
            .map(function(val,i,array){
                if(i+1 >= array.length){
                    arr_complete_calc_price.push(`${currency_unit}${val}`)
                    return '';
                }
                arr_complete_calc_price.push((i+1) % 3 ? val:`,${val}`)
            })

        const complete_calc_price = arr_complete_calc_price.reverse().join("")
        $option_priceTotal.html(complete_calc_price)
    }

    const quantity_btn =(max,pm_quantity,e)=>{

        const $option_priceTotal = $('h3[data-option_priceTotal="total"]')
        const target_quantity_name = $(e.target).attr(pm_quantity);

        const $quantity_name = $(`input[data-quantity-name="${target_quantity_name}"]`)
        const quantity_name = $quantity_name.attr("data-quantity-name").trim()

        // max quantity
        const regex = /[^0-9]/g;
        const option_max = parseInt($("#option_max").text().replace(regex,''))

        if(quantity_name == target_quantity_name && pm_quantity.includes("plus")){
            let quantity_val = $quantity_name.val()
            quantity_val < option_max ? quantity_val++ : alert("최대 수량을 초과하였습니다.")
            $quantity_name.val(quantity_val)
            trans_price_calc(target_quantity_name,quantity_val, $option_priceTotal)
        }

        if(quantity_name == target_quantity_name && pm_quantity.includes("minus")){
            let quantity_val = $quantity_name.val()
            quantity_val > 1 ? quantity_val-- : ''
            $quantity_name.val(quantity_val)
            trans_price_calc(target_quantity_name,quantity_val, $option_priceTotal)
        }
    }

    // plus quantity
    $(document).on("click","button[data-plus-quantity]",function(e){
        quantity_btn(6,"data-plus-quantity",e)
    })

    //    minus quantity
    $(document).on("click","button[data-minus-quantity]",function(e){
        quantity_btn(6,"data-minus-quantity",e)
    })

    // add to cart
    $(document).on("click","button[data-productNo]",async function(){
        const ARTIST_ID =$("input[name='artistId']").val();
        const resolve_add_cart = "/cart/add-cart";
        const price_total_tag = document.querySelector('[data-option_priceTotal="total"]')
        const _productNo = $("button[data-productNo]").attr('data-productNo')
        if(! price_total_tag){
            return
        }

        let option_key_index = 0;
        const option_quantity_json = new Object()
        const option_quantity_arr = []
        let _option_part;
        for(let key in option_quantity_obj){
            let option_quantity_val = option_quantity_obj[key]
            _option_part = key.includes("single")? "s":"m";
            if(_option_part == "s"){
                option_quantity_arr.push({"option_id":option_key_index,"quantity":option_quantity_val[1]})
                break
            }
            option_key_index++;
            if(option_quantity_obj[key][0] == 0){
                continue
            }
            option_quantity_arr.push({"option_id":option_key_index-1,"quantity":option_quantity_val[1]})
        }
        option_quantity_json.id =_productNo
        option_quantity_json.option = option_quantity_arr
        const option_json = JSON.stringify(option_quantity_json)

        const formData = new FormData();
        formData.append("option_part",_option_part)
        formData.append("productNo",_productNo)
        formData.append("option",option_json)
        const res = await fetch(resolve_add_cart,{
            method:"PUT",
            body:formData
        }).then((response)=>response.text())
        .then((data)=>{
            if(Number(data)!== 0){
                $("#header_cart_btn").text("CART( "+data+" )");
                return '';
            }
        }).catch((error)=>console.log(error))

        const checkMsg_res =  await void_addCheckMsg_ani();
        const checkMsg_remove = await remove_basket();
    });

     const create_stickyHead_tag = ()=>{
              const shopInfoMain_img_src = $("#shopInfoMain_img").attr("src");
              const shopInfoMain_title = $("#shopInfoMain_img").attr("alt");
              const shopInfoMain_price = $("#basic_productPrice").html();
              const option_keys = Object.keys(option_quantity_obj);
              const shopInfoMain_id = Object.keys(option_quantity_obj);
              const productNo = $("#addToCart").attr("data-productNo");

              let stickyOption_tag ="";
              let stickyTotal_tag = "";
              let stickyOrder_class = "order_box_allowed";

              if(option_keys[0]!="single"){
                stickyOption_tag = `<div class="shopInfo_selectTag justify-content-start">
                                       <div id="sticky_selectOption" class="select_option">
                                           <nav class="select_tag">
                                               <span>--&nbsp;Select Option&nbsp;--</span>
                                               <i class="fa-solid fa-chevron-down fa-lg" style="transform:rotate(0deg)"></i>
                                           </nav>
                                           <nav id="sticky_select_optionContent" class="select_option_part">
                                           </nav>
                                       </div>
                                   </div>`;

               stickyOrder_class = "order_box_not_allowed";
              }else{
                stickyOption_tag = `<div class="sticky_shopInfo_optionBox">
                                       <nav class="quantity_btn_box">
                                           <button data-minus-quantity="single" type="button">
                                               <img data-minus-quantity="single" src="/img/icon/quantity_down.jpg" alt="quantity_down">
                                           </button>
                                           <input type="text" data-quantity-name="single"  value="1" name="single" maxlength="3" disabled>
                                           <button data-plus-quantity="single" type="button">
                                               <img data-plus-quantity="single" src="/img/icon/quantity_up.jpg" alt="quantity_up">
                                           </button>
                                       </nav>
                                   </div>`;

                stickyTotal_tag = `<h3 data-option_priceTotal="total">${shopInfoMain_price}</h3>`;
              }
            let stickyHead_tag=`<div id="stickyInfo" class="sticky_info">
                                      <div class="stickyItemBox">
                                          <header class="stickyHeader">
                                              <div class="stickyImgBox">
                                                  <img src="${shopInfoMain_img_src}" alt="${shopInfoMain_title}">
                                              </div>
                                              <nav class="stickyInfo">
                                                  <h2>${shopInfoMain_title}</h2>
                                                  <h3>${shopInfoMain_price}</h3>
                                                  ${stickyOption_tag}
                                              </nav>
                                          </header>
                                          <section class="sticky_section">
                                              <div id="sticky_optionContent" class="sticky_optionContentBox">
                                              </div>
                                              <div class="sticky_order_box">
                                                  <nav class="sticky_total_price">
                                                      ${stickyTotal_tag}
                                                  </nav>
                                                  <button class="${stickyOrder_class}" data-productNo="${productNo}" type="button">Add To Cart</button>
                                              </div>
                                          </section>
                                      </div>
                                  </div>`
            return stickyHead_tag;
        }

    let currentScene = 0;
    let yOffset =0;
    let prevScrollHeight = 0;

    const create_sideOptionBtn = () =>{
        const topBtn_tag = `<div id="sideOption" class="sideOptionBox">
                                <button id="topBtn" type="button" class="cls_topBtn">
                                    <i class="fa-solid fa-circle-up fa-2xl"></i>
                                </button>
                            </div>`;
        return topBtn_tag;
    }

    function body_append(position, text){
        const body = document.querySelector("body");
        body.insertAdjacentHTML(position,text);
    }

    window.addEventListener("scroll",()=>{
        yOffset = window.scrollY
        const hiddenMenu_noneLine = document.querySelector("#hiddenMenu_noneLine");
        const hiddenMenu_line = document.querySelector("#hiddenMenu_line");
        const appear_hiddenMenu_val = hiddenMenu_line.offsetHeight + hiddenMenu_noneLine.offsetHeight + 140

        let stickyInfo = document.querySelector("#stickyInfo");
        let sideOption = document.querySelector("#sideOption");
        let keyframes =[
                {opacity:0},
                {opacity:0.2},
                {opacity:1}
            ];
        let options={
                delay:100,
                duration: 1000,
                easing: "ease-in",
                iterations: 1,
                fill: "forwards"
            };

        if(yOffset > appear_hiddenMenu_val){
            if(stickyInfo == null){
                // scroll menu
                let stickyHead_tag = create_stickyHead_tag()
                body_append("afterbegin",stickyHead_tag);
                stickyInfo = document.querySelector("#stickyInfo")
                stickyInfo.animate(keyframes, options);

                // side option
                let sideOption_tag = create_sideOptionBtn()
                body_append("afterbegin",sideOption_tag);
                sideOption = document.querySelector("#sideOption")
                sideOption.animate(keyframes, options);
            }
        }else{
            if(stickyInfo != null){
                stickyInfo.remove();
                sideOption.remove();
            }
        }
    });
    $(document).on("click","button#topBtn",function(){
        window.scrollTo({top:0, left:0, behavior:"smooth"})
    });

    function remove_basket(){
         return new Promise((resolve, reject)=>{
                setTimeout(()=>{
                    let remove_checkMsg_basket = $("#show_addCheckMsg").remove();
                    resolve(remove_checkMsg_basket)
                },10000);
            });
    }

    async function void_addCheckMsg_ani(){
        const artistId = $("#artistId").val();
        const add_checkMsgTag = `<div id="show_addCheckMsg" class="addCheckMsg_box">
                                         <a href="/cart/${artistId}/view-cart" id="goToCart" type="button">
                                             <i class="fa-solid fa-cart-shopping fa-2xl"></i>
                                         </a>
                                     </div>`
        body_append("afterbegin",add_checkMsgTag);
        const goToCart = document.getElementById("show_addCheckMsg");
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
        goToCart.animate(keyframes, options)
    }
});