import * as React from "react";

import EditModel from './editModel'

import {AccountModel, AccountTypeEnum, BalanceSideEnum} from '../account/AccountModel'




export default class Edit extends React.Component{

    private datagridRectXY:any;

    private tableElm : HTMLElement;

    private dataSource : EditModel[] = [];

    private datagridProperty = {
        
        
        data:this.dataSource,
        showFooter : true,
        
        fitColumns:true,
        autoRowHeight:false,
        onBeforeEdit :(index,row : EditModel)=>{
            console.log(row);
            if(!row.IsDetailed){
                return false;
            }

            return true;
        }
    }

    private ncyeColumnProperty = {
        field : "Ncye",title : "年初余额",width : 120,align : "right",resizable:false
        ,editor: { type: 'numberbox',
            options:{precision:2,
            onChange:(newValue:number,oldValue:number)=>{
                return; }
        }}
    }

    private ljjfColumnProperty = {
        field : "Ljjf",title : "累计借方",width : 120,align : "right",resizable:false
        ,editor: { type: 'numberbox',
            options:{precision:2,
            onChange:(newValue:number,oldValue:number)=>{
                return; }
        }}
    }

    private ljdfColumnProperty = {
        field : "Ljdf",title : "累计贷方",width : 120,align : "right",resizable:false
        ,editor: { type: 'numberbox',
            options:{precision:2,
            onChange:(newValue:number,oldValue:number)=>{
                return; }
        }}
    }

    private qcyeColumnProperty = {
        field : "Qcye",title : "期初余额",width : 120,align : "right",resizable:false
        ,editor: { type: 'numberbox',
            options:{precision:2,
            onChange:(newValue:number,oldValue:number)=>{
                return; }
        }}
    }

    private columns = [
        {field : "AccountCode",title :"科目代码",width:100},
        {field : "AccountName",title :"科目名称",width:100},
        this.ncyeColumnProperty, this.ljjfColumnProperty,this.ljdfColumnProperty,this.qcyeColumnProperty 
    ];


    private datagridColumn = [
        this.columns
    ]
   

    constructor(props:{}){
        super(props);
        const m1 = new EditModel(
            new AccountModel(500,"1001","现金",AccountTypeEnum.Asset,BalanceSideEnum.Debit,true,1,true),
            100.2,0,0,100.2
        )

        const m2 = new EditModel(
            new AccountModel(501,"1002","银行存款",AccountTypeEnum.Asset,BalanceSideEnum.Debit,true,1,false),
            108.2,0,0,108.2
        )

        const m3 = new EditModel(
            new AccountModel(501,"1003","其他货币资金",AccountTypeEnum.Asset,BalanceSideEnum.Debit,true,1,true),
            105.18,0,0,105.18
        )

        const m4 = new EditModel(
            new AccountModel(501,"1004","其他应收款",AccountTypeEnum.Asset,BalanceSideEnum.Debit,true,1,true),
            106.18,0,0,106.18
        )

        this.dataSource.push(m1);
        this.dataSource.push(m2);
        this.dataSource.push(m3);
        this.dataSource.push(m4);

       
    }


    public render(){
        return (
            
            <div>
                <button onClick={this.test}>test</button>
                <button onClick={this.addTest}>addDatasource</button>
                <table className="easyui-datagrid" 
                data-options="singleSelect:true" ref={el => this.tableElm = el}/>
            </div>
        )
    }

    public componentDidMount(){
        this.renderTableElm();

        $(window).bind("click",this.winClick.bind(this));
    }

    private test = ()=>{
        const data = $(this.tableElm).datagrid("getData");
        const model =(data.rows as EditModel[])[2];
        model.Ljdf = 1009.12;
        // $(this.tableElm).datagrid("updateRow",{
        //     index: 2,
        //     row: model
        // })

        $(this.tableElm).datagrid("refreshRow",2)
    }


    private addTest = ()=>{

        const m = new EditModel(
            new AccountModel(501,"1005","其他应收款2",AccountTypeEnum.Asset,BalanceSideEnum.Debit,true,1,true),
            106.18,0,0,106.18
        )
        this.dataSource.push(m)

        $(this.tableElm).datagrid("loadData",this.dataSource)
    }

    private renderTableElm(){
        
        
        $(this.tableElm).datagrid({
            ...this.datagridProperty,
            // onLoadSuccess: this.onDatagridLoadSuccess,

            columns: this.datagridColumn
            
            }
        ).datagrid('enableCellEditing');

    }


    


    private winClick(e:MouseEvent){
        
        this.datagridRectXY = $($("div.panel.datagrid.panel-htop").get(0)).find("div.datagrid-body")[1].getBoundingClientRect();

        
        const leftX = this.datagridRectXY.left;
        const leftY = this.datagridRectXY.top;
        const rightX = this.datagridRectXY.right;
        const rightY = this.datagridRectXY.bottom;

        const mouseX = e.clientX;
        const mouseY = e.clientY;

        const isInXY = mouseX > leftX && mouseY > leftY && mouseX < rightX && mouseY < rightY;
        // console.log(`leftx:${leftX},lefty:${leftY},rightx:${rightX},righty:${rightY},mousex:${mouseX},mouseY:${mouseY},isInXY:${isInXY}`)
        const $dg = $(this.tableElm);

        // const cell = $dg.datagrid("cell");
        

        if (!isInXY && $dg.datagrid("cell")) {
            // console.log("!IsInXY")
            const cell = $dg.datagrid("cell");
            $dg.datagrid('endEdit', cell.index);

            $dg.trigger("onEndEdit",[cell.index,cell.field]);
        }
    }
    
}