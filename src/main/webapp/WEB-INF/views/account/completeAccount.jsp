<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" isELIgnored="false"%>
<%@ page import="model.*, java.util.*" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Document</title>
<c:set var="contextPath" value="${pageContext.request.contextPath}" />
<link rel="stylesheet" href="${contextPath}/css/account/complete_account.css">
<link rel="stylesheet" href="${contextPath}/css/basic/search_artist.css">
<link rel="stylesheet" href="${contextPath}/css/basic/resizeMenu.css">
<link rel="stylesheet" href="${contextPath}/css/basic/basic.css">
<link rel="stylesheet" href="${contextPath}/css/basic/mediaquery.css">

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

<c:set var="createdId" value="${createdId}" />
<c:url var="loginAccount" value="/${artistId}/member/login-account"/>
</head>
<body>
	<c:import url="../basic/header.jsp" >
		<c:param name="cartCount" value="${cartCount}"/>
	</c:import>
	<div class="completeAccountBox">
	    <p>회원가입을 축하드립니다.<p>
	    <h2>
            ${createdId}
	    </h2>
	    <a class="loginPageBtn" href="${loginAccount}">로그인 하러 가기</a>
	</div>
	<jsp:include page="../basic/footer.jsp" flush="true" />
</body>
</html>