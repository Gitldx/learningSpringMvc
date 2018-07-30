
import { DatePicker } from 'antd';
import { MonthPickerProps } from 'antd/lib/date-picker/interface';
import * as React from 'react';

import * as moment from 'moment';
import 'moment/locale/zh-cn';

const { MonthPicker } = DatePicker;

interface IProps{
    placeholder : string,
    style : any,
    defaultValue : string,
}

export default class FMontnPicker extends React.Component<IProps,{}>{

    

    private mp : React.Component<MonthPickerProps>;
    private style : any;
    private selectedMonth : string = undefined;

    constructor(props:IProps){
        super(props);
        this.style = this.props.style || {width:"49%",display:"inline-block",textAlign:"left"}
    }

    public render(){
        return (
            <React.Fragment>
                <MonthPicker ref={el=>this.mp = el} style={this.style} onChange={this.onChanged} size="small"
                placeholder={this.props.placeholder}  defaultValue={moment(this.props.defaultValue,"YYYY/MM")}/>
            </React.Fragment>
        )
    }

    get SelectedMonth(){
        return this.selectedMonth || this.mp.props.defaultValue.year() + "-" + (this.mp.props.defaultValue.month()+1) 
    }
    

    private onChanged=(date, dateString)=>{
        this.selectedMonth = dateString   
    }

}