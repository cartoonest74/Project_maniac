<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="utf-8" isELIgnored="false"%>
<%@ page import="hello.market.dto.*, java.util.*" %>
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
<link rel="stylesheet" href="${contextPath}/css/main/index_header.css">
<link rel="stylesheet" href="${contextPath}/css/main/index_main.css">
<link rel="stylesheet" href="${contextPath}/css/basic/search_artist.css">
<link rel="stylesheet" href="${contextPath}/css/basic/mediaquery.css">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;900&display=swap" rel="stylesheet">

<script src="https://unpkg.com/typewriter-effect@latest/dist/core.js"></script>
<script src="https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.js"></script>
<script src="https://kit.fontawesome.com/7938f26122.js" crossorigin="anonymous"></script>
<script src="https://code.jquery.com/jquery-2.2.4.js" integrity="sha256-iT6Q9iMJYuQiMWNd9lDyBUStIq/8PuOW33aOqmvFpqI=" crossorigin="anonymous"></script>

<script type="text/javascript" src="${contextPath}/js/search_artist.js"></script>
<script type="text/javascript" src="${contextPath}/js/resizeMenu.js"></script>
<script type="text/javascript" src="${contextPath}/js/cart.js"></script>
<script type="text/javascript" src="${contextPath}/js/main.js"></script>

<!-- controller mapping url -->
<c:url var="shopinfo" value="/product/find-product" />
<c:url var="maniac" value="/img/web_logo/maniac.png" />
<c:url var="mainBg" value="/img/main_bg/mainBg.png" />
<c:url var="maniac_simple_log_c" value="/img/web_logo/Simple_logoC.png" />

<c:set var="reset_date" value="${resetDate}"/>

</head>
<body>
	<c:import url="../main/index_header.jsp" >
	</c:import>
	<div class="mainBox">
        <div class="main_contain">
            <header class="main_simpleLogo">
                <nav>
                    <img src="${maniac_simple_log_c}" alt="mania_simple">
                </nav>
                <nav>
                    <img src="${maniac}" alt="maniac">
                </nav>
            </header>
            <div id="searchBtn" class="main_serach">
                <nav id="main_typingText" class="main_searchBar">
                </nav>
                <button type="button" class="main_searchIcon">
                    <i class="fa-solid fa-magnifying-glass fa-lg"></i>
                </button>
            </div>
            <dl class="main_contentBox">
                <dt class="main_contentHeader">
                    <span>RANK</span>
                    <nav>
                        <i class="fa-regular fa-clock"></i>
                        <span id="rankDate">${reset_date} 18:00</span>
                    </nav>
                    <button data-rank-btn="rank" type="button">
                        <i data-rank-btn="open" class="fa-solid fa-angle-down fa-lg"></i>
                    </button>
                </dt>
                <dd id="RankContentBox" class="main_rankContentBox rankContentClose">
                    <nav id="RankContent" class="main_RankContent transition3s">
                        <c:forEach var="artist" varStatus="status" items="${artistsList}">
                            <button data-search-artist="${artist.id}" type="button">
                                <span data-search-artist="${artist.id}">${status.count}</span>
                                <span data-search-artist="${artist.id}">${artist.name}</span>
                            </button>
                        </c:forEach>
                    </nav>
                </dd>
            </dl>
        </div>
    </div>
	<jsp:include page="../basic/footer.jsp" flush="true" />
	<script type="module" src="${contextPath}/js/artist_main_slide.js"></script>
</body>
</html>