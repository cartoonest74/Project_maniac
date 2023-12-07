<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" isELIgnored="false"%>
<%@ page import="model.*, java.util.*" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="stylesheet" href="${pageContext.request.contextPath}/css/basic.css">
<link rel="stylesheet" href="${pageContext.request.contextPath}/css/accountMain.css">
<title>Document</title>

<c:set var="contextPath" value="${pageContext.request.contextPath}" />
<c:set var="productMainCount" value="${1}" />
<c:set var="createdId" value="${createdId}" />
<c:url var="forgotAccount" value="/member/forgot-account"/>
<c:url var="createAccount" value="/member/create-account"/>
<c:url var="loginAccount" value="/member/login-account"/>
</head>
<body>
	<c:import url="../basic/header.jsp" >
		<c:param name="cartCount" value="${cartCount}"/>
	</c:import>
	<section class="shopBody">
           ㅋㅊㅋㅊㅋㅊㅋ ${createdId}
        </section>
	<jsp:include page="../basic/footer.jsp" flush="true" />
</body>
</html>