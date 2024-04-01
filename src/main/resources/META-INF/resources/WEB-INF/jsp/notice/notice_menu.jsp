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

<title>MANIAC</title>

<c:set var="contextPath" value="${pageContext.request.contextPath}" />

<link rel="icon" href="${contextPath}/img/web_logo/favicon.png">

<link rel="stylesheet" href="${contextPath}/css/basic/basic.css">
<link rel="stylesheet" href="${contextPath}/css/pageCount/pageCount.css">
<link rel="stylesheet" href="${contextPath}/css/basic/search_artist.css">
<link rel="stylesheet" href="${contextPath}/css/basic/resizeMenu.css">
<link rel="stylesheet" href="${contextPath}/css/notice/notice_menu.css">
<link rel="stylesheet" href="${contextPath}/css/basic/mediaquery.css">

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
<script type="text/javascript" src="${contextPath}/js/notice/notice_menu.js"></script>

</head>
<body>
	<c:import url="../basic/header.jsp" >
	</c:import>
	<div class="noticeMainContent">
        <h1 class="notice_header">Notice</h1>
        <ul id="noticeMenuContent" class="notice_MenuSection">
            <c:forEach var="noticeMenu" items="${noticeMenuList}">
                <c:set var="notice_id" value="${noticeMenu.id}"/>
                <c:set var="notice_artistId" value="${noticeMenu.artistId}"/>
                <c:set var="notice_category" value="${noticeMenu.category}"/>
                <c:set var="notice_title" value="${noticeMenu.title}"/>
                <c:set var="notice_date" value="${noticeMenu.date}"/>
                <li class="notice_menu">
                    <a href="">
                        <nav>${notice_category}</nav>
                        <nav>${notice_title}</nav>
                        <nav>${notice_date}</nav>
                    </a>
                </li>
            </c:forEach>
        </ul>
        <div id="notice_pageCount_num" class="pageCount">

        </div>
	</div>
	<jsp:include page="../basic/footer.jsp" flush="true" />
</body>
</html>