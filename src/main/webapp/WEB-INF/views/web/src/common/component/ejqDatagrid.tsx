/// <reference path="../../jqplugins/plugin.d.ts" />

import * as React from "react";


interface Iprops{
    columns : any,
    datasource : any,
    onDblClickRow(index : number,row : any)
    
}

export default class EjqDatagrid extends React.Component<Iprops>{


    private tableElm:HTMLElement;

    public render(){
        return (
            <React.Fragment>
                <table className="easyui-datagrid" 
                data-options="singleSelect:true" style={{width:"100%",height:$(window).height() - 18}}
                ref={el => this.tableElm = el}/>
            </React.Fragment>
        )
    }

    public componentDidMount(){

        this.renderTableElm();
    }

    public componentDidUpdate(){
        $(this.tableElm).datagrid('gotoPage', 1);
        $(this.tableElm).datagrid("loadData",this.props.datasource)
    }

    get TableElm(){
        return this.tableElm;
    }


    private renderTableElm(){
        


        $(()=>{
            $(this.tableElm).datagrid({
                rownumbers:true,
                columns:[this.props.columns],
                data : this.props.datasource,
                onDblClickRow :(index,row)=>{this.props.onDblClickRow(index,row);},
                pagination:true,
                pageSize:25,
                pageList: [25,50,100,200]
            })
			$(this.tableElm).datagrid('clientPaging');
		});
        

        // console.log($(window).height());

        // setTimeout(() => {
        //      $(this.tableElm).datagrid("getPanel").panel("resize",{heigt:400});
        //     // console.log($(window).height());
        // }, 100);
        
    }
}