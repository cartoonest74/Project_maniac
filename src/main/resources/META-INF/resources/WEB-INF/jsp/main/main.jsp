<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" isELIgnored="false"%>
<%@ page import="model.*, java.util.*" %>
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

<link rel="stylesheet" href="${contextPath}/css/main/main.css">
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
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>

<script type="text/javascript" src="${contextPath}/js/shop/btnLike.js"></script>
<script type="text/javascript" src="${contextPath}/js/search_artist.js"></script>
<script type="text/javascript" src="${contextPath}/js/resizeMenu.js"></script>
<script type="text/javascript" src="${contextPath}/js/header.js"></script>

<!-- response data -->
<c:set var="like_list" value="${likeList}"/>
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
                <img src="${artist_mainImg}" alt="${name}"/>
            </div>
        </div>
        <div class="chapter_mainAlbum">
            <div class="chapter_title">
                <h2>Album</h2><a href="${resolve_album}"><i class="fa-solid fa-plus fa-lg"></i></a>
            </div>
            <section class="mainShopContent">
            <c:choose>
                <c:when test="${empty product_list}">
                    <div style="width:100%; text-align:center; color:#807c7c; background:#d3d0d0; padding:2vh 0; font-size:1.8em;">상품을 준비중 입니다.</div>
                </c:when>
                <c:otherwise>
                    <c:forEach var="product" items="${product_list}">
                        <c:set var="productId" value="${product.id}" />
                        <c:set var="artistId" value="${product.artistId}" />
                        <c:set var="title" value="${product.title}" />
                        <c:set var="price" value="${product.price}" />
                        <c:set var="mainImg" value="${product.mainImg}" />
                        <c:set var="quantity" value="${product.totalQuantity}" />
                        <c:url var="shopInfo" value="/product/${artistId}/find-product/${productId}" />
                        <div class="shopEtc_content">
                            <button data-btn-artistId="${artistId}" data-btn-like="${productId}" class="btnLike" type="button">
                        <!-- btn like -->
                        <c:choose>
                            <c:when test="${fn:contains(like_list,productId)}">
                                <i data-btn-artistId="${artistId}" style="color:#d43f3f" data-btn-like="${productId}" class="fa-solid  fa-heart fa-lg"></i>
                            </c:when>
                            <c:otherwise>
                                <i data-btn-artistId="${artistId}" data-btn-like="${productId}" class="fa-regular  fa-heart fa-lg"></i>
                            </c:otherwise>
                        </c:choose>
                            </button>
                            <a href="${shopInfo}" class="shopEtc_contentImg">
                                <img src="${mainImg}" alt="${title}">
                            </a>
                            <nav class="shopEtc_contentInfo">
                                <h1>${title}</h1>
                        <!-- price -->
                            <c:choose>
                                <c:when test="${quantity eq 0}">
                                    <p style="text-transform:uppercase; font-size:1.4em;">sold out</p>
                                </c:when>
                                <c:otherwise>
                                    <p>${price}</p>
                                </c:otherwise>
                            </c:choose>
                            </nav>
                        </div>
                    </c:forEach>
                </c:otherwise>
            </c:choose>
            </section>
        </div>
        <div class="chpater_mainGoods">
            <div class="chapter_title">
                <h2>Goods</h2><a href="${resolve_goods}"><i class="fa-solid fa-plus fa-lg"></i></a>
            </div>
            <section class="mainShopContent">
            <c:choose>
                <c:when test="${empty goods_list}">
                    <div style="width:100%; text-align:center; color:#807c7c; padding:2vh 0; background:#d3d0d0; font-size:1.8em;">상품을 준비중 입니다.</div>
                </c:when>
                <c:otherwise>
                    <c:forEach var="goods" items="${goods_list}">
                        <c:set var="goodsId" value="${goods.id}" />
                        <c:set var="goods_title" value="${goods.title}" />
                        <c:set var="goods_price" value="${goods.price}"/>
                        <c:set var="quantity" value="${product.totalQuantity}" />
                        <c:set var="goods_mainImg" value="${goods.mainImg}" />
                        <c:url var="goods_shopInfo" value="/product/${artistId}/find-product/${goodsId}" />
                        <div class="shopEtc_content">
                        <!-- btn like -->
                            <button data-btn-artistId="${artistId}" data-btn-like="${goodsId}" class="btnLike" type="button">
                        <c:choose>
                            <c:when test="${fn:contains(like_list,goodsId)}">
                                <i data-btn-artistId="${artistId}" style="color:#d43f3f" data-btn-like="${goodsId}" class="fa-solid  fa-heart fa-lg"></i>
                            </c:when>
                            <c:otherwise>
                                <i data-btn-artistId="${artistId}" data-btn-like="${goodsId}" class="fa-regular  fa-heart fa-lg"></i>
                            </c:otherwise>
                        </c:choose>
                            </button>
                            <a href="${goods_shopInfo}" class="shopEtc_contentImg">
                                <img src="${goods_mainImg}" alt="${goods_title}">
                            </a>
                            <nav class="shopEtc_contentInfo">
                                <h1>${goods_title}</h1>
                            <c:choose>
                                <c:when test="${quantity eq 0}">
                                    <p style="text-transform:uppercase; font-size:1.4em;">sold out</p>
                                </c:when>
                                <c:otherwise>
                                    <p>${price}</p>
                                </c:otherwise>
                            </c:choose>
                            </nav>
                        </div>
                    </c:forEach>
                </c:otherwise>
            </c:choose>
            </section>
        </div>
    </div>
	<jsp:include page="../basic/footer.jsp" flush="true" />
</body>
</html>