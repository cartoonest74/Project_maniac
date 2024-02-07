<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="utf-8" isELIgnored="false"%>
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
<link rel="stylesheet" href="${pageContext.request.contextPath}/css/myPage/userInfo.css">
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
<script type="text/javascript" src="${contextPath}/js/myPage/myPageMain.js"></script>
<script type="text/javascript" src="${contextPath}/js/header.js"></script>

<script type="text/javascript" src="${contextPath}/js/search_artist.js"></script>
<script type="text/javascript" src="${contextPath}/js/postDaum/postDaum.js"></script>
<script type="text/javascript" src="${contextPath}/js/resizeMenu.js"></script>

<!-- axios -->
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>

<!-- parameter -->
<c:set var="member" value="${memberInfo}"/>
<c:set var="userId" value="${member.userId}"/>
<c:set var="userEmail" value="${member.email}"/>
<c:set var="userTel" value="${member.phone}"/>
<c:set var="userAddr" value="${member.addr}"/>
<c:set var="logoutUrl" value="/login-action/logout" />

<!-- url -->
<c:url var="userEdit" value="/myPage/${artistId}/user_edit" />
<c:url var="orderList" value="/myPage/${artistId}/order_list" />
<c:url var="productQuestion" value="/myPage/${artistId}/product_question" />
<c:url var="productReview" value="/myPage/${artistId}/product_review" />

</head>
<body>
	<c:import url="../basic/header.jsp" >
		<c:param name="cartCount" value="${cartCount}"/>
	</c:import>
        <div class="myPageBox">
            <h2 class="myPageSubTitle">mypage</h2>
            <header class="myPageHeader">
                <form class="logOutBox" action="${logoutUrl}" method="post" >
                    <span></span>
                    <h2 id="myPageUserId" class="myPageHeader_info">${userId}</h2>
                    <button class="myPage_basicSubBtn" id="logOutBtn" type="submit">
                        <i class="fa-solid fa-power-off fa-lg"></i>
                    </button>
                </form>
                <dl class="subInfoBox">
                    <div class="subInfo">
                        <dt><i class="fa-solid fa-square-phone-flip fa-lg"></i></dt>
                        <dd>
                            <p id="myPageTel" class="subInfoContent">${userTel}</p>
                            <button class="editManageBtn" id="editTelPage" type="button">수정</button>
                        </dd>
                    </div>
                    <div class="subInfo">
                        <dt><i class="fa-solid fa-location-dot fa-lg"></i></dt>
                        <dd>
                            <p id="myPageAddr" class="subInfoContent">${userAddr}</p>
                            <button class="editManageBtn" id="editDeliveryPage" type="button">수정</button>
                        </dd>
                    </div>
                    <div class="subInfo">
                        <dt><i class="fa-solid fa-lock fa-lg"></i></dt>
                        <dd>
                            <p class="subInfoContent">비밀번호 수정</p>
                            <button class="editManageBtn" id="editPwdPage" type="button">수정</button>
                        </dd>
                    </div>
                    <div class="subInfo">
                        <dt><i class="fa-solid fa-envelope fa-lg"></i></dt>
                        <dd>
                            <p id="myPageEmail" class="subInfoContent">${userEmail}</p>
                            <button class="editManageBtn" id="editEmailPage" type="button">수정</button>
                        </dd>
                    </div>
                </dl>
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