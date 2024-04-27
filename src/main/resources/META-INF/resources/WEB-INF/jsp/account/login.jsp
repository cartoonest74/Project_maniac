<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="EUC-KR" isELIgnored="false"%>
<%@ page import="model.*, java.util.*" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>MANIAC</title>

<c:set var="contextPath" value="${pageContext.request.contextPath}" />

<link rel="icon" href="${contextPath}/img/web_logo/favicon.png">

<link rel="stylesheet" href="${contextPath}/css/account/loginForm.css">
<link rel="stylesheet" href="${contextPath}/css/basic/basic.css">
<link rel="stylesheet" href="${contextPath}/css/basic/search_artist.css">
<link rel="stylesheet" href="${contextPath}/css/basic/resizeMenu.css">
<link rel="stylesheet" href="${contextPath}/css/basic/mediaquery.css">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;900&display=swap" rel="stylesheet">


<script src="https://code.jquery.com/jquery-2.2.4.js"
	  integrity="sha256-iT6Q9iMJYuQiMWNd9lDyBUStIq/8PuOW33aOqmvFpqI="
	  crossorigin="anonymous"></script>
<script src="https://kit.fontawesome.com/7938f26122.js" crossorigin="anonymous"></script>

<!-- axios -->
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>

<script type="text/javascript" src="${contextPath}/js/header.js"></script>

<script type="text/javascript" src="${contextPath}/js/search_artist.js"></script>
<script type="text/javascript" src="${contextPath}/js/resizeMenu.js"></script>
<script type="text/javascript" src="${contextPath}/js/account/login.js"></script>

<c:set var="referUrl" value="${referUrl}" />
<c:url var="forgotAccount" value="/${artistId}/member/forgot-account"/>
<c:url var="createAccount" value="/${artistId}/member/create-account"/>
<c:url var="loginAccount" value="/${artistId}/member/login-account"/>
<c:url var="loginPassUrl" value="/login-action/login"/>
</head>
<body>
	<c:import url="../basic/header.jsp" >
		<c:param name="cartCount" value="${cartCount}"/>
	</c:import>
        <div class="accountMain">
            <form class="accountForm">
                <h1>LOGIN</h1>
                <nav class="accountInput">
                    <input id="loginId" type="text" name="id" placeholder="ID">
                    <p id="LoginIdFormErr" class="loginFormErrMsg none">id�� �������� �ʽ��ϴ�. �ٽ� �Է����ּ���.</p>
                </nav>
                <nav class="accountInput">
                    <input id="loginPwd" type="password" name="pwd" placeholder="PWD">
                    <p id="loginPwdFormErr" class="loginFormErrMsg none">��й�ȣ�� ��ġ���� �ʽ��ϴ�. �ٽ� �Է����ּ���.</p>
                </nav>
                <nav class="subAcoountMain">
                    <a href="${forgotAccount}">Forgot your id & password ?</a>
                    |
                    <a href="${createAccount}">CREATE ACCOUNT</a>
                </nav>
                <button id="loginActionBtn" class="loginBtn" type="button">Login</button>
                <input name="referUrl" value="${referUrl}" hidden="hidden"/>
            </form>
        </div>
	<jsp:include page="../basic/footer.jsp" flush="true" />
	<script type="text/javascript" src="${contextPath}/js/search_artist.js"></script>
</body>
</html>