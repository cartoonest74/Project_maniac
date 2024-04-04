<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%
request.setCharacterEncoding("UTF-8");
%>
<c:set var="contextPath" value="${pageContext.request.contextPath}" />

<!-- session value -->
<c:set var="loginUserId" value="${userId}" />
<c:set var="loginGrade" value="${grade}" />
<c:set var="cartLength" value="${cartCount}"/>

<!-- controller mapping url -->
<c:url var="loginAccount" value="/${artistId}/member/login-account" />
<c:url var="loginInfo" value="/myPage/${artistId}" />
<c:url var="rootInfo" value="/manager/info" />

<c:url var="notice" value="/main/${artistId}/notice?page=1" />
<c:url var="album" value="/product/${artistId}/shop/album?page=1" />
<c:url var="goods" value="/product/${artistId}/shop/goods?page=1" />
<c:url var="main" value="/main/${artistId}" />
<c:if test="${empty artistId || artistId eq 0}">
    <c:url var="main" value="/" />
</c:if>
<c:url var="about" value="/about/${artistId}" />
<c:url var="viewCart" value="/cart/${artistId}/view-cart"/>
<c:url var="viewLike" value="/${artistId}/like/view"/>

<c:url var="maniac" value="/img/web_logo/maniac.png" />
<c:url var="maniac_simple_log_c" value="/img/web_logo/Simple_logoC.png" />
<div class="box">
	<input id="contextPath" value="${contextPath}" type="text" hidden="hidden" />
	<input id="artistId" value="${artistId}" type="text" hidden="hidden" />
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
    <div class="sideBarBox">
        <button id="recentView_ProductBtn" style="display:none" class="recentView_ProductBtn">
            <img src="" alt="">
        </button>
    </div>
    <!-- Resize 나타나는 메뉴 -->
    <div id="resize_menu" class="resizeMenu">
        <button id="resizeMenu_Btn" class="resizeMenu_Btn" type="button">
            <span id="resizeMenu_on" class="inlineblock">
                <i class="fa-solid fa-bars fa-lg"></i>
            </span>
        </button>
        <div id="resizeMenuRelative" class="resizeMenu_Relative">
                <!-- second menu -->
            <div id="second_resizeMenu_partBox" class="second_resizeMenu_partBox none">
                <div class="resizeMenu_partBox_Relative">
                    <span id="second_resizeMenu_off" class="none">
                        <i class="fa-solid fa-rotate-left fa-lg"></i>
                    </span>
                    <nav class="resizeMenuPart">
                        <!--
                        <button data-btn-hmtype="sub_category" class="resizeMenuInfo" type="button">
                            <nav>
                                <span>CONCERT</span>
                            </nav>
                        </button>
                        -->
                        <button data-btn-hmtype="sub_category" class="resizeMenuInfo" type="button">
                            <a href="${album}">
                                <span>ALBUM</span>
                            </a>
                        </button>
                        <button data-btn-hmtype="sub_category" class="resizeMenuInfo" type="button">
                            <a href="${goods}">
                                <span>GOODS</span>
                            </a>
                        </button>
                    </nav>
                </div>
            </div>
            <!-- first menu -->
            <div id="first_resizeMenu_partBox" class="resizeMenu_partBox none">
                <div class="resizeMenu_partBox_Relative">
                    <span id="resizeMenu_off" class="resizeMenu_Btn_off">
                        <i class="fa-solid fa-xmark fa-lg"></i>
                    </span>
                    <nav class="resizeMenuPart">
                        <button data-btn-hmtype="about" class="resizeMenuInfo" type="button">
                            <a href="${about}">
                                <span>ABOUT</span>
                                <span class="rm_bottom_impact"></span>
                            </a>
                        </button>
                        <button data-btn-hmtype="shop" class="resizeMenuInfo margin_top30" type="button">
                            <nav>
                                <span>SHOP</span>
                                <span class="rm_bottom_impact"></span>
                            </nav>
                        </button>
                        <button data-btn-hmtype="notice" class="resizeMenuInfo margin_top30" type="button">
                            <a href="${notice}">
                                <span>NOTICE</span>
                                <span class="rm_bottom_impact"></span>
                            </a>
                        </button>
                    </nav>
                    <nav class="resizeMenuPart resizeBottomMenu">
                    <!-- <span>LOGIN</span> -->
                    <c:choose>
                        <c:when test="${not empty loginUserId}">
                            <input data-login hidden="hidden"/>
                            <a href="${loginInfo}" class="resizeMenuInfo">
                                <i class="fa-solid fa-user fa-lg"></i>
                            </a>
                        </c:when>
                        <c:otherwise>
                            <a id="resize_login_btn" href="${loginAccount}" class="resizeMenuInfo">
                                <i class="fa-regular fa-user fa-lg"></i>
                            </a>
                        </c:otherwise>
                    </c:choose>
                        <!--
                        <button class="resizeMenuInfo" type="button">
                            <span><i class="fa-solid fa-sun fa-lg"></i></span>
                        </button>
                        -->
                    </nav>
                </div>
            </div>
        </div>
    </div>
	<header class="shopHead">
		<nav class="shopTitle">
			<h1 class="shopLogoBox">
				<a class="shopLogo" href="${main}">
				    <span>
				        <img src="${maniac}" alt="maniac"/>
				    </span>
				</a>
			</h1>
		</nav>
		<nav class="navLeft">
            <button id="searchBtn" class="header_btn" type="button">
                <nav class="current_artist">
                    <span id="currentArtist"></span>
                </nav>
                <span class="artist_searchIcon">
                    <i class="fa-solid fa-magnifying-glass fa-lg"></i>
                </span>
            </button>
	        <c:if test="${loginGrade eq 0}">
	            <a href="${rootInfo}" class="header_btn">
                    <i class="fa-regular fa-bell"></i>
                </a>
	        </c:if>
            <c:choose>
                <c:when test="${not empty loginUserId}">
                    <input data-login hidden="hidden"/>
                    <a href="${loginInfo}" class="header_btn">
                        <i class="fa-solid fa-user fa-lg"></i>
                    </a>
                </c:when>
                <c:otherwise>
                    <a id="header_login_btn" href="${loginAccount}" class="header_btn">
                        <i class="fa-regular fa-user fa-lg"></i>
                    </a>
                </c:otherwise>
            </c:choose>
            <a href="${viewCart}" id="header_cart_btn" class="header_btn" type="button">
                <i class="fa-solid fa-cart-shopping fa-lg"></i>
            </a>
            <a href="${viewLike}" id="header_heart_btn" class="header_btn" type="button">
                <i class="fa-solid fa-heart fa-lg"></i>
            </a>
        </nav>
	</header>
	<section class="shopBody">

