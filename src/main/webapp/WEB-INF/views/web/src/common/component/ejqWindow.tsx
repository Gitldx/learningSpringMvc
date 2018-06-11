/// <reference path="../../jqplugins/plugin.d.ts" />

import * as React from "react";
import { ReactElement } from "react";
import * as ReactDOM from 'react-dom';

interface Iprops{
    
    winOptions :{
        width:number,
        height:number,
        closed : boolean,
        resizable:boolean,
        minimizable:boolean,
        maximizable:boolean,
        title:string,
        modal : boolean
    },
    showBtn : boolean,
    saveCallback?():void,cancelCallback?():void
    
}

export default class EjqWindow extends React.Component<Iprops>{

private winElm : HTMLElement;
    private submitBtnElm : HTMLElement;
    private cancelBtnElm : HTMLElement;
    private contentDiv : HTMLElement;

    public render(){
        return (
            <div ref={el => this.winElm = el}>
                <div ref={el=>this.contentDiv = el}/>
                {
                    this.props.showBtn ? 
                        <div style={{textAlign:"center",padding:"5px 0"}}>
                        <a href="javascript:void(0)" ref={el=>this.submitBtnElm=el}  style={{width:"80px",marginRight:"5px"}}>保存</a>
                        <a href="javascript:void(0)" ref={el=>this.cancelBtnElm=el}  style={{width:"80px",marginLeft:"5px"}}>取消</a>
                        </div>
                    : null
                }
                
            </div>
        )
    }


    public componentDidMount(){

        $(this.winElm).window(this.props.winOptions);

        // ReactDOM.render(this.props.children as ReactElement<Element>,this.contentDiv);
    }

    public show(){
        $(this.winElm).window("open");

        ReactDOM.unmountComponentAtNode(this.contentDiv);

        ReactDOM.render(this.props.children as ReactElement<Element>,this.contentDiv);
        
        if(this.props.showBtn){
            $(this.submitBtnElm).linkbutton({
                onClick:()=>{
                    // $(this.accFormElm).form('submit',{
                    //     onSubmit:()=>{
                    //         const result = $(this.accFormElm).form('enableValidation').form('validate');
                    //         return result;
                    //     }
                    // })
    
                    this.props.saveCallback();
                }
            })
    
            $(this.cancelBtnElm).linkbutton({
                onClick:()=>{
                    this.props.cancelCallback();
                }
            })
        }

    }

    public close(){
        $(this.winElm).window("close");
    }

}