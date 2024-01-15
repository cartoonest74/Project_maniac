<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="EUC-KR" isELIgnored="false"%>
<%@ page import="model.*, java.util.*"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="stylesheet" href="${pageContext.request.contextPath}/css/writer_review.css">
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/css/main.css">
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/css/basic.css">
<link rel="stylesheet" href="${pageContext.request.contextPath}/css/about/about.css">
<link rel="stylesheet" href="${pageContext.request.contextPath}/css/about/about_slide.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />

<title>Document</title>
<%
request.setCharacterEncoding("UTF-8");
%>
<c:set var="contextPath" value="${pageContext.request.contextPath}" />

<script src="https://code.jquery.com/jquery-2.2.4.js"
	integrity="sha256-iT6Q9iMJYuQiMWNd9lDyBUStIq/8PuOW33aOqmvFpqI="
	crossorigin="anonymous"></script>
<script type="text/javascript" src="${contextPath}/js/header.js"></script>
<script type="text/javascript" src="${contextPath}/js/about/about.js"></script>
<script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>

</head>
<body>
	<c:import url="../basic/header.jsp">
	</c:import>
            <div class="about_Box">
                <header class="about_header">
                    <div class="about_MainImg">
                        <img src="./akmu2.webp" alt="">
                        <h2 class="about_title">BTS</h2>
                    </div>
                </header>
                <section class="about_contentBox">
                    <div class="about_content">
                        <button class="about_artistInfo" type="button">아티스트 정보</button>
                    </div>
                    <div class="about_content">
                        <div class="about_contentTitle">
                            <h2>mv</h2>
                        </div>
                        <nav class="about_infoContent">
                            <a class="about_mv" href="#" target="_blank">
                                <span>
                                    No More Dream
                                    <br>
                                    2013-06-11
                                </span>
                            </a>
                        </nav>
                    </div>
                    <div class="about_content">
                        <div class="about_contentTitle">
                            <h2>discography</h2>
                        </div>
                        <div class="about_infoContent">
                            <button data-about-album="1" class="about_discography" type="button">
                                <img src="./lovelee.webp" alt="">
                            </button>
                        </div>
                        <nav class="about_contentPage">
                            <button type="button">
                                <i data-last-page-id="1" class="fa-solid fa-angle-left fa-lg"></i>
                            </button>
                            <button type="button">1</button>
                            <button type="button">
                                <i data-last-page-id="1" class="fa-solid fa-angle-right fa-lg"></i>
                            </button>
                        </nav>
                    </div>
                    <div class="about_content">
                        <div class="about_contentTitle">
                            <h2>photo</h2>
                        </div>
                        <div class="about_infoContent">
                            <button data-about-artistImg="0" class="about_artistImg">
                                <img data-about-artistImg="0" src="akmu1.webp" alt="1">
                            </button>
                        </div>
                        <nav class="about_contentPage">
                        </nav>
                    </div>
                    <div class="about_snsBox">
                        <nav class="about_sns">
                            <a target="_blank" href="#">
                                <i class="fa-brands fa-facebook"></i>
                            </a>
                        </nav>
                    </div>
                </section>
            </div>
        </section>
    </div>
</body>
</html>