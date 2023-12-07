<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="EUC-KR" isELIgnored="false"%>
<%@ page import="model.*, java.util.*"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Document</title>

<link rel="stylesheet" href="${pageContext.request.contextPath}/css/shopinfo.css">
<link rel="stylesheet" href="${pageContext.request.contextPath}/css/pageCount/pageCount.css">
<link rel="stylesheet" href="${contextPath}/css/search_artist.css">
<link rel="stylesheet" href="${contextPath}/css/resizeMenu.css">
<link rel="stylesheet" href="${contextPath}/css/mediaquery.css">
<link rel="stylesheet" href="${pageContext.request.contextPath}/css/basic.css">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;900&display=swap" rel="stylesheet">

<script src="https://kit.fontawesome.com/7938f26122.js"
	crossorigin="anonymous"></script>
<script src="https://code.jquery.com/jquery-2.2.4.js"
	integrity="sha256-iT6Q9iMJYuQiMWNd9lDyBUStIq/8PuOW33aOqmvFpqI="
	crossorigin="anonymous">
	
</script>

<c:set var="contextPath" value="${pageContext.request.contextPath}" />

<script type="text/javascript"
	src="${contextPath}/js/shopInfo_subcontent.js">	
</script>
<script type="text/javascript" src="${contextPath}/js/shopInfo_option.js"></script>
<script type="text/javascript" src="${contextPath}/js/search_artist.js"></script>
<script type="text/javascript" src="${contextPath}/js/resizeMenu.js"></script>
<script type="text/javascript" src="${contextPath}/js/header.js"></script>
<script type="text/javascript" src="${contextPath}/js/cart.js"></script>

<!-- session -->

<c:set var="productNo" value="${productinfo.id}" />
<c:set var="title" value="${productinfo.title}" />
<c:set var="category" value="${productinfo.category}" />
<c:set var="price" value="${productinfo.price}" />
<c:set var="optionList" value="${fn:split(productinfo.optionList,',')}" />
<c:choose>
    <c:when test="${optionList[0] ne 'single'}">
        <c:set var="optionListLength" value="${fn:length(optionList)}"/>
        <c:set var="forBreak" value="${(optionListLength / 2) - 1}"/>
    </c:when>
    <c:otherwise>
        <c:set var="optionList" value=""/>
    </c:otherwise>
</c:choose>
<c:set var="optionMent" value="${productinfo.optionMent}" />
<c:set var="mainImg" value="${productinfo.mainImg}" />
<c:set var="subImgList" value="${fn:split(productinfo.subImg,',')}" />
<c:set var="noticeList" value="${fn:split(productinfo.notice,',')}"/>
<c:set var="noticeListLength" value="${fn:length(noticeList)}"/>

<c:url var="shopPage" value="/product/${artistId}/product-shop/${category}" />
<%
request.setCharacterEncoding("UTF-8");
%>

</head>
<body>
	<c:import url="../basic/header.jsp">
		<c:param name="cartCount" value="${cartCount}" />
	</c:import>
<!--
        <div id="stickyInfo" class="sticky_info">
            <nav class="stickyItemBox">
            <div class="stickyImgBox">
                <img src="./c_img1.jpg" alt="">
            </div>
            <nav class="stickyHeader">
                <h2>Jung Kook (BTS) 'GOLDEN' (Set) + 'GOLDEN' (Weverse Albums ver.) Set</h2>
                <br>
                <h3>₩52,000</h3>
            </nav>
            <nav class="sticky_PurchaseBtn">
                <div class="sticky_select_option">
                    <label for="option">Option</label>
                    <select name="product_option" id="option">
                        <option value="1">Golden vvvvvvvvv</option>
                        <option value="2">Golden</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>
                <button id="stickyPurchaseBtn" type="button">Ordered</button>
                <div class="sticky_order_box">
                    <button id="styicy_basket" type="button">장바구니 담기</button>
                    <button id="sticky_order" type="button">주문하기</button>
                </div>
            </nav>
        </nav>
        <div class="sticky_optionBox">
            <div class="sticky_optionPartBox">
                <div class="sticky_optionPart">
                    <nav class="sticky_optionTitle">
                        <h2>Golden ver</h2>
                    </nav>
                    <nav class="sticky_quantityBox">
                        <button type="button" data-minus-quantity="single" >-</button>
                        <input type="text" data-quantity-name="single2"  value="1" name="single" maxlength="3" disabled>
                        <button type="button" data-plus-quantity="single" >+</button>
                    </nav>
                </div>
            </div>
            <nav class="sticky_total_price">
                <h3>Total:</h3>
                <h2>₩52,000</h2>
            </nav>
        </div>
    </div>
-->
	<div class="shopInfo">
		<ul class="shopInfo_Item_Box">
		    <a href="${shopPage}" class="shopInfo_category">
                ${category}
		    </a>
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
                <li class="shopInfo_selectTag">
                    <div class="select_option">
                        <nav class="select_tag">
                            <span>--&nbsp;Select Option&nbsp;--</span>
                            <i class="fa-solid fa-chevron-down fa-lg" style="transform:rotate(0deg)"></i>
                        </nav>
                    <c:forEach var="i" begin="0" end="${forBreak}" varStatus="status">
                        <c:if test="${status.getCount() %2 eq 0}">
                            <input data-option-value="${optionList[status.getCount()]}" hidden="hidden">
                        </c:if>
                    </c:forEach>
                        <div class="select_option_part">
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
		<div class="shopInfo_optionBox">
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
		</div>
		<nav class="shopInfo_ContentBox">
		    <c:forEach var="subImg" varStatus="status" items="${subImgList}">
		        <img class="shopInfo_contentImg" src="${contextPath}${subImg}" alt="subimg">
		    </c:forEach>

            <c:set var="forBreak" value="${(noticeListLength / 2) - 1}"/>
            <c:set var="dtCount" value="${0}"/>
            <c:set var="ddCount" value="${1}"/>

		    <c:forEach var="productNotice" end="${forBreak}" items="${noticeList}">
                <dl class="shopInfo_productNotice">
                    <dt>${fn:trim(noticeList[dtCount])}</dt>
                    <dd>${fn:trim(noticeList[ddCount])}</dd>
                </dl>
                <c:set var="dtCount" value="${dtCount + 2}"/>
                <c:set var="ddCount" value="${ddCount + 2}"/>
		    </c:forEach>
		</nav>
		<nav class="review_qa_btn">
			<button id="shopInfo_review" class="bgBcolorW" type="button">Review</button>
			<button id="shopInfo_qa" class="bgWcolorB" type="button">Q&A</button>
		</nav>
		<div class="shopInfo_BoardBox">
			<form id="add_form" action="" method="get" class="shopInfo_BoardHeader inlineblock">
				<input data-artistId="${artistId}" type="text" name="productNo" value="${productNo}" hidden="hidden" />
				<button id="shopInfo_createReview" class="inlineblock" type="button">Add review
				</button>
				<button id="shopInfo_createQna" class="none" type="button">Add Q&A
				</button>
			</form>
			<!-- q & a -->
			<nav id="shopInfo_boardContent" class="shopInfo_boardContent">
			</nav>
			 <div id="pageCount_num" class="pageCount">
            </div>
		</div>
	</div>
	<jsp:include page="../basic/footer.jsp" flush="true" />
</body>
</html>