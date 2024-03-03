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
<link rel="stylesheet" href="${contextPath}/css/myPage/review_qnaSearch.css">
<link rel="stylesheet" href="${contextPath}/css/myPage/myReview.css">
<link rel="stylesheet" href="${contextPath}/css/pageCount/pageCount.css">
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
<script type="text/javascript" src="${contextPath}/js/admin/admin_review.js"></script>

<c:set var="shopReviews" value="${adminReviews}"/>
<c:url var="adminMain" value="/admin/main"/>
</head>
<body>
    <c:import url="../admin/admin_header.jsp">
    </c:import>
            <div class="myReviewBox">
                <header class="myReviewHeader">
                    <div class="go_myPage">
                        <a href="${adminMain}">
                            <i class="fa-solid fa-angle-left fa-lg"></i>
                            <span>
                                상품후기
                            </span>
                        </a>
                    </div>
                    <div class="myReview_search">
                        <button id="myReviewSearch" type="button">
                            <span id="searchTypeName">전체</span>
                            <i class="fa-solid fa-bars-staggered fa-lg"></i>
                        </button>
                    </div>
                </header>
                <dl id="reviewContainer" class="myReviewContainerBox">
                <c:forEach var="shopReview" items="${shopReviews}">
                    <c:set var="reviewArtistId" value="${shopReview.artist_id}"/>
                    <c:set var="reviewTitle" value="${shopReview.title}"/>
                    <c:set var="reviewContent" value="${shopReview.content}"/>
                    <c:set var="reviewDate" value="${shopReview.date}"/>
                    <c:set var="reviewId" value="${shopReview.id}"/>
                    <c:url var="reviewUrl" value="${shopReview.url}"/>
                    <c:url var="reviewUserNo" value="${shopReview.userNo}"/>
                    <!-- ${reviewUserNo} -->
                    <div class="myReviewContainer">
                        <dt class="myReviewDate">
                            <h2>${reviewDate}</h2>
                        </dt>
                        <dd class="myReviewInfo">
                            <div data-myReview-title="${reviewId}" class="reviewTitle">
                                <h3>${reviewTitle}
                                </h3>
                            </div>
                            <div class="myReviewContent">
                                <div class="reviewImg">
                                    <img src="${reviewUrl}" alt="${reviewId}">
                                </div>
                                <div data-myReview-text="${reviewId}" class="reviewText">
                                    <p>${reviewContent}</p>
                                </div>
                            </div>
                            <div class="myReviewOptionBtn">
                                <button data-myReview-del="${reviewId}" type="button">Delete</button>
                            </div>
                        </dd>
                    </div>
                </c:forEach>
                </dl>
                <div id="review_pageCount_num" class="pageCount">
                </div>
            </div>
    <c:import url="../admin/admin_footer.jsp">
    </c:import>
</body>
</html>