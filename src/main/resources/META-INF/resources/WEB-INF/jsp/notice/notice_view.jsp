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
<link rel="stylesheet" href="${contextPath}/css/basic/search_artist.css">
<link rel="stylesheet" href="${contextPath}/css/basic/resizeMenu.css">
<link rel="stylesheet" href="${contextPath}/css/notice/notice_view.css">
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

</head>
<body>
	<c:import url="../basic/header.jsp" >
	</c:import>
	<div class="noticeMainContent">
        <ul id="noticeMenuContent" class="notice_MenuSection">
            <c:set var="notice_id" value="${notice.id}"/>
            <c:set var="notice_category" value="${notice.category}"/>
            <c:set var="notice_title" value="${notice.title}"/>
            <c:set var="notice_date" value="${notice.date}"/>
            <c:set var="notice_content" value="${notice.content}"/>
            <li class="notice_menu">
                <nav>${notice_category}</nav>
                <nav>${notice_title}</nav>
                <nav>${notice_date}</nav>
            </li>
            <li id="noticeContent">
                ${notice_content}
            </li>
        </ul>
	</div>
	<jsp:include page="../basic/footer.jsp" flush="true" />
</body>
</html>
