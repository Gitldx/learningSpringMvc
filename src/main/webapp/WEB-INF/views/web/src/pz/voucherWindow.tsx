/// <reference path="../jqplugins/plugin.d.ts" />
import * as React from "react";

import Pzgrid from "./pzgrid"
import VoucherEntryModel from "./VoucherEntryModel"
import{VoucherHeader} from "./voucherHeader"
import VoucherModel from './VoucherModel'



declare let window:any;

export interface IState{showdg:boolean,voucher:VoucherModel}

export class VoucherWindow extends React.Component<{},IState>{

    private pzDatagrid : Pzgrid;
    private voucherHeader : VoucherHeader;
    private datagridRectXY:any;


    constructor(props:{}){
        super(props);

        const vdate = new Date();
        
        vdate.setFullYear(2018,5,18);
        this.state = {showdg:false,
            voucher : new VoucherModel(undefined,2,2018,6,vdate,2,33,2,100,100,100)
        };
    }

    public render(){
        const dg = this.state.showdg === true ? 
            <div style={{textAlign:"center"}}> 
                <VoucherHeader Vouhcer = {this.state.voucher} ref={el=>this.voucherHeader = el}/> 
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


    
    public showWindow(id? : number):void{

        if(id){
            $.ajax({ 
                type : "get", 
                url : "/pz/getVoucher/" + id.toString(), 
                async : false, 
                success : (response)=>{ 
                    console.log(response);
                    
                    const data = {rows:
                        response.entries.map((item)=>
                            new VoucherEntryModel(item.id,item.summary,item.accountId,item.accountCode,item.accountName,!item.balanceSide ? item.amount : undefined,item.balanceSide ? item.amount : undefined,true)
                        )
                        ,footer:[{Summary:"XX",DebitAmount:undefined,CreditAmount:undefined,IsFooter:true}]};
                        this.open(data);
                },
                error :(err)=>{
                    alert(err);
                }
            }); 
        }
        else{

            const data =  {rows:[
                new VoucherEntryModel(1,"摘要1发发发发发发付付多付打guygug方式打开借方圣诞节是否防辐射ryfvihi就顾冲锋衣太晚所所所所",101,undefined,undefined,undefined,undefined,true),
                new VoucherEntryModel(2,"摘要2",101,undefined,undefined,undefined,undefined,true),
                new VoucherEntryModel(3,"摘要1",101,undefined,undefined,undefined,undefined,true),
                new VoucherEntryModel(4,"摘要2",101,undefined,undefined,undefined,undefined,true),
                new VoucherEntryModel(5,"摘要1",101,undefined,undefined,undefined,undefined,true),
                
            ],
            footer:[{Summary:"XX",DebitAmount:undefined,CreditAmount:undefined,IsFooter:true}]
            };
            this.open(data);

        }


        
        
    }



    public closeWindow(){
        $('#vwin').window('close');
    }


    private open(data){
        this.setState({showdg:true},()=>{
            $('#vwin').window('open');

            $("#vwin").window("expand");
            this.pzDatagrid.renderTableElm(data);
            this.voucherHeader.InitValue();
            this.voucherHeader.bindVoucherdg(this.pzDatagrid);

        });
    }


    private winClick(e:MouseEvent){
        if(!this.pzDatagrid){return;}


            this.datagridRectXY = $($("#vwin").find("div.panel.datagrid.panel-htop").get(0)).find("div.datagrid-body")[1].getBoundingClientRect();
            // this.datagridRectXY = $($("div.panel.datagrid.panel-htop").get(0)).find("div.datagrid-body")[1].getBoundingClientRect();
            // $("div.panel.datagrid.panel-htop").get(0).getBoundingClientRect();
            
            const leftX = this.datagridRectXY.left;
            const leftY = this.datagridRectXY.top;
            const rightX = this.datagridRectXY.right;
            const rightY = this.datagridRectXY.bottom;
    
            const mouseX = e.clientX;
            const mouseY = e.clientY;
    
            const isInXY = mouseX > leftX && mouseY > leftY && mouseX < rightX && mouseY < rightY;
            // console.log(`leftx:${leftX},lefty:${leftY},rightx:${rightX},righty:${rightY},mousex:${mouseX},mouseY:${mouseY},isInXY:${isInXY}`)
            // const $dg = $(this.pzDatagrid.tableElm);
    
            // const cell = $dg.datagrid("cell");
            
    
            if (!isInXY) {
                // console.log("!IsInXY")
                // const cell = $dg.datagrid("cell");
                // $dg.datagrid('endEdit', cell.index);

                // $dg.trigger("onEndEdit",[cell.index,cell.field]);
                this.pzDatagrid.endEdit();
            }
    }
}