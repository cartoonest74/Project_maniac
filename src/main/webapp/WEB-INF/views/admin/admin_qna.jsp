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
<link rel="stylesheet" href="${contextPath}/css/myPage/myQna.css">
<link rel="stylesheet" href="${contextPath}/css/myPage/review_qnaSearch.css">
<link rel="stylesheet" href="${contextPath}/css/pageCount/pageCount.css">
<link rel="stylesheet" href="${contextPath}/css/errorPage/confirm.css">
<link rel="stylesheet" href="${contextPath}/css/basic/mediaquery.css">


<link rel="preconnect" href="https://fonts.googleapias.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;900&display=swap" rel="stylesheet">

<script src="https://code.jquery.com/jquery-2.2.4.js"
	  integrity="sha256-iT6Q9iMJYuQiMWNd9lDyBUStIq/8PuOW33aOqmvFpqI="
	  crossorigin="anonymous"></script>
<script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
<script src="https://kit.fontawesome.com/7938f26122.js" crossorigin="anonymous"></script>
<script type="text/javascript" src="${contextPath}/js/admin/admin_header.js"></script>
<script type="text/javascript" src="${contextPath}/js/admin/admin_qna.js"></script>

</head>
<body>
    <c:import url="../admin/admin_header.jsp">
    </c:import>
    <div class="myQnaBox">
        <header class="myQnaHeader">
            <div class="go_myPage">
                <a href="${myPage}">
                    <i class="fa-solid fa-angle-left fa-lg"></i>
                    <span>
                        상품문의
                    </span>
                </a>
            </div>
            <div class="myQna_search">
                <button id="myQnaSearch" type="button">
                    <span id="searchTypeName">전체&#183;전체</span>
                    <i class="fa-solid fa-bars-staggered fa-lg"></i>
                </button>
            </div>
        </header>
        <dl id="QnaContainer" class="myQnaContainerBox">
        </dl>
        <div id="qna_pageCount_num" class="pageCount">
        </div>
    </div>
    <c:import url="../admin/admin_footer.jsp">
    </c:import>
</body>
</html>