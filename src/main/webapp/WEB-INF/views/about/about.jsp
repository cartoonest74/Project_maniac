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
<script type="text/javascript" src="${contextPath}/js/cart.js"></script>
<script type="text/javascript" src="${contextPath}/js/header.js"></script>
<script type="text/javascript" src="${contextPath}/js/about/about.js"></script>
<script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>

<c:set var="memberList" value="${artistMembers}"/>
<c:set var="snsList" value="${artistSns}"/>
<c:set var="artist" value="${artist_dto}"/>

<c:url var="resolve_discography" value="/about/${artistId}/discography"/>
<c:url var="resolve_gallery" value="/about/${artistId}/gallery"/>
<c:url var="resolve_mv" value="/about/${artistId}/mv"/>
</head>
<body>
	<c:import url="../basic/header.jsp">
	</c:import>
            <div class="about_Box">
                <header class="about_header">
                    <div class="about_MainImg">
                        <img src="${artist.mainImg}" alt="${artist.name}">
                        <h2 class="about_title">${artist.name}</h2>
                        <nav class="about_subMenuBox">
                            <p>
                                <a href="${resolve_mv}">mv</a>
                            </p>
                            <p>
                                <a href="${resolve_gallery}">gallery</a>
                            </p>
                            <p>
                                <a href="${resolve_discography}">discography</a>
                            </p>
                        </nav>
                    </div>
                </header>
                <section class="about_contentBox">
                    <!-- member -->
                    <div class="about_content">
                    <c:forEach var="member" items="${memberList}" varStatus="status">

                        <c:set var="member_num" value="${status.index}"/>
                        <c:set var="member_src" value="${member.memberSrc}"/>
                        <c:set var="member_artistName" value="${member.artistName}"/>
                        <c:set var="member_birth" value="${member.birth}"/>

                        <nav class="about_memberBox">
                            <button data-swiper-num="${member_num}" class="about_member" type="button">
                                <img data-swiper-num="${member_num}" src="${member_src}" alt="${member_artistName}">
                            </button>
                            <p class="about_memberInfo">
                                <span>${member_artistName}</span>
                                <span>${member_birth}</span>
                            </p>
                        </nav>

                    </c:forEach>
                    </div>
                    <!-- sns -->
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