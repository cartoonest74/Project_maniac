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

<link rel="stylesheet" href="${contextPath}/css/order/order.css">
<link rel="stylesheet" href="${contextPath}/css/order/orderRegistry.css">
<link rel="stylesheet" href="${contextPath}/css/search_artist.css">
<link rel="stylesheet" href="${contextPath}/css/resizeMenu.css">
<link rel="stylesheet" href="${contextPath}/css/basic.css">
<link rel="stylesheet" href="${contextPath}/css/order/orderTerms.css">
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

<script type="text/javascript" src="${contextPath}/js/order/order.js"></script>
<script type="text/javascript" src="${contextPath}/js/order/order_term.js"></script>
<script type="text/javascript" src="${contextPath}/js/order/order_registry.js"></script>
<script type="text/javascript" src="${contextPath}/js/search_artist.js"></script>
<script type="text/javascript" src="${contextPath}/js/resizeMenu.js"></script>
<script type="text/javascript" src="${contextPath}/js/header.js"></script>
<script type="text/javascript" src="${contextPath}/js/cart.js"></script>

<!-- postDaum -->
<script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
<script type="text/javascript" src="${contextPath}/js/postDaum/postDaum.js"></script>

<!--  portOne -->
<script src="https://cdn.portone.io/v2/browser-sdk.js"></script>

<!-- paymentMethod -->
<c:url var="kakaopay" value="/img/paymentMethod/kakaopay.png"/>
<c:url var="npay" value="/img/paymentMethod/npay.png"/>
<c:url var="payco" value="/img/paymentMethod/payco.png"/>
<c:url var="toss" value="/img/paymentMethod/toss.png"/>

<!-- response order -->
<c:set var="order_info" value="${orderInfo}"/>
<c:set var="order_delivery" value="${orderDelivery[0]}"/>
</head>
<body>
	<c:import url="../basic/header.jsp">
	</c:import>
        <div class="orderCompleteBox">
                <header class="orderCompleateHeader">
                    <h1>주문완료</h1>
                    <div class="orderHeader_comment">
                        <p>MARKET을 이용해주셔서 감사합니다.</p>
                        <p>고객님이 주문하신 주문번호는</p>
                        <p><span style="padding:5px 10px; background:rgba(210, 255, 250, 0.733); color:red; font-weight:600;">1230123021310</span>입니다.</p>
                        <p>주문내역 확인은 배송/마이페이지의</p>
                        <p> "주문/배송조회"에서 확인하실 수 있습니다.</p>
                    </div>
                </header>
                <dl class="orderCompleteCotent">
                    <div>
                        <dt>
                            결제정보
                        </dt>
                        <dd><span>Jung Kook (BTS) 'GOLDEN' (Set)</span></dd>
                    </div>
                    <div>
                        <dt>
                            주문번호
                        </dt>
                        <dd></dd>
                    </div>
                    <div>
                        <dt>배송지</dt>
                        <dd>
                            <p><span>한 경</span></p>
                            <span>경기 안성시 공도읍 서동대로 3860</span>&nbsp;<spna>동양123</spna></p>
                            <p><span>17564</span></p>
                            <p><span>010-9494-9494</span></p>
                        </dd>
                    </div>
                    <div>
                        <dt>배송방법
                        </dt>
                        <dd>택배</dd>
                    </div>
                    <div>
                        <dt>배송메모</dt>
                        <dd></dd>
                    </div>
                </dl>
                <a class="order_completeBtn" href="">홈으로</a>
        </div>
    <jsp:include page="../basic/footer.jsp" flush="true" />
</body>
</html>