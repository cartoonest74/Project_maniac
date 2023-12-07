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
    <link rel="stylesheet" href="${contextPath}/css/infoterms.css">
    <script type="text/javascript" src="${contextPath}/js/orderterms.js"></script>
</head>
<body>
    <div id="Term_BOX" class="termBox">
        <button class="termBoxExit" onclick="termBoxExit()" type="button">
            <i class="fa-solid fa-x fa-lg"></i>
        </button>
        <header class="termHeader">
            <h1>개인정보 수집 이용 동의</h1>
            <h2>개인정보 수집 이용 동의(필수)</h2>
        </header>
        <section class="termContent">
            <p>수집 이용 목적</p>
            <ul>
                <li>상품 구매 시 상품 배송을 위한 주문자 정보 및 배송정보 입력을 위함</li>
            </ul>
            <p>수집 이용 항목</p>
            <ul>
                <li>주문자 정보(성명, 이메일, 연락처), 배송지 정보(성명, 연락처, 주소), (특정국가 배송 시) 세금식별번호</li>
            </ul>
            <p>보유 및 이용기간</p>
            <ul>
                <li>관련 법령에 따른 보존기간 또는 탈퇴 후 3개월 이내</li>
            </ul>
            <p>※ 위 동의를 거부할 권리가 있으며, 동의를 거부하실 경우 위 목적의 서비스 이용이 제한될 수 있습니다.</p>
        </section>
        <footer class="termOkBtn">
            <button onclick="termBoxExit()" type="button">OK</button>
        </footer>
    </div>
</body>
</html>