<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="EUC-KR" isELIgnored="false"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%
request.setCharacterEncoding("UTF-8");
%>
<nav class="shopInfo_bc_header">
                <p class="shopInfo_re_title"></p>
                <p>Q :</p>
                <p>"${userId}"</p>
                <p>"${userDate}"</p>
                </nav>
                <div class="shopInfo_bc_content">
                    <nav class="shopInfo_BoardImg">
                        <img src="${userUrl}" alt="${urlAlt}">
                    </nav>
                    <p class="shopInfo_bc_text">"${userContent}"</p>
                </div>
</nav>
