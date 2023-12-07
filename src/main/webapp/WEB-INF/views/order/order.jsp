<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="utf-8" isELIgnored="false"%>
<%@ page import="model.*, java.util.*"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<%
request.setCharacterEncoding("UTF-8");
%>

<c:set var="contextPath" value="${pageContext.request.contextPath}" />

<link rel="stylesheet"
	href="${pageContext.request.contextPath}/css/main.css">
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/css/basic.css">
	<link rel="stylesheet" href="${contextPath}/css/search_artist.css">
    <link rel="stylesheet" href="${contextPath}/css/resizeMenu.css">
    <link rel="stylesheet" href="${contextPath}/css/mediaquery.css">
<title>Document</title>

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;900&display=swap" rel="stylesheet">

<script src="https://kit.fontawesome.com/7938f26122.js" crossorigin="anonymous"></script>
<script src="https://code.jquery.com/jquery-2.2.4.js"
	  integrity="sha256-iT6Q9iMJYuQiMWNd9lDyBUStIq/8PuOW33aOqmvFpqI="
	  crossorigin="anonymous"></script>

<script type="text/javascript" src="${contextPath}/js/search_artist.js"></script>
<script type="text/javascript" src="${contextPath}/js/resizeMenu.js"></script>
<script type="text/javascript" src="${contextPath}/js/header.js"></script>
<script type="text/javascript" src="${contextPath}/js/cart.js"></script>

</head>
<body>
	<c:import url="../basic/header.jsp">
	</c:import>
       <form action="@" id="Order_Form" class="orderForm" method="post">
            <div class="orderHeader">
                <div class="orderTitle">
                    <h2>ORDER</h2>
                </div>
            </div>
            <ul class="orderInfoBox">
                <li>
                    <h3>ORDER LIST</h3>
                </li>
                <li class="orderContent">
                    <nav class="orderImgBox">
                        <a href="" class="orderImg">
                            <img src="./c_img1.jpg" alt="img1">
                        </a>
                    </nav>
                    <div class="orderOption">
                        <p class="orderName">
                            <span>Magnet Set(S)</span>
                            <span>Magnet Set(S)</span>
                        </p>
                        <dl class="orderQuantity">
                            <dt>Quantity: </dt>
                            <dd class="orderQuantityValue">
                                <input type="text" name="quantity" id="orderQuantity" value="1">
                            </dd>
                        </dl>
                        <p class="orderPrice">₩500,000,000</p>
                    </div>
                </li>
                <li class="orderContent">
                    <nav class="orderImgBox">
                        <a href="" class="orderImg"> <img src="./c_img1.jpg" alt="img1">
                        </a>
                    </nav>
                    <div class="orderOption">
                        <p class="orderName">
                            <span>Magnet Set(S)</span>
                            <span>Magnet Set(S)</span>
                        </p>
                        <dl class="orderQuantity">
                            <dt>Quantity: </dt>
                            <dd class="orderQuantityValue">
                                <input type="text" name="quantity" id="orderQuantity" value="1">
                            </dd>
                        </dl>
                        <p class="orderPrice">₩500,000,000</p>
                    </div>
                </li>
                <li class="orderContent">
                    <nav class="orderImgBox">
                        <a href="" class="orderImg"> <img src="./c_img1.jpg" alt="img1">
                        </a>
                    </nav>
                    <div class="orderOption">
                        <p class="orderName">
                            <span>Magnet Set(S)</span>
                            <span>Magnet Set(S)</span>
                        </p>
                        <dl class="orderQuantity">
                            <dt>Quantity: </dt>
                            <dd class="orderQuantityValue">
                                <input type="text" name="quantity" id="orderQuantity" value="1">
                            </dd>
                        </dl>
                        <p class="orderPrice">₩500,000,000</p>
                    </div>
                </li>
            </ul>
            <dl class="orderListTotal">
                <dt>Total&nbsp;(6)</dt>
                <dd>₩500,000,000</dd>
            </dl>
            <div class="orderInfo">
                <div class="orderInfoPart">
                    <nav class="orderInfoHeader">
                        <h2>주문자</h2>
                        <button id="OrderRegistry" type="button">등록</button>
                    </nav>
                    <p class="orderInfoSubCaption">주문자 정보를 등록주세요</p>
                </div>
                <div class="orderInfoPart">
                    <nav class="orderInfoHeader">
                        <h2>배송주소</h2>
                        <button id="OrderRegistry" type="button">등록</button>
                    </nav>
                    <p class="orderInfoSubCaption">배송 주소 정보를 등록주세요</p>
                </div>
                <div class="orderInfoPart">
                    <nav class="orderInfoHeader">
                        <h2>배송 수단</h2>
                    </nav>
                    <p class="orderInfoSubCaption">배송 수단 정보를 등록주세요</p>
                </div>
            </div>
            <div class="orderTotal">
                <dl><dt>소계&nbsp;(6)</dt><dd>28,000</dd></dl>
                <dl><dt>배송비</dt><dd>3,000</dd></dl>
                <dl><dt>총액</dt><dd>31,000</dd></dl>
            </div>
            <div class="paymentMethod">
                <h2>결제수단</h2>
                <nav class="paymentMethodPart">
                    <label for="checkcard">
                        <input type="radio" name="paymentmethod" value="checkcard" checked>
                        <span class="payMentMethodCheck">
                            <span></span>
                        </span>
                        <span class="paymentMethodTitle">
                            <span>체크 신용카드</span>
                        </span>
                    </label>
                </nav>
                <nav class="paymentMethodPart">
                    <label for="toss">
                        <input type="radio" name="paymentmethod" value="toss">
                        <span class="payMentMethodCheck">
                            <span></span>
                        </span>
                        <span class="paymentMethodTitle">
                            <img src="./toss.png" alt="toss">
                        </span>
                    </label>
                </nav>
                <nav class="paymentMethodPart">
                    <label for="payco">
                        <input type="radio" name="paymentmethod" value="payco">
                        <span class="payMentMethodCheck">
                            <span></span>
                        </span>
                        <span class="paymentMethodTitle">
                            <img src="./payco.png" alt="payco">
                        </span>
                    </label>
                </nav>
                <nav class="paymentMethodPart">
                    <label for="npay">
                        <input type="radio" name="paymentmethod" value="npay">
                        <span class="payMentMethodCheck">
                            <span></span>
                        </span>
                        <span class="paymentMethodTitle">
                            <img src="./npay.png" alt="npay">
                        </span>
                    </label>
                </nav>
                <nav class="paymentMethodPart">
                    <label for="kakaopay">
                        <input type="radio" name="paymentmethod" value="kakaopay">
                        <span class="payMentMethodCheck">
                            <span></span>
                        </span>
                        <span class="paymentMethodTitle">
                            <img src="./kakaopay.png" alt="kakaopay">
                        </span>
                    </label>
                </nav>
            </div>
            <section class="termsOfuse">
                <header class="termOfuseTitle">
                    <h2>유의사항 및 이용약관</h2>
                </header>
                <div class="termOfuseContainer">
                    <ul>
                        <li>대한민국에서 발급한 카드로만 결제할 수 있습니다.</li>
                        <li>구매자가 미성년자인 경우 상품 구입시 법정대리인이 동의하지 않은 경우, 미성년자 본인 또는 법정대리인이 구매 취소 할 수 있습니다.</li>
                    </ul>
                    <nav>
                        <p>
                            <span>주문 상품 정보, 가격, 배송, 반품, 교환, 환불 정책에 동의</span>
                            <button onclick="" type="button">자세히 보기</button>
                        </p>
                        <p>
                            <span>개인정보 수집 이용 동의</span>
                            <button onclick="" type="button">자세히 보기</button>
                        </p>
                        <label for="termsOfuseOk">
                            <input type="checkbox" name="termsOfuseCheck" value="termsOfuseOk">
                            <span>
                                <span class="termsOfuseCheck">
                                    <i class="fa-solid fa-circle-check fa-lg"></i>
                                    &nbsp;
                                </span>
                                <span>위 약관에 모두 동의합니다</span>
                            </span>
                        </label>
                    </nav>
                </div>
            </section>
            <button id="orderAllOkBtn" class="orderAllOk">₩500,000,000&nbsp;결제진행</button>
        </form>
	<jsp:include page="../basic/footer.jsp" flush="true" />

</body>
</html>