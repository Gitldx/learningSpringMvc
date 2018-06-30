import * as React from "react";

import EditModel from './editModel'

import {AccountModel, AccountTypeEnum, BalanceSideEnum} from '../account/AccountModel'

import EjqEditDatagrid from '../common/component/ejqEditDatagrid'


export default class Edit extends React.Component{


    private editDatagrid : EjqEditDatagrid;

    private dataSource : EditModel[] = [];

    private datagridProperty = {
        
        showFooter : false,
        
        fitColumns:true,
        autoRowHeight:false,

    }

    private datagridEventHandlers ={
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

                <EjqEditDatagrid ref = {el => this.editDatagrid = el} datasource={this.dataSource}
                   columnConfigs = {this.columns} singlePropertyConfigs={this.datagridProperty} eventHandlers={this.datagridEventHandlers}/>
            </div>
        )
    }



    private test = ()=>{
        const data = $(this.editDatagrid.TableElm).datagrid("getData");
        const model =(data.rows as EditModel[])[2];
        model.Ljdf = 1009.12;


        $(this.editDatagrid.TableElm).datagrid("refreshRow",2)
    }


    private addTest = ()=>{

        const m = new EditModel(
            new AccountModel(501,"1005","其他应收款2",AccountTypeEnum.Asset,BalanceSideEnum.Debit,true,1,true),
            106.18,0,0,106.18
        )
        this.dataSource.push(m)

        $(this.editDatagrid.TableElm).datagrid("loadData",this.dataSource)
    }




    



}