/// <reference path="../../jqplugins/plugin.d.ts" />

import * as React from 'react';


import { Col,DatePicker,Input,Row } from 'antd';
import IQueryParameter from './queryParameter'


import * as moment from 'moment';
import 'moment/locale/zh-cn';


const lineItemStyle = {
    marginTop : "10px",
}

// const InputGroup = Input.Group;
import { MonthPickerProps } from 'antd/lib/date-picker/interface';
import ICallback from './ICallback'


const { MonthPicker } = DatePicker;

export default class QueryPZ extends React.Component<ICallback,{inputNumber : string}> implements IQueryParameter{

    // private inputNumber : string = "";
    private selectBeginMonth : string = undefined;
    private beginM : React.Component<MonthPickerProps>
    private selectEndMonth : string = undefined;

    constructor(props : ICallback){
        super(props);
        this.state = {
            inputNumber : ""
        }
    }

    public render(){
        return (
            <React.Fragment>

                
                <div>
                    
                    <MonthPicker ref={el=>this.beginM = el} style={{width:"49%",display:"inline-block",textAlign:"left"}} onChange={this.onBeginPChanged} placeholder="起始期间"  defaultValue={moment("2018/08","YYYY/MM")}/>
                    
                    <div style={{width:"2%",display:"inline-block"}}/>
                    
                    <MonthPicker style={{width:"49%",display:"inline-block",textAlign:"right"}} onChange = {this.onEndPChanged}  placeholder="截止期间" />
                    
                </div>
                
                <div style = {lineItemStyle}>
                 <Input  placeholder="输入凭证号，或凭证号范围，例如1,4,6,1-10" value={this.state.inputNumber} onChange={this.inputNumChanged}/>
                 </div>
                
                <Row gutter={16} style={{marginTop:"10px"}}>
                    <Col span={12}>
                        
                        <a id="addAccBtn" style={{margin:"5px 0",width:"100px"}}  href='javascript:void(0)' onClick={this.props.queryCallBack}>查询</a>
                    </Col>
                    <Col span={12}>
                        
                        <a id="cancelBtn" style={{margin:"5px 0",width:"100px"}}  href='javascript:void(0)' onClick={this.props.cancelCallBack}>取消</a>
                    </Col>
                </Row>
                

            </React.Fragment>
        )
    }


    public qparams(){
        console.log(this.beginM.props.defaultValue.year() + "-" + this.beginM.props.defaultValue.month()+1);
        const [beginP,endP,num] = [this.selectBeginMonth || this.beginM.props.defaultValue.year() + "-" + this.beginM.props.defaultValue.month()+1 ,this.selectEndMonth,this.state.inputNumber]
        return {
            beginP,endP,num
        }
    }


    public componentDidMount(){
        $("#addAccBtn").linkbutton({});
        $("#cancelBtn").linkbutton({});
    }

    
    private inputNumChanged =(e)=>{
        this.setState({inputNumber : e.target.value})
    }


    private onBeginPChanged=(date, dateString)=>{
        this.selectBeginMonth = dateString   
    }

    private onEndPChanged = (date, dateString)=>{
        this.selectEndMonth = dateString ;  
    }

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


