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

<title>MANIAC</title>

<c:set var="contextPath" value="${pageContext.request.contextPath}" />

<link rel="icon" href="${contextPath}/img/web_logo/favicon.png">

<link rel="stylesheet" href="${contextPath}/css/order/order.css">
<link rel="stylesheet" href="${contextPath}/css/order/orderRegistry.css">
<link rel="stylesheet" href="${contextPath}/css/basic/search_artist.css">
<link rel="stylesheet" href="${contextPath}/css/basic/resizeMenu.css">
<link rel="stylesheet" href="${contextPath}/css/basic/basic.css">
<link rel="stylesheet" href="${contextPath}/css/order/orderTerms.css">
<link rel="stylesheet" href="${contextPath}/css/basic/mediaquery.css">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;900&display=swap" rel="stylesheet">

<script src="https://kit.fontawesome.com/7938f26122.js" crossorigin="anonymous"></script>
<script src="https://code.jquery.com/jquery-2.2.4.js"
	  integrity="sha256-iT6Q9iMJYuQiMWNd9lDyBUStIq/8PuOW33aOqmvFpqI="
	  crossorigin="anonymous"></script>
<!-- axios -->
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>

<script type="text/javascript" src="${contextPath}/js/order/order.js"></script>
<script type="text/javascript" src="${contextPath}/js/order/order_term.js"></script>
<script type="text/javascript" src="${contextPath}/js/order/order_registry.js"></script>
<script type="text/javascript" src="${contextPath}/js/search_artist.js"></script>
<script type="text/javascript" src="${contextPath}/js/resizeMenu.js"></script>
<script type="text/javascript" src="${contextPath}/js/header.js"></script>

<!-- postDaum -->
<script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
<script type="text/javascript" src="${contextPath}/js/postDaum/postDaum.js"></script>

<!--  portOne -->
<script src="https://cdn.portone.io/v2/browser-sdk.js"></script>

<!-- paymentMethod -->
<c:url var="kakaopay" value="/img/paymentMethod/kakaopay.png"/>
<c:url var="npay" value="/img/paymentMethod/npay.png"/>
<c:url var="payco" value="/img/paymentMethod/payco.png"/>
<c:url var="toss" value="/img/paymentMethod/toss.png"/>

<!-- response order -->
<c:set var="order_info" value="${orderInfo}"/>
<c:set var="order_delivery" value="${orderDelivery[0]}"/>
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
                <dt id="orderTotal_info"></dt>
                <dd id="orderTotal"</dd>
            </dl>
            <div class="orderInfo">
                <div id="infoPart" class="orderInfoPart">
            <c:choose>
                <c:when test="${empty order_info}">
                    <nav data-order-header="info" data-orderHeader-part="add" class="orderInfoHeader justify-content-between">
                        <h2>주문자</h2>
                        <button id="OrderRegistry_info" type="button">등록</button>
                    </nav>
                    <div data-order-caption="info" class="orderInfoSubCaption">주문자 정보를 등록주세요</div>
                </c:when>
                <c:otherwise>
                    <nav data-order-header="info" data-orderHeader-part="edit" class="orderInfoHeader justify-content-start">
                        <h2>주문자</h2>
                        <button id="OrderRegistry_infoEdit" type="button">수정</button>
                    </nav>
                    <div data-order-caption="info" class="orderInfoSubCaption">
                        <c:set var="first_name" value="${orderInfo.firstname}"/>
                        <c:set var="last_name" value="${orderInfo.lastname}"/>
                        <c:set var="email" value="${orderInfo.email}"/>
                        <c:set var="tel" value="${orderInfo.tel}"/>
                        <p>
                            <span data-registry-edit="Firstname">${first_name}</span>&nbsp;<span data-registry-edit="Lastname">${last_name}</span>
                        </p>
                        <p><span data-registry-edit="Email">${email}</span></p>
                        <p><span data-registry-edit="Tel">${tel}</span></p>
                    </div>
                </c:otherwise>
            </c:choose>
                </div>
                <div id="addrPart" class="orderInfoPart">
            <c:choose>
                <c:when test="${empty order_delivery.firstname}">
                    <nav data-order-header="deliveryAddr" data-orderHeader-part="add" class="orderInfoHeader justify-content-between">
                        <h2>배송주소</h2>
                        <button id="OrderRegistry_delivery" type="button">등록</button>
                    </nav>
                    <div data-order-caption="deliveryAddr" class="orderInfoSubCaption">배송 주소 정보를 등록주세요</div>
                </c:when>
                <c:otherwise>
                    <nav data-order-header="deliveryAddr" data-orderHeader-part="edit" class="orderInfoHeader justify-content-start">
                        <h2>배송주소</h2>
                        <button id="OrderRegistry_deliveryEdit" type="button">변경</button>
                    </nav>
                    <div data-order-caption="deliveryAddr" class="orderInfoSubCaption">
                        <c:set var="addr_firstName" value="${order_delivery.firstname}"/>
                        <c:set var="addr_lastName" value="${order_delivery.lastname}"/>
                        <c:set var="main_addr" value="${order_delivery.mainAddr}"/>
                        <c:set var="detail_addr" value="${order_delivery.detailAddr}"/>
                        <c:set var="post_num" value="${order_delivery.postNum}"/>
                        <c:set var="addr_tel" value="${order_delivery.tel}"/>
                        <c:set var="delivery_index" value="${order_delivery.deliveryIndex}"/>
                        <input name="home_deliveryIndex" value="${delivery_index}" hidden="hidden"/>
                        <p>
                            <span data-addrRegistry-edit="Firstname">${addr_firstName}</span>&nbsp;<span data-addrRegistry-edit="Lastname">${addr_lastName}</span>
                        </p>
                        <p>
                            <span data-addrRegistry-edit="main_addr">${main_addr}</span>&nbsp;<span data-addrRegistry-edit="detail_addr">${detail_addr}</span>
                        </p>
                        <p><span data-addrRegistry-edit="post_num">${post_num}</span></p>
                        <p><span data-addrRegistry-edit="Tel">${addr_tel}</span></p>
                    </div>
                </c:otherwise>
            </c:choose>
                </div>
                <div class="orderInfoPart">
                    <nav class="orderInfoHeader justify-content-between">
                        <h2>배송 수단</h2>
                    </nav>
                    <div data-order-caption="deliveryMethod" class="orderInfoSubCaption">
                        <nav class="paymentMethodPart">
                            <label for="nationalCar">
                                <input type="radio" name="deliveryMethod" value="nationalCar" checked>
                                <span class="payMentMethodCheck">
                                    <span></span>
                                </span>
                                <span class="paymentMethodTitle">
                                    <span>국내택배</span>
                                </span>
                            </label>
                        </nav>
                    </div>
                </div>
                <div id="deliveryMsgBox" class="orderInfoPart">
                    <nav class="orderInfoHeader justify-content-between">
                        <h2>배송 메세지</h2>
                    </nav>
                    <label for="deliveryMessage">
                        <select name="delivery_msg" id="deliveryMsg">
                            <option value="front_door">부재 시 문 앞에 놔주세요</option>
                            <option value="contact_before">배송 전 연락 주세요</option>
                            <option value="delivery_box">부재 시 경비실에 놔주세요</option>
                            <option value="fragile">파손 위험, 배송 시 주의해주세요</option>
                            <option value="direct">직접 입력</option>
                        </select>
                    </label>
                </div>
            </div>
            <div class="orderTotal">
                <dl><dt id="subtotalTitle">소계&nbsp;()</dt><dd id="subtotalTag">28,000</dd></dl>
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
                            <button id="orderTerm1" type="button">자세히 보기</button>
                        </p>
                        <p>
                            <span>개인정보 수집 이용 동의</span>
                            <button id="orderTerm2" type="button">자세히 보기</button>
                        </p>
                        <label for="termsOfuseOk">
                            <input type="checkbox" name="termsOfuseCheck" value="termsOfuseOk">
                            <span>
                                <span id="final_termCheck_icon" class="termsOfuseCheck">
                                    <i class="fa-regular fa-circle-check fa-lg"></i>&nbsp;
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