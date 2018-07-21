/// <reference path="../jqplugins/plugin.d.ts" />


import * as React from "react";

import AccountEdit3 from '../account/accountEdit3'
import {AccountList as AccList} from '../account/accountList'

import EjqWindow from '../common/component/ejqWindow'
import VoucherEntryModel from "./VoucherEntryModel"

import {AccountModel} from "../account/AccountModel"

import {stripNumber} from '../common/util/numberHelper'


declare let accList : IAccDataJson[];

declare interface IAccDataJson {accountCode:string,accountName:string,accountType:number,balanceSide:number
    ,bookId:number,isDetailedAccount:boolean,isforbidden:boolean,fullName:
    string,id:number,isJournal:boolean,level:number}


declare let window:any;

const KmColumnField = "Account";

export declare interface IAccount {AccountId:number,AccountCode:string,AccountName:string,IsDetail:boolean}

export declare interface IVFooter {Summary:any,DebitAmount:number,CreditAmount:number,IsFooter:boolean}

// declare interface IProps {}
// declare interface IStates{accList :boolean,accEdit:boolean}

export default class Pzgrid extends React.Component<{},{}>{

    public tableElm:HTMLElement;

    // private thisContext : Pzgrid;

    private amountHeadSpan:string = '<div class="amountSpan"><span>亿</span><span>千</span><span>百</span><span>十</span><span>万</span><span>千</span><span>百</span><span>十</span><span>元</span><span>角</span><span>分</span></div>'
    private selectedIndex : number;
    private isBalanced : boolean = false;
    private cellHeight : number = 39;
    private hasPopupAccountList :boolean = false;

    private accList : AccList;


    private ejqWindow : EjqWindow;
    private accListWindow : EjqWindow;


    
    private dataSource : {rows:VoucherEntryModel[],footer:IVFooter[]} 
    // = 
    // {rows:[
    //     new VoucherEntryModel(1,"摘要1发发发发发发付付多付打guygug方式打开借方圣诞节是否防辐射ryfvihi就顾冲锋衣太晚所所所所",101,undefined,undefined,true),
    //     new VoucherEntryModel(2,"摘要2",101,undefined,undefined,true),
    //     new VoucherEntryModel(3,"摘要1",101,undefined,undefined,true),
    //     new VoucherEntryModel(4,"摘要2",101,undefined,undefined,true),
    //     new VoucherEntryModel(5,"摘要1",101,undefined,undefined,true),
        
    // ],
    // footer:[{Summary:"XX",DebitAmount:undefined,CreditAmount:undefined,IsFooter:true}]
    // }


    private accountsDataSource : IAccount[] =[
        {AccountId:100,AccountCode:"1001",AccountName:"现金",IsDetail:false},
        {AccountId:101,AccountCode:"1002",AccountName:"银行存款",IsDetail:true},
        {AccountId:102,AccountCode:"2999",AccountName:"毒药123345567796gfgfgfgddg佛挡杀佛是对方就是对方发奇偶IE非军事的房交会的死哦vjds",IsDetail:true},
        {AccountId:103,AccountCode:"1998",AccountName:"毒药",IsDetail:true},
        {AccountId:104,AccountCode:"1999",AccountName:"毒药",IsDetail:false}
        
    ];


    private datagridProperty = {
        // url: '/data/Datagrid_data1.json',
        // method:'get',
        toolbar: '#voucherToolBar',
        data:this.dataSource,
        showFooter : true,
        
        fitColumns:true,
        autoRowHeight:false,
        onOpen:()=>{
            // console.log("datagrid is openning");
            return;
        },
        onClose:()=>{
            // console.log("datagrid is closing");
            return;
        },
        onDestroy:()=>{
            // console.log("datagrid has Destroued");
            return;
        },
        rowStyler: (index:number,row:any)=>{
            return `height:${this.cellHeight}px;`; 
        },
    }


    private sumaryColumnProperty = { 
        field: 'Summary', title: 'XX',halign : "center", width: 170,fixed:true,resizable:false, editor: { type: 'textarea',options:{multiline:true,height:this.cellHeight} },
            formatter(value:string,rowData:VoucherEntryModel,rowIndex:number){
                if(rowData.IsFooter){
                    return value;
                }
                else
                {
                    return `<pre>${value}</pre>`;
                }
                
            }
    }





    private accountColumnEditorProperty = {
        type: 'combogrid',
        options: {
            idField: 'AccountId',
            textField: 'AccountCode',
            method: 'get',
            // url: 'Datagrid_data1',
            data: accList.map((item)=>(
                {AccountId : item.id,AccountCode : item.accountCode,AccountName : item.accountName,IsDetail: item.isDetailedAccount}
            )).sort((a,b)=> a.AccountCode < b.AccountCode ? -1 : 1),
            required: false,
            selectOnNavigation: false,
            panelWidth: 300,
            // panelHeight:288,
            height:this.cellHeight,
            columns: [[
                { field: 'AccountCode', title: '代码', width: 120,resizable:false },
                { field: 'AccountName', title: '名称', width: 180,resizable:false }

            ]],
            onChange:(newValue:any, oldValue:any)=>this.oncomboValueChange(newValue,oldValue),
            onSelect: (rowIndex:any, rowData:IAccount)=> {
            /*  console.log(`select :${rowData.AccountCode}`);     
                const selected:number = $(this.tableElm).datagrid("cell").index;
                const item = $(this.tableElm).datagrid("getRows")[selected] as VoucherEntryModel;
                item.AccountCode = rowData.AccountCode;
                item.AccountName = rowData.AccountName;
                item.IsDetailAccount = rowData.IsDetail; */

                // $(this.tableElm).datagrid("updateRow",{index:selected,row:item});
                
            },
            onShowPanel:()=>this.oncomboShowPanel()
            
            , onHidePanel(){
                window.IsDropDownOpen = false;
                $(this).combogrid("options").selectOnNavigation = false;
                
            },
            filter: (q:string, row:IAccount)=>{
                return row.AccountCode.startsWith(q);;
            }
           
        }
    }

    private accountColumnProperty = {
        field: 'Account', title: 'XXXX',halign : "center", width: 280, resizable:false,
        editor: this.accountColumnEditorProperty,
        formatter:(value:number,rowData:VoucherEntryModel,rowIndex:number)=>{
            const accText = rowData.AccountCode ? rowData.AccountCode + "/" + rowData.AccountName : "";
            const str = 
            `<div style='display: flex'>
                <div class="accountText">${accText}</div>
                <div class="accountPopupBtn"><a href="javascript:void(0)">科目</a></div>
            </div>`;
            return str;
            
            // return rowData.AccountCode + "/" + rowData.AccountName;
        }

    }


    private debitAmountColumnProperty = {
        field: 'DebitAmount',title: '<div>XXXX</div>'+ this.amountHeadSpan, width: 120,align:'right',resizable:false,
         editor: { type: 'numberbox',options:{precision:2,height:this.cellHeight
            ,onChange:(newValue:number,oldValue:number)=>{
                return; 
         }
        },
         
        },
        // styler:function(value:number,row:VoucherEntryModel,index:number){
        //     return  'background-image:url(/css/amountSeprator.png);';
        // },
        formatter:(value:number,rowData:VoucherEntryModel,rowIndex:number)=>{
            if(!rowData.IsFooter){
                return this.conv2NumSpan(value);
            }
            else{
                const style = this.isBalanced ? "" : "style='color:red;'"
                return `<div ${style}>${this.conv2NumSpan(value)}</div>`;
            }
            
        }
        
    }



    private creditAmountColumnProperty = {
        field: 'CreditAmount', title: '<div>XXXX</div>'+this.amountHeadSpan, width: 120, align: 'right',resizable:false,
         editor: { type: 'numberbox',options:{precision:2,height:this.cellHeight
            ,onChange:(newValue:number,oldValue:number)=>{
                return
            }
        }},
        
        formatter:(value:number,rowData:VoucherEntryModel,rowIndex:number)=>{
            if(!rowData.IsFooter){
                return this.conv2NumSpan(value);
            }
            else{
                const style = this.isBalanced ? "" : "style='color:red;'"
                return `<div ${style}>${this.conv2NumSpan(value)}</div>`;
            }
            
        }
    }


    private datagridColumn = [
        [this.sumaryColumnProperty,this.accountColumnProperty,this.debitAmountColumnProperty,this.creditAmountColumnProperty]
    ]


    constructor(prop:{}){
        super(prop);
        this.state = {};

        this.accountsDataSource = accList.map((item)=>(
            {AccountId : item.id,AccountCode : item.accountCode,AccountName : item.accountName,IsDetail: item.isDetailedAccount}
        )).sort((a,b)=> a.AccountCode < b.AccountCode ? -1 : 1)

        window.IsDropDownOpen = false;
    }

    public render(){

        
        const winOptions = {
            width:400,
            height:300,
            closed : true,
            resizable:false,
            minimizable:false,
            maximizable:false,
            title:"会计科目",
            modal : true
        }

        const accListWinOptions = {
            title:"科目",
            width: 600,
            height: 500,
            closed: true,
            resizable:false,
            minimizable:false,
            maximizable:false,
            modal:true,
            onBeforeClose:()=>{
                this.closeedHandler();
            }
        }

        return  ( 
            <div style={{textAlign:"center",display:"inline-block"}}>
             
                <table id="vTable" className="easyui-datagrid" 
                data-options="singleSelect:true" style={{width:"730px",height:"366px"}}
                ref={el => this.tableElm = el}/>

                
                <EjqWindow ref = {el => this.accListWindow = el} winOptions={accListWinOptions} showBtn={false}>
                    <AccList ref={el=>this.accList = el}  canEdit={false} dbClickAccountCallback={this.onAccListItemSelectHandler}/>
                </EjqWindow>


                <EjqWindow ref={el =>this.ejqWindow=el} showBtn={true} saveCallback={this.saveHandler} cancelCallback={this.cancelHandler} winOptions = {winOptions}>
                    <AccountEdit3  account={null}/>
                </EjqWindow>

            </div>
            );
    }




 


    public InsertVoucherEntry(){
        const m : VoucherEntryModel = new VoucherEntryModel(0,"",undefined,undefined,undefined,undefined,undefined,false);
        $(this.tableElm).datagrid('insertRow',{
            index: this.selectedIndex,	
            row: m
        });

        const addedRow = $(this.tableElm).datagrid("getPanel").find("div.datagrid-body tr.datagrid-row").get(this.selectedIndex);

        const thiscontext = this;
        $(addedRow).mouseover(function(value){
            // 获取当前行的唯一标识field
            $(this).find("div.accountPopupBtn").css("display","inline-block").children("a").click(()=>{
                thiscontext.showAccountListWindow();
            });
        });
        $(addedRow).mouseout(function(value){
            // 对鼠标所在行数据的获取与mouseover的实现类似
            $(this).find("div.accountPopupBtn").css("display","none");
        });

    }




    public renderTableElm(v:{rows:VoucherEntryModel[],footer:IVFooter[]}){
        
        this.dataSource = v;
        this.datagridProperty.data = this.dataSource;
        
        $(this.tableElm).datagrid({
            ...this.datagridProperty,
            onLoadSuccess: this.onDatagridLoadSuccess,

            columns: this.datagridColumn
            
            }
        ).datagrid('enableCellEditing');


        $(this.tableElm).datagrid('mergeCells', {
            index: 0,
            field: 'Summary',
            colspan: 2,
            type: 'footer'
        });


        $(this.tableElm).bind("rowItemSelected",(event:any,index:number,field:string)=>{
            this.selectedIndex = index;
            const totalRows = $(this.tableElm).datagrid("getRows").length - 1;
            if(index === totalRows){
                this.AppendVoucherEntry();
            }
            // let inputElm = $(this.tableElm).datagrid("getEditor",{index:index,field:field}).target;
            // $(inputElm).closest("div.panel.datagrid.panel-htop tr.datagrid-row").css("background-image","linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 0%, rgba(0, 0, 0, 0.1) 40%, rgba(0, 0, 0, 0.2) 98%, #FFFFFF 100%)")
        })


        $(this.tableElm).bind("onGoDownFromLastRow",(event:any,index:number,field:string)=>{
            this.AppendVoucherEntry();
        })


        $(this.tableElm).bind("onEndEdit",(event:any,index:number,field:string)=>{

            if(field !== "DebitAmount" && field !=="CreditAmount"){return;}

            const debits = this.dataSource.rows.filter((value:VoucherEntryModel)=>{
                
                return value.DebitAmount !== undefined;
            }).map((item:VoucherEntryModel)=>{
                return item.DebitAmount;
            });

            const sumdebits = debits.reduce((i,item)=>{
                return stripNumber(i) + stripNumber(item);
            },0);



            const crebits = this.dataSource.rows.filter((value:VoucherEntryModel)=>{
                
                return value.CreditAmount !== undefined;
            }).map((item:VoucherEntryModel)=>{
                return item.CreditAmount;
            });

            const sumcrebits = crebits.reduce((i,item)=>{
                return stripNumber(i) + stripNumber(item);
            },0);

            if(sumdebits === sumcrebits){this.isBalanced = true;}
            else{this.isBalanced = false;}

            $(this.tableElm).datagrid("reloadFooter",[{Summary:"XX",DebitAmount:sumdebits,CreditAmount:sumcrebits,IsFooter:true}]).datagrid('mergeCells', {
                index: 0,
                field: 'Summary',
                colspan: 2,
                type: 'footer'
            });
            // $(this.tableElm).datagrid('mergeCells', {
            //     index: 0,
            //     field: 'Summary',
            //     colspan: 2,
            //     type: 'footer'
            // });

        })


        $(this.tableElm).bind("onCellNavOut",(event:any,index:number,field:string)=>{
            if(field === KmColumnField){
                const data = $(this.tableElm).datagrid("getData");
                const result = (data.rows as VoucherEntryModel[]).find((value : VoucherEntryModel,i:number)=>{
                    return value.Account && !value.IsDetailAccount;
                });

                if(result){
                    
                    setTimeout(() => {
                        $(this.tableElm).datagrid("editCell", {
                            index,
                            field
                        })
                    }, 200);
                    
                }
            }
        });
    }


    public endEdit(){
        const $dg = $(this.tableElm);
        const cell = $dg.datagrid("cell");
        if(cell){
            $dg.datagrid('endEdit', cell.index);
            $dg.trigger("onEndEdit",[cell.index,cell.field]);
        }

    }

    private closeedHandler=()=>{
        this.hasPopupAccountList = false;
    }

    private saveHandler = ()=>{
        console.log("saveHandler")
        return;
    }

    private cancelHandler=()=>{
        this.ejqWindow.close();
    }

    private showAccountListWindow(){

        if(this.hasPopupAccountList){return;}
        console.log("showAccountListWindow");
        this.hasPopupAccountList = true;
        
        this.accListWindow.show();
        // if(!this.state.accList){

        //     this.setState({accList:true});

        //     $(this.accountListWindowElm).window({
        //         title:"科目",
        //         width: 500,
        //         height: 400,
        //         closed: true,
        //         resizable:false,
        //         minimizable:false,
        //         maximizable:false,
        //         modal:true,
        //         onBeforeClose:()=>{
        //             this.hasPopupAccountList = false;
        //         }
        //     });

        // }

        // $(this.accountListWindowElm).window('open');

        
    }


    private onAccListItemSelectHandler=(acc:AccountModel)=>{
        this.accListWindow.close();
        const [index,field] = [this.selectedIndex,KmColumnField];
        $(this.tableElm).datagrid("editCell",{index,field});
        const elm = $(this.tableElm).datagrid("getEditor",{index,field});
        
        $(elm.target).focus().combogrid("setValue",acc.Id);
        const item = $(this.tableElm).datagrid("getRows")[index] as VoucherEntryModel;
        item.AccountCode = acc.AccountCode;
        item.AccountName = acc.AccountName;
    }


 
    private oncomboValueChange = (newValue:any, oldValue:any)=>{
        if(!window.IsDropDownOpen){return;}
        console.log("newValue:"+newValue);
        console.log("oldValue:"+oldValue);
        const currentcell = $(this.tableElm).datagrid("cell");
        if(!currentcell){return;}
        const selected:number = currentcell.index;
        console.log(`currentRow:${selected}`);

        const item = $(this.tableElm).datagrid("getRows")[selected] as VoucherEntryModel;
       
        const selectedAccount = this.accountsDataSource.find((data)=>{
            return data.AccountId === newValue;
        })

        if(selectedAccount){
            item.AccountCode = selectedAccount.AccountCode;
            item.AccountName = selectedAccount.AccountName;
            item.IsDetailAccount = selectedAccount.IsDetail;
        }


    }


    private oncomboShowPanel=()=>{
        window.IsDropDownOpen = true;
        const thiscontext = this;
        const [index,field] = [this.selectedIndex,KmColumnField];
        const editor = $(this.tableElm).datagrid("getEditor",{index,field});
        const edt = editor.target;
        $(edt).combogrid("options").selectOnNavigation = true;
        const p = $(edt).combogrid("panel");
        const div = p.find("div.panel-body")[0]; // p.find("div.datagrid-body")[1];

        if($(div).find("a[class*=btn]").length >0){return;}

        const $a = $("<div style='height:24px;text-align:left;margin-top: 1px; border-bottom: 0px solid lightgray' ><a class='c4' href='javascript:void(0)'>新增科目</a><div>");
        $a.children("a").linkbutton({
            iconCls:'icon-add',
            height:22,
            onClick:()=>{
                $(edt).combogrid("hidePanel");
                thiscontext.ejqWindow.show();
            }
        });
        $(div).prepend($a);
    }



    private AppendVoucherEntry(){
        const m : VoucherEntryModel = new VoucherEntryModel(0,"",undefined,undefined,undefined,undefined,undefined,false);

        $(this.tableElm).datagrid('appendRow',{
            index: this.dataSource.rows.length,	
            row: m
        });


        const addedRow = $(this.tableElm).datagrid("getPanel").find("div.datagrid-body tr.datagrid-row").get(this.dataSource.rows.length-1);
        const thiscontext = this;
        $(addedRow).mouseover(function(value){
                    // 获取当前行的唯一标识field
                    $(this).find("div.accountPopupBtn").css("display","inline-block").children("a").click(()=>{
                        thiscontext.showAccountListWindow();
                    });
                });
        $(addedRow).mouseout(function(value){
                    // 对鼠标所在行数据的获取与mouseover的实现类似
                    $(this).find("div.accountPopupBtn").css("display","none");
                });
    }



    private onDatagridLoadSuccess = (data:any)=> {

        const thiscontext = this;
        const panel = $(this.tableElm).datagrid("getPanel");
        const myheaderCol = panel.find("div.datagrid-header td[field*=Amount]>div");
        
        myheaderCol.css({"font-weight":"bold","height":"36px","text-align":"center"});
        
        $(".datagrid-row").mouseover(function(value){
            
            $(this).find("div.accountPopupBtn").css("display","inline-block").children("a").click(()=>{
                // if(!_context.hasPopupAccountList){
                //     _context.hasPopupAccountList = true;
                //     _context.showAccountListWindow();
                // }
                thiscontext.showAccountListWindow();
            });
        });
        $(".datagrid-row").mouseout(function(value){
            
            $(this).find("div.accountPopupBtn").css("display","none");
        });


    }




    private conv2NumSpan(amount:number):string{
        if(!Number(amount)){return '<div class="amountCol"><div></div></div>';}

        const amountStrs = stripNumber((amount*100)).toString().split("");
        const htmlText = amountStrs.reduce((str,item)=> str + "<span>" + item + "</span>","")

        return '<div class="amountCol"><div>'+ htmlText + '</div></div>';
    }


    // private strip(num:number, precision:number = 12) {
    //     return +parseFloat(Number(num).toPrecision(precision));
    // }


    get Entries(){
        return this.dataSource;
    }
}