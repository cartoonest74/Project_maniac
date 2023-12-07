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
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/css/main.css">
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/css/basic.css">
<link rel="stylesheet" href="${pageContext.request.contextPath}/css/about.css">
<link rel="stylesheet" href="${pageContext.request.contextPath}/css/writer_review.css">
<title>Document</title>
<%
request.setCharacterEncoding("UTF-8");
%>
<c:set var="contextPath" value="${pageContext.request.contextPath}" />

<script type="text/javascript" src="${contextPath}/libs/smarteditor/js/HuskyEZCreator.js" charset="utf-8"></script>
<script src="https://code.jquery.com/jquery-2.2.4.js"
	integrity="sha256-iT6Q9iMJYuQiMWNd9lDyBUStIq/8PuOW33aOqmvFpqI="
	crossorigin="anonymous"></script>
<script type="text/javascript" src="${contextPath}/js/header.js"></script>

</head>
<body>
	<c:import url="../basic/header.jsp">
	</c:import>
	<form action="#" id="WriterQnaForm" class="Writer_qna_Form" method="post" enctype="multipart/form-data">
    		<input type="text" name="productNo" value="${productNo}" hidden="hidden">
    		<nav class="writere_tag">Review</nav>
    		<nav class="writer_qna_header">
    			<h1>
    				<span>${name}</span>
    			</h1>
    			<div class="qna_basicInfo">
    				<span>${memberId}</span> <span>/</span> <span>2023.04.28</span>
    			</div>
    		</nav>
    		<div class="fileUploadPart">
    			<label class="boardFileUploadName"> UPLOAD <input
    				class="blind" type="file" id="reviewImgFile" name="reviewImgFile">
    			</label>
    			<nav class="preview_upload">
    				<img id="previewImg" class="boardPreview none" />
    				<p id="previewName" class="fileUpload_name none"></p>
    				<button class="removeBtn none" type="button" id="previewRemove">
    					<i class="fa-solid fa-xmark fa-lg"></i>
    				</button>
    			</nav>
    		</div>
    		<nav class="qnaTextBox">
    		 <textarea id="txtContent" name="content" cols="20" rows="3" wrap="hard" autofocus="autofocus" maxlength="200" placeholder="write...." required></textarea>
    		</nav>
    		<button onclick="submitPost();" type="button" class="qnaSendbtn">SEND</button>
    </form>
	<!--
	<div class="aboutBox">
	<p>To Be Continue.......</p>
	</div>
	-->
	<jsp:include page="../basic/footer.html" flush="true" />
    <script type="text/javascript" src="${contextPath}/js/smartEditorSave.js"></script>
	<script id="smartEditor" type="text/javascript" src="${contextPath}/js/smarteditor.js"></script>
</body>
</html>