<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%
request.setCharacterEncoding("UTF-8");
%>
<!-- request parameter -->
<c:set var="adminId" value="${admin.adminId}"/>
<c:set var="adminName" value="${admin.name}"/>

<c:set var="contextPath" value="${pageContext.request.contextPath}" />
    <div class="rootManger">
        <header class="rootHeader">
            <div class="rootHeaderTitle">
                admin
            </div>
            <div class="rootHeaderInfo">
                <div class="rootName">
                    <h2>${adminId}</h2>
                    <h3>${adminName}</h3>
                </div>
                <button id="rootLogOut" type="button">
                    <i class="fa-solid fa-power-off fa-lg" aria-hidden="true"></i>
                </button>
            </div>
        </header>
        <section class="rootMangerBox">