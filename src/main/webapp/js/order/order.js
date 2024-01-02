$(function(){
    const order_obj = {amount:0,order_name:''}
    const payments = [
        {
            payName:'checkcard',
            channelKey:'channel-key-ddbd1829-8d42-43f3-8c30-da88d55c7a36',
            payMethod:'VIRTUAL_ACCOUNT'
        },
        {
            payName:'toss',
            channelKey:'channel-key-691924ba-7416-4fea-a42a-872fa585db16',
            payMethod:'EASY_PAY'
        },
        {
            payName:'payco',
            channelKey:'channel-key-6d830c5b-9fcb-4cf0-91bd-6dba5b099494',
            payMethod:'EASY_PAY'
        },
        {
            payName:'kakaopay',
            channelKey:'channel-key-b3c21da4-864a-407b-a0ee-a205305e1e26',
            payMethod:'EASY_PAY'
        }
    ]

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

    const total_tag = (currency_unit,quantity_total,$totalTag)=>{
        const arr_complete_calc_price = currency_format(currency_unit, quantity_total)
        const complete_calc_price = arr_complete_calc_price.toReversed().join("")
        $totalTag.html(complete_calc_price)
    }

    const order_ojb = new Array();

    const create_orderJson = () =>{
       const orderList = document.querySelectorAll("[data-order-box]");
       let currency_unit = "";
       let order_name = "";
       for(let i=0; i<orderList.length; i++){
            const cartKey = orderList[i].getAttribute("data-order-box");
            order_name += i<(orderList.length-1)? cartKey+"_" : cartKey
            const order_priceTag = orderList[i].querySelector("[data-original-price]")
            const origin_price = order_priceTag.getAttribute("data-original-price")
            const order_key = order_priceTag.getAttribute("data-order-price")
            const quantity_val = orderList[i].querySelector("input[value]").getAttribute("value")
            const $orderPrice_tag = $("p[data-order-price="+order_key+"]");

            // ch1 string to trans number price
            currency_unit = origin_price[0]
            const str_product_price = origin_price.substring(1).replace(/,/g,"")
            const product_price = parseInt(str_product_price)

            // ch2 quantity calculation
            let calc_product_price = product_price * parseInt(quantity_val);
            total_tag(currency_unit,calc_product_price, $orderPrice_tag);

            order_ojb[order_key] = calc_product_price;
       }
       order_obj.order_name=order_name;
       order_trans_price_calc(currency_unit);
    }
    create_orderJson();


    //TODO 수량 계산 부분
   function order_trans_price_calc(currency_unit){
       const $orderTotal = $("#orderTotal");
       const $subtotalTag = $("#subtotalTag");
       const $deliveryFree = $("#deliveryFree");
       const $basketTotal = $("#basketTotal");
       const $orderAllOkBtn = $("#orderFinalPrice");

       const orderList = document.querySelectorAll("[data-order-box]");
       const orderList_length = orderList.length;
       const orderTotal_info = document.getElementById("orderTotal_info");
       orderTotal_info.innerHTML = `Total&nbsp;(${orderList_length})`;

       let quantity_total = 0
       for(let key in order_ojb){
           quantity_total += order_ojb[key]
       }
       const deliveryFree_price = quantity_total >= 50000 ? 0:3000;
       const basket_total = quantity_total + deliveryFree_price;

       order_obj.amount = basket_total

       total_tag(currency_unit,quantity_total,$orderTotal)

       total_tag(currency_unit,quantity_total,$subtotalTag)

       total_tag(currency_unit,deliveryFree_price,$deliveryFree)

       total_tag(currency_unit,basket_total,$basketTotal)

       total_tag(currency_unit,basket_total,$orderAllOkBtn)
   }
   $(document).on("click","button#termClose",function(e){
        const Term_BOX = document.getElementById("Term_BOX");
        Term_BOX.remove();
   });

// TODO RegistryInfo
   const registryInfo_msg =(view,input_name,msg)=>{
        let $registry_val = $("span[data-registry-val="+input_name+"]")
        if(view == "on"){
            $registry_val.removeClass("none");
            $registry_val.addClass("inlineblock");
            $registry_val.html(msg);
        }else{
            $registry_val.html("");
            $registry_val.removeClass("inlineblock");
            $registry_val.addClass("none");
        }
   }

   const create_registryObj =()=>{
        const name_reg = /[가-힣A-Za-z]{0,40}/g
        const email_reg = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/g;
        const tel_reg1 = /^01(?:0|1|[6-9])-(?:[1-9]{1})(?:\d{2}|\d{3})-\d{4}$/;
        const tel_reg2 = /^01(?:0|1|[6-9])(?:[1-9]{1})(?:\d{2}|\d{3})\d{4}$/;
        const email_errMsg = "Email: 이메일 형식에 맞게 입력해주세요"
        const tel_errMsg = "Tel: 휴대전화번호가 정확한지 확인해 주세요."

        const registryObj ={
            Firstname:{
                reg:name_reg,
                min_length:2,
                error_msg:"Firstname: 공백없이 2글자 이상 입력해주세요",
                value:""
            },
            Lastname:{
                reg:name_reg,
                min_length:2,
                error_msg:"Lastname: 공백없이 2글자 이상 입력해주세요",
                value:""
            },
            Email:{
                reg:email_reg,
                min_length:2,
                error_msg:email_errMsg,
                value:""
            },
            Tel:{
                reg:tel_reg1,
                min_length:2,
                error_msg:tel_errMsg,
                value:""
            }
           };
           return registryObj;
   };
   const registryObj = create_registryObj();

    //   orderRegistry input
   $(document).on("focusout",'input[data-registry-name]',function(e){
        const input_val = $(e.target).val().trim();
        const input_name = $(e.target).attr("data-registry-name");
        const registryObj_reg = registryObj[input_name].reg
        const registryObj_minLength = registryObj[input_name].min_length
        const registryObj_errorMsg = registryObj[input_name].error_msg
        if(! registryObj_reg.test(input_val) || input_val.length < registryObj_minLength){
            registryObj.value = "";
            registryInfo_msg("on",input_name,registryObj_errorMsg)
            return
        }
        registryObj[input_name].value =input_val;
        registryInfo_msg("off",input_name)
   });

   const create_orderRegistryInfo_tag=()=>{
    const orderRegistryInfo_tag = `
                                   <div id="Term_BOX" class="fixedBox">
                                        <div class="orBox">
                                           <button id="termClose" class="orBoxExit" type="button">
                                               <i class="fa-solid fa-x fa-lg"></i>
                                           </button>
                                           <header class="orHeader">
                                               <h1>주문자 수정</h1>
                                           </header>
                                           <section class="orContent">
                                               <label class="orInfoCheck" for="orderRegistryOk">
                                                   <input type="checkbox" name="orderRegistry" value="orderRegistryOk"/>
                                                   <span class="orderRegistry_checkBox">
                                                        <span>
                                                        </span>
                                                   </span>
                                                   <span>
                                                        가입정보와 동일
                                                   </span>
                                               </label>
                                               <nav class="orInfo">
                                                   <span>FIRST</span>
                                                   <input type="text" data-registry-name="Firstname" placeholder="성을 입력해주세요">
                                                   <span data-registry-val="Firstname" class="none"></span>
                                               </nav>
                                               <nav class="orInfo">
                                                   <span>LAST</span>
                                                   <input type="text" data-registry-name="Lastname" placeholder="이름을 입력해주세요">
                                                   <span data-registry-val="Lastname" class="none"></span>
                                               </nav>
                                               <nav class="orInfo">
                                                   <span>EMAIL</span>
                                                   <input type="email" data-registry-name="Email" placeholder="Email을 입력해주세요">
                                                   <span data-registry-val="Email" class="none"></span>
                                               </nav>
                                               <nav class="orInfo">
                                                   <span>TELEPHONE</span>
                                                   <input type="tel" data-registry-name="Tel" placeholder="전화번호를 입력해주세요">
                                                   <span data-registry-val="Tel" class="none"></span>
                                               </nav>
                                           </section>
                                           <footer class="orSaveBtn">
                                               <button type="button" data-btn-order="registryInfo">SAVE</button>
                                           </footer>
                                        </div>
                                   </div>`
        return orderRegistryInfo_tag;
   }
   // 주문자 창 가입자 정보 동일시 Data 가져오기
   $(document).on("click",'input[name="orderRegistry"]',async function(e){
        const registry_IsCheck = $(e.target).is(":checked");
        const registryInfo_mapping = "/order/registryInfo"
        if(! registry_IsCheck){
            return ""
        }
        const post_registryInfo =  await axios({
            url:registryInfo_mapping,
            method:"POST",
            responseType:'json'
        }).then((response)=>response.data)
        .then((data)=>{
            const keys = Object.getOwnPropertyNames(data)
            keys.forEach((item)=>{
                const value = data[item]
                $("input[data-registry-name="+item+"]").val(value)
                registryObj[item].value=value
            })
        });
   })
   // 주문자 정보 save btn
   $(document).on("click",'button[data-btn-order="registryInfo"]',async function(){
        const arr_registry_name= document.querySelectorAll("[data-registry-name]");
        const registryName_length = arr_registry_name.length
        const req_InfoData = new Array();
        const resolve_saveRegistryInfo = "/order/save_registryInfo"
        const formData = new FormData();
        arr_registry_name.forEach((item,index)=>{
            const registry_name = item.getAttribute("data-registry-name")
            const registry_val = registryObj[registry_name].value
            const registryObj_errorMsg = registryObj[registry_name].error_msg
            if(! registry_val.length){
                registryInfo_msg("on",registry_name,registryObj_errorMsg);
            }else{
                formData.append(registry_name,registry_val)
            }
        });
        for(let key of formData.keys()){
            console.log(key)
        }
        const response = await axios.post(
            resolve_saveRegistryInfo,
            formData
        )
   })
   function body_append(position, text){
           const body = document.querySelector("body");
           body.insertAdjacentHTML(position,text);
   }
   $("#OrderRegistry_info").click(function(){
        const orderRegistryInfo_tag =create_orderRegistryInfo_tag();
        body_append("afterbegin",orderRegistryInfo_tag);
        create_registryObj();
   });

   $("#OrderRegistry_delivery").click(function(){

   })
// TODO 결제 port one
    const portOne_data = (obj_payment)=> {
            const total_amount = order_obj.amount;
            const order_name = order_obj.order_name;

            const data = {
                storeId:'store-753861a6-e71d-45d7-b178-161cf14bdc46',
                channelKey:obj_payment.channelKey,
                paymentId:'Merchandise_'+new Date().getTime(),
                orderName:order_name,
                totalAmount:total_amount,
                currency:'CURRENCY_KRW',
                payMethod:obj_payment.payMethod
            }
            return data;
    }

   $("#orderAllOkBtn").click(async function(){
        const check_query = 'input[name="paymentmethod"]:checked'
        const paymentmethod = document.querySelector(check_query).value;
        const check_payment = payments.filter((obj) => obj.payName == paymentmethod);
        const data = portOne_data(check_payment[0])
        const response = await PortOne.requestPayment(data);
        if(response.code != null){
            return alert(response.message);
        }
        console.log(response.txId)
        console.log(response.paymentId)
        const validation = await axios({
            //결제결과를 처리할 가맹점 백엔드 endpoint
            url:"/payments/complete",
            method:"POST",
            body:{
                txId:response.txId,
                paymentId:response.paymentId
            }
        });
   })


})