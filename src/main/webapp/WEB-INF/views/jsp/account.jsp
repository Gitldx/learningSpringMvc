<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import = "com.google.gson.Gson" %>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="theme-color" content="#000000">
<title>首页</title>

    <link rel="stylesheet" type="text/css" href="/styles/lib/EasyUi/themes/gray/easyui.css">
    <link rel="stylesheet" type="text/css" href="/styles/lib/EasyUi/themes/icon.css">
    <link rel="stylesheet" type="text/css" href="/styles/lib/EasyUi/themes/color.css">
    <script type="text/javascript" src="/js/lib/EasyUi/jquery.min.js"></script>
    <script type="text/javascript" src="/js/lib/EasyUi/jquery.easyui.min.js"></script>

    <link href="/styles/static/css/account.ae833715.css" rel="stylesheet"></head>
</head>
<body>

    <%--<jsp:forward page="/account" />--%>

    <%--
        response.sendRedirect("/account");
    --%>
    <!--<h1>首页</h1>-->
    <%--<h2>Hello : ${msg}</h2>--%>
    <noscript>
          You need to enable JavaScript to run this app.
        </noscript>
    <div id="root"></div>
    <% Gson gson = new Gson();
       String json =gson.toJson( request.getAttribute("accList"));
      %>
    <script type="text/javascript">
        var accList = <%=json%>;
    </script>

    <script type="text/javascript" src="/js/static/js/account.bundle.js"></script>
</body>
</html>