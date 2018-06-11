/// <reference path="../jqplugins/plugin.d.ts" />

import * as React from "react";
import Pzgird from "./pzgrid"


interface IProps{VoucherYear : number;VoucherPeriod:number,VoucherDate:string,VoucherTypeId:number};
// interface IStates{
// }

export interface IVoucherType{Id:number;Word:string};

export class VoucherHeader extends React.Component<IProps,{}>{

    private voucherDg : Pzgird;

    // private addEntryBtnElm:HTMLElement;
    private saveBtnElm : HTMLElement;
    private insertEntryBtnElm:HTMLElement;
    private deleteEntryBtnElm:HTMLElement;
    

    private yearInputElm : HTMLElement;
    private periodInputElm : HTMLElement;
    private dateInputElm : HTMLElement;
    private voucherTypeInputElm : HTMLElement;
    private attachNumInputElm : HTMLElement;
    private voucherhNumInputElm : HTMLElement;
    private hasLoaded:boolean=false;

    private voucherTypeDS : IVoucherType[] = [
        {Id:1,Word:"*"},
        {Id:2,Word:"收"},
        {Id:3,Word:"付"},
        {Id:4,Word:"转"},
    ]

    constructor(props:IProps){
        super(props);
        // this.state = {VoucherYear:2018};

        // this.yearChanged = this.yearChanged.bind(this);
    }


    public render(){
        return (
        <div id="voucherToolBar">
            <div style={{height:"25px",margin:"10px 0"}}>

                <a  title="第一条" href="javascript:void(0)" data-options="iconCls:'icon-first-item'" className="easyui-linkbutton"/>
                <a title="上一条" href="javascript:void(0)" data-options="iconCls:'icon-prev-item'" className="easyui-linkbutton"/>
                <a title="下一条" href="javascript:void(0)" data-options="iconCls:'icon-next-item'" className="easyui-linkbutton"/>
                <a title="最后一条" href="javascript:void(0)" data-options="iconCls:'icon-last-item'" className="easyui-linkbutton"/>
                <a ref={el => this.saveBtnElm = el}  href="javascript:void(0)"  data-options="iconCls:'icon-save'" style={{height:"25px",marginRight:" 5px"}}>保存</a>
                {/* <a ref={el => this.addEntryBtnElm = el}  href="javascript:void(0)"  data-options="iconCls:'icon-add'" style={{height:"25px",marginRight:" 5px"}}>新增分录</a> */}
                <a ref={el => this.insertEntryBtnElm = el}  href="javascript:void(0)"  data-options="iconCls:'icon-insert-item'" style={{height:"25px",marginRight:" 5px"}}>插入分录</a>
                <a ref={el => this.deleteEntryBtnElm = el} href="javascript:void(0)" className="easyui-linkbutton" data-options="iconCls:'icon-remove'" style={{height:"25px",marginRight:"5px"}}>删除分录</a>
                <a href="javascript:void(0)" className="easyui-menubutton c4" data-options="menu:'#voucherOperation'" style={{height:"25px",marginRight:" 5px"}}>操作</a>
                <div id="voucherOperation" style={{width:"150px"}}>
                    <div>新建</div>
                    <div>复制</div>
                    <div>刷新</div>
                </div>
            </div>

            <div className="VoucherTitle">

            <div className="left">
                
                <input ref={el => this.yearInputElm = el}  style={{width:"60px",height:"20px"}} />
                <span className="label">年</span>
                
                <input ref={el => this.periodInputElm = el}  min="1"  max="12" style={{width:"45px",height:"20px"}} />
                <span className="label" >期</span>

                <span className="label">日期</span>
                <input ref={el => this.dateInputElm = el} type="text" style={{width:"100px",height:"20px"}}/>

            </div>

            <span id="voucherBrand">XXXX</span>

        

            <div className="right">
                
                <input ref={el => this.attachNumInputElm = el}  min="1"  style={{width:"45px",height:"20px"}} />
                <span className="label">附件数</span>
                
                <input ref={el => this.voucherhNumInputElm = el}   min="1"  style={{width:"60px",height:"20px"}} />
                <span className="label">号</span>
                
                <input ref={el => this.voucherTypeInputElm = el} style={{width:"50px",height:"20px"}}/>
                <span className="label">字</span>
            </div>

            </div>
        </div>
        )
    }



    public componentWillUnmount(){
        console.log("voucherMng unmount!");
    }

    public componentDidMount(){
        ($ as any).parser.parse('div#voucherToolBar');
        

        // $(this.addEntryBtnElm).linkbutton({
        //     onClick : ()=>{
        //         console.log("addEntryBtnElm click");
        //         this.voucherDg.AppendVoucherEntry()
        //     }
        // });


        $(this.saveBtnElm).linkbutton({
            onClick : ()=>{
                console.log("saveBtnElm click");
                
            }
        });


        $(this.insertEntryBtnElm).linkbutton({
            onClick : ()=>{
                console.log("insertEntryBtnElm click");
                this.voucherDg.InsertVoucherEntry()
            }
        });


        $(this.deleteEntryBtnElm).linkbutton({
            onClick(){
                console.log("deleteEntryBtnElm click");
            }
        });

        $(this.yearInputElm).numberspinner({
            onChange:(newValue:number,oldValue:number)=>{
                console.log(newValue);
                // this.setState({VoucherYear:newValue});
            }
        });

        $(this.periodInputElm).numberspinner({
            onChange:(newValue:number,oldValue:number)=>{
                console.log(newValue);
                
            }
        });
        $(this.dateInputElm).datebox({
            onChange:(newValue:number,oldValue:number)=>{
                console.log(newValue);
                
            }
        });


        $(this.attachNumInputElm).numberspinner({
            onChange : (newValue:number,oldValue:number)=>{
                console.log(newValue);
            }
        });

        $(this.voucherhNumInputElm).numberspinner({
            onChange : (newValue:number,oldValue:number)=>{
                console.log(newValue);
            }
        });

        $(this.voucherTypeInputElm).combobox({
            onChange : (newValue:number,oldValue:number)=>{
                console.log(newValue);
            },
            data : this.voucherTypeDS,
            valueField : "Id",
            textField : "Word"
        });
    }

    
    public InitValue(){
        if(!this.hasLoaded){
            $(this.yearInputElm).numberspinner("setValue",this.props.VoucherYear);
            $(this.periodInputElm).numberspinner("setValue",this.props.VoucherPeriod);
            $(this.dateInputElm).datebox("setValue",this.props.VoucherDate);
            $(this.voucherTypeInputElm).combobox("setValue",this.props.VoucherTypeId)
            this.hasLoaded = true;
        }
        
    }


    public bindVoucherdg(dg:Pzgird){
        this.voucherDg = dg;
    }

    // private yearChanged(event:any){
    //     console.log(event);
    //     this.setState({VoucherYear:event.target.value});
    // }
}