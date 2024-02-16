$(function(){
    const orderStatus_obj = [
        {name:"전체"},
        {name:"미입금"},
        {name:"상품대기"},
        {name:"배송중"},
        {name:"배송완료"},
        {name:"취소/교환/반품"}
    ]
    const trans_purchaseStatus=()=>{
        const purchaseStatus = document.getElementById("purchaseStatus");
        const purchaseStatus_val = purchaseStatus.innerText;
        const trans_purchaseStatusVal = orderStatus_obj[purchaseStatus_val].name;
        purchaseStatus.innerText = trans_purchaseStatusVal;
    }

    const trans_amount=()=>{
        const purchaseAmount = document.getElementById("purchaseAmount")
        const purchaseAmount_val  = purchaseAmount.innerText
        const arr_amount = purchaseAmount_val.toString().split('').toReversed();
        // $ 변환
        const trans_amountVal = arr_amount.map((val,index)=>{
            if(arr_amount.length == index +1){
                return "₩"+val;
            }

            if((index+1)%3 == 0){
                return ","+val;
            }

            return val;
        }).toReversed().join("");

        purchaseAmount.innerText =trans_amountVal;
    }

    trans_amount();
    trans_purchaseStatus();
})