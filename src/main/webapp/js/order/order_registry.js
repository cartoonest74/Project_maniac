$(function(){
// 주문지 및 배송지 팝업창 닫기
   const exit_termBox = (popup_tag)=>{
        const Term_BOX = document.getElementById(popup_tag);
        Term_BOX.remove();
   }

   $(document).on("click","button#termClose",function(){
        const popup_tag = "Term_BOX";
        exit_termBox(popup_tag);
   });

   $(document).on("click","button#editAddrClose",function(){
        const popup_tag = "addrEdit_Box";
        exit_termBox(popup_tag)
   })
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
        const name_reg = /^[가-힣A-Za-z0-9]{1,40}/g;
        const email_reg = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/g;
        const tel_reg1 = /^01(?:0|1|[6-9])-(?:[1-9]{1})(?:\d{2}|\d{3})-\d{4}$/g;
        const tel_reg2 = /^01(?:0|1|[6-9])(?:[1-9]{1})(?:\d{2}|\d{3})\d{4}$/g;
        const email_errMsg = "이메일: 이메일 형식에 맞게 입력해주세요"
        const tel_errMsg = "전화번호: 휴대전화번호가 정확한지 확인해 주세요."
        const detailAddr_errMsg = "상세주소: 특수문자를 제외하고 정확하게 입력해주세요"
        const addr_errMsg = "주소: 주소를 클릭하여 기입해주세요"
        const post_errMsg = "우편번호: 주소를 클릭하여 기입해주세요"

        const registryObj ={
            basicMain:{
                value:0
            },
            deliveryIndex:{
                value:0
            },
            Firstname:{
                reg:name_reg,
                min_length:1,
                error_msg:"Firstname: 공백없이 1글자 이상 입력해주세요",
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
            },
            mainAddr:{
                error_msg:addr_errMsg,
                value:""
            },
            detailAddr:{
                reg:name_reg,
                min_length:2,
                error_msg:detailAddr_errMsg,
                value:""
            },
            postNum:{
                error_msg:post_errMsg,
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
        const registryObj_errorMsg = registryObj[input_name].error_msg
        if(input_val.search(registryObj_reg) == -1){
            registryObj[input_name].value = "";
            registryInfo_msg("on",input_name,registryObj_errorMsg)
            return
        }
        registryObj[input_name].value =input_val;
        registryInfo_msg("off",input_name)
   });

    // 주문자정보 등록 태그
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
                                                       <span class="orInfo_title">성</span>
                                                       <input type="text" data-registry-name="Firstname" placeholder="성을 입력해주세요">
                                                       <span data-registry-val="Firstname" class="none orInfo_errMsg"></span>
                                                   </nav>
                                                   <nav class="orInfo">
                                                       <span class="orInfo_title">이름</span>
                                                       <input type="text" data-registry-name="Lastname" placeholder="이름을 입력해주세요">
                                                       <span data-registry-val="Lastname" class="none orInfo_errMsg"></span>
                                                   </nav>
                                                   <nav class="orInfo">
                                                       <span class="orInfo_title">이메일</span>
                                                       <input type="email" data-registry-name="Email" placeholder="Email을 입력해주세요">
                                                       <span data-registry-val="Email" class="none orInfo_errMsg"></span>
                                                   </nav>
                                                   <nav class="orInfo">
                                                       <span class="orInfo_title">전화번호</span>
                                                       <input type="tel" data-registry-name="Tel" placeholder="전화번호를 입력해주세요">
                                                       <span data-registry-val="Tel" class="none orInfo_errMsg"></span>
                                                   </nav>
                                               </section>
                                               <footer class="orSaveBtn">
                                                   <button type="button" data-btn-order="registryInfo">SAVE</button>
                                               </footer>
                                            </div>
                                       </div>`
            return orderRegistryInfo_tag;
   }

    // 배송지 정보 등록 태그
   const create_orderRegistryDelivery_tag=(basic_check,delivery_index)=>{
        let orderRegistryDelivery_tag = `
                                       <div id="Term_BOX" class="fixedBox">
                                            <div class="orBox">
                                               <button id="termClose" class="orBoxExit" type="button">
                                                   <i class="fa-solid fa-x fa-lg"></i>
                                               </button>
                                               <header class="orHeader">
                                                   <h1>배송지 수정</h1>
                                               </header>
                                               <section class="orContent">`;
        if(basic_check == delivery_index){
           orderRegistryDelivery_tag += `<input type="checkbox" data-registry-name="basicMain" value="${delivery_index}" hidden="hidden" checked disabled/>`
        }else{
           orderRegistryDelivery_tag +=`<label class="orInfoCheck" for="orderRegistryOk">
                                               <input type="checkbox" data-registry-name="basicMain" value="${delivery_index}"/>
                                               <span class="orderRegistry_checkBox">
                                                    <span>
                                                    </span>
                                               </span>
                                               <span>
                                                    기본 배송 주소로 설정
                                               </span>
                                           </label>`;
        }
        orderRegistryDelivery_tag += `<nav class="orInfo">
                                                       <span class="orInfo_title">성</span>
                                                       <input type="text" data-registry-name="Firstname" placeholder="성을 입력해주세요">
                                                       <span data-registry-val="Firstname" class="none orInfo_errMsg"></span>
                                                   </nav>
                                                   <nav class="orInfo">
                                                       <span class="orInfo_title">이름</span>
                                                       <input type="text" data-registry-name="Lastname" placeholder="이름을 입력해주세요">
                                                       <span data-registry-val="Lastname" class="none orInfo_errMsg"></span>
                                                   </nav>
                                                   <nav class="orInfo">
                                                       <span class="orInfo_title">주소</span>
                                                       <div class="orAddr_search">
                                                           <input data-registry-name="mainAddr" type="text" id="mainAddr" placeholder="주소" readonly>
                                                           <button onclick="addr_execDaumPostcode()" type="button" class="oraddr_icon">
                                                               <i class="fa-solid fa-magnifying-glass"></i>
                                                           </button>
                                                       </div>
                                                       <span data-registry-val="mainAddr" class="none orInfo_errMsg"></span>
                                                       <span class="orInfo_title"></span>
                                                       <input type="text" data-registry-name="detailAddr" id="detailAddr" placeholder="상세주소">
                                                       <span data-registry-val="detailAddr" class="none orInfo_errMsg"></span>
                                                   </nav>
                                                   <nav class="orInfo">
                                                       <span class="orInfo_title">우편번호</span>
                                                       <input type="text" data-registry-name="postNum" id="postNum" placeholder="우편번호" readonly>
                                                       <span data-registry-val="postNum" class="none orInfo_errMsg"></span>
                                                   </nav>
                                                   <nav class="orInfo">
                                                       <span class="orInfo_title">전화번호</span>
                                                       <input type="tel" data-registry-name="Tel" placeholder="전화번호를 입력해주세요">
                                                       <span data-registry-val="Tel" class="none orInfo_errMsg"></span>
                                                   </nav>
                                               </section>
                                               <input type="text" data-registry-name="deliveryIndex" value="${delivery_index}"  hidden="hidden" readonly>
                                               <footer class="orSaveBtn">
                                                   <button type="button" data-btn-order="registryDelivery">SAVE</button>
                                               </footer>
                                            </div>
                                       </div>`
            return orderRegistryDelivery_tag;
   }

   // 배송지 정보 변경 태그
   const create_orderRegistryDelivery_editTag = ()=>{
        let orderRegistryDelivery_tag = `
                                    <div id="addrEdit_Box" class="fixedBox">
                                        <div class="orAddrBox">
                                             <header class="orAddrHeader">
                                                 <button class="orAddrBoxAdd" id="OrderRegistry_delivery2" type="button">
                                                     <i class="fa-solid fa-plus fa-lg"></i> 등록
                                                 </button>
                                                 <h1>배송지 주소 선택</h1>
                                                 <button class="orAddrBoxExit" id="editAddrClose" type="button">
                                                     <i class="fa-solid fa-x fa-lg"></i>
                                                 </button>
                                             </header>
                                             <section class="orAddrContents">
                                                 <div class="orAddrContent">
                                                     <label for="0">
                                                         <input type="radio" name="addrSelect" value="0" checked>
                                                         <span class="addrSelect_check">
                                                             <span></span>
                                                         </span>
                                                     </label>
                                                     <nav class="orAddrInfo">
                                                         <p style="color:#2ead83bd"><span>한</span><span>경주</span><span class="addrBasic_mark">기본</span></p>
                                                         <p>
                                                             <span>경기도 이천시 장호원읍 서동대로 8830번길 6-17 동양아파트 204호</span>
                                                         </p>
                                                         <p>
                                                             <span>19677</span>
                                                         </p>
                                                         <p>
                                                             <span>010-9494-9494</span>
                                                         </p>
                                                         <nav class="orAddrBtn">
                                                             <button data-addr-eidt="0" type="button">수정</button>
                                                             <button data-addr-del="0" type="button">삭제</button>
                                                         </nav>
                                                     </nav>
                                                 </div>
                                             </section>
                                             <footer class="orAddrSaveBtn">
                                                 <button type="button">ok</button>
                                             </footer>
                                         </div>
                                    </div>`;
        return orderRegistryDelivery_tag;
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
   const create_editOrderHeader = (caption_selector)=>{
        let editOrderHeader_Tag = "";
        const addrPart = document.getElementById("addrPart");
        const infoPart = document.getElementById("infoPart");
        /* orderInfoHeader */
        const change_orderInfoHeaderTag = document.querySelector("[data-order-header="+caption_selector+"]")
        const header_part = change_orderInfoHeaderTag.getAttribute("data-orderHeader-part");
        /* 등록모드가 아닐경우 이미 변경된 것이기 떄문에 반환 */
        if(header_part != "add"){
            return ""
        }
        change_orderInfoHeaderTag.remove()

        if(caption_selector =="deliveryAddr"){
            editOrderHeader_Tag = `<nav data-order-header="deliveryAddr" data-orderHeader-part="edit" class="orderInfoHeader justify-content-start">
                                                       <h2>배송주소</h2>
                                                       <button id="OrderRegistry_deliveryEdit" type="button">변경</button>
                                                   </nav>`;

            addrPart.insertAdjacentHTML("afterbegin",editOrderHeader_Tag)
            return "";
        }

        editOrderHeader_Tag =`<nav data-order-header="info" data-orderHeader-part="edit" class="orderInfoHeader justify-content-start">
                                            <h2>주문자</h2>
                                            <button id="OrderRegistry_infoEdit" type="button">수정</button>
                                        </nav>`;

        infoPart.insertAdjacentHTML("afterbegin",editOrderHeader_Tag)
        return "";
   }
   // 주문자및 배송지 save source
   const info_save_source = async (caption_selector,resolve_mapping)=>{
        /* orderInfoSubCaption */
        const caption = document.querySelector("[data-order-caption="+caption_selector+"]");


        const arr_registry_name= document.querySelectorAll("[data-registry-name]");
        const req_InfoData = new Object();
        const resolve_saveRegistryInfo = resolve_mapping
        const formData = new FormData();

        arr_registry_name.forEach((item,index)=>{
            const registry_name = item.getAttribute("data-registry-name")
            const registry_val = registryObj[registry_name].value
            const registryObj_errorMsg = registryObj[registry_name].error_msg
            if(! registry_val.length){
                registryInfo_msg("on",registry_name,registryObj_errorMsg);
            }else{
                formData.append(registry_name,registry_val)
                req_InfoData[registry_name]=registry_val;
            }
        });

        const object_keys = Object.keys(req_InfoData);
        let info_tag = ""
        for(let i=0; i<object_keys.length; i++){
            let item = object_keys[i];
            let object_val =  req_InfoData[item];
            if(item=="basicMain"){
                continue
            }
            if(item=="deliveryIndex"){
                continue
            }
            if(item=="Firstname"){
                info_tag += `<p><span data-registry-edit="${item}">${object_val}</span>&nbsp;`
                continue
            }
            if(item=="Lastname"){
                info_tag += `<span data-registry-edit="${item}">${object_val}</span></p>`;
                continue
            }
            info_tag += `<p><span data-registry-edit="${item}">${object_val}</span></p>`
        }
        console.log("object_keys.length",object_keys.length)
        console.log("arr_registry_name.length",arr_registry_name.length)
        // 저장된 객체 개수와 전체 태그 개수 일치 비교
        if(object_keys.length != arr_registry_name.length){
            return
        }
        create_editOrderHeader(caption_selector);
        return

        const response = await axios.put(
            resolve_saveRegistryInfo,
            formData
        ).then(()=> {
            caption.innerHTML = info_tag;
            exit_termBox();
        })
   }

   // 주문자 정보 save btn
   $(document).on("click",'button[data-btn-order="registryInfo"]',async function(){
        const resolve_mapping = "/order/save_registryInfo"
        const caption_selector = "info"
        const save_source = await info_save_source(caption_selector,resolve_mapping)
   })

   function body_append(position, text){
           const body = document.querySelector("body");
           body.insertAdjacentHTML(position,text);
   }

   // 주문자정보 등록
   $("#OrderRegistry_info").click(function(){
        const orderRegistryInfo_tag =create_orderRegistryInfo_tag();
        body_append("afterbegin",orderRegistryInfo_tag);
   });
   // 주문자정보 수정
   $("#OrderRegistry_infoEdit").click(function(){
        const orderRegistryInfo_tag =create_orderRegistryInfo_tag();
        body_append("afterbegin",orderRegistryInfo_tag);
        const edit_registryInfo =  document.querySelectorAll("[data-registry-edit]");

        edit_registryInfo.forEach((item,index)=>{
            let item_name= item.getAttribute("data-registry-edit");
            let item_val= item.textContent;
            $("input[data-registry-name="+item_name+"]").val(item_val)
        });
   })

   //배송지 첫 등록
   $(document).on("click","button#OrderRegistry_delivery",function(){
        const orderRegistryDelivery_tag = create_orderRegistryDelivery_tag(0,0);
        body_append("afterbegin",orderRegistryDelivery_tag)
   })

   // 배송지 정보는 최대 3개만 등록 가능
   $(document).on("click","button#OrderRegistry_delivery2",function(){
        const arr_addrSelect = document.querySelectorAll('input[name="addrSelect"]');
        if(arr_addrSelect.length >= 3){
            return alert("최대 3개까지만 등록 가능합니다.");
        }

        let deliveryIndex_guide = [0,1,2]
        let delivery_index = 0;

        if(! arr_addrSelect.length){
            delivery_index = 0
        }else{
            const arr_selectVal = [...arr_addrSelect].map((val)=> Number(val.value))
            const result_selectVal =deliveryIndex_guide.filter(val => ! arr_selectVal.includes(val));
            delivery_index = result_selectVal[0]
        }
        const orderRegistryDelivery_tag = create_orderRegistryDelivery_tag(delivery_index,delivery_index);
        body_append("afterbegin",orderRegistryDelivery_tag)
   });
   // 배송지 정보 변경
   $(document).on("click",'button#OrderRegistry_deliveryEdit',function(){
        const orderRegistryDelivery_editTag = create_orderRegistryDelivery_editTag();
        body_append("afterbegin",orderRegistryDelivery_editTag)
   });

   //배송지정보 save btn
   $(document).on("click",'button[data-btn-order="registryDelivery"]',async function(){
        const resolve_mapping = "/order/save_deliveryInfo"
        const caption_selector = "deliveryAddr"
        const basicAddr_check = document.querySelector('input[data-registry-name="basicMain"]:checked');

        if(basicAddr_check != null){
            registryObj["basicMain"].value= basicAddr_check.value
        }
        registryObj["mainAddr"].value = $("#mainAddr").val();
        registryObj["postNum"].value = $("#postNum").val();
        registryObj["deliveryIndex"].value = $('input[data-registry-name="deliveryIndex"]').val();
        const save_source = await info_save_source(caption_selector,resolve_mapping)
   });

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
});