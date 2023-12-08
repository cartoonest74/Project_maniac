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

<link rel="stylesheet"
	href="${contextPath}/css/main.css">
<link rel="stylesheet"
	href="${contextPath}/css/basic.css">
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/css/basket/basket.css">
	href="${pageContext.request.contextPath}/css/basket/basket_edit.css">
<link rel="stylesheet" href="${contextPath}/css/search_artist.css">
<link rel="stylesheet" href="${contextPath}/css/resizeMenu.css">
<link rel="stylesheet" href="${contextPath}/css/mediaquery.css">

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
<script type="text/javascript" src="${contextPath}/js/basket/basket.js"></script>


</head>
<body>
    <!-- basket edit -->
    <div class="basketEdit_box">
        <div class="basketEdit_contentBox">
            <button id="basketEdit_Exit" class="basket_btn_exit">
                <i class="fa-solid fa-x fa-lg"></i>
            </button>
            <ul class="basket_Item_Box">
                <li class="shopInfo_img">
                    <nav class="shopInfo_MainImg">
                        <img src="${contextPath}${mainImg}" alt="${title}">
                    </nav>
                </li>
                <li class="shopInfo_item">
                    <p class="shopInfo_itemTitle">
                        <span class="shopInfo_itemContent">${title}</span>
                    </p>
                    <p class="shopInfo_itemTitle">
                        <span id="basic_productPrice" class="shopInfo_itemContent">${price}</span>
                    </p>
                    <p class="shopInfo_itemTitle">
                        <span id="option_max" class="shopInfo_itemContent">
                            <i class="fa-regular fa-circle fa-sm"></i>&nbsp;&nbsp;${optionMent}
                        </span>
                    </p>
                </li>
                <c:if test="${not empty optionList}">
                    <li class="shopInfo_selectTag justify-content-center">
                        <div id="SelectOption" class="select_option">
                            <nav class="select_tag">
                                <span>--&nbsp;Select Option&nbsp;--</span>
                                <i class="fa-solid fa-chevron-down fa-lg" style="transform:rotate(0deg)"></i>
                            </nav>
                        <c:forEach var="i" begin="0" end="${forBreak}" varStatus="status">
                            <c:if test="${status.getCount() %2 eq 0}">
                                <input data-option-value="${optionList[status.getCount()]}" hidden="hidden">
                            </c:if>
                        </c:forEach>
                            <div id="select_optionContent" class="select_option_part">
                            </div>
                        </div>
                    </li>
                </c:if>
                <li id="shopInfoOptionBox" class="shopInfo_optionBox">
                <c:if test="${empty optionList}">
                    <input data-option-value="single" hidden="hidden">
                    <nav class="quantity_btn_box">
                        <button data-minus-quantity="single" type="button">
                            <img data-minus-quantity="single" src="/img/icon/quantity_down.jpg" alt="quantity_down">
                        </button>
                        <input type="text" data-quantity-name="single"  value="1" name="single" maxlength="3" disabled>
                        <button data-plus-quantity="single" type="button">
                            <img data-plus-quantity="single" src="/img/icon/quantity_up.jpg" alt="quantity_up">
                        </button>
                    </nav>
                </c:if>
                </li>
            </ul>
            <div id="hiddenMenu_line" class="shopInfo_optionBox">
                <div class="option_price_total">
                    <c:if test="${empty optionList}">
                        <h3 data-option_priceTotal="total">${price}</h3>
                    </c:if>
                </div>
                <div class="shopInfo_order_box">
                     <c:choose>
                        <c:when test="${empty optionList}">
                            <c:set var="order_class" value="order_box_allowed"/>
                        </c:when>
                        <c:otherwise>
                            <c:set var="order_class" value="order_box_not_allowed"/>
                        </c:otherwise>
                     </c:choose>
                    <button class="${order_class}" data-productNo="${productNo}" type="button">Add To Cart</button>
                </div>
            </ >
        </div>
    </div>
    <!-- basket edit -->
	<c:import url="../basic/header.jsp">
	</c:import>
	<form action="" id="bakset_Form" class="basketForm" method="post">
	  <div class="basketHeader">
            <div class="basketTitle">
                <h2>CART</h2>
                <p><i class="fa-solid fa-circle-exclamation fa-xl"></i>&nbsp;Cart에 담긴 상품은 90일 동안 보관 후 삭제됩니다.</p>
            </div>
            <button id="soldDel" class="soldDelbtn" type="button">품절 상품 삭제</button>
      </div>
      <c:choose>
          <c:when test="${not empty cartList}">
            <ul class="basketInfoBox">
            <c:forEach var="cart" items="${cartList}">
                <c:set var="productNo" value="${cart.productNo}" />
                <c:set var="singleMultiple" value="${cart.singleMultiple}" />
                <c:set var="title" value="${cart.title}" />
                <c:set var="price" value="${cart.price}" />
                <c:set var="maxQuantity" value="${cart.maxQuantity}" />
                <c:set var="mainImg" value="${cart.mainImg}" />
                <c:set var="optionTitle" value="${cart.optionTitle}" />
                <c:set var="cartKey" value="${cart.cartKey}" />
                <c:set var="quantity" value="${cart.quantity}" />
                <c:url var="shopInfo" value="/product/${artistId}/find-product/${productNo}"/>
                    <li class="basketContent">
                        <nav class="basketImgBox">
                            <a href="${shopInfo}" class="basketImg">
                                <img src=${mainImg} alt="${title}">
                            </a>
                        </nav>
                        <nav class="basketName">
                            <span>${title}</span>
                            <!-- ${singleMultiple} -->
                            <c:if test="${singleMultiple eq 'm'}">
                                <span class="optionName">${fn:replace(optionTitle,'\"','')}</span>
                            </c:if>
                        </nav>
                        <nav class="basketPriceBox">
                            <input type="text" name="quantity" data-quantity-max="${maxQuantity}" data-quantity-name="${cartKey}" value="${quantity}" disabled>
                            <nav class="basketQuanttiyBtn">
                                <button data-plus-quantity="${cartKey}" type="button">
                                    <i data-plus-quantity="${cartKey}" class="fa-solid fa-chevron-up fa-xl"></i>
                                </button>
                                <button data-minus-quantity="${cartKey}" type="button">
                                    <i data-minus-quantity="${cartKey}" class="fa-solid fa-chevron-down fa-xl"></i>
                                </button>
                            </nav>
                            <p data-original-price="${price}" data-basket-price="${cartKey}" class="basketPrice">${price}</p>
                        </nav>
                        <nav class="basketOptionBtn">
                            <button data-btn-edit="${cartKey}" type="button">Edit</button>
                            <button data-btn-remove="${cartKey}" type="button">Delete</button>
                        </nav>
                    </li>
            </c:forEach>
            </ul>
             <ul class="basketTotal">
                 <li><span>소계</span><span id="subtotalTag">28,000</span></li>
                 <li><span>배송비</span><span id="deliveryFree">3,000</span></li>
                 <li><span>총액</span><span id="basketTotal">31,000</span></li>
             </ul>
             <button id="basketOrderBtn" class="basketOrder">결제진행</button>
          </c:when>
          <c:otherwise>
            <div>장바구니 안에 상품이 없습니다.</div>
          </c:otherwise>
      </c:choose>
	</form>
	<jsp:include page="../basic/footer.jsp" flush="true" />
</body>
</html>