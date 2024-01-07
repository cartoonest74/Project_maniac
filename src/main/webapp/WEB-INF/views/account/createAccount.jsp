<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" isELIgnored="false"%>
<%@ page import="model.*, java.util.*"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
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
	href="${contextPath}/css/basic.css">
<link rel="stylesheet"
	href="${contextPath}/css/main.css">
<link rel="stylesheet"
	href="${contextPath}/css/createAccount.css">
<link rel="stylesheet" href="${contextPath}/css/search_artist.css">
<link rel="stylesheet" href="${contextPath}/css/resizeMenu.css">
<link rel="stylesheet" href="${contextPath}/css/mediaquery.css">

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

<script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
<script type="text/javascript" src="${contextPath}/js/postDaum/postDaum.js"></script>
<script type="text/javascript" src="${contextPath}/js/createAccount.js"></script>

<c:url var="accountUrl" value="/member/complete-account"/>
</head>
<body>
	<c:import url="../basic/header.jsp">
		<c:param name="cartCount" value="${cartCount}" />
	</c:import>
	<div class="createAccount">
		<h1>LOGO</h1>
		<form action="${accountUrl}" id="createAccountForm" class="createAccountForm" method="post">
			<!-- id -->
			<nav class="createInfo">
				<input id="id" type="text" name="userId" placeholder="ID">
			</nav>
			<p id="idInspectIMessage" class="InspectMessage none"></p>
			<input id="result_id" type="text" value="none" hidden="hidden"/>

			<!-- pwd -->
			<nav class="createInfo">
				<input id="pwd" type="password" name="pwd" placeholder="password">
				<p class="InspectMessage none"></p>
			</nav>
			<p id="pwdInspectMessgae" class="InspectMessage none"></p>
			<input id="result_pwd" type="text" value="none" hidden="hidden"/>

			<!-- name -->
			<nav class="createInfo">
				<input id="name" type="text" name="name" placeholder="name"
					maxlength="40">
			</nav>
			<p id="nameInspectMessage" class="InspectMessage none"></p>
			<input id="result_name" type="text" value="none" hidden="hidden"/>

			<!-- birth -->
			<nav class="createInfo">
				<input id="birth" type="text" name="birth" placeholder="BIRTH">
			</nav>
			<p id="birthInspectMessage" class="InspectMessage none"></p>
			<input id="result_birth" type="text" value="none" hidden="hidden"/>

				<!-- email -->
            <nav class="createInfo">
                <input id="Email" type="email" name="email" placeholder="Email">
                <button id="AuthEmailBtn" class="email_authBtn" type="button">인증번호 요청</button>
            </nav>
            <nav id="EmailCodeBox" class="createInfo">
                  <input type="text" class="authEmailCode" name="authEmailCode" maxlength="9" placeholder="인증번호를 입력해주세요">
            </nav>

            <p id="EmailInspectMessage" class="InspectMessage none"></p>
            <input id="result_Email" type="text" value="none" hidden="hidden"/>

			<!-- gender -->
			<div class="radioBox">
				<nav class="radio_item">
					<input id="identifyGender1" type="radio" name="gender" value="man"/>
					<label for="man">Man</label>
				</nav>
				<nav class="radio_item">
					<input id="identifyGender2" type="radio" name="gender"
						value="famale"/>
					<label for="famale">Famale</label>
				</nav>
			</div>
			<p id="genderInspectMessgae" class="InspectMessage none"></p>
			<input id="result_gender" type="text" value="none" hidden="hidden"/>

			<!-- addr -->
			<div class="addrInfo">
				<nav class="addrContent">
					<input type="text" id="postNum" placeholder="우편번호">
					<button type="button" class="postBtn"
						onclick="addr_execDaumPostcode()">우편번호 찾기</button>
				</nav>
				<nav class="addrContent">
					<input type="text" id="mainAddr" placeholder="주소">
				</nav>
				<nav class="addrContent">
					<input type="text" id="detailAddr" placeholder="상세주소">
				</nav>
			</div>
			<input id="Addr" type="text" name="addr" class="none">
			<input id="result_post" type="text" value="none" hidden="hidden"/>
			<p id="addrInspectMessgae" class="InspectMessage none"></p>

			<!-- tel -->
			<nav class="createInfo">
				<input id="tel" type="tel" name="phone" placeholder="PHONE">
			</nav>
			<p id="telInspectMessage" class="InspectMessage none"></p>
			<input id="result_tel" type="text" value="none" hidden="hidden"/>

			<button id="sendBtn" class="createAcoountBtn" type="button">CREATE ACCOUNT</button>
		</form>
	</div>
	<c:import url="../basic/footer.jsp">
	</c:import>
</body>
</html>