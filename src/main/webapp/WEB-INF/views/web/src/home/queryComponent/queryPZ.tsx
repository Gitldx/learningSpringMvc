/// <reference path="../../jqplugins/plugin.d.ts" />

import * as React from 'react';


import { Col,DatePicker,Row } from 'antd';
import IQueryParameter from './queryParameter'


import * as moment from 'moment';
import 'moment/locale/zh-cn';



import ICallback from './ICallback'



const { MonthPicker } = DatePicker;

export default class QueryPZ extends React.Component<ICallback> implements IQueryParameter{

    private inputText : string = "";
    private selectValue : string = "";

    public render(){
        return (
            <React.Fragment>
                <Row gutter={16}>
                    <Col span={12}>
                        <MonthPicker size={"small"} placeholder="起始期间"  defaultValue={moment("2018/08","YYYY/MM")}/>
                        {/* <Input onChange={this.inputChanged}/> */}
                    </Col>

                    <Col span={12}>
                    {/* <Select
                        showSearch ={true}
                        style={{width:"100%"}}
                        placeholder="Select a person"
                        optionFilterProp="children"
                        onChange={this.handleChange}
                        onFocus={this.handleFocus}
                        onBlur={this.handleBlur}
                        filterOption={this.filterHandlder}>
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="tom">Tom</Option>
                    </Select> */}
                        <MonthPicker size={"small"} placeholder="截止期间" />
                    </Col>
                </Row>
                <Row gutter={16} style={{marginTop:"10px"}}>
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


    public qparams(){
        return {
            val1 : this.inputText,
            val2: this.selectValue
        }
    }


    public componentDidMount(){
        $("#addAccBtn").linkbutton({});
        $("#cancelBtn").linkbutton({});
    }

    
    // private inputChanged =(e)=>{
    //     this.inputText = e.target.value;
    // }

    // private filterHandlder = (input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;

    // private handleChange=(value) =>{
    //     console.log(`selected ${value}`);
    //     this.selectValue = value;
    //   }
      
    // private handleBlur() {
    //     console.log('blur');
    //   }
      
    // private handleFocus() {
    //     console.log('focus');
    //   }
}