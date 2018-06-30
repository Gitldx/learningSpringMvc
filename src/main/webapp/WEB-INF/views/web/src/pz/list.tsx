import * as React from "react";
import * as ReactDOM from 'react-dom';

import EqjDatagrid from '../common/component/ejqDatagrid'
import {VoucherWindow} from './voucherWindow'



export default class List extends React.Component{

    private rctInput : React.Component;
    private vw : VoucherWindow
    private columns = [
        {field : "date",title :"日期",width:100},
        {field : "year",title :"年度",width:100},
        {field : "period",title :"期间",width:100},
        {field : "voucherType",title :"凭证字",width:100},
        {field : "voucherNo",title :"凭证号",width:100},
        {field : "create",title :"制单人",width:100},
        {field : "modify",title :"修改人",width:100},
        {field : "audit",title :"审核人",width:100}
    ];

    private datasource = [
        {date : '2018/04/23',year:2018,period : 8,voucherType:"*",voucherNo:"123",create :"zz",modify : "fdf",audit : "fsd"},
        {date : '2018/04/23',year:2018,period : 8,voucherType:"*",voucherNo:"125",create :"zz",modify : "fdf",audit : "fsd"},
        {date : '2018/04/23',year:2018,period : 8,voucherType:"*",voucherNo:"129",create :"zz",modify : "fdf",audit : "fsd"},
    ];

    constructor(props:{}){
        super(props);
        console.time()
        for(let i = 1;i<50;i++){
            this.datasource.push(
                {date : '2018/04/23',year:2018,period : 8,voucherType:"*",voucherNo:i.toString(),create :"zz",modify : "fdf",audit : "fsd"}
            )
        }

        console.timeEnd();

        this.setEuiControl();

        (window as any).addAction = this.add;
        (window as any).queryAction = this.queryAction;
    }


    public render(){
        return (
            <React.Fragment>
                {/* <button onClick={this.test}>test</button> */}
                <EqjDatagrid columns = {this.columns} datasource = {this.datasource} onDblClickRow = {this.datagridDbClick}/>
                <VoucherWindow ref={el=>this.vw = el}/>
            </React.Fragment>
            
        )
    }

    private datagridDbClick=(index:number,row:any)=>{
        this.vw.closeWindow();
        setTimeout(() => {
            this.vw.showWindow();
        }, 0);
    }

    private add=()=>{
        this.vw.closeWindow();
        setTimeout(() => {
            this.vw.showWindow();
        }, 0);
    }

    private queryAction=({beginP,endP,num})=>{
        console.log(`subwindow : ${beginP}`);
        setTimeout(() => {
            (parent.window as any).subwindowMsg({type:"loaded",value:true});
        }, 3000);
        
    }

    // private test=()=>{
    //     this.vw.closeWindow();
    //     setTimeout(() => {
    //         this.vw.showWindow();
    //     }, 100);
    // }

    private setEuiControl(){
        $.extend(($.fn.datagrid as any).defaults.editors, {
            combogrid: {
                init:  (container, options)=> {
                    const input = $('<input type="text" class="datagrid-editable-input">').appendTo(container);
                    return input.combogrid(options);
                },
                destroy:  (target)=> {
                    $(target).combogrid('destroy');
                },
                getValue:  (target)=> {
                    return $(target).combogrid('getValue');
                },
                setValue:  (target, value)=> {
                    $(target).combogrid('setValue', value);
                },
                resize: (target, width)=> {
                    $(target).combogrid('resize', width);
                }
            },
            textarea:{
                init: (container, options)=> {
                    const input = $('<input type="text">').appendTo(container);
                    return input.textbox(options);
                },
                destroy: (target)=> {
                    $(target).textbox('destroy');
                },
                getValue: (target)=> {
                    return $(target).textbox('getValue');
                },
                setValue: (target, value)=> {
                    $(target).textbox('setValue', value);
                },
                resize: (target, width)=> {
                    $(target).textbox('resize', width);
                }
            },
            rctInput :{
                init: (container, options)=> {
                    const input = <RctInput ref={el=>this.rctInput = el}/>;
                    ReactDOM.render(input,container[0])
                    return input;
                },
                destroy: (target)=> {
                    
                    const elm =  $(ReactDOM.findDOMNode(this.rctInput)).parent("td")[0];
                    console.log(elm);
                    ReactDOM.unmountComponentAtNode(elm);
                },
                getValue: (target)=> {
                    return "12";
                },
                setValue: (target, value)=> {
                    return;
                },
                resize: (target, width)=> {
                    return;
                }
            }
        });


        // ($.fn.datebox as any).defaults.formatter = (date)=>{
        //     const y = date.getFullYear();
        //     const m = date.getMonth()+1;
        //     const d = date.getDate();
        //     return y +'/'+ m +'/'+ d;
        // }
    }
}


class RctInput extends React.Component{

    public render(){
        return <input style={{color:"red"}}/>
    }
}