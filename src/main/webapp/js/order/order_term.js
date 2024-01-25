$(function(){
    const orderTerm1 = document.getElementById("orderTerm1");
    const orderTerm2 = document.getElementById("orderTerm2");
    // 주문 상품 정보, 가격, 배송, 반품, 교환, 환불 정책에 동의
    const create_orderInfoTerm1_Tag = ()=>{
        const termTag = `<div id="Term_BOX" class="termBox">
                             <div class="term_contentBox">
                                 <header class="termHeader">
                                     <h1>주문 상품 정보, 가격, 배송, 반품, 교환, 환불 정책에 동의</h1>
                                     <h2>주문 상품 정보, 가격, 배송, 반품, 교환, 환불 정책에 동의</h2>
                                 </header>
                                 <section class="termContent">
                                     <h1>상품 주문을 위해 위버스샵 상품 상세 페이지에 기술 된 내용 및 정책에 모두 동의합니다.</h1>
                                     <ul>
                                         <li>1. 상품 배송 정보</li>
                                         <li>2. 그 외 상품 안내사항</li>
                                         <li>3. 상품 고시정보</li>
                                         <li>4. 반품 / 교환 / 환불 정보</li>
                                     </ul>
                                 </section>
                                 <footer class="termOkBtn">
                                     <button id="termBoxExit" type="button">ok</button>
                                 </footer>
                             </div>
                         </div>`
        return termTag;
    }
    const create_orderInfoTerm2_Tag =()=>{
        const termTag2 =`<div id="Term_BOX" class="termBox">
                             <div class="term_contentBox">
                                 <header class="termHeader">
                                     <h1>개인정보 수집 이용 동의</h1>
                                     <h2>개인정보 수집 이용 동의(필수)</h2>
                                 </header>
                                 <section style="overflow-y:auto;" class="termContent">
                                     <p>수집 이용 목적</p>
                                     <ul>
                                         <li>상품 구매 시 상품 배송을 위한 주문자 정보 및 배송정보 입력을 위함</li>
                                     </ul>
                                     <p>수집 이용 항목</p>
                                     <ul>
                                         <li>주문자 정보(성명, 이메일, 연락처), 배송지 정보(성명, 연락처, 주소), (특정국가 배송 시) 세금식별번호</li>
                                     </ul>
                                     <div style="margin:1vh 0; border-bottom:2px solid #adadad;"></div>
                                     <p>수집 이용 목적</p>
                                     <ul>
                                         <li>상품 구매 시 상품 배송을 위한 주문자 정보 및 배송정보 입력을 위함</li>
                                     </ul>
                                     <p>수집 이용 항목</p>
                                     <ul>
                                         <li>주문자 정보(성명, 이메일, 연락처), 배송지 정보(성명, 연락처, 주소), (특정국가 배송 시) 세금식별번호</li>
                                     </ul>
                                     <p>보유 및 이용기간</p>
                                     <ul>
                                         <li style="font-weight:600;">관련 법령에 따른 보존기간 또는 탈퇴 후 3개월 이내</li>
                                     </ul>
                                     <div style="margin-top:2vh; font-size:1.2em; color:#898989;">※ 위 동의를 거부할 권리가 있으며, 동의를 거부하실 경우 위 목적의 서비스 이용이 제한될 수 있습니다.</div>
                                 </section>
                                 <footer class="termOkBtn">
                                     <button id="termBoxExit" type="button">ok</button>
                                 </footer>
                             </div>
                         </div>`
        return termTag2;
    }

    $(document).on("click","button#termBoxExit",function(){
        const Term_BOX = document.querySelector("#Term_BOX");
        Term_BOX.remove();
    });

    const body_append = (position, text) =>{
            const body = document.querySelector("body");
            body.insertAdjacentHTML(position,text);
    }
    // 주문 상품 정보, 가격, 배송, 반품, 교환, 환불 정책에 동의
    orderTerm1.addEventListener("click",function(){
            const term1_tag = create_orderInfoTerm1_Tag();
            body_append("afterbegin",term1_tag)
    });
    // 개인정보 수집 이용 동의
    orderTerm2.addEventListener("click",function(){
            const term2_tag = create_orderInfoTerm2_Tag();
            body_append("afterbegin",term2_tag)
    });
});