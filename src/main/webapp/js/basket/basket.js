$(function(){
    const basket_obj = new Array();



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
            trans_price_calc(option_name,quantity_goods)
        }
    }
    basket_dictionary();

//    const basic_total = () =>{
//        const basket_price_nodeList = document.querySelectorAll("[data-basket-price]");
//        for(let i=0; i<basket_price_nodeList.length; i++){
//            let basket_tag_name = basket_price_nodeList.item(i).getAttribute('data-basket-price').trim()
//            trans_price_calc()
//        }
//    }

    const quantity_btn =(pm_quantity,e)=>{

        const target_quantity_name = $(e.target).attr(pm_quantity);

        const $quantity_name = $(`input[data-quantity-name=${target_quantity_name}]`)
        const quantity_name = $quantity_name.attr("data-quantity-name")

        // max quantity
        const regex = /[^0-9]/g;
        const option_max = $quantity_name.attr("data-quantity-max");

        if(quantity_name == target_quantity_name && pm_quantity.includes("plus")){
            let quantity_val = $quantity_name.val()
            quantity_val < option_max ? quantity_val++ : alert("최대 수량을 초과하였습니다.")
            $quantity_name.val(quantity_val)
            trans_price_calc(target_quantity_name,quantity_val)
        }

        if(quantity_name == target_quantity_name && pm_quantity.includes("minus")){
            let quantity_val = $quantity_name.val()
            quantity_val > 1 ? quantity_val-- : ''
            $quantity_name.val(quantity_val)
            trans_price_calc(target_quantity_name,quantity_val)
        }
    }

    // 수량 계산 부분
        function trans_price_calc(target_quantity_name, quantity_val){
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

        // plus quantity
        $(document).on("click","button[data-plus-quantity]",function(e){
            quantity_btn("data-plus-quantity",e)
        })

        //    minus quantity
        $(document).on("click","button[data-minus-quantity]",function(e){
            quantity_btn("data-minus-quantity",e)
        })

    // edit
    $(document).on("click","button[data-btn-edit]",function(e){
        const cartKey = $(e.target).attr("data-btn-edit")
        const resolve_del_cart = "/"
        $(e.target).attr("data-plus-quantity","mx6011")
        $.ajax({
            type:"PUT",
            async:true,
            url: resolve_add_cart,
            dataType:"text",
            data:{
            },
            success:function(data, success){
                console.log(data)
            }
        });
    })

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