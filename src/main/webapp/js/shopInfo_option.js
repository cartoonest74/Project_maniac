$(function(){
    const option_quantity_obj = new Array();
    const selectOption_tag_obj = new Array();

    function order_add_btn_allowed_bg (allow){
        const order_add_btn = document.querySelector('[data-productNo]')
        if(allow.includes("ok")){
            order_add_btn.removeAttribute('order_box_not_allowed')
            order_add_btn.setAttribute('class','order_box_allowed')
            return
        }
        order_add_btn.removeAttribute('order_box_allowed')
        order_add_btn.setAttribute('class','order_box_not_allowed')
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
        console.log(document.querySelector(`[data-option-container="${option_val}"]`))
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
    $("#SelectOption>nav:first-child").click(function(){
        const select_close_open = this.children[1].style.transform
        ! select_close_open.includes("180deg")? select_switch_fn("flex","rotate(180deg)","#select_optionContent",this) :select_switch_fn("none","rotate(0deg)", "#select_optionContent",this)
    })

    // sticky select option click
    $("#sticky_selectOption>nav:first-child").click(function(){
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

        if(option_containers.length == 1){
            price_total_tag.remove()
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
    $("button[data-productNo]").click(function(){
        const CONTEXTPATH = $("#contextPath").val();
        const ARTIST_ID =$("input[name='artistId']").val();
        const resolve_add_cart = "/product/add-cart";
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
        console.log(option_json)
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
                console.log(data)
                if(Number(data)!== 0){
                    $("#header_cart_btn").text("CART( "+data+" )");
                    return '';
                }
            }
        });
    })
});