$(function(){
    // edit obj
    const basket_obj = new Array();
    const selectOption_tag_obj = new Array();
    const optionList_obj = new Array();
    const option_quantity_obj = new Array();

    // basket tag
    const arr_main_basketTag = new Array;

  function get_today(){
     let today = new Date();
     let date_indexOf = today.toISOString().indexOf('.');
     today = today.toISOString().replace("T"," ").substring(0,date_indexOf);
     return today;
  }

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


    // 수량 계산 부분
    function basket_trans_price_calc(target_quantity_name, quantity_val){
        // total part
        const $basket_price = $(`p[data-basket-price=${target_quantity_name}]`)
        const $subtotalTag = $("#subtotalTag")
        const $deliveryFree = $("#deliveryFree")
        const $basketTotal = $("#basketTotal")

        // ch1 string to trans number price
        const basket_originalPrice = $basket_price.attr("data-original-price")
        const currency_unit = basket_originalPrice[0]
        const arr_product_price = basket_originalPrice.substring(1).split(",")
        const money_digit = (arr_product_price.length - 1) * 1000
        const add_digit_price = parseInt(arr_product_price[0]) * money_digit

        // ch2 quantity calculation
        let calc_product_price = add_digit_price * quantity_val

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
        console.log()
        if(singleMultiple == "m"){
            optionName_tag=`<span class="optionName">${optionTitle}</span>`;
        }

        let String_basket_tag =`<li class="basketContent">
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

    function post_viewCart(){
        const post_mappingViewCart = "/cart/view-cart";
        $.ajax({
            type:"post",
            async:true,
            url:post_mappingViewCart,
            dataType:"text",
            data:{},
            success:function(data, status){

                const today = get_today();
                console.log(today)
                arr_main_basketTag.length = 0

                const json = JSON.parse(data);
                let cart_array = json.cart_array;
                cart_array.forEach((val,i)=>{
                    const Cart = JSON.parse(val);
                    create_basketTag(Cart);
                });
                const Str_arr_main_basketTag = arr_main_basketTag.join("");
                $("#basketInfo").html(Str_arr_main_basketTag)
            }
        });
    }

    post_viewCart();
//TODO Edit window part
    const control_editWindow = (edit_tag) =>{
        const BasketEdit_content =document.getElementById("basketEdit_content");
        const basketEdit_box = document.querySelector(".basketEdit_box");
        basketEdit_box.classList.toggle("none");
        BasketEdit_content.innerHTML = edit_tag
    }

    const create_editTag = (data)=>{
        const String_to_json = JSON.parse(data);
        const basket_editId = String_to_json.id;
        const basket_editTitle = String_to_json.title;
        const basket_editOptionList = String_to_json.optionList;
        const basket_editMainImg = String_to_json.mainImg;
        const basket_editPrice = String_to_json.price;
        const basket_editOptionMent = String_to_json.optionMent;

        const optionList = basket_editOptionList.split(",");

        optionList_obj.length = 0;
        optionList.forEach((val,i)=>{
            val = val.trim();
            if(val == "single"){
                optionList_obj.push(val);
                return "";
            }

            if((i+1)%2 != 0){
                optionList_obj.push(val);
            }

        });

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

    // edit 페이지 띄우기
    $(document).on("click","button[data-btn-edit]",function(e){
        const cartKey = $(e.target).attr("data-btn-edit");
        const resolve_view_edit = "/cart/view/edit-cart";

        const arr_cartKey = cartKey.split("x");
        const _editGoods_Id = arr_cartKey[1];
        const editGoods_optionPart = arr_cartKey[1];
        const editGoods_optionId = arr_cartKey[2];

        $.ajax({
            type:"post",
            async:true,
            url: resolve_view_edit,
            dataType:"text",
            data:{
               editGoods_Id:_editGoods_Id
            },
            success: function(data, status){
                let edit_tag = create_editTag(data);
                control_editWindow(edit_tag);
                option_dictionary();
                create_selectOption();
            }
        });
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
        optionList_obj.forEach((val, i)=>{
            const selectOption_val = val.trim()
            const selectOption_tag = `
                <span data-option-value="${selectOption_val}">
                    ${selectOption_val}
                </span>
            `
            add_selectOption_tag.push(selectOption_tag)
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

    function option_dictionary(){
        optionList_obj.forEach((val,i)=>{
            let option_name = val.trim();
            const option_quantity = option_name.includes("single") ? 1:0
            option_quantity_obj[option_name] = [0,option_quantity]
        })
    }

    // 수량 계산 부분
    function trans_price_calc (target_quantity_name, quantity_val, $option_priceTotal){
        // ch1 string to trans number price
        const currency_unit = $("#basic_productPrice").text()[0]
        const arr_product_price = $("#basic_productPrice").text().substring(1).split(",")
        const money_digit = (arr_product_price.length - 1) * 1000
        const add_digit_price = parseInt(arr_product_price[0]) * money_digit

        // ch2 quantity calculation
        let calc_product_price = add_digit_price * quantity_val
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

        const $quantity_name = $(`input[data-editQuantity-name="${target_quantity_name}"]`)
        const quantity_name = $quantity_name.attr("data-editQuantity-name").trim()

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

    // minus quantity
    $(document).on("click","button[data-minus-quantity]",function(e){
        quantity_btn(6,"data-minus-quantity",e)
    })

    // add to cart
    $("button[data-productNo]").click(function(){
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
        $.ajax({
            type: "PUT",
            async: true,
            url: resolve_add_cart,
            dataType: "text",
            data: {
                option_part:_option_part,
                productNo: _productNo,
                option:option_json
            },
            success: function(data, status) {
                if(Number(data)!== 0){
                    $("#header_cart_btn").text("CART( "+data+" )");
                    return '';
                }
            }
        });
    });


    // edit 페이지 exit
    $(document).on("click","#basketEdit_Exit",function(){
        control_editWindow("")
    });



    //delete
    $(document).on("click","button[data-btn-remove]",function(e){
        const _cartKey = $(e.target).attr("data-btn-remove");
        $.ajax({
            type:"DELETE",
            async:true,
            url:resolve_del_cart,
            dataType:"text",
            data:{
                cartKey:_cartKey
            },
            success: function(data, success){
                console.log(data);
            }
        });
    });
});