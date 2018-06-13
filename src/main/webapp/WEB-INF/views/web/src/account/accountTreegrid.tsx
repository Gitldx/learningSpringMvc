/// <reference path="../jqplugins/plugin.d.ts" />

import * as React from "react";
import {AccountModel,AccountTypeEnum,BalanceSideEnum} from "./AccountModel"


interface IProps {
    dataSource:AccountModel[],
    accountType : AccountTypeEnum,
    canEdit : boolean,
    dbClickCallback? : (editAccount : AccountModel) => void
}

export default class AccountTreegrid extends React.Component<IProps>{

    private hasLoaded : boolean = false;
    private treegridElm : HTMLElement;

    public render(){

        return (
            <React.Fragment>
                <table ref={el => this.treegridElm = el}  style={{width:"100%",height:"auto"}}/>
            </React.Fragment>
        )
    }


    public componentDidMount(){

        const StopWatch = require('stopwatch-js')
        const w = new StopWatch();
        w.start();

        this.initAccTreegrid();


        w.stop();
        console.log(`3:${w.duration()}`)
    }

    private initAccTreegrid(){

        $(this.treegridElm).treegrid({
            columns:[[
                {title:'科目',field:'AccountCode',width:180},
                {field:'AccountName',title:'名称',width:200,align:'right'},
                {field:'BalanceSide',title:'余额方向',width:80,
                formatter:(value:string,row:AccountModel,index:number)=>{
                    return row.BalanceSide === BalanceSideEnum.Debit ? "借":"贷";
                }
            },
                {field:'IsJournal',title:'日记账',width:80}
            ]]
            ,
            data:this.props.dataSource,
            idField:'Id',
            treeField:'AccountCode',
            loadFilter:(data:any,parentId:any)=>{
                return data.filter((value:AccountModel)=>{
                    return value.AccountType === this.props.accountType;
                })
            },
            onLoadSuccess:this.onTreegridLoadSuccess,
            onDblClickRow:(row:AccountModel)=>{
                

                    /* this.accountEditWindow.show();
                    const form = <AccountEdit account = {row}/>
                    this.setState({editingAccount : form}) */

                    
                    // this.setState({currentAccount:row})
                    // this.ejqWindow.show();

                    this.props.dbClickCallback(row);
                    

                
            }
        });
    }


    
    private onTreegridLoadSuccess(){
        if(this.hasLoaded) {return;}
        this.hasLoaded = true;
        $(this).treegrid('collapseAll');
    }


}