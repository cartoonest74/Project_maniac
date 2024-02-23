<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="utf-8" isELIgnored="false"%>
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

<link rel="stylesheet" href="${contextPath}/css/basic/basic.css">
<link rel="stylesheet" href="${contextPath}/css/about/discography_info.css">
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

<script type="text/javascript" src="${contextPath}/js/search_artist.js"></script>
<script type="text/javascript" src="${contextPath}/js/resizeMenu.js"></script>
<script type="text/javascript" src="${contextPath}/js/header.js"></script>
<script type="text/javascript" src="${contextPath}/js/cart.js"></script>
<script type="text/javascript" src="${contextPath}/js/header.js"></script>
<script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>

<c:set var="artist_album" value="${artistAlbum}"/>
<c:set var="album_name" value="${artist_album.albumName}"/>
<c:set var="album_date" value="${artist_album.albumDate}"/>
<c:set var="album_src" value="${artist_album.albumSrc}"/>
<c:set var="jsonArray" value="${jsonArray}"/>
<c:set var="album_length" value="${artist_album.trackLength}"/>
<c:url var="resolve_discography" value="/about/${artistId}/discography"/>
</head>
<body>
	<c:import url="../basic/header.jsp">
	</c:import>
	    <div class="discographyInfo_box">
            <p class="discographyInfo_back">
                <a href="${resolve_discography}">discography</a>
            </p>
            <div class="discographyImgBox">
                <nav class="discographyImg">
                    <img src="${album_src}" alt="${album_name}">
                </nav>
                <div class="discographyHeader">
                    <h2>${album_name}</h2>
                    <p class="discography_subHeader"><span>${album_date}</span><br><span>${album_length}</span></p>
                </div>
                <ul class="trackList">
                <c:forEach var="i" begin="0" end="${jsonArray.length() -1}">
                    <li class="track">
                        ${jsonArray.get(i)}
                    </li>
                </c:forEach>
                </ul>
            </div>
        </div>
    <jsp:include page="../basic/footer.jsp" flush="true" />
</body>
</html>