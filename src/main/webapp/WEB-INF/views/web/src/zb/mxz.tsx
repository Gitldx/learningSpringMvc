

import * as React from "react";
import * as ReactDOM from 'react-dom';
import EqjDatagrid from '../common/component/ejqDatagrid'
import { VoucherWindow } from '../pz/voucherWindow'

import {HttpSend} from '../common/util/httpHelper'



class Mxz extends React.Component<{}, { datasource: any[] }>{

    private vw: VoucherWindow;


    private columns = [
        { field: "date", title: "日期", width: 100 },
        { field: "year", title: "年度", width: 100 },
        { field: "period", title: "期间", width: 100 },
        { field: "voucherType", title: "凭证字", width: 100 },
        { field: "voucherNo", title: "凭证号", width: 100 },
        { field: "summary", title: "摘要", width: 100 },
        { field: "jf", title: "借方", width: 100 },
        { field: "df", title: "贷方", width: 100 },
        { field: "balanceSide", title: "方向", width: 100 },
        { field: "balance", title: "余额", width: 100 }
    ];

    constructor(props: {}) {
        super(props);
        this.state = {
            datasource: [
                {date : '2018/04/23',year:2018,period : 8,voucherType:"*",voucherNo:"123",summary :"zz",jf : "fdf",df : "fsd",balanceSide : '借',balance : 100},
                {date : '2018/04/23',year:2018,period : 8,voucherType:"*",voucherNo:"125",summary :"zz",jf : "fdf",df : "fsd",balanceSide : '借',balance : 100},
                {date : '2018/04/23',year:2018,period : 8,voucherType:"*",voucherNo:"129",summary :"zz",jf : "fdf",df : "fsd",balanceSide : '借',balance : 100},
            ],
        };

        
        (window as any).queryAction = this.queryAction;
    }

    public render() {
        return (
            <React.Fragment>
                <EqjDatagrid columns={this.columns} datasource={this.state.datasource} onDblClickRow={this.datagridDbClick} />
                <VoucherWindow ref={el => this.vw = el} />
            </React.Fragment>
        )
    }


    private datagridDbClick = (index: number, row: any) => {
        this.vw.closeWindow();
        const id: number = row.id;
        setTimeout(() => {
            this.vw.showWindow(id);
        }, 0);
        
    }


    private queryAction=({beginY,beginM,endY,endM,beginCode,endCode})=>{
        
        console.log(`beginY:${beginY},beginM:${beginM};endY:${endY},endM:${endM},beginCode:${beginCode},endCode:${endCode}`)

        // const response =  $.ajax({
        //     url : "/mxz/getMxz",
        //     data : {code : beginCode,beginY,beginM,endY,endM},
        //     async : false
        // }).responseJSON;
        const response = HttpSend.get("/mxz/getMxz",{code : beginCode,beginY,beginM,endY,endM},false);
        
        console.log(response);
        this.setState({datasource : response.list});
        
        (parent.window as any).subwindowMsg({type:"loaded",value:true});

        
        
    }

}



ReactDOM.render(
    <Mxz/>,
    document.getElementById('root') as HTMLElement
);