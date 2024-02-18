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

<c:set var="contextPath" value="${pageContext.request.contextPath}" />

<link rel="stylesheet" href="${pageContext.request.contextPath}/css/basic.css">
<link rel="stylesheet" href="${pageContext.request.contextPath}/css/myPage/myReview.css">
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
<script type="text/javascript" src="${contextPath}/js/myPage/myReview.js"></script>
<script type="text/javascript" src="${contextPath}/js/search_artist.js"></script>
<script type="text/javascript" src="${contextPath}/js/resizeMenu.js"></script>

<!-- url -->
<c:url var="logoutUrl" value="/login-action/logout" />
<c:url var="userEdit" value="/${artistId}/myPage/user_edit" />
<c:url var="orderList" value="/${artistId}/myPage/order_list" />
<c:url var="productQuestion" value="/${artistId}/myPage/product_question" />
<c:url var="productReview" value="/${artistId}/myPage/product_review" />

<c:set var="userShopReviews" value="${userShopReview}"/>
</head>
<body>
	<c:import url="../basic/header.jsp" >
		<c:param name="cartCount" value="${cartCount}"/>
	</c:import>
    <div class="myReviewBox">
        <header class="myReviewHeader">
            <div class="go_myPage">
                <a href="">
                    <i class="fa-solid fa-angle-left fa-lg"></i>
                    <span>
                        상품후기
                    </span>
                </a>
            </div>
            <div class="myReview_search">
                <button id="myReviewSearch" type="button">
                    <span data-reviewOption-artist="1">전체</span>
                    <i class="fa-solid fa-bars-staggered fa-lg"></i>
                </button>
            </div>
        </header>
        <dl id="reviewContainer" class="myReviewContainerBox">
        <c:forEach var="shopReview" items="${userShopReviews}">
            <c:set var="reviewArtistId" value="${shopReview.artist_id}"/>
            <c:set var="reviewTitle" value="${shopReview.title}"/>
            <c:set var="reviewContent" value="${shopReview.content}"/>
            <c:set var="reviewDate" value="${shopReview.date}"/>
            <c:set var="reviewId" value="${shopReview.id}"/>
            <c:url var="reviewUrl" value="/img/shopimg/review/${shopReview.url}"/>
            <div class="myReviewContainer">
                <dt class="myReviewDate">
                    <h2>${reviewDate}</h2>
                </dt>
                <dd class="myReviewInfo">
                    <div class="reviewTitle">
                        <h3>${reviewTitle}
                        </h3>
                    </div>
                    <div class="myReviewContent">
                        <div class="reviewImg">
                            <img src="${reviewUrl}" alt="reviewImg">
                        </div>
                        <div class="reviewText">
                            <p>${reviewContent}</p>
                        </div>
                    </div>
                    <div class="myReviewOptionBtn">
                        <button data-myReview-edit="${reviewId}" type="button">Edit</button>
                        <button data-myReview-del="${reviewId}" type="button">Delete</button>
                    </div>
                </dd>
            </div>
        </c:forEach>
        </dl>
    </div>
	<jsp:include page="../basic/footer.jsp" flush="true" />
</body>
</html>