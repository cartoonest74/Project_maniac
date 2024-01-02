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

<title>Document</title>
<%
request.setCharacterEncoding("UTF-8");
%>

<c:set var="contextPath" value="${pageContext.request.contextPath}" />

<link rel="stylesheet" href="${contextPath}/css/order/order.css">
<link rel="stylesheet" href="${contextPath}/css/order/orderRegistry.css">
<link rel="stylesheet" href="${contextPath}/css/order/orderTerms.css">
<link rel="stylesheet" href="${contextPath}/css/search_artist.css">
<link rel="stylesheet" href="${contextPath}/css/resizeMenu.css">
<link rel="stylesheet" href="${contextPath}/css/basic.css">
<link rel="stylesheet" href="${contextPath}/css/mediaquery.css">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;900&display=swap" rel="stylesheet">

<script src="https://kit.fontawesome.com/7938f26122.js" crossorigin="anonymous"></script>
<script src="https://code.jquery.com/jquery-2.2.4.js"
	  integrity="sha256-iT6Q9iMJYuQiMWNd9lDyBUStIq/8PuOW33aOqmvFpqI="
	  crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>

<script type="text/javascript" src="${contextPath}/js/order/order.js"></script>
<script type="text/javascript" src="${contextPath}/js/search_artist.js"></script>
<script type="text/javascript" src="${contextPath}/js/resizeMenu.js"></script>
<script type="text/javascript" src="${contextPath}/js/header.js"></script>
<script type="text/javascript" src="${contextPath}/js/cart.js"></script>

<!--  portOne -->
<script src="https://cdn.portone.io/v2/browser-sdk.js"></script>

<!-- paymentMethod -->
<c:url var="kakaopay" value="/img/paymentMethod/kakaopay.png"/>
<c:url var="npay" value="/img/paymentMethod/npay.png"/>
<c:url var="payco" value="/img/paymentMethod/payco.png"/>
<c:url var="toss" value="/img/paymentMethod/toss.png"/>
</head>
<body>
	<c:import url="../basic/header.jsp">
	</c:import>
       <div id="Order_Form" class="orderForm">
            <div class="orderHeader">
                <div class="orderTitle">
                    <h2>ORDER</h2>
                    <h3>ORDER LIST</h3>
                </div>
            </div>
            <ul class="orderInfoBox">
                <c:forEach var="cart" items="${carts}">
                    <c:set var="title" value="${cart.title}"/>
                    <c:set var="price" value="${cart.price}"/>
                    <c:set var="mainImg" value="${cart.mainImg}"/>
                    <c:set var="optionTitle" value="${cart.optionTitle}"/>
                    <c:set var="productNo" value="${cart.productNo}"/>
                    <c:set var="cartKey" value="${cart.cartKey}"/>
                    <c:set var="quantity" value="${cart.quantity}"/>
                    <c:set var="singleMultiple" value="${cart.singleMultiple}"/>
                    <c:url var="shopInfo" value="/product/${artistId}/find-product/${productNo}"/>
                    <c:url var="mainImg_mapping" value="${mainImg}"/>
                    <li data-order-box="${cartKey}" class="orderContent">
                        <nav class="orderImgBox">
                            <a href="${shopInfo}" class="orderImg">
                                <img src=${mainImg_mapping} alt="${title}">
                            </a>
                        </nav>
                        <div class="orderOption">
                            <p class="orderName">
                                <span class="orderName_main">${title}</span>
                            <c:if test="${singleMultiple eq 'm'}">
                                <span class="orderName_option">${fn:replace(optionTitle,'\"','')}</span>
                            </c:if>
                            </p>
                            <dl class="orderQuantity">
                                <dt>Quantity: </dt>
                                <dd class="orderQuantityValue">
                                    <input type="text" name="quantity" data-quantity-name="${cartKey}" value="${quantity}" disabled>
                                </dd>
                            </dl>
                            <p data-order-price="${cartKey}" data-original-price="${price}" class="orderPrice">${price}</p>
                        </div>
                    </li>
                </c:forEach>
            </ul>
            <dl class="orderListTotal">
                <dt id="orderTotal_info">Total&nbsp;(6)</dt>
                <dd id="orderTotal">₩500,000,000</dd>
            </dl>
            <div class="orderInfo">
                <div class="orderInfoPart">
                    <nav class="orderInfoHeader">
                        <h2>주문자</h2>
                        <button id="OrderRegistry_info" type="button">등록</button>
                    </nav>
                    <p class="orderInfoSubCaption">주문자 정보를 등록주세요</p>
                </div>
                <div class="orderInfoPart">
                    <nav class="orderInfoHeader">
                        <h2>배송주소</h2>
                        <button id="OrderRegistry_delivery" type="button">등록</button>
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
                <dl><dt>소계&nbsp;(6)</dt><dd id="subtotalTag">28,000</dd></dl>
                <dl><dt>배송비</dt><dd id="deliveryFree">3,000</dd></dl>
                <dl><dt>총액</dt><dd id="basketTotal">31,000</dd></dl>
            </div>
            <div class="paymentMethod">
                <h2>결제수단</h2>
                <!--
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
                            <img src="${toss}" alt="toss">
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
                            <img src="${payco}" alt="payco">
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
                            <img src="${npay}" alt="npay">
                        </span>
                    </label>
                </nav>
                -->
                <nav class="paymentMethodPart">
                    <label for="kakaopay">
                        <input type="radio" name="paymentmethod" value="kakaopay">
                        <span class="payMentMethodCheck">
                            <span></span>
                        </span>
                        <span class="paymentMethodTitle">
                            <img src="${kakaopay}" alt="kakaopay">
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
            <button id="orderAllOkBtn" class="orderAllOk">
                <span id="orderFinalPrice">₩500,000,000</span>
                <span>&nbsp;결제진행</span>
                </button>
        </div>
	<jsp:include page="../basic/footer.jsp" flush="true" />

</body>
</html>