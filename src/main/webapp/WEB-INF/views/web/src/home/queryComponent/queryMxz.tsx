/// <reference path="../../jqplugins/plugin.d.ts" />

import * as React from 'react';


import { Button,Col,Row } from 'antd';
import IQueryParameter from './queryParameter'

import AccCombo from '../../common/component/ejqAccountCombogrid_remote';
// import CompanyCombo from '../../common/component/ejqCompanyCombogrid_remote';
import FMontnPicker from '../../common/component/fMonthPicker'


import ICallback from './ICallback'




export default class QueryMxz extends React.Component<ICallback> implements IQueryParameter{

    // private inputText : string = "";
    private beginM : FMontnPicker
    private endM : FMontnPicker
    private beginAcc : AccCombo;
    private endAcc : AccCombo;
    // private company : CompanyCombo
  
    public render(){
        return (
            <React.Fragment>
                <div className="querypopupLineItem">
                
                    <FMontnPicker ref={el=>this.beginM = el} style={{width:"49%",display:"inline-block",textAlign:"left"}}  placeholder="起始期间"  defaultValue={"2018/08"}/>
                    
                    <div style={{width:"2%",display:"inline-block"}}/>
                    
                    <FMontnPicker ref={el=>this.endM = el} style={{width:"49%",display:"inline-block",textAlign:"right"}}  placeholder="截止期间" defaultValue={"2018/08"}/>
                
                </div>
                <div className="querypopupLineItem">
                
                    <AccCombo ref={el=>this.beginAcc = el} style={{width:"49%"}} prompt="开始科目"/>
                    
                    <div style={{width:"2%",display:"inline-block"}}/>
                    
                    <AccCombo ref={el=>this.endAcc = el} style={{width:"49%"}} prompt="截止科目"/>
                
                </div>
                <Row gutter={16} className="queryControlBtnGrp">
                    <Col span={12}>
                        <Button size="small" onClick={this.props.queryCallBack} style={{width:"80px"}}>查询</Button>
                    </Col>
                    <Col span={12}>
                        <Button size="small" onClick={this.props.cancelCallBack} style={{width:"80px"}}>取消</Button>

                    </Col>
                </Row>
            
            </React.Fragment>
        )
    }
    public componentDidMount(){
        $("#addAccBtn").linkbutton({});
        $("#cancelBtn").linkbutton({});
    }

    public qparams(){
        return {
            beginM : this.beginM.SelectedMonth,
            endM : this.endM.SelectedMonth,
            beginCode : this.beginAcc.SelectCode,
            // endCode : this.endAcc.SelectCode
        }
    }

    
    // private inputChanged =(e)=>{
    //     this.inputText = e.target.value;
    // }


}