<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="theme-color" content="#000000">
<title>首页</title>

    <link rel="stylesheet" type="text/css" href="/styles/lib/EasyUi/themes/metro/easyui.css">
    <link rel="stylesheet" type="text/css" href="/styles/lib/EasyUi/themes/icon.css">
    <link rel="stylesheet" type="text/css" href="/styles/lib/EasyUi/themes/color.css">
    <script type="text/javascript" src="/js/lib/EasyUi/jquery.min.js"></script>
    <script type="text/javascript" src="/js/lib/EasyUi/jquery.easyui.min.js"></script>

    <link href="/styles/static/css/home.50209b3e.css" rel="stylesheet"></head>
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

    <script type="text/javascript">
     $.fn.combogrid.defaults.onLoadSuccess = function(items){
         var _context = this;
         if (items.rows.length > 0){
             var dg = $(this); // .combogrid('grid');
             var opts = dg.datagrid('options');
             if(!!opts.autoSelectFirst){
                //if(items.rows.length > 1){
                //    $(this).datagrid('selectRow',0);
                //}
                if(items.rows.length == 1){
                    $(opts.comboElm).combogrid("setValue",items.rows[0][opts.idField]);
                }
             }
         }
     }
     </script>

    <script type="text/javascript" src="/js/static/js/home.bundle.js"></script>
</body>
</html>