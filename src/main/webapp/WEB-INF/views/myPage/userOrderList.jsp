<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="utf-8" isELIgnored="false"%>
<%@ page import="model.*, java.util.*" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<c:set var="contextPath" value="${pageContext.request.contextPath}" />

<link rel="stylesheet" href="${pageContext.request.contextPath}/css/basic.css">
<link rel="stylesheet" href="${pageContext.request.contextPath}/css/myPage/orderList.css">
<link rel="stylesheet" href="${contextPath}/css/search_artist.css">
<link rel="stylesheet" href="${contextPath}/css/resizeMenu.css">
<link rel="stylesheet" href="${contextPath}/css/mediaquery.css">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;900&display=swap" rel="stylesheet">

<title>Maniac</title>
<%
	request.setCharacterEncoding("UTF-8");
%>

<script src="https://code.jquery.com/jquery-2.2.4.js"
	  integrity="sha256-iT6Q9iMJYuQiMWNd9lDyBUStIq/8PuOW33aOqmvFpqI="
	  crossorigin="anonymous"></script>
<script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
<script src="https://kit.fontawesome.com/7938f26122.js" crossorigin="anonymous"></script>

<script type="text/javascript" src="${contextPath}/js/header.js"></script>
<script type="text/javascript" src="${contextPath}/js/myPage/orderList.js"></script>

<script type="text/javascript" src="${contextPath}/js/search_artist.js"></script>
<script type="text/javascript" src="${contextPath}/js/resizeMenu.js"></script>

<!-- ajax -->
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>

<!-- request -->
<c:set var="purchase_list" value="${purchaseLists}"/>

<!-- url -->
<c:url var="myPage" value="/myPage/${artistId}" />

</head>
<body>
	<c:import url="../basic/header.jsp" >
		<c:param name="cartCount" value="${cartCount}"/>
	</c:import>
        <div class="orderListBox">
            <header class="orderListHeader">
                <div class="go_myPage">
                    <a href="${myPage}">
                        <i class="fa-solid fa-angle-left fa-lg"></i>
                        <span>주문/배송조회</span>
                    </a>
                </div>
                <div class="orderList_search">
                    <button id="orderListSearch" type="button"><span>1개월&#183;전체</span>&nbsp;<i class="fa-solid fa-bars-staggered fa-lg"></i></button>
                </div>
            </header>
            <dl id="olContainer" class="orderListContainer">
            <c:forEach var="purchase" items="${purchase_list}">
                <c:set var="num" value="${purchase.num}"/>
                <c:set var="title" value="${purchase.title}"/>
                <c:set var="purchaseDate" value="${purchase.purchaseDate}"/>
                <c:set var="quantity" value="${purchase.quantity}"/>
                <c:set var="optionTitle" value="${purchase.optionTitle}"/>
                <c:set var="purchaseStatus" value="${purchase.purchaseStatus}"/>
                <c:set var="totalPrice" value="${purchase.totalPrice}"/>
                <c:url var="completeOrder" value="/order/${artistId}/complete?orderKey=${purchaseDate}"/>
                <div class="orderListCotentBox">
                    <dt class="olc_dateTitle">
                        <div>
                            <h2 id="purchaseDate">${purchaseDate}</h2>&nbsp;
                            <span>주문번호 ${purchaseDate}</span>
                        </div>
                        <div>
                            <a href="${completeOrder}">주문상세&nbsp;<i class="fa-solid fa-chevron-right fa-sm"></i></a>
                        </div>
                    </dt>
                    <dd class="orderListCotent">
                        <div class="olc_header">
                            <p>${purchaseStatus}</p>
                            <p></p>
                        </div>
                        <div class="olc_info">
                            <p>
                                <span>Jung Kook (BTS) 'GOLDEN' (Set) + 'GOLDEN' (Weverse Albums ver.) Set</span> <span>(2)</span>
                            </p>
                        </div>
                        <p class="olc_price">
                            ${totalPrice}
                        </p>
                    </dd>
                </div>
            </c:forEach>
            </dl>
        </div>
	<jsp:include page="../basic/footer.jsp" flush="true" />
</body>
</html>