<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="utf-8" isELIgnored="false"%>
<%@ page import="model.*, java.util.*"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
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

<link rel="stylesheet" href="${contextPath}/css/order/order_complete.css">
<link rel="stylesheet" href="${contextPath}/css/search_artist.css">
<link rel="stylesheet" href="${contextPath}/css/resizeMenu.css">
<link rel="stylesheet" href="${contextPath}/css/basic.css">
<link rel="stylesheet" href="${contextPath}/css/mediaquery.css">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;900&display=swap" rel="stylesheet">

<script src="https://kit.fontawesome.com/7938f26122.js" crossorigin="anonymous"></script>
<script src="https://code.jquery.com/jquery-2.2.4.js"
	  integrity="sha256-iT6Q9iMJYuQiMWNd9lDyBUStIq/8PuOW33aOqmvFpqI="
	  crossorigin="anonymous"></script>
<!-- axios -->
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>

<script type="text/javascript" src="${contextPath}/js/search_artist.js"></script>
<script type="text/javascript" src="${contextPath}/js/resizeMenu.js"></script>
<script type="text/javascript" src="${contextPath}/js/header.js"></script>
<script type="text/javascript" src="${contextPath}/js/cart.js"></script>

<!-- postDaum -->
<script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
<script type="text/javascript" src="${contextPath}/js/postDaum/postDaum.js"></script>


<!-- response  -->
<c:set var="purchaseList" value="${purchaseList}"/>
<c:set var="orderNo" value="${orderNo}"/>
<c:set var="Complete_deliveryInfo" value="${delivery_info}"/>

<c:set var="firstName" value="${Complete_deliveryInfo.firstName}"/>
<c:set var="lastName" value="${Complete_deliveryInfo.lastName}"/>
<c:set var="mainAddr" value="${Complete_deliveryInfo.mainAddr}"/>
<c:set var="detailAddr" value="${Complete_deliveryInfo.detailAddr}"/>
<c:set var="postNum" value="${Complete_deliveryInfo.postNum}"/>
<c:set var="tel" value="${Complete_deliveryInfo.tel}"/>
<c:set var="purchaseAmount" value="${Complete_deliveryInfo.purchaseAmount}"/>
<c:set var="deliveryMethod" value="${Complete_deliveryInfo.deliveryMethod}"/>
<c:set var="deliveryMsg" value="${Complete_deliveryInfo.deliveryMsg}"/>
<c:set var="deliveryStatus" value="${Complete_deliveryInfo.deliveryStatus}"/>
<c:url var="mypage" value="/myPage/${artistId}"/>
</head>
<body>
	<c:import url="../basic/header.jsp">
	</c:import>
        <div class="orderCompleteBox">
                <a href="${mypage}" class="orderComplete_category">
                    주문&nbsp;내역
                </a>
                <header class="orderCompleateHeader">
                    <h1>주문완료</h1>
                    <div class="orderHeader_comment">
                        <p>MARKET을 이용해주셔서 감사합니다.</p>
                        <p>고객님이 주문하신 주문번호는</p>
                        <p><span style="padding:5px 10px; background:rgba(210, 255, 250, 0.733); color:red; font-weight:600;">${orderNo}</span>입니다.</p>
                        <p>주문내역 확인은 배송/마이페이지의</p>
                        <p> "주문/배송조회"에서 확인하실 수 있습니다.</p>
                    </div>
                </header>
                <dl class="orderCompleteCotent">
                    <div>
                        <dt>주문내역</dt>
                        <dd>
                        <c:forEach var="cart" items="${purchaseList}">
                            <c:set var="productNo" value="${cart.productNo}"/>
                            <c:set var="title" value="${cart.title}"/>
                            <c:set var="quantity" value="${cart.quantity}"/>
                            <c:set var="optionTitle" value="${cart.optionTitle}"/>
                            <p>
                                <span style="font-weight:600;">${title}</span>
                            <c:if test="${optionTitle eq 'single'}">
                                <span>&nbsp;(${quantity})</span>
                            </c:if>
                            </p>
                            <c:if test="${optionTitle ne 'single'}">
                                <p>
                                    <span>&nbsp;${optionTitle}</span><span>&nbsp;(${quantity})</span>
                                </p>
                            </c:if>
                        </c:forEach>
                        </dd>
                    </div>
                    <div>
                        <dt>결제금액</dt>
                        <dd>
                            <p><span>${purchaseAmount}</span></p>
                        </dd>
                    </div>
                    <div>
                        <dt>배송상태</dt>
                        <dd>
                            <p><span>${deliveryStatus}</span></p>
                        </dd>
                    </div>
                    <div>
                        <dt>주문번호</dt>
                        <dd><p><span>${orderNo}</span></p></dd>
                    </div>
                    <div>
                        <dt>배송지&nbsp;&nbsp;&nbsp;</dt>
                        <dd>
                            <p><span>${firstName}</span>&nbsp;<span>${lastName}</span></p>
                            <span>${mainAddr}</span>&nbsp;<spna>${detailAddr}</spna></p>
                            <p><span>${postNum}</span></p>
                            <p><span>${tel}</span></p>
                        </dd>
                    </div>
                    <div>
                        <dt>배송방법</dt>
                        <c:choose>
                            <c:when test="${deliveryMethod eq 'nationalCar'}">
                                <c:set var="deliveryMethod" value="국내택배"/>
                            </c:when>
                            <c:otherwise>
                            </c:otherwise>
                        </c:choose>
                        <dd><p><span>${deliveryMethod}</span></p></dd>
                    </div>
                    <div>
                        <dt>배송메모</dt>
                        <c:choose>
                            <c:when test="${deliveryMsg eq 'front_door'}">
                                <c:set var="deliveryMsg" value="부재 시 문 앞에 놔주세요"/>
                            </c:when>
                            <c:when test="${deliveryMsg eq 'contact_before'}">
                                <c:set var="deliveryMsg" value="배송 전 연락 주세요"/>
                            </c:when>
                            <c:when test="${deliveryMsg eq 'delivery_box'}">
                                <c:set var="deliveryMsg" value="부재 시 경비실에 놔주세요"/>
                            </c:when>
                            <c:when test="${deliveryMsg eq 'fragile'}">
                                <c:set var="deliveryMsg" value="파손 위험, 배송 시 주의해주세요"/>
                            </c:when>
                            <c:otherwise>
                            </c:otherwise>
                        </c:choose>
                        <dd><p><span>${deliveryMsg}</span></p></dd>
                    </div>
                </dl>
                <a class="order_completeBtn" href="/">홈으로</a>
        </div>
    <jsp:include page="../basic/footer.jsp" flush="true" />
</body>
</html>