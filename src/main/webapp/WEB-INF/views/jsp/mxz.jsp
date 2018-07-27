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
    <link rel="stylesheet" type="text/css" href="/styles/lib/static/finance.css">

    <script type="text/javascript" src="/js/lib/EasyUi/jquery.min.js"></script>
    <script type="text/javascript" src="/js/lib/EasyUi/jquery.easyui.min.js"></script>
    <script type="text/javascript" src="/js/lib/EasyUi/datagrid-cellediting.js"></script>
    <script type="text/javascript" src="/js/lib/EasyUi/easyui-lang-zh_CN.js"></script>


</head>
<body>


    <noscript>
          请开启浏览器脚本支持功能.
    </noscript>
    <div id="root"></div>

    <% Gson gson = new Gson();
       String json =gson.toJson( request.getAttribute("accList"));
     %>
    <script type="text/javascript">
        var accList = <%=json%>;
    </script>


    <script type="text/javascript">

                function pagerFilter(data){
                    if ($.isArray(data)){    // is array
                        data = {
                            total: data.length,
                            rows: data
                        }
                    }
                    var target = this;
                    var dg = $(target);
                    var state = dg.data('datagrid');
                    var opts = dg.datagrid('options');
                    if (!state.allRows){
                        state.allRows = (data.rows);
                    }
                    if (!opts.remoteSort && opts.sortName){
                        var names = opts.sortName.split(',');
                        var orders = opts.sortOrder.split(',');
                        state.allRows.sort(function(r1,r2){
                            var r = 0;
                            for(var i=0; i<names.length; i++){
                                var sn = names[i];
                                var so = orders[i];
                                var col = $(target).datagrid('getColumnOption', sn);
                                var sortFunc = col.sorter || function(a,b){
                                    return a==b ? 0 : (a>b?1:-1);
                                };
                                r = sortFunc(r1[sn], r2[sn]) * (so=='asc'?1:-1);
                                if (r != 0){
                                    return r;
                                }
                            }
                            return r;
                        });
                    }
                    var start = (opts.pageNumber-1)*parseInt(opts.pageSize);
                    var end = start + parseInt(opts.pageSize);
                    data.rows = state.allRows.slice(start, end);
                    return data;
                }

                var loadDataMethod = $.fn.datagrid.methods.loadData;
                var deleteRowMethod = $.fn.datagrid.methods.deleteRow;
                $.extend($.fn.datagrid.methods, {
                    clientPaging: function(jq){
                        return jq.each(function(){
                            var dg = $(this);
                            var state = dg.data('datagrid');
                            var opts = state.options;
                            opts.loadFilter = pagerFilter;
                            var onBeforeLoad = opts.onBeforeLoad;
                            opts.onBeforeLoad = function(param){
                                state.allRows = null;
                                return onBeforeLoad.call(this, param);
                            }
                            var pager = dg.datagrid('getPager');
                            pager.pagination({
                                onSelectPage:function(pageNum, pageSize){

                                    opts.pageNumber = pageNum;
                                    opts.pageSize = pageSize;
                                    pager.pagination('refresh',{
                                        pageNumber:pageNum,
                                        pageSize:pageSize
                                    });
                                    dg.datagrid('loadData',state.allRows);
                                }
                            });
                            $(this).datagrid('loadData', state.data);
                            if (opts.url){
                                $(this).datagrid('reload');
                            }
                        });
                    },
                    loadData: function(jq, data){
                        jq.each(function(){
                            $(this).data('datagrid').allRows = null;
                        });
                        return loadDataMethod.call($.fn.datagrid.methods, jq, data);
                    },
                    deleteRow: function(jq, index){
                        return jq.each(function(){
                            var row = $(this).datagrid('getRows')[index];
                            deleteRowMethod.call($.fn.datagrid.methods, $(this), index);
                            var state = $(this).data('datagrid');
                            if (state.options.loadFilter == pagerFilter){
                                for(var i=0; i<state.allRows.length; i++){
                                    if (state.allRows[i] == row){
                                        state.allRows.splice(i,1);
                                        break;
                                    }
                                }
                                $(this).datagrid('loadData', state.allRows);
                            }
                        });
                    },
                    getAllRows: function(jq){
                        return jq.data('datagrid').allRows;
                    }
                })

          </script>

    <script type="text/javascript" src="/js/static/js/mxz.bundle.js"></script>
</body>
</html>