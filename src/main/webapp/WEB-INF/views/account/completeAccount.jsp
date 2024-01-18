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
<link rel="stylesheet" href="${contextPath}/css/accountMain.css">
<link rel="stylesheet" href="${contextPath}/css/search_artist.css">
<link rel="stylesheet" href="${contextPath}/css/resizeMenu.css">
<link rel="stylesheet" href="${contextPath}/css/basic.css">
<link rel="stylesheet" href="${contextPath}/css/mediaquery.css">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;900&display=swap" rel="stylesheet">

<script src="https://kit.fontawesome.com/7938f26122.js" crossorigin="anonymous"></script>

<script type="text/javascript" src="${contextPath}/js/search_artist.js"></script>
<script type="text/javascript" src="${contextPath}/js/resizeMenu.js"></script>
<script type="text/javascript" src="${contextPath}/js/header.js"></script>
<script type="text/javascript" src="${contextPath}/js/cart.js"></script>

<c:set var="createdId" value="${createdId}" />
<c:url var="forgotAccount" value="${artistId}/member/forgot-account"/>
<c:url var="createAccount" value="${artistId}/member/create-account"/>
<c:url var="loginAccount" value="${artistId}/member/login-account"/>
</head>
<body>
	<c:import url="../basic/header.jsp" >
		<c:param name="cartCount" value="${cartCount}"/>
	</c:import>
           ㅋㅊㅋㅊㅋㅊㅋ ${createdId}
	<jsp:include page="../basic/footer.jsp" flush="true" />
</body>
</html>