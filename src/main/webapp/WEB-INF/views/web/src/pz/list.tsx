import * as React from "react";

import {VoucherWindow} from './voucherWindow'


export default class List extends React.Component{

    private vw : VoucherWindow

    constructor(props:{}){
        super(props);

        this.setEuiControl();

        (window as any).addAction = this.add;
    }


    public render(){
        return (
            <React.Fragment>
                <button onClick={this.test}>test</button>
                <VoucherWindow ref={el=>this.vw = el}/>
            </React.Fragment>
            
        )
    }

    private add=()=>{
        this.vw.closeWindow();
        setTimeout(() => {
            this.vw.showWindow();
        }, 200);
    }

    private test=()=>{
        this.vw.closeWindow();
        setTimeout(() => {
            this.vw.showWindow();
        }, 200);
    }

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
            }
        });
    }
}