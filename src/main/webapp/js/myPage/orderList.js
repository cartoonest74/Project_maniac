$(function(){
    const artistId = document.getElementById("artistId").value;

    const create_orderList_tag = (val,obj_contents)=>{
        const completeUrl = `/order/${artistId}/complete?orderKey=${val}`
        const olc_info= obj_contents[val].join("");
        const purchaseStatus = obj_contents[val]["status"];
        const purchaseAmount = obj_contents[val]["amount"];
        const purchaseDate = obj_contents[val]["date"];
        const arriveDate = "";

        const date_tag =`<h2 data-orderList-date="${purchaseDate}">${purchaseDate}</h2>&nbsp;`;
        // h2 날짜 태그 한번만 만듬

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

    const post_orderList = async (page=1,date=1,status="all")=>{
        const resolve_postOrderList =`/myPage/${artistId}/order_list?page=${page}&date=${date}&status=${status}`
        const res = await axios.post(resolve_postOrderList)
                        .then((response)=>response.data)
                        .then(data=>{
                            const orderList_array = data.orderList_array
                            return orderList_array;
                        }).catch(error=>console.log(error));
        return res;
    }

    const start_main = async () =>{
        const olContainer = document.getElementById("olContainer");
        const res = await post_orderList();
        const obj_contents = new Object();
        let copy_num = 0;
        let list_tag = "";
        if(res.length == 0){
            olContainer.innerHTML=`<div style="margin:10vh; font-size:1.5em;">주문 내역이 없습니다.</div>`;
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
                        return "$"+val;
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
            console.log("list_tag",list_tag)
            copy_num = purchaseList_num;
        })

        const arr_key = Object.keys(obj_contents);
        arr_key.forEach(val=>{
            const orderList_tag = create_orderList_tag(val,obj_contents);
            olContainer.insertAdjacentHTML("beforeend",orderList_tag);
        });
    }
    start_main();
})