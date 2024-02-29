<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Maniac</title>

    <c:set var="contextPath" value="${pageContext.request.contextPath}" />

    <link rel="stylesheet" href="${contextPath}/css/basic/basic.css">
    <link rel="stylesheet" href="${contextPath}/css/admin/admin_login.css">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;900&display=swap" rel="stylesheet">

    <script src="https://code.jquery.com/jquery-2.2.4.js"
          integrity="sha256-iT6Q9iMJYuQiMWNd9lDyBUStIq/8PuOW33aOqmvFpqI="
          crossorigin="anonymous"></script>
    <script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
    <script src="https://kit.fontawesome.com/7938f26122.js" crossorigin="anonymous"></script>

    <script type="text/javascript" src="${contextPath}/js/admin/adminLogin.js"></script>
</head>
<body>
    <div class="rootBox">
        <div class="rootLogin">
            <input type="text" id="rootId">
            <input type="password" id="rootPwd">
            <button id="rootLoginBtn" type="button">login</button>
        </div>
    </div>
</body>
</html>