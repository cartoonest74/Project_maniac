<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="EUC-KR" isELIgnored="false"%>
<%@ page import="model.*, java.util.*"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

    <c:set var="contextPath" value="${pageContext.request.contextPath}" />
    <script src="https://kit.fontawesome.com/7938f26122.js" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="${contextPath}/css/orderterms.css">
    <script type="text/javascript" src="${contextPath}/js/orderterms.js"></script>
</head>
<body>
    <div id="Term_BOX" class="termBox">
        <button class="termBoxExit" onclick="termBoxExit()" type="button">
            <i class="fa-solid fa-x fa-lg"></i>
        </button>
        <header class="termHeader">
            <h1>주문 상품 정보, 가격, 배송, 반품, 교환, 환불 정책에 동의</h1>
            <h2>주문 상품 정보, 가격, 배송, 반품, 교환, 환불 정책에 동의</h2>
        </header>
        <section class="termContent">
            <h1>상품 주문을 위해 위버스샵 상품 상세 페이지에 기술 된 내용 및 정책에 모두 동의합니다.</h1>
            <ul>
                <li>상품 배송 정보</li>
                <li>그 외 상품 안내사항</li>
                <li>상품 고시정보</li>
                <li>반품 / 교환 / 환불 정보</li>
            </ul>
        </section>
        <footer class="termOkBtn">
            <button onclick="termBoxExit()" type="button">OK</button>
        </footer>
    </div>
</body>
</html>