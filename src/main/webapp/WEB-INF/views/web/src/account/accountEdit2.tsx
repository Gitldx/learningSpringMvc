/// <reference path="../jqplugins/plugin.d.ts" />

import * as React from "react";

import { Radio } from 'antd';

import {AccountModel,BalanceSideEnum} from "./AccountModel"

const RadioGroup = Radio.Group;

export default class AccountEdit extends React.Component<{account : AccountModel},{balanceSideValue:BalanceSideEnum}>{
    

        private flagRadioOnchange : boolean = false;
        private accCodeElm : HTMLElement;
        private accNameElm : HTMLElement;
        private accTypeElm : HTMLElement;
        
        private accFormElm : HTMLElement;
    
        private accountTypes : Array<{value:number,displayName:string}> = [
            {value:1,displayName:"资产"},
            {value:2,displayName:"负债"},
            {value:3,displayName:"权益"},
            {value:4,displayName:"成本"},
            {value:5,displayName:"损益"}
        ];
    
        
        constructor(props : {account : AccountModel}){
            super(props);
            this.state = {balanceSideValue : this.props.account.BalanceSide};
        }
            
        public render(){
            return (
                
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

                                <RadioGroup onChange={this.onChange} value={this.state.balanceSideValue}>
                                    <Radio value={BalanceSideEnum.Debit}>借</Radio>
                                    <Radio value={BalanceSideEnum.Credit}>贷</Radio>
                                </RadioGroup>
                            </div>

                           
                            
                    </form>
    
                
            );
        }

        


        public componentDidMount(){
            ($ as any).parser.parse(this.accFormElm);

            $(this.accTypeElm).combobox({
                data:this.accountTypes,
                valueField:'value',
                textField:'displayName',
                limitToList:true,
                label:'类别:',
                required:true
            });
    


            if(this.props.account){
                const acc = this.props.account;
                $(this.accCodeElm).textbox("initValue",acc.AccountCode);
                $(this.accNameElm).textbox("initValue",acc.AccountName);
                $(this.accTypeElm).combobox("setValue",acc.AccountType);
            }
        }
    
        public componentDidUpdate(){

    
            if(this.props.account){
                const acc = this.props.account;
                $(this.accCodeElm).textbox("initValue",acc.AccountCode);
                $(this.accNameElm).textbox("initValue",acc.AccountName);
                $(this.accTypeElm).combobox("setValue",acc.AccountType);

                if(this.flagRadioOnchange){
                    this.flagRadioOnchange = false;
                    return;
                }


                if(this.state.balanceSideValue !== acc.BalanceSide){
                    this.setState({balanceSideValue : acc.BalanceSide});
                }
                
            }
        }
    

        
        private onChange = (e) => {

            this.flagRadioOnchange = true;
            this.setState({
              balanceSideValue: e.target.value,
            });
        }
    }