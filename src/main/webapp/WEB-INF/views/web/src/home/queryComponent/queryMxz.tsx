/// <reference path="../../jqplugins/plugin.d.ts" />

import * as React from 'react';


import { Col,Input,Row } from 'antd';
import IQueryParameter from './queryParameter'

import ICallback from './ICallback'


export default class QueryMxz extends React.Component<ICallback> implements IQueryParameter{

    private inputText : string = "";
  
    public render(){
        return (
            <React.Fragment>
                <Row gutter={16}>
                    <Col span={12}>
                        <Input onChange={this.inputChanged}/>
                    </Col>

                    <Col span={12}/>
                    
                </Row>
                <Row gutter={16} style={{marginTop:"10px",textAlign:"center",backgroundColor:"red"}}>
                    <Col span={12}>
                        {/* <Button onClick={this.props.queryCallBack}>查询</Button> */}
                        <a id="addAccBtn" style={{margin:"5px 0",width:"100px"}}  href='javascript:void(0)' onClick={this.props.queryCallBack}>查询</a>
                    </Col>
                    <Col span={12}>
                        {/* <Button>取消</Button> */}
                        <a id="cancelBtn" style={{margin:"5px 0",width:"100px"}}  href='javascript:void(0)' onClick={this.props.cancelCallBack}>取消</a>
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
            val1 : this.inputText,

        }
    }

    
    private inputChanged =(e)=>{
        this.inputText = e.target.value;
    }


}