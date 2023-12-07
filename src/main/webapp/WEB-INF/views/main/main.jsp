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

<link rel="stylesheet" href="${contextPath}/css/main.css">
<link rel="stylesheet" href="${contextPath}/css/basic.css">
<link rel="stylesheet" href="${contextPath}/css/search_artist.css">
<link rel="stylesheet" href="${contextPath}/css/resizeMenu.css">
<link rel="stylesheet" href="${contextPath}/css/mediaquery.css">

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.css"/>
<script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>

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

<!-- controller mapping url -->
<c:url var="shopInfo" value="/product/${artistId}/find-product/" />

</head>
<body>
	<c:import url="../basic/header.jsp" >
	</c:import>
	<div>

	</div>
	<div class="shopMainContent">
        <c:forEach var="product" items="${productList}">
                <c:set var="artistId" value="${product.artistId}" />
                <c:set var="title" value="${product.title}" />
                <c:set var="price" value="${product.price}" />
                <c:set var="mainImg" value="${product.mainImg}" />
                <div class="shopMainContentBox">
                    <a href="${shopInfo}${product.id}" class="shopMainContentImg">
                        <img src="${contextPath}${mainImg}" alt="${title}">
                    </a>
                    <nav class="shopMainContentInfo">
                        <h1>${title}</h1>
                        <p>${price}</p>
                        <button data-productNo="${product.id}" type="button">Like</button>
                    </nav>
                </div>
        </c:forEach>
	</div>
	<jsp:include page="../basic/footer.jsp" flush="true" />
	<script type="text/javascript" src="${contextPath}/js/artist_main_slide.js"></script>
</body>
</html>