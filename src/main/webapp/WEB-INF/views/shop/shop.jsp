<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="EUC-KR" isELIgnored="false"%>
<%@ page import="model.*, java.util.*" %>
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

<link rel="stylesheet" href="${contextPath}/css/shop/shop.css">
<link rel="stylesheet" href="${contextPath}/css/pageCount/pageCount.css">
<link rel="stylesheet" href="${contextPath}/css/basic/basic.css">
<link rel="stylesheet" href="${contextPath}/css/basic/search_artist.css">
<link rel="stylesheet" href="${contextPath}/css/basic/resizeMenu.css">
<link rel="stylesheet" href="${contextPath}/css/basic/mediaquery.css">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;900&display=swap" rel="stylesheet">

<script src="https://kit.fontawesome.com/7938f26122.js" crossorigin="anonymous"></script>
<script src="https://code.jquery.com/jquery-2.2.4.js"
	  integrity="sha256-iT6Q9iMJYuQiMWNd9lDyBUStIq/8PuOW33aOqmvFpqI="
	  crossorigin="anonymous"></script>

<script type="text/javascript" src="${contextPath}/js/shop/btnLike.js"></script>
<script type="text/javascript" src="${contextPath}/js/search_artist.js"></script>
<script type="text/javascript" src="${contextPath}/js/resizeMenu.js"></script>
<script type="text/javascript" src="${contextPath}/js/header.js"></script>
<script type="text/javascript" src="${contextPath}/js/cart.js"></script>
<script type="text/javascript" src="${contextPath}/js/shop.js"></script>

<c:set var="headerTitle" value="${products[0].category}"/>
</head>
<body>
	<c:import url="../basic/header.jsp" >
	</c:import>
	<div class="shopMainContent">
	    <header class="shopEtc_header">
            <nav class="shopEtc_headerMenu">
                <button data-btn-category="ALBUM" type="button" class="shopEtc_select font-weight600 margin-Left10">ALBUM</button>
                &#124;
                <button data-btn-category="goods" type="button" class="shopEtc_select">GOODS</button>
            </nav>
            <h1 class="shopEtc_headerTitle">
                ${headerTitle}
            </h1>
	    </header>
        <section id="shopMenuContent" class="shopEtc_contentBox">
        <!--
		<c:forEach var="product" items="${products}">
			<c:set var="productId" value="${product.id}" />
			<c:set var="artistId" value="${product.artistId}" />
            <c:set var="product_title" value="${product.title}" />
            <c:set var="category" value="${product.category}" />
            <c:set var="price" value="${product.price}" />
            <c:set var="main_img" value="${product.mainImg}" />
            <c:url var="shopInfo" value="/product/${artistId}/find-product/${productId}" />
            <div class="shopEtc_content">
                <button data-btn-artistId="${artistId}" data-btn-like="${productId}" class="btnLike" type="button">
                    <i data-btn-artistId="${artistId}" data-btn-like="${productId}" class="fa-regular  fa-heart fa-lg"></i>
                </button>
                <a href="${shopInfo}" class="shopEtc_contentImg">
                    <img src="${main_img}" alt="${product_title}">
                </a>
                <nav class="shopEtc_contentInfo">
                    <h1>${product_title}</h1>
                    <p>${price}</p>
                </nav>
            </div>
        </c:forEach>
        -->
		</section>
		<div id="shop_pageCount_num" class="pageCount">

        </div>
	</div>
	<jsp:include page="../basic/footer.jsp" flush="true" />
</body>
</html>