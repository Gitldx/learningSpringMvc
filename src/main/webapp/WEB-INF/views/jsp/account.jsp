<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
    <%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<spring:url value="/styles/plain/test.css" var="mainCss" />

<link href="${mainCss}" rel="stylesheet" />
<%--<link href="<c:url value="/styles/styles/plain/test.css" />" rel="stylesheet" type="text/css"> --%>

<title>科目</title>
</head>
<body>
    <div class="test2">科目</div>
    <div class="test">科目2</div>
</body>
</html>