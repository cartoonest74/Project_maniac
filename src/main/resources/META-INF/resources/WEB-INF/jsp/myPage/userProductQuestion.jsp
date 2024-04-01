<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" isELIgnored="false"%>
<%@ page import="model.*, java.util.*" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>MANIAC</title>

<c:set var="contextPath" value="${pageContext.request.contextPath}" />

<link rel="icon" href="${contextPath}/img/web_logo/favicon.png">

<link rel="stylesheet" href="${contextPath}/css/basic/basic.css">
<link rel="stylesheet" href="${contextPath}/css/myPage/myQna.css">
<link rel="stylesheet" href="${contextPath}/css/myPage/review_qnaSearch.css">
<link rel="stylesheet" href="${contextPath}/css/pageCount/pageCount.css">
<link rel="stylesheet" href="${contextPath}/css/basic/search_artist.css">
<link rel="stylesheet" href="${contextPath}/css/basic/resizeMenu.css">
<link rel="stylesheet" href="${contextPath}/css/basic/mediaquery.css">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;900&display=swap" rel="stylesheet">

<script src="https://code.jquery.com/jquery-2.2.4.js"
	  integrity="sha256-iT6Q9iMJYuQiMWNd9lDyBUStIq/8PuOW33aOqmvFpqI="
	  crossorigin="anonymous"></script>
<script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
<script src="https://kit.fontawesome.com/7938f26122.js" crossorigin="anonymous"></script>

<script type="text/javascript" src="${contextPath}/js/header.js"></script>
<script type="text/javascript" src="${contextPath}/js/myPage/myQna.js"></script>
<script type="text/javascript" src="${contextPath}/js/search_artist.js"></script>
<script type="text/javascript" src="${contextPath}/js/resizeMenu.js"></script>

<!-- axios -->
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>

<!-- url -->
<c:url var="myPage" value="/myPage/${artistId}" />

</head>
<body>
	<c:import url="../basic/header.jsp" >
		<c:param name="cartCount" value="${cartCount}"/>
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
        <!--
            <div class="myQnaContainer">
                <dt class="myQnaDate">
                    <h2>2014-02-17</h2>
                    <button data-myQna-del="" type="button"><i class="fa-solid fa-trash fa-lg"></i></button>
                </dt>
                <dd class="myQnaInfo">
                    <div class="QnaTitle">
                        <h3>Official Light Stick Special Edition</h3>
                        <span style="width:50px; font-size:1.3em; color:green;">대기중</span>
                    </div>
                    <div class="myQnaContent">
                        <div class="QnaText">
                            <p>good</p>
                        </div>
                    </div>
                </dd>
            </div>
            <div class="myQnaContainer">
                <dd class="reMyQnaInfo">
                    <div class="reQnaTitle">
                        <h3><i class="fa-solid fa-arrow-turn-up fa-rotate-90 fa-lg" aria-hidden="true"></i>RE:관리자</h3>
                        <span style="font-size:1.3em;">2024-02-14</span>
                    </div>
                    <div class="reMyQnaContent">
                        <div class="reQnaText">
                            <p>good</p>
                        </div>
                    </div>
                </dd>
            </div>
        -->
        </dl>
        <div id="qna_pageCount_num" class="pageCount">
        </div>
    </div>
	<jsp:include page="../basic/footer.jsp" flush="true" />
</body>
</html>