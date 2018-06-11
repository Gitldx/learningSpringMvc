/// <reference path="../jqplugins/plugin.d.ts" />
import * as React from "react";

import Pzgrid from "./pzgrid"
import{VoucherHeader} from "./voucherHeader"


declare let window:any;

export interface IState{showdg:boolean}

export class VoucherWindow extends React.Component<{},IState>{

    private pzDatagrid : Pzgrid;
    private voucherHeader : VoucherHeader;
    private datagridRectXY:any;


    constructor(props:{}){
        super(props);
        this.state = {showdg:false};
    }

    public render(){
        const dg = this.state.showdg === true ? 
            <div style={{textAlign:"center"}}> 
                <VoucherHeader VoucherYear={2018} VoucherPeriod={12} VoucherDate={"2018-10-28"}
                VoucherTypeId = {2} ref={el=>this.voucherHeader = el}/> 
                <Pzgrid ref={el => this.pzDatagrid = el}/>
            </div> 
            : "";
        return(
            <div id="vwin" style={{overflow:"hidden"}}>
                {dg}
            </div>
        );
    }


    public componentDidMount(){



        $('#vwin').window({
            title:"凭证",
            width: 740,
            height: 400,
            closed: true,
            resizable:false,
            minimizable:false,
            maximizable:false,
            onBeforeClose:()=>{
                this.setState({showdg:false});        
                // $(window).unbind("click",this.winClick.bind(this));
            },

        });

        $(window).bind("click",this.winClick.bind(this));
        // $("#showVoucherBtn").bind("click",this.showWindow.bind(this));
    }


    
    public showWindow():void{
        this.setState({showdg:true},()=>{
            $('#vwin').window('open');

            $("#vwin").window("expand");
            this.pzDatagrid.renderTableElm();
            this.voucherHeader.InitValue();
            this.voucherHeader.bindVoucherdg(this.pzDatagrid);

        });
        
    }



    public closeWindow(){
        $('#vwin').window('close');
    }


    private winClick(e:MouseEvent){
        if(!this.pzDatagrid){return;}
        
            this.datagridRectXY = $($("div.panel.datagrid.panel-htop").get(0)).find("div.datagrid-body")[1].getBoundingClientRect();
            // $("div.panel.datagrid.panel-htop").get(0).getBoundingClientRect();
            
            const leftX = this.datagridRectXY.left;
            const leftY = this.datagridRectXY.top;
            const rightX = this.datagridRectXY.right;
            const rightY = this.datagridRectXY.bottom;
    
            const mouseX = e.clientX;
            const mouseY = e.clientY;
    
            const isInXY = mouseX > leftX && mouseY > leftY && mouseX < rightX && mouseY < rightY;
    
            const $dg = $(this.pzDatagrid.tableElm);
    
            // const cell = $dg.datagrid("cell");
            
    
            if (!isInXY && $dg.datagrid("cell")) {
                const cell = $dg.datagrid("cell");
                $dg.datagrid('endEdit', cell.index);

                $dg.trigger("onEndEdit",[cell.index,cell.field]);
            }
    }
}