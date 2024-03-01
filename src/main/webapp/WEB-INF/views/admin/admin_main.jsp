<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" isELIgnored="false"%>
<%@ page import="model.*, java.util.*" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Maniac</title>

<c:set var="contextPath" value="${pageContext.request.contextPath}" />

<link rel="stylesheet" href="${contextPath}/css/basic/basic.css">
<link rel="stylesheet" href="${contextPath}/css/admin/admin_basic.css">
<link rel="stylesheet" href="${contextPath}/css/admin/admin_main.css">

<link rel="preconnect" href="https://fonts.googleapias.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;900&display=swap" rel="stylesheet">

<script src="https://code.jquery.com/jquery-2.2.4.js"
	  integrity="sha256-iT6Q9iMJYuQiMWNd9lDyBUStIq/8PuOW33aOqmvFpqI="
	  crossorigin="anonymous"></script>
<script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
<script src="https://kit.fontawesome.com/7938f26122.js" crossorigin="anonymous"></script>
<script type="text/javascript" src="${contextPath}/js/admin/admin_header.js"></script>

<!-- url -->
<c:url var="resolve_admin_review" value="/admin/main/qna"/>
<c:url var="resolve_admin_qna" value="/admin/main/review"/>

</head>
<body>
    <c:import url="../admin/admin_header.jsp">
    </c:import>
            <dl class="rootContentBox">
                <div class="managementBox">
                    <dt class="managementTitle">
                    </dt>
                    <dd class="managementContainer">
                        <a href="${resolve_admin_review}">
                            <i class="fa-solid fa-circle-question fa-lg" aria-hidden="true"></i>상품문의
                        </a>
                        <a href="${resolve_admin_qna}">
                            <i class="fa-solid fa-pen-to-square fa-lg" aria-hidden="true"></i>
                            상품후기
                        </a>
                    </dd>
                </div>
            </dl>
    <c:import url="../admin/admin_footer.jsp">
    </c:import>
</body>
</html>