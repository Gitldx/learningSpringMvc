/// <reference path="../jqplugins/plugin.d.ts" />

import * as React from "react";


import {AccountModel} from "./AccountModel"

 interface IPropsType {isModal?:boolean}

export default class AccountEdit extends React.Component<IPropsType,{}>{

    private winElm : HTMLElement;
    private accCodeElm : HTMLElement;
    private accNameElm : HTMLElement;
    private accTypeElm : HTMLElement;
    private balanceSideElm : HTMLElement;
    private submitBtnElm : HTMLElement;
    private cancelBtnElm : HTMLElement;
    private accFormElm : HTMLElement;

    private accountTypes : Array<{value:number,displayName:string}> = [
        {value:1,displayName:"资产"},
        {value:2,displayName:"负债"},
        {value:3,displayName:"权益"},
        {value:4,displayName:"成本"},
        {value:5,displayName:"损益"}
    ];

    constructor(props:IPropsType){
        super(props);
    }






    public render(){
        return (
            <div>
                <div ref={el => this.winElm = el}>
                    <form ref={el=>this.accFormElm = el} className="easyui-form" method="post" data-options="novalidate:true">
                        <div style={{margin:"10px"}}>
                            <input ref={el=>this.accCodeElm = el} className="easyui-textbox" name="accountCode" style={{width:"100%"}} data-options="label:'科目代码:',required:true"/>
                        </div>
                        <div style={{margin:"10px"}}>
                            <input ref={el=>this.accNameElm = el} className="easyui-textbox" name="accountName" style={{width:"100%"}} data-options="label:'科目名称:',required:true"/>
                        </div>
                        <div style={{margin:"10px"}}>
                        <input ref={el=>this.accTypeElm = el}  name="accountType" style={{width:"60%"}}/>
                           
                        </div>
                        <div style={{margin:"10px"}}>
                            <label className="textbox-label">
                                余额方向:
                            </label>
                            <input ref={el=>this.balanceSideElm = el}  style={{width:"15%"}} />

                        </div>
                        
                    </form>

                    <div style={{textAlign:"center",padding:"5px 0"}}>
                        <a href="javascript:void(0)" ref={el=>this.submitBtnElm=el}  style={{width:"80px"}}>保存</a>
                        <a href="javascript:void(0)" ref={el=>this.cancelBtnElm=el}  style={{width:"80px"}}>取消</a>
                    </div>
                </div>
            </div>
        );
    }

    public componentDidMount(){
        $(this.winElm).window({
            width:400,
            height:300,
            closed : true,
            resizable:false,
            minimizable:false,
            maximizable:false,
            title:"会计科目",
            modal:this.props.isModal ? true : false
        });
    }

    public show(acc?:AccountModel){
        console.log("accountEdit show()")
        $(this.winElm).window("open");
        ($ as any).parser.parse(this.winElm);
        $(this.accTypeElm).combobox({
            data:this.accountTypes,
            valueField:'value',
            textField:'displayName',
            limitToList:true,
            label:'类别:',
            required:true
        });

        $(this.balanceSideElm).switchbutton({
            onText:'贷',offText:'借',
            label:'余额方向:'
            
        });

        $(this.submitBtnElm).linkbutton({
            onClick:()=>{
                $(this.accFormElm).form('submit',{
                    onSubmit:()=>{
                        const result = $(this.accFormElm).form('enableValidation').form('validate');
                        return result;
                    }
                })
            }
        })

        $(this.cancelBtnElm).linkbutton({
            onClick:()=>{
                return;
            }
        })


        if(acc){
            $(this.accCodeElm).textbox("initValue",acc.AccountCode);
            $(this.accNameElm).textbox("initValue",acc.AccountName);
            $(this.accTypeElm).combobox("setValue",acc.AccountType);
            $(this.balanceSideElm).switchbutton("setValue",acc.BalanceSide);
        }
        
        
    }
}