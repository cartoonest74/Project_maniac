<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="EUC-KR" isELIgnored="false"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%
request.setCharacterEncoding("UTF-8");
%>
<c:set var="contextPath" value="${pageContext.request.contextPath}" />

<!-- session value -->
<c:set var="loginUserId" value="${userId}" />
<c:set var="loginGrade" value="${grade}" />

<!-- controller mapping url -->
<c:url var="loginAccount" value="/member/login-account" />
<c:url var="loginInfo" value="/member/login-info" />
<c:url var="viewCart" value="/cart/0/view-cart" />
<c:url var="rootInfo" value="/manager/info" />
<c:url var="maniac" value="/img/web_logo/maniac.png" />

<div class="box">
    <input id="contextPath" type="text" value="${contextPath}" hidden>
     <div id="search_box" class="background_searchBox">
            <div class="searchBox">
                <header class="searchBox_header">
                    <input id="artist_search" type="text" placeholder="search" autofocus>
                    <span>
                        <i class="fa-solid fa-magnifying-glass fa-lg"></i>
                    </span>
                </header>
                <section class="search_show_artist">
                    <span id="close_searchBox">
                        <i class="fa-solid fa-x fa-lg"></i>
                    </span>
                    <header class="search_show_title">
                        <h2>Top Searched</h2>
                    </header>
                    <div id="topSearch" class="searchInfoBox">

                    </div>
                    <header class="search_show_title">
                        <h2>Artist</h2>
                    </header>
                    <div id="searchShow" class="searchInfoBox">

                    </div>
                </section>
            </div>
     </div>
	<header class="shopHead">
		<nav class="navLeft">
            <c:if test="${loginGrade eq 0}">
                <a href="${rootInfo}" class="header_btn">
                    <i class="fa-regular fa-bell"></i>
                </a>
            </c:if>
		    <c:choose>
                <c:when test="${not empty loginUserId}">
                    <a href="${loginInfo}" class="header_btn">
                        <i class="fa-solid fa-user fa-lg"></i>
                    </a>
                </c:when>
                <c:otherwise>
                    <a href="${loginAccount}" class="header_btn">
                        <i class="fa-solid fa-user fa-lg"></i>
                    </a>
                </c:otherwise>
		    </c:choose>

            <a href="${viewCart}" id="header_cart_btn" class="header_btn" type="button">
                <i class="fa-solid fa-cart-shopping fa-lg"></i>
            </a>
		</nav>
	</header>
	<section class="shopBody">

