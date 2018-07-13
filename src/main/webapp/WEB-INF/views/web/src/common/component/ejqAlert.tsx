/// <reference path="../../jqplugins/plugin.d.ts" />

import * as React from "react";


interface Iprops{
    
    winOptions? :{
        width?:number,
        height?:number,
        closed? : boolean,
        resizable?:boolean,
        minimizable?:boolean,
        maximizable?:boolean,
        title?:string,
        cls?:string,
        modal? : boolean
    }
    
}



export default class EjqAlert extends React.Component<Iprops,{message:string}>{


    private warnWinElm : HTMLElement;
    private infoWinElm : HTMLElement;
    private winOptions :　any
    constructor(props:Iprops){
        super(props);


        const defaultProp = {width:200,height:100,closed:true,resizable:false,minimizable:false,maximizable:false,
            collapsible:false,border:'thin',modal:true,
            onClose : ()=>{$(document).unbind("keydown",this.docKeydownHandler);}
        };

        this.winOptions = Object.assign({},defaultProp,this.props.winOptions)
        this.state = {message:""}
    }

    public render(){
        return (
            <React.Fragment>
                <div ref={el => this.warnWinElm = el} style={{padding:"15px 15px",fontSize:"14px",fontWeight:"bold"}}>
                    {
                    this.state.message 
                    }
                </div>
                <div ref={el => this.infoWinElm = el} style={{padding:"15px 15px",fontSize:"14px",fontWeight:"bold"}}>
                    {
                    this.state.message 
                    }
                </div>
            </React.Fragment>
            
        )
    }


    public componentDidMount(){
        console.log("componentDidMount")
        $(this.warnWinElm).window(Object.assign({},this.winOptions,{cls:"c3",title : "警告"}));
        $(this.infoWinElm).window(Object.assign({},this.winOptions,{cls:"c8",title : "提醒"}));


        // ReactDOM.render(this.props.children as ReactElement<Element>,this.contentDiv);
    }




    public info(message : string){

        this.setState(()=> ({message}));
        $(this.infoWinElm).window("open");
        $(this.infoWinElm).window("vcenter");

        this.enterKeyListenner();
        // ReactDOM.unmountComponentAtNode(this.contentDiv);

        // ReactDOM.render(this.props.children as ReactElement<Element>,this.contentDiv);
        
    }

    public warn(message : string){
        this.setState(()=> ({message}));
        $(this.warnWinElm).window("open");
        $(this.warnWinElm).window("vcenter");
        this.enterKeyListenner();
    }

    public close(){
        $(this.warnWinElm).window("close");
        $(this.infoWinElm).window("close");
        
    }

    private docKeydownHandler=(e)=>{
        if(e.keyCode === 13){
            e.preventDefault();
            this.close();
        }
    }

    private enterKeyListenner(){
        $(document).bind("keydown",this.docKeydownHandler)
    }

}


