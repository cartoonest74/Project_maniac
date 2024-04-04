$(function(){
    // edit obj
    const basket_obj = new Array();
    // multi select option menu tag
    const selectOption_tag_obj = new Array();
    /* option menu title */
    const optionList_obj = new Array();
    /*재고수량 obj*/
    const stockQuantity_obj = new Array();
    // basket tag
    const arr_main_basketTag = new Array;
    // 구매수량
    const obj_overOptionLength = {overOptionLength:0, quantityObj:{}, stockQuantity_obj:{}}

    /* alert msg */
    const create_errorMsg=(overOption_tag)=>{
        let quantity_errorMsg = `<div id="confirmBox" class="overErrorMsgBox">
                                    <div class="overErrorMsg">
                                        <section class="overErrorMsg_content">
                                            <h2><i class="fa-solid fa-bell fa-lg"></i>&nbsp;알림</h2>`;
        quantity_errorMsg += overOption_tag;
        quantity_errorMsg += `
                                        </section>
                                        <button id="editReviewNo" type="button" class="exitErrorMsgBtn">ok</button>
                                    </div>
                                </div>`;
        return quantity_errorMsg;
    }

    // 품절상품 삭제
    const soldDel = document.getElementById("soldDel");
    soldDel.addEventListener("click",async function(){

        // loading
        const loading_tag='<div id="loadingTag" style="position:fixed; width:100%; height:100%; background:rgba(0,0,0,0.5); z-index:10;"></div>'
        body_append("afterbegin",loading_tag);
        const loadingTag =  document.querySelector("div#loadingTag");

        const resolve_delCart = "/cart/sold-delete";
        const del_res = await axios.delete(resolve_delCart)
        .then(response=>response.data)
        .then(data=>{
          console.log(data);
          if(data!="ok"){
            const errorMsg = create_errorMsg(`<p>품절 상품이 없습니다.</p>`);
            body_append("afterbegin",errorMsg);
            return 0;
          }
        }).catch(error=>console.log(error));
        if(del_res==0){
            return;
        }

        loadingTag.remove();
        const res = await post_viewCart();
    });

    $(document).on("click","button#editReviewNo",function(){
        const confirmBox = document.querySelector("div#confirmBox");
        confirmBox.remove();
    });

//TODO Basket main part
    const total_tag = (currency_unit,quantity_total,$totalTag)=>{
        const arr_complete_calc_price = currency_format(currency_unit, quantity_total)
        const complete_calc_price = arr_complete_calc_price.toReversed().join("")
        $totalTag.html(complete_calc_price)
    }

    const currency_format = (currency_unit, quantity_total) => {
        const arr_calc_price = []
        quantity_total.toString()
            .split('')
            .toReversed()
            .map(function(val,i,array){
                if(i+1 >= array.length){
                    arr_calc_price.push(`${currency_unit}${val}`)
                    return '';
                }
                arr_calc_price.push((i+1) % 3 ? val:`,${val}`)
        });
        return arr_calc_price;
    }
    // main total 부분
    function basket_dictionary(){
        const option_nodeList =  document.querySelectorAll("[data-quantity-name]")
        let quantity_max = 0
        let quantity_goods = "";
        for(let i=0; i<option_nodeList.length; i++){
            option_name = option_nodeList.item(i).getAttribute('data-quantity-name').trim()
            quantity_goods = parseInt(option_nodeList.item(i).value)
            basket_obj[option_name] = [0,0]
            basket_trans_price_calc(option_name,quantity_goods)
        }
    }
    basket_dictionary();


    //TODO 수량 계산 부분
    function basket_trans_price_calc(target_quantity_name, quantity_val){
        // total part
        const $basket_price = $(`p[data-basket-price=${target_quantity_name}]`)
        const $subtotalTag = $("#subtotalTag")
        const $deliveryFree = $("#deliveryFree")
        const $basketTotal = $("#basketTotal")

        // ch1 string to trans number price
        const basket_originalPrice = $basket_price.attr("data-original-price")
        const currency_unit = basket_originalPrice[0]
        const str_product_price = basket_originalPrice.substring(1).replace(/,/g,"")
//        const money_digit = (arr_product_price.length - 1) * 1000
        const product_price = parseInt(str_product_price)

        // ch2 quantity calculation
        let calc_product_price = product_price * quantity_val

        // ch3 multiple & single quantity total
        basket_obj[target_quantity_name][0]=calc_product_price
        basket_obj[target_quantity_name][1]=quantity_val

        let quantity_total = 0
        for(let key in basket_obj){
            quantity_total += basket_obj[key][0]
        }
        const deliveryFree_price = quantity_total >= 50000 ? 0:3000;
        const basket_total = quantity_total + deliveryFree_price;

        total_tag(currency_unit,calc_product_price,$basket_price)

        total_tag(currency_unit,quantity_total,$subtotalTag)

        total_tag(currency_unit,deliveryFree_price,$deliveryFree)

        total_tag(currency_unit,basket_total,$basketTotal)
    }

    //basket_tag
    const create_basketTag =(Cart)=>{
        const ArtistId = $("#artistId").val();

        const productId = Cart.product_no;
        const title = Cart.title;
        const shopInfo = `/product/${ArtistId}/find-product/${productId}`;
        const mainImg = Cart.main_img;
        let optionName_tag ="";
        const price = Cart.price;
        const quantity = Cart.quantity;
        const cartKey = Cart.cart_key;
        const singleMultiple = Cart.single_multiple;
        const optionTitle = Cart.option_title;
        if(singleMultiple == "m"){
            optionName_tag=`<span class="optionName">${optionTitle}</span>`;
        }

        let String_basket_tag =`<li data-basket-box="${cartKey}" class="basketContent">
                                    <nav class="basketImgBox">
                                        <a href="${shopInfo}" class="basketImg">
                                            <img src=${mainImg} alt="${title}">
                                        </a>
                                    </nav>
                                    <nav class="basketName">
                                        <span>${title}</span>
                                        <!-- ${singleMultiple} -->
                                        ${optionName_tag}
                                    </nav>
                                    <nav class="basketPriceBox">
                                        <input type="text" name="quantity" data-quantity-name="${cartKey}" value="${quantity}" disabled>
                                        <p data-original-price="${price}" data-basket-price="${cartKey}" class="basketPrice">${price}</p>
                                    </nav>
                                    <nav class="basketOptionBtn">
                                        <button data-btn-edit="${cartKey}" type="button">Edit</button>
                                        <button data-btn-remove="${cartKey}" type="button">Delete</button>
                                    </nav>
                                </li>`;
        arr_main_basketTag.push(String_basket_tag)
    }

    // cart 페이지 목록띄우기
    async function post_viewCart(){
        const post_mappingViewCart = "/cart/view-cart";
        const empty_announcement = `<div>장바구니 안에 상품이 없습니다.</div>`;
        const res = await fetch(post_mappingViewCart,{
            method:"post"
        }).then((response)=>response.text())
        .then((data)=>{

            if(data=="empty"){
                $("#basketBody").html(empty_announcement);
                return "";
            }
            arr_main_basketTag.length = 0

            const json = JSON.parse(data);
            let cart_array = json.cart_array;
            cart_array.forEach((val,i)=>{
                const Cart = JSON.parse(val);
                create_basketTag(Cart);
            });

            const Str_arr_main_basketTag = arr_main_basketTag.join("");
            const $basketInfo = document.getElementById("basketInfo");
            $basketInfo.innerHTML=Str_arr_main_basketTag;
            basket_dictionary();
        })
    }

//TODO Edit window part
    const show_editWindow = (edit_tag) =>{
        const BasketEdit_content =document.getElementById("basketEdit_content");
        const basketEdit_box = document.querySelector(".basketEdit_box");
        basketEdit_box.classList.toggle("none");
        BasketEdit_content.innerHTML = edit_tag
    }

    const create_editTag = (String_to_json)=>{
        const basket_editId = String_to_json.id;
        const basket_editTitle = String_to_json.title;
        const basket_editOptionList = String_to_json.optionList;
        const basket_editMainImg = String_to_json.mainImg;
        const basket_editPrice = String_to_json.price;
        const basket_editOptionMent = String_to_json.optionMent;

        const optionList = basket_editOptionList.split(",");
        optionList_obj.length=0;
        const stockQuantity_obj = {};
        optionList.forEach((val,i)=>{
            val = val.trim();
            /*single*/
            if(val == "single"){
                optionList_obj.push(val);
                stockQuantity_obj["signle"]=optionList[1];
                return "";
            }
            /* multi */
            if((i+1)%2 != 0){
                optionList_obj.push(val);
                stockQuantity_obj[val]=optionList[i+1];
                return "";
            }

        });
        obj_overOptionLength.stockQuantity_obj = stockQuantity_obj
        let String_edit_Tag = `
            <button id="basketEdit_Exit" class="basket_btn_exit" type="button">
                <i class="fa-solid fa-x fa-lg"></i>
            </button>
            <ul class="basket_Item_Box">
                <li class="shopInfo_img">
                    <nav class="shopInfo_MainImg">
                        <img src="${basket_editMainImg}" alt="${basket_editTitle}">
                    </nav>
                </li>
                <li class="shopInfo_item">
                    <p class="shopInfo_itemTitle">
                        <span class="shopInfo_itemContent">${basket_editTitle}</span>
                    </p>
                    <p class="shopInfo_itemTitle">
                        <span id="basic_productPrice" class="shopInfo_itemContent">${basket_editPrice}</span>
                    </p>
                    <p class="shopInfo_itemTitle">
                        <span id="option_max" class="shopInfo_itemContent">
                            <i class="fa-regular fa-circle fa-sm"></i>&nbsp;&nbsp;${basket_editOptionMent}
                        </span>
                    </p>
                </li>`;

        if(optionList.length > 2){
            String_edit_Tag += `<li class="shopInfo_selectTag justify-content-center">
                        <div id="SelectOption" class="select_option">
                            <nav class="select_tag">
                                <span>--&nbsp;Select Option&nbsp;--</span>
                                <i class="fa-solid fa-chevron-down fa-lg" style="transform:rotate(0deg)"></i>
                            </nav>
                            <div id="select_optionContent" class="select_option_part">
                            </div>
                        </div>
                    </li>
                    <li id="shopInfoOptionBox" class="shopInfo_optionBox">
                    </li>
                </ul>
                <div id="hiddenMenu_line" class="shopInfo_optionBox">
                    <div class="option_price_total">
                            <h3 data-option_priceTotal="total"></h3>
                    </div>
                    <div class="shopInfo_order_box">
                        <button class="order_box_not_allowed" data-productNo="${basket_editId}" type="button">Add To Cart</button>
                    </div>
                </div>
                `;
        }else{
            String_edit_Tag += `<li id="shopInfoOptionBox" class="shopInfo_optionBox">
                <nav class="quantity_btn_box">
                    <button data-minus-quantity="single" type="button">
                        <img data-minus-quantity="single" src="/img/icon/quantity_down.jpg" alt="quantity_down">
                    </button>
                    <input type="text" data-editQuantity-name="single"  value="1" name="single" maxlength="3" disabled>
                    <button data-plus-quantity="single" type="button">
                        <img data-plus-quantity="single" src="/img/icon/quantity_up.jpg" alt="quantity_up">
                    </button>
                </nav>
            </li>
            </ul>
            <div id="hiddenMenu_line" class="shopInfo_optionBox">
                <div class="option_price_total">
                    <h3 data-option_priceTotal="total">${basket_editPrice}</h3>
                </div>
                <div class="shopInfo_order_box">
                    <button class="order_box_allowed" data-productNo="${basket_editId}" type="button">Add To Cart</button>
                </div>
            </div>`
        }
        return String_edit_Tag;
    }

    function option_dictionary(){
        /* option menu 수량 */
        const option_quantity_obj = {};
        optionList_obj.forEach((val,i)=>{
            let option_name = val.trim();
            const option_quantity = option_name.includes("single") ? 1:0
            option_quantity_obj[option_name] = [0,option_quantity];
        })
        obj_overOptionLength.quantityObj = option_quantity_obj
    }

    // edit 페이지 띄우기
    $(document).on("click","button[data-btn-edit]",async function(e){
        const cartKey = $(e.target).attr("data-btn-edit");

        const arr_cartKey = cartKey.split("x");
        const _editGoods_Id = arr_cartKey[1];
        const editGoods_optionPart = arr_cartKey[1];
        const editGoods_optionId = arr_cartKey[2];
        const resolve_view_edit = "/cart/view/edit-cart";

        const formData = new FormData();
        formData.append("editGoods_Id",_editGoods_Id);
        const res = await fetch(resolve_view_edit,{
            method:"POST",
            body:formData
        }).then((response)=>response.json())
        .then((data)=>{
            let edit_tag = create_editTag(data);
            show_editWindow(edit_tag);
            option_dictionary();
            create_selectOption();
        })
        .catch((error)=>console.log(error))
    })

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
        const add_selectOption_tag = []
        const stockQuantityObj = obj_overOptionLength.stockQuantity_obj;
        optionList_obj.forEach((val, i)=>{
            const selectOption_val = val.trim()
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
            const is_quantity = Number(stockQuantityObj[selectOption_val]) <= 0? selectOption_tag_soldOut:selectOption_tag;
            add_selectOption_tag.push(is_quantity)
        });
        selectOption_tag_obj["SelectOption"] = add_selectOption_tag
    }
    // 1번 실행되면서 select option 부분들을 미리 생성

    const create_option_priceTotal = ()=>{
            const option_priceTotal_Tag=`<h3 data-option_priceTotal="total"></h3>`;
            // main
            $("div.option_price_total").html(option_priceTotal_Tag);
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
                                        <input type="text" data-editQuantity-name="${option_val}"  value="1" name="${option_val}" maxlength="3" disabled>
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

    $(document).on("click","span[data-option-value]",function(e){
        const option_val = $(e.target).attr('data-option-value')
        create_optionTag(option_val)
    });

    // select option click
    $(document).on("click","#SelectOption>nav:first-child",function(){
        const select_close_open = this.children[1].style.transform
        ! select_close_open.includes("180deg")? select_switch_fn("flex","rotate(180deg)","#select_optionContent",this) :select_switch_fn("none","rotate(0deg)", "#select_optionContent",this)
    })

    // option part close
    $(document).on("click","button[data-option-part-close]",function(e){
        const option_close_name = $(e.target).attr('data-option-part-close').trim();
        const $option_container = $(`div[data-option-container="${option_close_name}"]`)
        const option_containers = document.querySelectorAll("[data-option-container]");
        const price_total_tag = document.querySelector('[data-option_priceTotal="total"]')

        $option_container.remove();
        const $option_priceTotal = $('h3[data-option_priceTotal="total"]')
        trans_price_calc(option_close_name,0,$option_priceTotal)
        if(option_containers.length == 1){
            $option_priceTotal.remove()
            order_add_btn_allowed_bg("No")
        }
    });

    //TODO 수량 계산 부분
    function trans_price_calc (target_quantity_name, quantity_val, $option_priceTotal){
        // ch1 string to trans number price
        const currency_unit = $("#basic_productPrice").text()[0]
        const str_product_price = $("#basic_productPrice").text().substring(1).replace(/,/g,"")
        const product_price = parseInt(str_product_price)

        // ch2 quantity calculation
        let calc_product_price = product_price * quantity_val
        // ch3 multiple & single quantity total
        obj_overOptionLength.quantityObj[target_quantity_name][0]=calc_product_price
        obj_overOptionLength.quantityObj[target_quantity_name][1]=quantity_val
        let quantity_total = 0
        for(let key in obj_overOptionLength.quantityObj){
            quantity_total += obj_overOptionLength.quantityObj[key][0]
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

    /* TODO 수량 알림 메세지 */
    const create_partQuantity_tag=(_option_part,json)=>{
        const object_key = Object.keys(obj_overOptionLength.quantityObj);
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
                                            <h2><i class="fa-solid fa-bell fa-lg"></i>&nbsp;수량 초과 알림</h2>`;
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

    // TODO 수량 Option
    const quantity_btn =(pm_quantity,e)=>{
        const $option_priceTotal = $('h3[data-option_priceTotal="total"]');
        const target_quantity_name = $(e.target).attr(pm_quantity);
        const $quantity_name = document.querySelector(`input[data-editquantity-name="${target_quantity_name}"]`)
        const quantity_name = $quantity_name.getAttribute("data-editquantity-name").trim();
        const stockQuantityObj =obj_overOptionLength.stockQuantity_obj;
        const stock_quantity_val = Number(stockQuantityObj[target_quantity_name]);

        // max quantity
        const regex = /[^0-9]/g;
        const option_max = parseInt($("#option_max").text().replace(regex,''))
        if(quantity_name == target_quantity_name && pm_quantity.includes("plus")){
            let quantity_val = $quantity_name.value
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
            $quantity_name.value=quantity_val;
            trans_price_calc(target_quantity_name,quantity_val, $option_priceTotal)
        }

        if(quantity_name == target_quantity_name && pm_quantity.includes("minus")){
            let quantity_val = $quantity_name.value
            quantity_val > 1 ? quantity_val-- : ''
            $quantity_name.value=quantity_val;
            trans_price_calc(target_quantity_name,quantity_val, $option_priceTotal)
        }
    }

    // plus quantity
    $(document).on("click","button[data-plus-quantity]",function(e){
        quantity_btn("data-plus-quantity",e)
    })

    // minus quantity
    $(document).on("click","button[data-minus-quantity]",function(e){
        quantity_btn("data-minus-quantity",e)
    })

    // TODO add to cart
    $(document).on("click","button[data-productNo]",async function(){
        const resolve_add_cart = "/cart/add-cart";
        const price_total_tag = document.querySelector('[data-option_priceTotal="total"]')
        const _productNo = $("button[data-productNo]").attr('data-productNo')
        if(! price_total_tag){
            return
        }

        let option_key_index = 0;
        const option_quantity_json = new Object()
        const option_quantity_arr = []
        let _option_part = "";
        for(let key in obj_overOptionLength.quantityObj){
            let option_quantity_val = Number(obj_overOptionLength.quantityObj[key][1])
            _option_part = key.includes("single")? "s":"m";
            if(_option_part == "s"){
                option_quantity_arr.push({"option_id":option_key_index,"quantity":option_quantity_val})
                break
            }
            option_key_index++;
            if(obj_overOptionLength.quantityObj[key][0] == 0){
                continue
            }
            option_quantity_arr.push({"option_id":option_key_index-1,"quantity":option_quantity_val})
        }

        // max quantity
        const regex = /[^0-9]/g;
        const option_max = parseInt(document.getElementById("option_max").innerText.replace(regex,''))
//        option_quantity_json.id =_productNo
        option_quantity_json.max =option_max
        option_quantity_json.option = option_quantity_arr
        const option_json = JSON.stringify(option_quantity_json)

        const formData = new FormData();
        formData.append("option_part",_option_part);
        formData.append("productNo",_productNo);
        formData.append("option",option_json);

        const res = await fetch(resolve_add_cart,{
            method:"PUT",
            body:formData
        }).then((response)=>response.text())
        .then((data)=>{
            show_editWindow("");
            const json = JSON.parse(data);
            const overOption_length = json.overOptionId.length;
            obj_overOptionLength.overOptionLength = overOption_length;
           /* over된 구매물량이 없다면 return */
           if(overOption_length == 0){
                return;
           }
            /* over된 구매물량이 있다면 errorMsg */
            const overOption_tag = create_partQuantity_tag(_option_part,json);
            const quantity_errorMsg = create_quantity_errorMsg(overOption_tag);
            body_append("afterbegin",quantity_errorMsg);
        })
        .catch((error)=>{})
        const res2 = await post_viewCart();
    });

    //TODO edit 페이지 exit
    $(document).on("click","#basketEdit_Exit",function(){
        show_editWindow("")
    });

    //TODO delete
    $(document).on("click","button[data-btn-remove]",async function(e){
        const _cartKey = $(e.target).attr("data-btn-remove");
        const resolve_del_cart = "/cart/del-cart";

        const formData = new FormData();
        formData.append("cartKey",_cartKey);
        const res = await fetch(resolve_del_cart,{
            method:"DELETE",
            body:formData
        }).then((response)=> response.text())
            .then((data)=> {
                post_viewCart();
            })
            .catch((error)=> console.log(error))
    });

    // Todo recall tag
    const recall_msg_tag =(recall_array)=>{
       const arr_recall_tag = new Array;
       recall_array.forEach((val,i)=>{
               const recall_json = JSON.parse(val);
               let cartKey =  recall_json.cart_key;
               let recall_basket = document.querySelector(`[data-basket-box="${cartKey}"]`)
               recall_basket.style.border="2px solid rgb(197, 43, 69)"
               let title =recall_json.title;
               let optionTitle =recall_json.option_title.replace(/["]/g,'');
               let restQuantity =recall_json.rest_quantity;

               let span_tag = `<span style="font-size:2em;">${title}</span>
                              <span style="font-size:1.5em;">${optionTitle}</span>
                              <span style="font-size:2.3em; color:rgb(197, 43, 69); margin-bottom:10px;">${restQuantity}</span>`

               if(optionTitle == "single"){
                span_tag =`<span style="font-size:2em;">${title}</span>
                            <span style="font-size:2.3em; color:rgb(197, 43, 69); margin-bottom:10px;">${restQuantity}</span>`
               }

               arr_recall_tag.push(span_tag)
        });
       let recall_info = arr_recall_tag.join("\n");
       const recall_tag = `<div id="recallBox" class="recall_Box">
                               <div class="recall_content">
                                   <h2><i class="fa-solid fa-bell fa-lg"></i>상품 수량 초과</h2>
                                   <h3>남은 재고 수량</h3>
                                   <p>
                                        ${recall_info}
                                   </p>
                                   <button id="recall_Close" type="button">OK</button>
                               </div>
                           </div>`
       return recall_tag;
    }

    function body_append(position, text){
            const body = document.querySelector("body");
            body.insertAdjacentHTML(position,text);
    }

    // recall_box remove
    $(document).on("click","button#recall_Close",function(e){
        const recallBox = document.querySelector("#recallBox");
        recallBox.remove();
    });

    // TODO payment btn
    $("#basketOrderBtn").click(async function(){
        const ArtistId = $("#artistId").val();
        const resolve_order = `/order`;
        const res = await fetch(resolve_order,{
            method:"POST"
        }).then((response)=>response.text())
        .then((data)=>{
            const json = JSON.parse(data);
            const json_key = Object.keys(json)[0];
            if(json_key != "uuid"){
                let recall_array = json.recall_array;
                const recall_tag = recall_msg_tag(recall_array);
                body_append("afterbegin",recall_tag)
                return
            }
            const uuid = json.uuid;
            window.location.href =`/order/${ArtistId}?orderCheck=${uuid}`
        })
        .catch((error)=>console.log(error))
    });

});