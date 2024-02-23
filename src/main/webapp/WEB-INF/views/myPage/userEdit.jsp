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

<link rel="stylesheet" href="${contextPath}/css/basic/basic.css">
<link rel="stylesheet" href="${contextPath}/css/account/userInfo.css">
<link rel="stylesheet" href="${contextPath}/css/basic/search_artist.css">
<link rel="stylesheet" href="${contextPath}/css/basic/resizeMenu.css">
<link rel="stylesheet" href="${contextPath}/css/basic/mediaquery.css">

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

<!-- url -->
<c:url var="logoutUrl" value="/login-action/logout" />
<c:url var="userEdit" value="/${artistId}/myPage/user_edit" />
<c:url var="orderList" value="/${artistId}/myPage/order_list" />
<c:url var="productQuestion" value="/${artistId}/myPage/product_question" />
<c:url var="productReview" value="/${artistId}/myPage/product_review" />

</head>
<body>
	<c:import url="../basic/header.jsp" >
		<c:param name="cartCount" value="${cartCount}"/>
	</c:import>
        <div class="myPageBox">
            <h2 class="myPageSubTitle">mypage</h2>
            <header class="myPageHeader">
                <h2>gdragon</h2>
                <div class="myPage_basicSubBox">
                    <a href="${userEdit}">
                        <i class="fa-solid fa-user-pen fa-lg"></i>
                    </a>
                    <form action="${logoutUrl}" method="post">
                        <button id="logOutBtn" type="button">
                            <i class="fa-solid fa-power-off fa-lg"></i>
                        </button>
                    </form>
                </div>
            </header>
            <section class="myPageContent">
                <dl class="myPage_orderStatusBox">
                    <span class="myPage_orderStstusInfo">*최근 3개월 기준</span>
                    <div class="myPage_orderStatus">
                        <dt>미입금</dt>
                        <dd><a href="">0</a></dd>
                    </div>
                    <div class="myPage_orderStatus">
                        <dt>출고대기</dt>
                        <dd><a href="">0</a></dd>
                    </div>
                    <div class="myPage_orderStatus">
                        <dt>배송중</dt>
                        <dd><a href="">0</a></dd>
                    </div>
                    <div class="myPage_orderStatus">
                        <dt>배송완료</dt>
                        <dd><a href="">0</a></dd>
                    </div>
                    <div class="myPage_orderStatus">
                        <dt>취소/교환/반품</dt>
                        <dd><a href="">0</a></dd>
                    </div>
                </dl>
                <dl class="myPageMenuBox">
                    <a href="${orderList}" class="myPageMenu">
                        <dt><i class="fa-solid fa-basket-shopping fa-lg"></i></dt>
                        <dd>주문 내역</dd>
                    </a>
                    <a href="${productQuestion}" class="myPageMenu">
                        <dt><i class="fa-solid fa-circle-question fa-lg"></i></dt>
                        <dd>상품문의</dd>
                    </a>
                    <a href="${productReview}" class="myPageMenu">
                        <dt><i class="fa-solid fa-pen-to-square fa-lg"></i></dt>
                        <dd>상품후기</dd>
                    </a>
                </dl>
            </section>
        </div>

	<jsp:include page="../basic/footer.jsp" flush="true" />
</body>
</html>