<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="EUC-KR" isELIgnored="false"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%
request.setCharacterEncoding("UTF-8");
%>
    <nav class="shopInfo_bc_header">
         <p class="shopInfo_re_title">상품명!!!!!!!!!</p>
         <p>Q :</p>
         <p>"${userId}"</p>
         <p>"${userDate}"</p>
    </nav>
    <div class="shopInfo_bc_content">
         <p class="shopInfo_bc_text">
             "${userContent}"
         </p>
         <button data-answer-qna="${userId}" class="shopInfo_qna_re_btn" type="button">Answer</button>
    </div>
