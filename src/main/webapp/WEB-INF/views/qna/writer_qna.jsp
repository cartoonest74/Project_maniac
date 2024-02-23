<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="EUC-KR" isELIgnored="false"%>
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

<link rel="stylesheet"
	href="${contextPath}/css/basic/basic.css">
<link rel="stylesheet"
	href="${contextPath}/css/writeQna_Review/writer_qna.css">
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

<script type="text/javascript" src="${contextPath}/js/addQna.js"></script>
<script type="text/javascript" src="${contextPath}/js/search_artist.js"></script>
<script type="text/javascript" src="${contextPath}/js/resizeMenu.js"></script>
<script type="text/javascript" src="${contextPath}/js/header.js"></script>
<script type="text/javascript" src="${contextPath}/js/cart.js"></script>


<c:set var="productNo" value="${productinfo.id}" />
<c:set var="title" value="${productinfo.title}" />
<c:set var="product_artistId" value="${productinfo.artistId}" />

<!-- request -->
<c:set var="memberId" value="${memberId}" />

<c:url var="addQnaUrl" value="/product-qna/${artistId}/add-qna"/>

</head>
<body>
	<c:import url="../basic/header.jsp">
		<c:param name="cartCount" value="${cartCount}" />
	</c:import>
	<form action="${addQnaUrl}" id="WriterQnaForm" class="writer_Form" method="post">
		<input type="text" name="product_no" value="${productNo}" hidden="hidden">
		<input type="text" name="artistId" value="${product_artistId}" hidden="hidden">

		<nav class="writer_tag">Q&A</nav>
		<nav class="writer_qna_header">
			<h1>
				<span>${title}</span>
			</h1>
			<div class="qna_basicInfo">
				<span>${memberId}</span> <span>/</span> <span>2023.04.28</span>
			</div>
		</nav>
		<nav class="qnaTextBox">
			<textarea name="content" id="qnaText" cols="20" rows="3" wrap="hard"
				autofocus="autofocus" maxlength="200" placeholder="write...." required></textarea>
		</nav>
		<button id="sendBtn_qna" type="button" class="qnaSendbtn">SEND</button>
	</form>
	<jsp:include page="../basic/footer.jsp" flush="true" />
</body>
</html>