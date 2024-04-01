<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="EUC-KR" isELIgnored="false"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%
request.setCharacterEncoding("UTF-8");
%>
    <nav class="shopInfo_bc_header">
         <p><i class="fa-solid fa-arrow-turn-up fa-rotate-90 fa-lg"></i></p>
         <p>ADMIN</p>
         <p>"${rootDate}"</p>
    </nav>
    <div class="shopInfo_bc_content">
         <p class="shopInfo_bc_text">"${rootContent}"</p>
    </div>
