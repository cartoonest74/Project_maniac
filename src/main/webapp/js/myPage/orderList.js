$(function(){
    const artistId = document.getElementById("artistId").value;
    const orderListSearch = document.getElementById("orderListSearch");
    const option_month_tag = document.querySelector("span[data-olOption-month]");
    const option_status_tag = document.querySelector("span[data-olOption-status]");

    const orderStatus_obj = [
            {name:"전체"},
            {name:"미입금"},
            {name:"상품대기"},
            {name:"배송중"},
            {name:"배송완료"},
            {name:"취소/교환/반품"}
    ]
    const olOption_obj = {
        month:1,
        status:0
    }

    // 조건 검색 tag
    const create_olOption_tag = () => {
        const olOption_tag = `<div id="olOptionBox" class="ol_optionBox">
                                  <div class="ol_optionContainer">
                                      <div class="ol_optionExitBtn">
                                          <button id="olOptionExitBtn" type="button">
                                              <i class="fa-solid fa-xmark fa-lg"></i>
                                          </button>
                                      </div>
                                      <div class="ol_optionContent">
                                          <h2>조회기간</h2>
                                          <nav class="radio_item">
                                              <input id="basicMonth" value="1" type="radio" name="month" checked>
                                              <label for="1">1개월</label>
                                          </nav>
                                          <nav class="radio_item">
                                              <input value="3" type="radio" name="month">
                                              <label for="3">3개월</label>
                                          </nav>
                                          <nav class="radio_item">
                                              <input value="6" type="radio" name="month">
                                              <label for="6">6개월</label>
                                          </nav>
                                      </div>
                                      <div class="ol_optionContent">
                                          <h2>주문상태</h2>
                                          <nav class="radio_item">
                                              <input id="basicStatus" type="radio" name="status" value="0" checked>
                                              <label for="0">전체</label>
                                          </nav>
                                          <nav class="radio_item">
                                              <input type="radio" name="status" value="1">
                                              <label for="1">미입금</label>
                                          </nav>
                                          <nav class="radio_item">
                                              <input type="radio" name="status" value="2">
                                              <label for="2">상품대기</label>
                                          </nav>
                                          <nav class="radio_item">
                                              <input type="radio" name="status" value="3">
                                              <label for="3">배송중</label>
                                          </nav>
                                          <nav class="radio_item">
                                              <input type="radio" name="status" value="4">
                                              <label for="4">배송완료</label>
                                          </nav>
                                          <nav class="radio_item">
                                              <input type="radio" name="status" value="5">
                                              <label for="5">취소/교환/반품</label>
                                          </nav>
                                      </div>
                                      <div class="ol_optionContent">
                                          <h2></h2>
                                          <button id="olOption_reset" type="button"><i class="fa-solid fa-repeat"></i>선택 초기화</button>
                                          <button id="olOption_search" type="button">검색</button>
                                      </div>
                                  </div>
                              </div>`;

        const body = document.querySelector("body");
        body.insertAdjacentHTML("afterbegin",olOption_tag);
    }
    // POST ORDERLIST
    const post_orderList = async (date=1,status=0,onOff="on")=>{
        // click category id
        date = olOption_obj.month
        status = olOption_obj.status

        const formData = new FormData();
        formData.append("date",date);
        formData.append("status",status);

        let current_url = location.href;
        if(typeof(history.pushState)=='function' && onOff == "on"){
            current_url = current_url.replace(/\?month=([0-9])&status=([0-9])/ig,'')
            current_url += "?month="+(Number(date))+"&status="+(Number(status))
            history.pushState({month:date,status:status},null,current_url)
        }
        const resolve_postOrderList =`/myPage/${artistId}/order_list`
        const res = await axios.post(resolve_postOrderList,formData)
                        .then((response)=>response.data)
                        .then(data=>{
                            const orderList_array = data.orderList_array
                            return orderList_array;
                        }).catch(error=>console.log(error));
        return res;
    }

    // orderList tag1
    const create_orderList_tag = (val,obj_contents)=>{
        const completeUrl = `/order/${artistId}/complete?orderKey=${val}`
        const olc_info= obj_contents[val].join("");
        const purchaseAmount = obj_contents[val]["amount"];
        const purchaseDate = obj_contents[val]["date"];
        const arriveDate = "";

        const purchaseStatus_val = obj_contents[val]["status"];
        const purchaseStatus = orderStatus_obj[purchaseStatus_val].name;

        const date_tag =`<h2 data-orderList-date="${purchaseDate}">${purchaseDate}</h2>&nbsp;`;

        const orderList_tag=`<div class="orderListCotentBox">
                               <dt class="olc_dateTitle">
                                   <div>
                                       ${date_tag}
                                       <span>주문번호 ${val}</span>
                                   </div>
                                   <div>
                                       <a href="${completeUrl}">주문상세&nbsp;<i class="fa-solid fa-chevron-right fa-sm"></i></a>
                                   </div>
                               </dt>
                               <dd class="orderListCotent">
                                   <div class="olc_header">
                                       <p>${purchaseStatus}</p>
                                       <p>${arriveDate}</p>
                                   </div>
                                   <div class="olc_info">
                                       ${olc_info}
                                   </div>
                                   <p class="olc_price">
                                       ${purchaseAmount}
                                   </p>
                               </dd>
                           </div>`
        return orderList_tag;
    };

    // ORDER LIST START
    const start_main = async (date=1,status=0) =>{
        const olContainer = document.getElementById("olContainer");
        const res = await post_orderList(date,status);

        const option_month = option_month_tag.getAttribute("data-olOption-month");
        const option_status = option_status_tag.getAttribute("data-olOption-status");
        const obj_contents = new Object();
        let copy_num = 0;
        let list_tag = "";

        option_month_tag.innerText = `${option_month}개월`;
        option_status_tag.innerText = orderStatus_obj[option_status].name;
        // 주문내역이 없을 경우
        if(res.length == 0){
            olContainer.innerHTML=`<div style="padding:10vh; font-size:1.5em;">주문 내역이 없습니다.</div>`;
           return;
        }
        res.forEach(str_json=>{
            const purchase_list = JSON.parse(str_json);
            const purchaseList_num =purchase_list.num
            const purchaseList_title =purchase_list.title
            const purchaseList_date =purchase_list.purchase_date
            const purchaseList_quantity =purchase_list.quantity
            const option_title =purchase_list.option_title
            const purchaseList_status =purchase_list.purchase_status
            const purchaseList_amount =purchase_list.total_price

            const date = new Date(Number(purchaseList_date));
            const purchaseDate = date.toISOString()
                                    .split("T")[0]
                                    .replace(/[-]/g,".");

            if(purchaseList_num != copy_num){
                list_tag = "";
                const arr_amount = purchaseList_amount.toString().split('').toReversed();
                // $ 변환
                const trans_amount = arr_amount.map((val,index)=>{
                    if(arr_amount.length == index +1){
                        return "₩"+val;
                    }

                    if((index+1)%3 == 0){
                        return ","+val;
                    }

                    return val;
                }).toReversed().join("");
                obj_contents[purchaseList_date] = new Array();
                obj_contents[purchaseList_date]["status"] = purchaseList_status;
                obj_contents[purchaseList_date]["amount"] = trans_amount;
                obj_contents[purchaseList_date]["date"] = purchaseDate;
            }

            // list_tag
            if(option_title=="single"){
                list_tag = `<p>
                                <span style="font-size:1.3em; font-weight:600;">${purchaseList_title}</span>
                                <span>&nbsp;(${purchaseList_quantity})</span>
                            </p>`;
            }else{
                list_tag = `<p>
                                <span style="font-size:1.3em; font-weight:600;">${purchaseList_title}</span>
                             </p>
                             <p>
                                <span style="font-size:1.3em; font-weight:400;">&#183;${option_title}</span>
                                <span>&nbsp;(${purchaseList_quantity})</span>
                            </p>`;
            }

            obj_contents[purchaseList_date].push(list_tag);
            copy_num = purchaseList_num;
        })

        const arr_key = Object.keys(obj_contents);
        const arr_orderListTags = new Array();
        arr_key.forEach(val=>{
            const orderList_tag = create_orderList_tag(val,obj_contents);
            arr_orderListTags.push(orderList_tag);
        });
        olContainer.innerHTML= arr_orderListTags.join("");
    }
    start_main();

    // 조건 조회 remove
    const remove_olOptionBox = ()=>{
        const olOptionBox = document.querySelector("#olOptionBox");
        olOptionBox.remove();
    }
    // 조건 조회 닫기
    $(document).on("click","button#olOptionExitBtn",function(){
        remove_olOptionBox();
    });

    // 조건 reset
    $(document).on("click","button#olOption_reset",function(){
        document.querySelector('input#basicMonth').checked = true;
        document.querySelector('input#basicStatus').checked = true;
    });
    // 조건 검색 btn
    $(document).on("click","button#olOption_search",async function(){
        const date = document.querySelector('input[name="month"]:checked').value;
        const status = document.querySelector('input[name="status"]:checked').value;

        option_month_tag.setAttribute('data-olOption-month',date);
        option_status_tag.setAttribute('data-olOption-status',status);
//
//        const ols_title = document.getElementById("ols_title");
//        ols_title.innerHTML = `${trans_month}&#183;${trans_status}`;

        olOption_obj.month = date;
        olOption_obj.status = status;

        const trans_main =  await start_main(date,status);
        remove_olOptionBox();
    });
    // 조건 검색상자 열기 btn
    orderListSearch.addEventListener("click",function(){
        create_olOption_tag();
        const month_val = option_month_tag.getAttribute("data-olOption-month");
        const status_val = option_status_tag.getAttribute("data-olOption-status");
        document.querySelector(`input[name="month"][value="${month_val}"]`).checked =true;
        document.querySelector(`input[name="status"][value="${status_val}"]`).checked =true;
    });

    //    뒤로가기, 앞으로 클릭시 이벤트
    window.onpopstate=function(event){
        let current_url = document.location;
        let review_limit = event.state.page;
        const onOff = "off";
        let date = olOption_obj.month
        let status = olOption_obj.status
        post_orderList(date, status, onOff);
    }
})