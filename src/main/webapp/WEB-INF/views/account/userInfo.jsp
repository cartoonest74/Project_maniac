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

<c:set var="contextPath" value="${pageContext.request.contextPath}" />

<link rel="stylesheet" href="${pageContext.request.contextPath}/css/basic.css">
<link rel="stylesheet" href="${pageContext.request.contextPath}/css/account/userInfo.css">
<link rel="stylesheet" href="${contextPath}/css/search_artist.css">
<link rel="stylesheet" href="${contextPath}/css/resizeMenu.css">
<link rel="stylesheet" href="${contextPath}/css/mediaquery.css">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;900&display=swap" rel="stylesheet">

<title>Maniac</title>
<%
	request.setCharacterEncoding("UTF-8");
%>

<script src="https://code.jquery.com/jquery-2.2.4.js"
	  integrity="sha256-iT6Q9iMJYuQiMWNd9lDyBUStIq/8PuOW33aOqmvFpqI="
	  crossorigin="anonymous"></script>
<script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
<script src="https://kit.fontawesome.com/7938f26122.js" crossorigin="anonymous"></script>

<script type="text/javascript" src="${contextPath}/js/header.js"></script>

<script type="text/javascript" src="${contextPath}/js/search_artist.js"></script>
<script type="text/javascript" src="${contextPath}/js/resizeMenu.js"></script>

<c:set var="logoutUrl" value="/login-action/logout" />

<!-- controller mapping url -->
<c:url var="shopinfo" value="/product/find-product" />

</head>
<body>
	<c:import url="../basic/header.jsp" >
		<c:param name="cartCount" value="${cartCount}"/>
	</c:import>
	    <form action="${logoutUrl}" method="post">
            <div class="logInfo">
                <button type="submit">LOGOUT</a>
            </div>
		</form>
	<jsp:include page="../basic/footer.jsp" flush="true" />
</body>
</html>