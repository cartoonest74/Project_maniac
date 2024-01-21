$(function(){
   const body_append = (position, text) =>{
          const body = document.querySelector("body");
          body.insertAdjacentHTML(position,text);
   }

   const addrEditBox_display=(is_display)=>{
         const addrEdit_Box=document.querySelector("#addrEdit_Box");
         if(addrEdit_Box == null){
            return
         }
         addrEdit_Box.style.display = is_display;
   }
   const mainDeliveryAdd_tag=()=>{
        const addrPart = document.getElementById("addrPart")
        const main_deliveryAdd_tag = `<nav data-order-header="deliveryAddr" data-orderHeader-part="add" class="orderInfoHeader justify-content-between">
                                                        <h2>배송주소</h2>
                                                        <button id="OrderRegistry_delivery" type="button">등록</button>
                                                    </nav>
                                                    <div data-order-caption="deliveryAddr" class="orderInfoSubCaption">배송 주소 정보를 등록주세요</div>`
        addrPart.innerHTML = main_deliveryAdd_tag
        return ""
   }
   /* main 배송주소 업데이트 태그 */
   const create_mainDeliveryInfo_tag=()=>{
       const arr_addrSelect = document.querySelectorAll('[name="addrSelect"]');
       if(arr_addrSelect.length == 0){
            mainDeliveryAdd_tag();
       }
       let menu_checkIndex = 0;
       arr_addrSelect.forEach((val)=>{
            if(val.checked){
                menu_checkIndex = val.value
            }
       });
       const arr_addrCheckData = document.querySelectorAll(`p[data-addrSelect-num="${menu_checkIndex}"]`)
       let addrCheck_text = ""
       arr_addrCheckData.forEach((val)=>{
                addrCheck_text += "<p>"+val.innerHTML+"</p>";
       });

       const cap_deliveryAddr = document.querySelector('[data-order-caption="deliveryAddr"]');
       cap_deliveryAddr.innerHTML = addrCheck_text;

       const popup_tag = "addrEdit_Box";
       exit_termBox(popup_tag)

       /* 기본마크 지우기 */
       const basic_mark_tag = document.querySelector("[data-basic-check]");
       if(basic_mark_tag == null){
            return ""
       }
       basic_mark_tag.remove()
   }

// 주문지 및 배송지 팝업창 닫기
   const exit_termBox = (popup_tag)=>{
        const Term_BOX = document.getElementById(popup_tag);
        Term_BOX.remove();
        addrEditBox_display("flex")
   }

   $(document).on("click","button#termClose",function(){
        const popup_tag = "Term_BOX";
        exit_termBox(popup_tag);
   });

   $(document).on("click","button#editAddrClose",function(){
        create_mainDeliveryInfo_tag();
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

  // 등록정보 obj
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
   const create_orderRegistryDelivery_tag=(basic_index,delivery_index)=>{
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
        if(basic_index == delivery_index){
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
                                                       <input type="text" data-registry-name="Firstname" value="" placeholder="성을 입력해주세요">
                                                       <span data-registry-val="Firstname" class="none orInfo_errMsg"></span>
                                                   </nav>
                                                   <nav class="orInfo">
                                                       <span class="orInfo_title">이름</span>
                                                       <input type="text" data-registry-name="Lastname" value="" placeholder="이름을 입력해주세요">
                                                       <span data-registry-val="Lastname" class="none orInfo_errMsg"></span>
                                                   </nav>
                                                   <nav class="orInfo">
                                                       <span class="orInfo_title">주소</span>
                                                       <div class="orAddr_search">
                                                           <input data-registry-name="mainAddr" type="text" value="" id="mainAddr" placeholder="주소" readonly>
                                                           <button onclick="addr_execDaumPostcode()" type="button" class="oraddr_icon">
                                                               <i class="fa-solid fa-magnifying-glass"></i>
                                                           </button>
                                                       </div>
                                                       <span data-registry-val="mainAddr" class="none orInfo_errMsg"></span>
                                                       <span class="orInfo_title"></span>
                                                       <input type="text" data-registry-name="detailAddr" value="" id="detailAddr" placeholder="상세주소">
                                                       <span data-registry-val="detailAddr" class="none orInfo_errMsg"></span>
                                                   </nav>
                                                   <nav class="orInfo">
                                                       <span class="orInfo_title">우편번호</span>
                                                       <input type="text" data-registry-name="postNum" value="" id="postNum" placeholder="우편번호" readonly>
                                                       <span data-registry-val="postNum" class="none orInfo_errMsg"></span>
                                                   </nav>
                                                   <nav class="orInfo">
                                                       <span class="orInfo_title">전화번호</span>
                                                       <input type="tel" data-registry-name="Tel" value="" placeholder="전화번호를 입력해주세요">
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
   /* 배송지 주소선택 메뉴 - 메뉴 태그 */
   const create_deliveryInfo_tag = (obj_deliveryInfo)=>{
        const home_deliveryIndex_tag = document.querySelector('input[name="home_deliveryIndex"]')
        const home_deliveryIndex = home_deliveryIndex_tag != null? home_deliveryIndex_tag.value:0
        const basic_main = obj_deliveryInfo.basic_main;
        const delivery_index = obj_deliveryInfo.delivery_index;
        const firstname = obj_deliveryInfo.firstname.trim();
        const lastname = obj_deliveryInfo.lastname.trim();
        const main_addr = obj_deliveryInfo.main_addr.trim();
        const detail_addr = obj_deliveryInfo.detail_addr.trim();
        const post_num = obj_deliveryInfo.post_num.trim();
        const tel = obj_deliveryInfo.tel.trim();
//        console.log("basic_main",basic_main)
//        console.log("delivery_index",delivery_index)

        /* main에 나와 있는 배송주소 index로 check */
        const main_check = home_deliveryIndex == delivery_index? "checked": "";

        /* 기본설정 */
        const basic_mark = basic_main == delivery_index? `<span data-basic-check="${basic_main}" class="addrBasic_mark">기본</span>` : "";

        const deliveryInfo_tag =`<div class="orAddrContent">
                                     <label for="${delivery_index}">
                                         <input type="radio" name="addrSelect" value="${delivery_index}" ${main_check}>
                                         <span class="addrSelect_check">
                                             <span></span>
                                         </span>
                                     </label>
                                     <nav class="orAddrInfo">
                                         <p data-addrSelect-num="${delivery_index}" style="color:#2ead83bd">
                                            <input name="home_deliveryIndex" value="${delivery_index}" hidden="hidden"/>
                                            <span data-addrSelect-part="Firstname" data-addrSelect-partIndex="${delivery_index}">${firstname}</span>
                                            <span data-addrSelect-part="Lastname" data-addrSelect-partIndex="${delivery_index}">${lastname}</span>${basic_mark}
                                         </p>
                                         <p data-addrSelect-num="${delivery_index}">
                                             <span data-addrSelect-part="mainAddr" data-addrSelect-partIndex="${delivery_index}">${main_addr}</span>&nbsp;
                                             <span data-addrSelect-part="detailAddr" data-addrSelect-partIndex="${delivery_index}">${detail_addr}</span>
                                         </p>
                                         <p data-addrSelect-num="${delivery_index}">
                                             <span data-addrSelect-part="postNum" data-addrSelect-partIndex="${delivery_index}">${post_num}</span>
                                         </p>
                                         <p data-addrSelect-num="${delivery_index}">
                                             <span data-addrSelect-part="Tel" data-addrSelect-partIndex="${delivery_index}">${tel}</span>
                                         </p>
                                         <nav class="orAddrBtn">
                                             <button data-addr-edit="${delivery_index}" type="button">수정</button>
                                             <button data-addr-del="${delivery_index}" type="button">삭제</button>
                                         </nav>
                                     </nav>
                                 </div>`
        return deliveryInfo_tag;
   }

   // 배송지 주소 정보 메뉴 - 변경 태그
   const create_orderRegistryDelivery_editTag = (json_array)=>{
        const arr_deliveryInfo_tag = new Array();
        let top_index  = 0;
        let j_index = 0;
        for(const i in json_array.delivery_array){
            const obj_deliveryInfo = JSON.parse(json_array.delivery_array[i]);
            const basic_main = obj_deliveryInfo.basic_main;
            const delivery_index = obj_deliveryInfo.delivery_index;
            if(obj_deliveryInfo.post_num == null){
                continue
            }
            arr_deliveryInfo_tag.push(create_deliveryInfo_tag(obj_deliveryInfo))
            if(basic_main == delivery_index){
                top_index = j_index;
            }
            j_index ++;
        }
        if(arr_deliveryInfo_tag.length > 1){
            const basic_tag = arr_deliveryInfo_tag.splice(top_index,1);
            arr_deliveryInfo_tag.unshift(basic_tag);
        }
        deliveryInfo_tag = arr_deliveryInfo_tag.join(",");
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
                                             <section class="orAddrContents">`;
        orderRegistryDelivery_tag+=deliveryInfo_tag;
        orderRegistryDelivery_tag +=`</section>
                                     <footer class="orAddrSaveBtn">
                                         <button id="editDeliveryMenu_ok" type="button">ok</button>
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

   // TODO 주문자&배송지 save source
   const info_save_source = async (caption_selector,resolve_mapping)=>{
        /* orderInfoSubCaption */
        const caption = document.querySelector("[data-order-caption="+caption_selector+"]");

        const arr_registry_name= document.querySelectorAll("[data-registry-name]");
        const req_InfoData = new Object();
        const resolve_saveRegistryInfo = resolve_mapping;
        const formData = new FormData();

        let basic_index = 0;
        const basic_main = document.querySelector("span[data-basic-check]");
        if(basic_main != null){
            const basic_check_tag = document.querySelector('input[data-registry-name="basicMain"]');
            const basic_check_index = basic_check_tag.value
            const basic_main_index = basic_main.getAttribute("data-basic-check");
            const basic_index = basic_check_tag.checked? basic_check_index:basic_main_index;
            registryObj["basicMain"].value = basic_index;
        }

        arr_registry_name.forEach((item,index)=>{
            const registry_name = item.getAttribute("data-registry-name")
            const registry_val = registryObj[registry_name].value
            const registryObj_errorMsg = registryObj[registry_name].error_msg
//            console.log("registry_name",registry_name)
//            console.log("registry_val",registry_val)
            if(! registry_val.length){
                registryInfo_msg("on",registry_name,registryObj_errorMsg);
            }else{
                formData.append(registry_name,registry_val)
                req_InfoData[registry_name]=registry_val;
            }
        });

        const object_keys = Object.keys(req_InfoData);
        let info_tag = ""
        /* 배송주소 처음 등록할 경우 main에 들어갈 tag */
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
//        console.log("object_keys.length",object_keys.length)
//        console.log("arr_registry_name.length",arr_registry_name.length)
        // 저장된 객체 개수와 전체 태그 개수 일치 비교
        if(object_keys.length != arr_registry_name.length){
            return
        }
        create_editOrderHeader(caption_selector);
        const response = await axios.put(
            resolve_saveRegistryInfo,
            formData
        ).then(()=> {
            const is_addrEdit_Box = document.querySelector("#addrEdit_Box");
            if(is_addrEdit_Box == null){
                caption.innerHTML = info_tag;
            }
            const close_boxTag = "Term_BOX";
            exit_termBox(close_boxTag);
        })
   }

   // 주문자 정보 save btn
   $(document).on("click",'button[data-btn-order="registryInfo"]',async function(){
        const resolve_mapping = "/order/save_registryInfo"
        const caption_selector = "info"
        const save_source = await info_save_source(caption_selector,resolve_mapping)
   })

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

   // TODO 배송지
   //배송지 첫 등록
   $(document).on("click","button#OrderRegistry_delivery",function(){
        const orderRegistryDelivery_tag = create_orderRegistryDelivery_tag(0,0);
        body_append("afterbegin",orderRegistryDelivery_tag)
   })

   // 배송지 정보는 최대 3개만 등록 가능
   $(document).on("click","button#OrderRegistry_delivery2",function(){
        const arr_addrSelect = document.querySelectorAll('input[name="addrSelect"]');
        const basic_check_tag = document.querySelector('span[data-basic-check]')
        const basic_index = basic_check_tag != null? basic_check_tag.getAttribute("data-basic-check"):0
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
        addrEditBox_display("none");
        const orderRegistryDelivery_tag = create_orderRegistryDelivery_tag(basic_index,delivery_index);
        body_append("afterbegin",orderRegistryDelivery_tag)
   });

   // 배송지 정보들 데이터 가져오기
   const post_deliveryInfo= async ()=>{
        const post_deliveryInfo_resolve = "/order/deliveryInfo"
        const res= await axios.post(post_deliveryInfo_resolve)
        .then((response)=>response.data)
        .then(data=>{
            const orDelivery_editTag = create_orderRegistryDelivery_editTag(data)
            return orDelivery_editTag;
        });
        return(res)
   }

   // 배송지 주소선택 메뉴 박스 열기
   $(document).on("click",'button#OrderRegistry_deliveryEdit', async function(){
        const orderRegistryDelivery_editTag = await post_deliveryInfo();
        body_append("afterbegin",orderRegistryDelivery_editTag)

   });

   // 배송지 주소선택 - 수정
   $(document).on("click","button[data-addr-edit]",function(e){
        const basic_index = document.querySelector('span[data-basic-check]').getAttribute("data-basic-check")
        const delivery_index = e.target.getAttribute("data-addr-edit");
        const arr_addrEdit = document.querySelectorAll(`[data-addrSelect-partIndex="${delivery_index}"]`)

        arr_addrEdit.forEach((val)=>{
            const key = val.getAttribute("data-addrSelect-part");
            const value = val.textContent
            registryObj[key].value= value
        })
        const orderRegistryDelivery_tag = create_orderRegistryDelivery_tag(basic_index,delivery_index);
        body_append("afterbegin",orderRegistryDelivery_tag)
        registryObj["basicMain"].value = delivery_index;
        registryObj["deliveryIndex"].value = delivery_index;
        addrEditBox_display("none");
        const arr_registry_name = document.querySelectorAll("input[data-registry-name]");
        arr_registry_name.forEach((val)=>{
            const registry_name = val.getAttribute("data-registry-name");
            if(Object.keys(registryObj).includes(registry_name)){
                const edit_val = registryObj[registry_name].value;
                val.setAttribute("value",edit_val)
            }
        })
   })

   // 배송지 주소선택 메뉴 박스 - 삭제
   $(document).on("click","button[data-addr-del]",async function(e){
        const delivery_delNum = e.target.getAttribute("data-addr-del");
        const del_deliveryInfo_resolve = "/order/del_deliveryInfo"
        const arr_addrSelect = document.querySelectorAll('input[name="addrSelect"]');
        const basic_check_index = document.querySelector('span[data-basic-check]').getAttribute("data-basic-check");
        const home_deliveryIndex_tag = document.querySelector('input[name="home_deliveryIndex"]');
        /* 기본 주소를 삭제할경우 2번째 주소가 기본이 되게 설정 */
        const basic_main = basic_check_index == delivery_delNum && arr_addrSelect.length > 1? arr_addrSelect[1].value : 0;
        const formData = new FormData();
        formData.append("basicMain",basic_main);
        formData.append("deliveryIndex",delivery_delNum);

        const update_delAddr = await axios.put(del_deliveryInfo_resolve,formData)
                                         .then((response)=>response.data)
                                         .then(data=>console.log(data));

        exit_termBox("addrEdit_Box");
        const orderRegistryDelivery_editTag = await post_deliveryInfo();
        body_append("afterbegin",orderRegistryDelivery_editTag);
        /* 배송지 주소 선택 메뉴 창에 menu list가 0일 경우 #addrPart 등록모드로 변경
            , main home_index == delivery_delNum 같은 경우
            [data-order-caption="deliveryAddr"]안에 비우기 */
        if(home_deliveryIndex_tag.value == delivery_delNum){
            const caption_delivery = document.querySelector('div[data-order-caption="deliveryAddr"]')
            caption_delivery.innerHTML = "";
        }
   });

   // 배송지 선택 메뉴 OK 버튼
   $(document).on("click","button#editDeliveryMenu_ok",function(){
        create_mainDeliveryInfo_tag();
   });

   //배송지정보 save btn
   $(document).on("click",'button[data-btn-order="registryDelivery"]',async function(){
        const resolve_mapping = "/order/save_deliveryInfo"
        const caption_selector = "deliveryAddr"
        const basicAddr_check = document.querySelector('input[data-registry-name="basicMain"]:checked');

        if(basicAddr_check != null){
            registryObj["basicMain"].value= basicAddr_check.value
        }

        registryObj["mainAddr"].value =document.querySelector("#mainAddr").value;
        registryObj["postNum"].value =document.querySelector("#postNum").value;
        registryObj["deliveryIndex"].value =document.querySelector('input[data-registry-name="deliveryIndex"]').value;
        const save_source = await info_save_source(caption_selector,resolve_mapping)
        /*배송지 주소선택 메뉴 박스 check*/
        const addrEdit_Box = document.querySelector("#addrEdit_Box")
        if(addrEdit_Box == null){
            return
        }
        addrEdit_Box.remove()
        const orderRegistryDelivery_editTag = await post_deliveryInfo();
        body_append("afterbegin",orderRegistryDelivery_editTag);
   });

});