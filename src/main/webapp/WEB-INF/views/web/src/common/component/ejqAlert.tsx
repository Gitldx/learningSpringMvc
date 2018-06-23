/// <reference path="../../jqplugins/plugin.d.ts" />

import * as React from "react";
// import { ReactElement } from "react";
// import * as ReactDOM from 'react-dom';

interface Iprops{
    
    winOptions? :{
        width:number,
        height:number,
        closed : boolean,
        resizable:boolean,
        minimizable:boolean,
        maximizable:boolean,
        title:string,
        modal : boolean
    }
    
}



export default class EjqAlert extends React.Component<Iprops,{message:string}>{


    private winElm : HTMLElement;
    private winOptions :　any
    constructor(props:Iprops){
        super(props);
        if(!this.props.winOptions){
            this.winOptions = {width:200,height:100,closed:true,resizable:false,minimizable:false,maximizable:false,
                collapsible:false,cls:'c3',border:'thin',title:"警告",modal:true}
        }
        else{
            this.winOptions = this.props.winOptions
        }

        this.state = {message:""}
    }

    public render(){
        return (
            <div ref={el => this.winElm = el} style={{padding:"15px 15px",fontSize:"14px",fontWeight:"bold"}}>
                {
                this.state.message 
                }
            </div>
        )
    }


    public componentDidMount(){

        $(this.winElm).window(this.winOptions);

        // ReactDOM.render(this.props.children as ReactElement<Element>,this.contentDiv);
    }

    public show(message : string){
        $(this.winElm).window("open");
        $(this.winElm).window("vcenter");

        this.setState(()=> ({message}));
        // ReactDOM.unmountComponentAtNode(this.contentDiv);

        // ReactDOM.render(this.props.children as ReactElement<Element>,this.contentDiv);
        
    }

    public close(){
        $(this.winElm).window("close");
    }

}


