/// <reference path="../jqplugins/plugin.d.ts" />

import * as React from "react";

// import AccountEdit from './accountEdit'
import EjqWindow from '../common/component/ejqWindow'
// import AccountEdit from './accountEdit2'
import AccountEdit3 from './accountEdit3'
import {AccountModel,AccountTypeEnum,BalanceSideEnum} from "./AccountModel"
import AccountTreegrid from './accountTreegrid'
// import Window from "./window"





declare interface IProps {canEdit:boolean,selectAccountCallback?:()=>number}

export class AccountList extends React.Component<IProps,{currentAccount : AccountModel}>{


    private dataSource : AccountModel[] = [];
    // private accountEditWindow : Window;
    private ejqWindow : EjqWindow;
    private assetTreegrid : AccountTreegrid;
    private liabilityTreegrid : AccountTreegrid;
    

    constructor(props:IProps){

        super(props);
        

        this.state = {currentAccount : new AccountModel(0,"","",AccountTypeEnum.Asset,BalanceSideEnum.Debit,false)};

        // this.state = {editingAccount : null,
        //     currentAccount : new AccountModel(0,"","",AccountTypeEnum.Asset,BalanceSideEnum.Debit,false)};

        const a1 = new AccountModel(1,"1001","现金",AccountTypeEnum.Asset,BalanceSideEnum.Debit,true);
        const a2 = new AccountModel(2,"1002","银行存款",AccountTypeEnum.Asset,BalanceSideEnum.Debit,true);
        const a21 = new AccountModel(3,"100201","建行",AccountTypeEnum.Asset,BalanceSideEnum.Debit,true);
        const a22 = new AccountModel(4,"100202","招行",AccountTypeEnum.Asset,BalanceSideEnum.Debit,true);
        const a221 = new AccountModel(5,"10020201","深圳",AccountTypeEnum.Asset,BalanceSideEnum.Debit,true);
        const a3 = new AccountModel(6,"2121","应付账款",AccountTypeEnum.Liabilities,BalanceSideEnum.Credit,false);
        const a31 = new AccountModel(7,"212101","甲公司",AccountTypeEnum.Liabilities,BalanceSideEnum.Credit,false);
        const a32 = new AccountModel(8,"212102","乙公司",AccountTypeEnum.Liabilities,BalanceSideEnum.Credit,false);
        const a4 = new AccountModel(9,"2222","应付票据",AccountTypeEnum.Liabilities,BalanceSideEnum.Credit,false);

        a2.children.push(a21);
        a2.children.push(a22);
        a3.children = [a31,a32];
        a22.children = [a221];
        this.dataSource.push(a1);
        this.dataSource.push(a2);
        this.dataSource.push(a3);
        this.dataSource.push(a4)
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
            modal : false
        }
        return (
            <div>
                {/* <a id="addAccBtn" style={{margin:"5px 0",display:this.props.canEdit ? "inherit":"none",width:"100px"}} className='c4' href='javascript:void(0)' onClick={this.showEdit.bind(this)}>新增</a> */}
                <div id="tbs" style={{width:"100%",height:"auto"}}>
                    <div title="资产" style={{padding:"20px",width:"100%"}}>
                        {/* <table id="tAsset"  style={{width:"100%",height:"auto"}}/> */}
                        <AccountTreegrid ref={el=>this.assetTreegrid = el} {...{accountType : AccountTypeEnum.Asset,dataSource:this.dataSource,canEdit:this.props.canEdit}}
                         launceEditCallback={this.edit}/>
                    </div>
                    <div title="负债" style={{overflow:"auto",padding:"20px"}}>
                        {/* <table id="tLiability"  style={{width:"100%",height:"auto"}}/> */}
                        <AccountTreegrid ref={el=>this.liabilityTreegrid = el} {...{accountType : AccountTypeEnum.Liabilities,dataSource:this.dataSource,canEdit:this.props.canEdit}}
                         launceEditCallback={this.edit}/>
                    </div>
                    <div title="权益" >
                        tab3
                    </div>
                    <div title="成本">
                        tab3
                    </div>
                    <div title="损益">
                        tab3
                    </div>
                </div>

                {/* <Window ref={el =>this.accountEditWindow=el} content={this.state.editingAccount}/> */}


                <EjqWindow ref={el =>this.ejqWindow=el} saveCallback={this.saveHandler} cancelCallback={this.cancelHandler} winOptions = {winOptions}>
                    <AccountEdit3  account={this.state.currentAccount}/>
                </EjqWindow>
            </div>
        )
    }


    public componentDidMount(){

        
        $("#tbs").tabs({
            plain : true,
            onSelect:(title:string,index:number)=>{
                // switch(index){
                //     case 0:
                //     this.assetTreegrid.initAccTreegrid();
                //     break;
                //     case 1 :
                //     this.liabilityTreegrid.initAccTreegrid();
                //     break;
                // }
                
                // this.initAccTreegrid(index);
            }
        });

        
    }



    // private initAccTreegrid(tabIndex : number){
        
    //             let tabDivId : string;
    //             let accFilterEnum : AccountTypeEnum;
    //             switch (tabIndex){
    //                 case 0 :
    //                     tabDivId = "#tAsset";
    //                     accFilterEnum = AccountTypeEnum.Asset;
    //                     break;
    //                 case 1 :
    //                     tabDivId = "#tLiability";
    //                     accFilterEnum = AccountTypeEnum.Liabilities;
    //                     break;
    //             }
        
    //             $(tabDivId).treegrid({
    //                 columns:[[
    //                     {title:'科目',field:'AccountCode',width:180},
    //                     {field:'AccountName',title:'名称',width:60,align:'right'},
    //                     {field:'BalanceSide',title:'余额方向',width:80,
    //                     formatter:(value:string,row:AccountModel,index:number)=>{
    //                         return row.BalanceSide === BalanceSideEnum.Debit ? "借":"贷";
    //                     }
    //                 },
    //                     {field:'IsJournal',title:'日记账',width:80}
    //                 ]]
    //                 ,
    //                 data:this.dataSource,
    //                 idField:'Id',
    //                 treeField:'AccountCode',
    //                 loadFilter:(data:any,parentId:any)=>{
    //                     return data.filter((value:AccountModel)=>{
    //                         return value.AccountType === accFilterEnum;
    //                     })
    //                 },
    //                 onLoadSuccess:this.onTreegridLoadSuccess,
    //                 onDblClickRow:(row:AccountModel)=>{
    //                     if(this.props.canEdit){

    //                         /* this.accountEditWindow.show();
    //                         const form = <AccountEdit account = {row}/>
    //                         this.setState({editingAccount : form}) */
    //                         this.setState({currentAccount:row})
    //                         this.ejqWindow.show();
                            
    //                     }
                        
    //                 }
    //             });
    // }


    // private onTreegridLoadSuccess(){
    //     $(this).treegrid('collapseAll');
    // }

    private edit = (acc : AccountModel)=>{
        this.setState({currentAccount:acc});
        this.ejqWindow.show();
    }


    private saveHandler=()=>{
        return;
    }

    private cancelHandler=()=>{
        this.ejqWindow.close();
    }

}