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

<link rel="stylesheet" href="${contextPath}/css/basic.css">
<link rel="stylesheet" href="${contextPath}/css/about/about.css">
<link rel="stylesheet" href="${contextPath}/css/about/about_slide.css">
<link rel="stylesheet" href="${contextPath}/css/search_artist.css">
<link rel="stylesheet" href="${contextPath}/css/resizeMenu.css">
<link rel="stylesheet" href="${contextPath}/css/mediaquery.css">

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
<script type="text/javascript" src="${contextPath}/js/about/about.js"></script>
<script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>

<c:set var="mvList" value="${artistMvs}"/>
<c:set var="albumList" value="${artistAlbums}"/>
<c:set var="imgList" value="${artistImgs}"/>
<c:set var="memberList" value="${artistMembers}"/>
<c:set var="snsList" value="${artistSns}"/>
<c:set var="artist" value="${artist_dto}"/>
</head>
<body>
	<c:import url="../basic/header.jsp">
	</c:import>
            <div class="about_Box">
                <header class="about_header">
                    <div class="about_MainImg">
                        <img src="${artist.mainImg}" alt="${artist.name}">
                        <h2 class="about_title">${artist.name}</h2>
                    </div>
                </header>
                <section class="about_contentBox">
                    <div class="about_content">
                        <button class="about_artistInfo" type="button">아티스트 정보</button>
                    </div>
                    <div class="about_content">
                        <div class="about_contentTitle">
                            <h2>mv</h2>
                        </div>
                        <nav class="about_infoContent">
                        <c:forEach var="mvs" items="${mvList}">
                            <c:set var="mv_name" value="${mvs.mvName}"/>
                            <c:set var="mv_debut" value="${mvs.mvDate}"/>
                            <c:set var="mv_href" value="${mvs.mvHref}"/>
                            <!-- ${mv_href} -->
                            <a class="about_mv" href="${mv_href}" target="_blank">
                                <span>
                                    ${mv_name}
                                    <br>
                                    ${mv_debut}
                                </span>
                            </a>
                        </c:forEach>
                        </nav>
                    </div>
                    <div class="about_content">
                        <div class="about_contentTitle">
                            <h2>discography</h2>
                        </div>
                        <div class="about_infoContent">
                        <c:forEach var="albums" items="${albumList}">
                            <c:set var="album_num" value="${albums.rowNum}"/>
                            <c:set var="album_name" value="${albums.albumName}"/>
                            <c:set var="album_href" value="${albums.albumHref}"/>
                            <button data-about-album="${album_num}" class="about_img" type="button">
                                <img src="${album_href}" alt="${album_name}">
                            </button>
                        </c:forEach>
                        </div>
                        <nav class="about_contentPage">
                            <button type="button">
                                <i data-last-page-id="1" class="fa-solid fa-angle-left fa-lg"></i>
                            </button>
                            <button type="button">1</button>
                            <button type="button">
                                <i data-last-page-id="1" class="fa-solid fa-angle-right fa-lg"></i>
                            </button>
                        </nav>
                    </div>
                    <div class="about_content">
                        <div class="about_contentTitle">
                            <h2>photo</h2>
                        </div>
                        <div class="about_infoContent">
                        <c:forEach var="imgs" items="${imgList}">
                            <c:set var="img_num" value="${imgs.rowNum}"/>
                            <c:set var="img_src" value="${imgs.artistSrc}"/>
                            <button data-about-artistImg="${img_num}" class="about_img">
                                <img data-about-artistImg="${img_num}" src="${img_src}" alt="1">
                            </button>
                        </c:forEach>
                        </div>
                        <nav class="about_contentPage">
                        </nav>
                    </div>
                    <div class="about_snsBox">
                        <nav class="about_sns">
                        <c:forEach var="sns" items="${snsList}">
                            <c:set var="sns_title" value="${sns.snsTitle}"/>
                            <c:set var="sns_href" value="${sns.snsHref}"/>
                            <c:set var="sns_class" value="${sns.snsClass}"/>
                            <a target="_blank" href="${sns_href}">
                                <i class="fa-brands ${sns_class}"></i>
                            </a>
                        </c:forEach>
                        </nav>
                    </div>
                </section>
            </div>
        </section>
    </div>
</body>
</html>