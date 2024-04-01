<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="utf-8" isELIgnored="false"%>
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
<link rel="stylesheet" href="${contextPath}/css/basic/basic.css">
<link rel="stylesheet" href="${contextPath}/css/pageCount/pageCount.css">
<link rel="stylesheet" href="${contextPath}/css/about/about_subMenu.css">
<link rel="stylesheet" href="${contextPath}/css/basic/search_artist.css">
<link rel="stylesheet" href="${contextPath}/css/basic/resizeMenu.css">
<link rel="stylesheet" href="${contextPath}/css/basic/mediaquery.css">

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;900&display=swap" rel="stylesheet">

<script src="https://kit.fontawesome.com/7938f26122.js" crossorigin="anonymous"></script>
<script src="https://code.jquery.com/jquery-2.2.4.js"
	  integrity="sha256-iT6Q9iMJYuQiMWNd9lDyBUStIq/8PuOW33aOqmvFpqI="
	  crossorigin="anonymous"></script>

<script type="text/javascript" src="${contextPath}/js/about/about_subMenu.js"></script>
<script type="text/javascript" src="${contextPath}/js/search_artist.js"></script>
<script type="text/javascript" src="${contextPath}/js/resizeMenu.js"></script>
<script type="text/javascript" src="${contextPath}/js/header.js"></script>
<script type="text/javascript" src="${contextPath}/js/cart.js"></script>
<script type="text/javascript" src="${contextPath}/js/header.js"></script>
<script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>

<c:set var="albumList" value="${artistAlbums}"/>

<c:url var="resolve_discography" value="/about/${artistId}/discography"/>
<c:url var="resolve_about" value="/about/${artistId}"/>
<c:url var="resolve_mv" value="/about/${artistId}/mv"/>
<c:url var="resolve_gallery" value="/about/${artistId}/gallery"/>
</head>
<body>
	<c:import url="../basic/header.jsp">
	</c:import>
	    <div class="aboutInfo_menuBox">
            <nav class="aboutInfo_menu">
                <a href="${resolve_about}">about</a>
                <a href="${resolve_mv}">mv</a>
                <a href="${resolve_gallery}">gallery</a>
                <a style="color:lime;" href="${resolve_discography}">discography</a>
            </nav>
        </div>
        <div class="discography_Box">
            <h2>discography</h2>
            <div id="aboutSubMenuContent" class="discography_contentBox">
            <c:forEach var="discography" items="${albumList}">
                <c:set var="album_num" value="${discography.rowNum}"/>
                <c:set var="album_src" value="${discography.albumSrc}"/>
                <c:url var="album_href" value="/about/${artistId}/discography/${album_num}"/>
                <c:set var="album_name" value="${discography.albumName}"/>
                <c:set var="album_date" value="${discography.albumDate}"/>
                <div class="discography_content">
                    <a class="discography_img" href="${album_href}">
                        <img src="${album_src}" alt="${album_name}">
                    </a>
                    <nav>
                        <p class="content_name">${album_name}</p>
                        <p class="content_date">${album_date}</p>
                    </nav>
                </div>
            </c:forEach>
            </div>
            <nav id="aboutSubMenu_pageCount_num" class="pageCount">
            </nav>
        </div>
    <jsp:include page="../basic/footer.jsp" flush="true" />
</body>
</html>