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


    private errorWinElm : HTMLElement;
    private infoWinElm : HTMLElement;
    private warnWinElm : HTMLElement;
    private winOptions :　any;
    private closeCallBack : ()=>void = undefined;
    constructor(props:Iprops){
        super(props);


        const defaultProp = {width:200,height:100,closed:true,resizable:false,minimizable:false,maximizable:false,
            collapsible:false,border:'thin',modal:true,
            onClose : ()=>{
                if(this.closeCallBack !== undefined){
                    this.closeCallBack();
                }
                
                $(document).unbind("keydown",this.docKeydownHandler);
                this.closeCallBack = undefined;
            }
        };

        this.winOptions = Object.assign({},defaultProp,this.props.winOptions)
        this.state = {message:""}
    }

    public render(){
        return (
            <React.Fragment>
                <div ref={el => this.errorWinElm = el} style={{padding:"15px 15px",fontSize:"14px",fontWeight:"bold"}}>
                    {
                    this.state.message 
                    }
                </div>
                <div ref={el => this.infoWinElm = el} style={{padding:"15px 15px",fontSize:"14px",fontWeight:"bold"}}>
                    {
                    this.state.message 
                    }
                </div>
                <div ref={el => this.warnWinElm = el} style={{padding:"15px 15px",fontSize:"14px",fontWeight:"bold"}}>
                    {
                    this.state.message 
                    }
                </div>
            </React.Fragment>
            
        )
    }


    public componentDidMount(){
        
        $(this.errorWinElm).window(Object.assign({},this.winOptions,{cls:"c3",title : "警告"}));
        $(this.infoWinElm).window(Object.assign({},this.winOptions,{cls:"c8",title : "提醒"}));
        $(this.warnWinElm).window(Object.assign({},this.winOptions,{cls:"c7",title : "提醒"}));


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

    public error(message : string){
        this.setState(()=> ({message}));
        $(this.errorWinElm).window("open");
        $(this.errorWinElm).window("vcenter");
        this.enterKeyListenner();
    }


    public warn(message : string, callBack? : ()=>void){
        this.setState(()=> ({message}));
        $(this.warnWinElm).window("open");
        $(this.warnWinElm).window("vcenter");
        this.enterKeyListenner();

        if(callBack !== undefined){
            this.closeCallBack = callBack;
        }
        
    }

    public close(){
        $(this.errorWinElm).window("close");
        $(this.infoWinElm).window("close");
        $(this.warnWinElm).window("close");
        
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


