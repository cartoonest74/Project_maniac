$(function(){
    const option_quantity_obj = new Array();
    const selectOption_tag_obj = new Array();
    const obj_overOptionLength = {overOptionLength:0}

    const order_add_btn_allowed_bg =(allow)=>{
        const $order_add_btn = $('button[data-productNo]')
        if(allow.includes("ok")){
            $order_add_btn.removeClass('order_box_not_allowed')
            $order_add_btn.addClass('order_box_allowed')
            return
        }
        $order_add_btn.removeClass('order_box_allowed')
        $order_add_btn.addClass('order_box_not_allowed')
    }

    /* single, multi related msg */
    const create_partQuantity_tag=(_option_part,json)=>{
        const object_key = Object.keys(option_quantity_obj);
        const arr_overOptionId = json.overOptionId;
        const arr_overOptionQuantity = json.overOptionQuantity;
        let overOption_tag = "";

        if(_option_part == "s"){
            overOption_tag += `<p style="color:rgb(243, 103, 103);">${arr_overOptionQuantity[0]}ea</p>`
            overOption_tag += `<p>구매한 이력이 있습니다.</p>`
            return overOption_tag;
        }

        arr_overOptionId.forEach((val,i)=>{
            const optionName = object_key[val];
            const purchase_quantity = arr_overOptionQuantity[i];
            overOption_tag += `<p>${optionName}&nbsp;<span style="font-size:inherit; color:rgb(243, 103, 103);">${purchase_quantity}ea</span></p>`
        });
            overOption_tag += `<p>구매한 이력이 있습니다.</p>`
        return overOption_tag;
    }

    /* 수량 관련 error msg */
    const create_quantity_errorMsg=(overOption_tag)=>{
        let quantity_errorMsg = `<div id="overQuantity_ErrorMsg" class="overErrorMsgBox">
                                    <div class="overErrorMsg">
                                        <section class="overErrorMsg_content">
                                            <h2><i class="fa-solid fa-bell fa-lg"></i>수량 초과 알림</h2>`;
        quantity_errorMsg += overOption_tag;
        quantity_errorMsg += `
                                        </section>
                                        <button id="exitOverQuantityBtn" type="button" class="exitErrorMsgBtn">ok</button>
                                    </div>
                                </div>`;
        return quantity_errorMsg;
    }

    /*수량 관련 error box 나가기 */
    $(document).on("click","button#exitOverQuantityBtn",function(){
        const overQuantity_ErrorMsg = document.querySelector("div#overQuantity_ErrorMsg");
        overQuantity_ErrorMsg.remove()
    });

    const create_selectOption = () =>{
        const selectOption_tag_nodeList = document.querySelectorAll("[data-option-value]")
        const selectQuantity_tag_nodeList = document.querySelectorAll("[data-option-quantity]")
        const add_selectOption_tag = []
        for(let i=0; i<selectOption_tag_nodeList.length; i++){
            const selectOption_val = selectOption_tag_nodeList.item(i).getAttribute('data-option-value').trim()
            const selectQuantity_val = selectQuantity_tag_nodeList.item(i).getAttribute('data-option-quantity').trim()
            const selectOption_tag = `
                <span data-option-value="${selectOption_val}">
                    ${selectOption_val}
                </span>
            `
            const selectOption_tag_soldOut = `
                            <span style="cursor:not-allowed; color:rgb(181, 177, 177);">
                                ${selectOption_val}
                            </span>
                        `
            const is_quantity = Number(selectQuantity_val) <= 0? selectOption_tag_soldOut:selectOption_tag;
            add_selectOption_tag.push(is_quantity)
        }
        selectOption_tag_obj["SelectOption"] = add_selectOption_tag
    }
    // 1번 실행되면서 select option 부분들을 미리 생성
    create_selectOption()

    const create_option_priceTotal = ()=>{
        const option_priceTotal_Tag=`<h3 data-option_priceTotal="total"></h3>`;
        // main
        document.getElementById("optionTotalPrice").innerHTML= option_priceTotal_Tag;
        // sticky
        const stickyTotalPrice = document.querySelector("nav#stickyTotalPrice");
        if(stickyTotalPrice != null){
            stickyTotalPrice.innerHTML=option_priceTotal_Tag;
        }
    }
    /* multi option */
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
                                <nav id="quantityBox" class="quantity_btn_box">
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
                                        <nav id="stickyQuantityBox" class="sticky_quantityBox">
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
        const $option_priceTotal = $('h3[data-option_priceTotal="total"]');
        trans_price_calc(option_val,1,$option_priceTotal)
        $("#shopInfoOptionBox").append(option_tag)
        $("#sticky_optionContent").append(option_tag)
        order_add_btn_allowed_bg("ok")
    }

    // select 아이콘 animation
    const select_switch_fn =(display, rotate, select_optionContent, e)=>{
        const select_option_part = document.querySelector(select_optionContent)
        select_option_part.style.display=display
        e.children[1].style.transform=rotate
        if(display.includes("none")){
            select_option_part.innerHTML=""
            return ""
        }
        select_option_part.innerHTML=selectOption_tag_obj["SelectOption"].join("")
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
        const option_containers = document.querySelectorAll("#shopInfoOptionBox>div[data-option-container]");
        const price_total_tag = document.querySelector('[data-option_priceTotal="total"]')

        $option_container.remove();
        const $option_priceTotal = $('h3[data-option_priceTotal="total"]')
        trans_price_calc(option_close_name,0,$option_priceTotal)

        /* select option menu 하나 남으면 삭제 */
        if(option_containers.length == 1){
            $option_priceTotal.remove();
            order_add_btn_allowed_bg("No")
        }
    });

    function option_dictionary(){
        const option_nodeList =  document.querySelectorAll("[data-option-value]")
        for(let i=0; i<option_nodeList.length; i++){
            let option_name = option_nodeList.item(i).getAttribute('data-option-value').trim()
            /*
                상품 single 일 경우 수량 1개 인식
                상품 multi 일 경우 수량 0개 인식
            */
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
        $option_priceTotal.html(complete_calc_price);
    }

    // TODO 수량 option
    const quantity_btn =(max,pm_quantity,e)=>{

        const $option_priceTotal = $('h3[data-option_priceTotal="total"]');
        const target_quantity_name = $(e.target).attr(pm_quantity);

        const $quantity_name = $(`input[data-quantity-name="${target_quantity_name}"]`)
        const quantity_name = $quantity_name.attr("data-quantity-name").trim()
        const $option_name =document.querySelector(`input[data-option-value="${target_quantity_name}"]`)
        const stock_quantity_val = Number($option_name.getAttribute("data-option-quantity").trim());

        // max quantity
        const regex = /[^0-9]/g;
        const option_max = parseInt($("#option_max").text().replace(regex,''))
        if(quantity_name == target_quantity_name && pm_quantity.includes("plus")){
            let quantity_val = $quantity_name.val()
            if(stock_quantity_val <= quantity_val){
                const stock_overMsg =`<p style="color:rgb(243, 103, 103);">재고물량을 초과하였습니다.</p>`
                const stock_overMsg_tag = create_quantity_errorMsg(stock_overMsg);
                body_append("afterbegin",stock_overMsg_tag);
                return;
            }
            if(quantity_val < option_max){
                quantity_val++;
            }else{
                const max_overMsg =`<p style="color:rgb(243, 103, 103);">최대 수량을 초과하였습니다.</p>`
                const max_overMsg_tag = create_quantity_errorMsg(max_overMsg);
                body_append("afterbegin",max_overMsg_tag);
                return;
            }
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

    // TODO add to cart
    $(document).on("click","button[data-productNo]",async function(){
        const artistId =document.getElementById("artistId").value;
        const resolve_add_cart = "/cart/add-cart";
        const container_quantity_length = document.querySelectorAll("#shopInfoOptionBox>div[data-option-container]").length
        const price_total_tag = document.querySelector('#optionTotalPrice>[data-option_priceTotal="total"]')
        const _productNo = document.querySelector("button[data-productNo]").getAttribute('data-productNo')
        if(! price_total_tag){
            return
        }

        let option_key_index = 0;
        const option_quantity_json = new Object()
        const option_quantity_arr = []
        let _option_part;
        for(let key in option_quantity_obj){
            const option_quantity_val = Number(option_quantity_obj[key][1])
            _option_part = key.includes("single")? "s":"m";
            if(_option_part == "s"){
                option_quantity_arr.push({"option_id":option_key_index,"quantity":option_quantity_val})
                break
            }
            option_key_index++;
            if(option_quantity_obj[key][0] == 0){
                continue
            }
            option_quantity_arr.push({"option_id":option_key_index-1,"quantity":option_quantity_val})
        }

        // max quantity
        const regex = /[^0-9]/g;
        const option_max = parseInt(document.getElementById("option_max").innerText.replace(regex,''))
        // option_quantity_json.id =_productNo
        option_quantity_json.option = option_quantity_arr
        option_quantity_json.max =option_max
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
            if(data == "0"){
                location.href= `/${artistId}/member/login-account`
                return;
            }
            const json = JSON.parse(data);
            const overOption_length = json.overOptionId.length
            obj_overOptionLength.overOptionLength = overOption_length;

           /* over된 구매물량이 없다면 return */
           if(overOption_length == 0){
                return;
           }

            /* over된 구매물량이 있다면 errorMsg */
            const overOption_tag = create_partQuantity_tag(_option_part,json);
            const quantity_errorMsg = create_quantity_errorMsg(overOption_tag);
            body_append("afterbegin",quantity_errorMsg);
        }).catch((error)=>console.log(error));
        if(obj_overOptionLength.overOptionLength != 0 && container_quantity_length == obj_overOptionLength.overOptionLength){
            return;
        }
        const checkMsg_res =  await void_addCheckMsg_ani();
        const checkMsg_remove = await remove_basket();
    });

    /* sticky tag */
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
                                   <nav id="stickyQuantityBox" class="quantity_btn_box">
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
                                              <nav id="stickyTotalPrice" class="sticky_total_price">
                                                  ${stickyTotal_tag}
                                              </nav>
                                              <button class="${stickyOrder_class}" data-productNo="${productNo}" type="button">Add To Cart</button>
                                          </div>
                                      </section>
                                  </div>
                              </div>`
        return stickyHead_tag;
    }

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

    const single_sticky_onLoad=(quantity_name)=>{
        /*non-sticky*/
        const quantity_value = quantity_name.value;
        const optionTotalPriceBox = document.getElementById("optionTotalPrice")
        const optionTotalPrice = optionTotalPriceBox.innerHTML
        /*sticky*/
        const stickyQuantity_input = document.querySelector("#stickyQuantityBox>input[data-quantity-name]")
        const stickyTotalPrice = document.getElementById("stickyTotalPrice");
        stickyTotalPrice.innerHTML =optionTotalPrice
        stickyQuantity_input.value = quantity_value
    }

    const multi_sticky_onLoad=()=>{
        const option_containers = document.querySelectorAll("#shopInfoOptionBox>div[data-option-container]");
        if(option_containers.length == 0){
            return;
        }
        /*non-sticky*/
        const shopInfoOptionBox = document.querySelector("#shopInfoOptionBox");
        const select_optionContent = shopInfoOptionBox.innerHTML
        const optionTotalPriceBox = document.getElementById("optionTotalPrice")
        const optionTotalPrice = optionTotalPriceBox.innerHTML

        /*sticky*/
        const sticky_optionContentBox = document.querySelector("div#sticky_optionContent");
        const stickyTotalPrice = document.getElementById("stickyTotalPrice");
        sticky_optionContentBox.innerHTML =select_optionContent
        stickyTotalPrice.innerHTML =optionTotalPrice
        order_add_btn_allowed_bg("ok");
    }

    window.addEventListener("scroll",()=>{
        const yOffset = window.scrollY
        const xOffset = window.innerWidth
        const hiddenMenu_noneLine = document.querySelector("#hiddenMenu_noneLine");
        const hiddenMenu_line = document.querySelector("#hiddenMenu_line");
        const appear_hiddenMenu_val = hiddenMenu_line.offsetHeight + hiddenMenu_noneLine.offsetHeight + 140
        const addToCart = document.querySelector("button#addToCart");

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

        if(xOffset < 320){
            if(stickyInfo == null){
                return;
            }
            stickyInfo.remove();
            return;
        }

        if(yOffset > appear_hiddenMenu_val){
            if(sideOption == null){
                // side option
                let sideOption_tag = create_sideOptionBtn()
                body_append("afterbegin",sideOption_tag);
                sideOption = document.querySelector("#sideOption")
                sideOption.animate(keyframes, options);
            }
            // sold out 일경우 stick 창 생성 안함
            if(addToCart == null){
                return;
            }
            if(stickyInfo == null){
                // scroll menu
                let stickyHead_tag = create_stickyHead_tag()
                body_append("afterbegin",stickyHead_tag);
                stickyInfo = document.querySelector("#stickyInfo")
                stickyInfo.animate(keyframes, options);


                /* single */
                const quantity_name = document.querySelector(`#quantityBox>input[data-quantity-name="single"]`)
                if(quantity_name != null){
                    single_sticky_onLoad(quantity_name);
                    return;
                }

                /*multi*/
                multi_sticky_onLoad();
            }
        }else{
            if(sideOption != null){
                sideOption.remove();
            }
            if(stickyInfo != null){
                stickyInfo.remove();
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