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

<!-- response data -->
<c:set var="product_list" value="${productList}"/>
<c:set var="goods_list" value="${goodsList}"/>
<c:set var="artist_v" value="${artist}"/>
<c:set var="artistSns_list" value="${artistSnsList}"/>
<c:set var="artistMember_list" value="${artistMemberList}"/>

<!-- controller mapping url -->
<c:url var="shopInfo" value="/product/${artistId}/find-product/"/>
<c:url var="resolve_album" value="/product/${artistId}/shop/album?page=1" />
<c:url var="resolve_goods" value="/product/${artistId}/shop/goods?page=1" />
<c:url var="resolve_about" value="/about/${artistId}" />

</head>
<body>
	<c:import url="../basic/header.jsp" >
	</c:import>
	<c:set var="artist_mainImg" value="${artist_v.mainImg}"/>
	<c:set var="name" value="${artist_v.name}"/>
    <div class="chapter_mainBox">
        <div class="chapter_mainAbout">
            <div class="chapter_mainTitle">
                <h2>${name}</h2>
                <a href="${resolve_about}"><i class="fa-solid fa-plus fa-lg"></i></a>
                <!--
                <nav class="main_snsBox">
                <c:forEach var="artistSns" items="${artistSns_list}">
                    <c:set var="sns_href" value="${artistSns.snsHref}"/>
                    <c:set var="sns_class" value="${artistSns.snsClass}"/>
                    <c:set var="sns_title" value="${artistSns.snsTitle}"/>
                    <c:url var="sns_src" value="/icon/${sns_title}"/>
                    <a target="_blank" href="${sns_href}">
                        <i class="fa-brands ${sns_class}"></i>
                    </a>
                </c:forEach>
                </nav>
                -->
            </div>
            <div class="main_artistBox">
            <!-- ${artist_mainImg} -->
                <img src="${artist_mainImg}" alt="${name}"/>
            </div>
        </div>
        <div class="chapter_mainAlbum">
            <div class="chapter_title">
                <h2>Album</h2><a href="${resolve_album}"><i class="fa-solid fa-plus fa-lg"></i></a>
            </div>
            <section class="mainShopContent">
                <c:forEach var="product" items="${product_list}">
                    <c:set var="productId" value="${product.id}" />
                    <c:set var="artistId" value="${product.artistId}" />
                    <c:set var="title" value="${product.title}" />
                    <c:set var="price" value="${product.price}" />
                    <c:set var="mainImg" value="${product.mainImg}" />
                    <c:url var="shopInfo" value="/product/${artistId}/find-product/${productId}" />
                    <div class="shopEtc_content">
                        <button data-btn-artistId="${artistId}" data-btn-like="${productId}" class="btnLike" type="button">
                            <i data-btn-artistId="${artistId}" data-btn-like="${productId}" class="fa-regular  fa-heart fa-lg"></i>
                        </button>
                        <a href="${shopInfo}" class="shopEtc_contentImg">
                            <img src="${mainImg}" alt="${title}">
                        </a>
                        <nav class="shopEtc_contentInfo">
                            <h1>${title}</h1>
                            <p>${price}</p>
                        </nav>
                    </div>
                </c:forEach>
            </section>
        </div>
        <div class="chpater_mainGoods">
            <div class="chapter_title">
                <h2>Goods</h2><a href="${resolve_goods}"><i class="fa-solid fa-plus fa-lg"></i></a>
            </div>
            <section class="mainShopContent">
                <c:forEach var="goods" items="${goods_list}">
                    <c:set var="goodsId" value="${goods.id}" />
                    <c:set var="goods_title" value="${goods.title}" />
                    <c:set var="goods_price" value="${goods.price}" />
                    <c:set var="goods_mainImg" value="${goods.mainImg}" />
                    <c:url var="goods_shopInfo" value="/product/${artistId}/find-product/${productId}" />
                    <div class="shopEtc_content">
                        <button data-btn-artistId="${artistId}" data-btn-like="${goods_price}" class="btnLike" type="button">
                            <i data-btn-artistId="${artistId}" data-btn-like="${goods_price}" class="fa-regular  fa-heart fa-lg"></i>
                        </button>
                        <a href="${goods_shopInfo}" class="shopEtc_contentImg">
                            <img src="${goods_mainImg}" alt="${goods_title}">
                        </a>
                        <nav class="shopEtc_contentInfo">
                            <h1>${goods_title}</h1>
                            <p>${goods_price}</p>
                        </nav>
                    </div>
                </c:forEach>
            </section>
        </div>
    </div>
	<jsp:include page="../basic/footer.jsp" flush="true" />
</body>
</html>