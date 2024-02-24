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

<link rel="stylesheet" href="${contextPath}/css/basket/basket.css">
<link rel="stylesheet" href="${contextPath}/css/basket/basket_edit.css">
<link rel="stylesheet" href="${contextPath}/css/errorPage/basic_err.css">
<link rel="stylesheet" href="${contextPath}/css/basic/search_artist.css">
<link rel="stylesheet" href="${contextPath}/css/basic/resizeMenu.css">
<link rel="stylesheet" href="${contextPath}/css/basic/basic.css">
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

<script type="text/javascript" src="${contextPath}/js/search_artist.js"></script>
<script type="text/javascript" src="${contextPath}/js/resizeMenu.js"></script>
<script type="text/javascript" src="${contextPath}/js/header.js"></script>
<script type="text/javascript" src="${contextPath}/js/basket/basket.js"></script>


</head>
<body>
    <!-- basket edit -->
    <div class="basketEdit_box none">
        <div id="basketEdit_content" class="basketEdit_contentBox">

        </div>
    </div>
    <!-- basket edit -->

	<c:import url="../basic/header.jsp">
	</c:import>
	<section id="basketBox" class="basketForm">
	  <div class="basketHeader">
            <div class="basketTitle">
                <h2>CART</h2>
                <p><i class="fa-solid fa-circle-exclamation fa-xl"></i>&nbsp;Cart에 담긴 상품은 90일 동안 보관 후 삭제됩니다.</p>
            </div>
            <button id="soldDel" class="soldDelbtn" type="button">품절 상품 삭제</button>
      </div>
      <div id="basketBody" class="cls_basketBody">
      <c:choose>
          <c:when test="${not empty cartList}">
            <ul id="basketInfo" class="basketInfoBox">
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
                    <li data-basket-box="${cartKey}" class="basketContent">
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
      </div>
	</section>
	<jsp:include page="../basic/footer.jsp" flush="true" />
</body>
</html>