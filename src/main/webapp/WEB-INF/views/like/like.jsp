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

<link rel="stylesheet" href="${contextPath}/css/like.css">
<link rel="stylesheet" href="${contextPath}/css/pageCount/pageCount.css">
<link rel="stylesheet" href="${contextPath}/css/basic.css">
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
<script type="text/javascript" src="${contextPath}/js/like.js"></script>

<c:set var="headerTitle" value="${fn:toUpperCase(products[0].category)}"/>
</head>
<body>
	<c:import url="../basic/header.jsp" >
	</c:import>
    <div class="likeMainContent">
        <header class="likeMainHeader">
            <h2>LIKE</h2>
            <nav id="Like_category" class="likeHeader_category">
                <button data-like-category="0" class="likeCategory select_categoryColor" type="button">ALL</button>
            <c:forEach var="artist" items="${category}">
                <c:set var="artistId" value="${artist.id}"/>
                <c:set var="artistName" value="${artist.name}"/>
                <button data-like-category="${artistId}" class="likeCategory" type="button">${artistName}</button>
            </c:forEach>
            </nav>
            <nav class="likeHeader_option">
                <input type="checkbox" name="all"/>
                <button id="likeDel" type="button">delete</button>
            </nav>
        </header>
        <ul id="LikeMenu_Content" class="likeBox">
        <c:forEach var="product" items="${products}">
            <c:set var="productId" value="${product.id}" />
            <c:set var="artistId" value="${product.artistId}" />
            <c:set var="title" value="${product.title}" />
            <c:set var="price" value="${product.price}" />
            <c:set var="mainImg" value="${product.mainImg}" />
            <c:url var="shopInfo" value="/product/${artistId}/find-product/${productId}" />
               <!--
                <li class="likeContentBox">
                    <div class="likeCheckBox">
                        <input type="checkbox" data-check-product="${productId}" name="${title}"/>
                    </div>
                    <div class="likeContent">
                        <a href="${shopInfo}">
                            <img src="${mainImg}" alt="${title}">
                        </a>
                        <p>${title}<br><span>${price}<span></p>
                    </div>
                </li>
                -->
        </c:forEach>
        </ul>
        <div id="like_pageCount_num" class="pageCount">

        </div>
    </div>
	<jsp:include page="../basic/footer.jsp" flush="true" />
</body>
</html>