/// <reference path="../jqplugins/plugin.d.ts" />

import * as React from "react";

// import AccountEdit from './accountEdit'
import EjqAlert from '../common/component/ejqAlert'
import EjqWindow from '../common/component/ejqWindow'

// import AccountEdit from './accountEdit2'
import AccountEdit3 from './accountEdit3'
import {AccountModel,AccountTypeEnum,BalanceSideEnum} from "./AccountModel"
import AccountTreegrid from './accountTreegrid'
// import Window from "./window"



// declare let accList : Array<{accountCode : string,accountName : string,balanceSide : number,accountType : number}>;

declare interface IProps {canEdit:boolean,dbClickAccountCallback?:(acc:AccountModel)=>void}

declare interface IAccDataJson {accountCode:string,accountName:string,accountType:number,balanceSide:number
    ,bookId:number,detailedAccount:boolean,forbidden:boolean,fullName:
    string,id:number,journal:boolean,level:number}

export class AccountList extends React.Component<IProps,{currentAccount : AccountModel}>{


    private dataSource : AccountModel[] = [];
    // private accountEditWindow : Window;
    private ejqAlert : EjqAlert;
    private ejqWindow : EjqWindow;
    private assetTreegrid : AccountTreegrid;
    private liabilityTreegrid : AccountTreegrid;
    private equity : AccountTreegrid;
    private cost : AccountTreegrid;
    private pl : AccountTreegrid;
    private editWindow : AccountEdit3;
    private bookInfo : {lv1:number,lv2:number,lv3:number,lv4:number,lv5:number,lv6:number}

    constructor(props:IProps){

        super(props);
        

        this.state = {currentAccount : new AccountModel(0,"","",AccountTypeEnum.Asset,BalanceSideEnum.Debit,false,undefined)};

        // this.state = {editingAccount : null,
        //     currentAccount : new AccountModel(0,"","",AccountTypeEnum.Asset,BalanceSideEnum.Debit,false)};

        // const a1 = new AccountModel(1,"1001","现金",AccountTypeEnum.Asset,BalanceSideEnum.Debit,true);
        // const a2 = new AccountModel(2,"1002","银行存款",AccountTypeEnum.Asset,BalanceSideEnum.Debit,true);
        // const a21 = new AccountModel(3,"100201","建行",AccountTypeEnum.Asset,BalanceSideEnum.Debit,true);
        // const a22 = new AccountModel(4,"100202","招行",AccountTypeEnum.Asset,BalanceSideEnum.Debit,true);
        // const a221 = new AccountModel(5,"10020201","深圳",AccountTypeEnum.Asset,BalanceSideEnum.Debit,true);
        // const a3 = new AccountModel(6,"2121","应付账款",AccountTypeEnum.Liabilities,BalanceSideEnum.Credit,false);
        // const a31 = new AccountModel(7,"212101","甲公司",AccountTypeEnum.Liabilities,BalanceSideEnum.Credit,false);
        // const a32 = new AccountModel(8,"212102","乙公司",AccountTypeEnum.Liabilities,BalanceSideEnum.Credit,false);
        // const a4 = new AccountModel(9,"2222","应付票据",AccountTypeEnum.Liabilities,BalanceSideEnum.Credit,false);

        // a2.children.push(a21);
        // a2.children.push(a22);
        // a3.children = [a31,a32];
        // a22.children = [a221];
        // this.dataSource.push(a1);
        // this.dataSource.push(a2);
        // this.dataSource.push(a3);
        // this.dataSource.push(a4);

        
        this.initData();
        


        // this.dataSource = accList.map((item)=>{
        //     return new AccountModel(1,item.accountCode,item.accountName,item.accountType,item.balanceSide,true)
        // });
        if(this.props.canEdit){
            (window as any).addAction = this.add;
        }
        
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
                         dbClickCallback={this.dbClickHandler}/>
                    </div>
                    <div title="负债" style={{overflow:"auto",padding:"20px"}}>
                        {/* <table id="tLiability"  style={{width:"100%",height:"auto"}}/> */}
                        <AccountTreegrid ref={el=>this.liabilityTreegrid = el} {...{accountType : AccountTypeEnum.Liabilities,dataSource:this.dataSource,canEdit:this.props.canEdit}}
                         dbClickCallback={this.dbClickHandler}/>
                    </div>
                    <div title="权益" >
                        <AccountTreegrid ref={el=>this.equity = el} {...{accountType : AccountTypeEnum.Equity,dataSource:this.dataSource,canEdit:this.props.canEdit}}
                            dbClickCallback={this.dbClickHandler}/>
                    </div>
                    <div title="成本">
                        <AccountTreegrid ref={el=>this.cost = el} {...{accountType : AccountTypeEnum.Cost,dataSource:this.dataSource,canEdit:this.props.canEdit}}
                            dbClickCallback={this.dbClickHandler}/>
                    </div>
                    <div title="损益">
                        <AccountTreegrid ref={el=>this.pl = el} {...{accountType : AccountTypeEnum.PL,dataSource:this.dataSource,canEdit:this.props.canEdit}}
                            dbClickCallback={this.dbClickHandler}/>
                    </div>
                </div>

                {/* <Window ref={el =>this.accountEditWindow=el} content={this.state.editingAccount}/> */}


                <EjqWindow ref={el =>this.ejqWindow=el} showBtn={true} saveCallback={this.saveHandler} cancelCallback={this.cancelHandler} winOptions = {winOptions}>
                    <AccountEdit3 ref={el=>this.editWindow = el}  account={this.state.currentAccount}/>
                </EjqWindow>

                <EjqAlert ref = {el => this.ejqAlert = el}/>
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

    private initData(){
        // const myHeaders = new Headers();
        // myHeaders.append('Content-Type', 'application/json');
        // fetch("/book/2",{
        //     method:"GET",
        //     headers:myHeaders,
        // })
        // .then((response)=>response.json())
        // .then(
        //     (responseJsonData) => {
        //         this.bookInfo = responseJsonData;
        //         console.log(this.bookInfo)
        //     }
        // ).then(()=>this.setAccDatasource())
        // .catch((error)=>{
        //     alert(error);
        //   }
        // )


        $.ajax({ 
            type : "get", 
            url : "/book/2", 
            async : false, 
            success : (data)=>{ 
                this.bookInfo = data;
            },
            error :(err)=>{
                alert(err);
            }
        }); 


        // $.get("/book/2").done((response)=>console.log(response)
        // ).then((responseJsonData) => {
        //     this.bookInfo = responseJsonData;
        //     console.log(this.bookInfo)
        // }).fail(err=>{
        //     alert(err);
        // })

        this.setAccDatasource();
    }

    private setAccDatasource(){

        const StopWatch = require('stopwatch-js')
        const w = new StopWatch();

        w.start();

        $.ajax({ 
            type : "get", 
            url : "/account/list", 
            async : false, 
            success : (data : IAccDataJson[])=>{ 
                
                w.stop();
                console.log(`1:${w.duration()}`)


                w.start();
                const levels = [this.bookInfo.lv1,this.bookInfo.lv2,this.bookInfo.lv3,this.bookInfo.lv4,this.bookInfo.lv5,this.bookInfo.lv6];
                
                data.forEach((item,index)=>{
                    item.balanceSide = item.balanceSide ? BalanceSideEnum.Credit : BalanceSideEnum.Debit;
                })
                const temp = data.sort((a,b)=> a.accountCode < b.accountCode ? -1 : 1);
                const temp2 = temp.map((item,index)=> new AccountModel(item.id,item.accountCode,item.accountName,item.accountType,item.balanceSide,item.journal,item.level));


                temp2.forEach((item,index)=>{
                    const upperLength = levels.slice(0,item.Level).reduce((a,b)=>a + b,0)  - levels[item.Level];

                    const upperCode = item.AccountCode.substr(0,upperLength);
                   
                    const found = temp2.find((acc,dataIndex)=>{
                        return acc.AccountCode === upperCode;
                    })
                    if(found){
                        
                        found.children.push(item);
                    }
                })

                this.dataSource = temp2.filter((item,index)=>item.Level ===1);

                w.stop();
                console.log(`2:${w.duration()}`)
                // console.log("dataSource:" + JSON.stringify(this.dataSource))
            },
            error :(err)=>{
                alert(err);
            }
        }); 
    }

    private getLevelOfCode(code : string) : number{
        const levels = [this.bookInfo.lv1,this.bookInfo.lv2,this.bookInfo.lv3,this.bookInfo.lv4,this.bookInfo.lv5,this.bookInfo.lv6];
        const codeLength = code.length;
        for(let i = 0;i<levels.length;i++){
            const length = levels.slice(0,i).reduce((a,b)=>a + b,0);
            if(length === codeLength){
                return i;
            }
        }

        return undefined;
    }

    /*
    private setAccDatasource2(){
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        $.get("/account/list").done((response)=>response.json()).then(
            (responseJsonData) => {
                // this.dataSource = responseJsonData;
                const levels = [this.bookInfo.lv1,this.bookInfo.lv2,this.bookInfo.lv3,this.bookInfo.lv4,this.bookInfo.lv5,this.bookInfo.lv6];

                const temp = (responseJsonData as IAccDataJson[]).sort((a,b)=> a.accountCode < b.accountCode ? -1 : 1);
                const temp2 = temp.map((item,index)=> new AccountModel(item.id,item.accountCode,item.accountName,item.accountType,item.balanceSide,item.journal,item.level));


                temp2.forEach((item,index)=>{
                    const upperLength = levels.slice(0,item.Level).reduce((a,b)=>a + b,0) - levels[item.Level];
                    const upperCode = item.AccountCode.substr(0,upperLength);
                    const found = temp2.find((acc,dataIndex)=>{
                        // console.log(`acc.AccountCode:${acc.AccountCode},upperCode : ${upperCode}`)
                        return acc.AccountCode === upperCode;
                    })
                    if(found){
                        
                        found.children.push(item);
                    }
                })

                this.dataSource = temp2.filter((item,index)=>item.Level ===1);

                console.log("dataSource:" + JSON.stringify(this.dataSource))


                // temp.sort((a,b)=> a.accountCode < b.accountCode ? -1 : 1).forEach((item,index)=>{
                //         const m = new AccountModel(item.id,item.accountCode,item.accountName,item.accountType,item.balanceSide,item.journal,item.level);
                //         const upperLength = levels.slice(0,item.level).reduce((a,b)=>a + b,0) - levels[item.level];
                //         const upperCode = m.AccountCode.substr(0,upperLength);
                //         const found = this.dataSource.find((acc,dataIndex)=>{
                //             // console.log(`acc.AccountCode:${acc.AccountCode},upperCode : ${upperCode}`)
                //             return acc.AccountCode === upperCode;
                //         })
                //         if(found){
                //             found.children.push(m);
                //         }
                //         else{
                //             this.dataSource.push(m);
                //         }
                //         console.log("dataSource:" + JSON.stringify(this.dataSource))
                //     })


            }
        )
    }

*/

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

    private dbClickHandler = (acc : AccountModel)=>{
        
        if(this.props.canEdit){
            this.setState({currentAccount:acc});
            this.ejqWindow.show();
        }
        else{
            this.props.dbClickAccountCallback(acc);
        }
        
    }

    private add = ()=>{
        this.setState({currentAccount:new AccountModel(null,null,null,null,null,null,null)});
        this.ejqWindow.show();
    }


    private saveHandler=()=>{

        const m = this.editWindow.model;

        if(!this.getLevelOfCode(m.AccountCode)){
            this.ejqAlert.show("科目长度不合法！");
            return;
        }

        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        fetch("/account/add",{
            method:'POST',
            headers:myHeaders,
            body:JSON.stringify({
                accountCode:m.AccountCode,
                accountName:m.AccountName,
                accountType : m.AccountType,
                balanceSide : m.BalanceSide,
                isJournal : m.IsJournal,
                level : this.getLevelOfCode(m.AccountCode)
              })
        }).then((response)=>response.json())
        .then((responseJsonData)=>{
          alert("请求成功");
          
        })
        .catch((error)=>{
          alert(error);
        })

        
    }

    private cancelHandler=()=>{
        this.ejqWindow.close();
    }

}