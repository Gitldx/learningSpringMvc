/// <reference path="../../jqplugins/plugin.d.ts" />

import * as React from "react";
import { ReactElement } from "react";
import * as ReactDOM from 'react-dom';



export default class EjqWindow extends React.Component{

private winElm : HTMLElement;
    private submitBtnElm : HTMLElement;
    private cancelBtnElm : HTMLElement;
    private contentDiv : HTMLElement;

    public render(){
        return (
            <div ref={el => this.winElm = el}>
                <div ref={el=>this.contentDiv = el}/>

                <div style={{textAlign:"center",padding:"5px 0"}}>
                    <a href="javascript:void(0)" ref={el=>this.submitBtnElm=el}  style={{width:"80px"}}>保存</a>
                    <a href="javascript:void(0)" ref={el=>this.cancelBtnElm=el}  style={{width:"80px"}}>取消</a>
                </div>
            </div>
        )
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
            // modal:this.props.isModal ? true : false
        });

        // ReactDOM.render(this.props.children as ReactElement<Element>,this.contentDiv);
    }

    public show(){
        $(this.winElm).window("open");

        ReactDOM.unmountComponentAtNode(this.contentDiv);

        ReactDOM.render(this.props.children as ReactElement<Element>,this.contentDiv);
        
        $(this.submitBtnElm).linkbutton({
            onClick:()=>{
                // $(this.accFormElm).form('submit',{
                //     onSubmit:()=>{
                //         const result = $(this.accFormElm).form('enableValidation').form('validate');
                //         return result;
                //     }
                // })
            }
        })

        $(this.cancelBtnElm).linkbutton({
            onClick:()=>{
                return;
            }
        })
    }

}