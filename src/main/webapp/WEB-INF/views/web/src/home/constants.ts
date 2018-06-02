import {BtnsStatus} from './actions'


const MenuKeyName = {
    csye: "csye",// 初始余额
    custom : "custom",  // 自定义
    customerInfo :"customerInfo",  //  客户资料
    dlz: "dlz",// 多栏账
    dopz : "dopz",// 录凭证
    flb : "flb",// 分录簿
    fybg :"fybg",// 费用报告
    home : "home",// 主页
    km: "km",// 科目
    lrb: "lrb",// 利润表
    mxz : "mxz",// 明细账
    supplierInfo :"supplierInfo",// 供应商信息
    xjllb: "xjllb",// 现金流量表
    yfzk :"yfzk", // 应付账款
    yszk :"yszk", // 应收账款
    zcfzb : "zcfzb", // 资产负债表
    ztInfo : "ztInfo", // 账套信息
    zz : "zz", // 总账
}


interface IMenueItem {
    btnsStatus : BtnsStatus
    frameKey : string,
    title : string,
    url : string,
    
}

const menues = new Map<string,IMenueItem>([

    [MenuKeyName.home,{
        btnsStatus : new BtnsStatus(
            {Visible:false},
            {Visible:false},
            {Visible:false},
            {Visible:false},
        
        ) ,
        frameKey : "home",
        title : "主页",url : ""
    
    }],

    [MenuKeyName.ztInfo,{
        btnsStatus : new BtnsStatus(
            {Visible:true},
            {Visible:false},
            {Visible:false},
            {Visible:true},
        
        ) ,
        frameKey : "ztInfoFrame",
        title : "账套信息",url : "/index.html"
    
    }],

    [MenuKeyName.km,{
        btnsStatus : new BtnsStatus(
            {Visible:true},
            {Visible:true},
            {Visible:true},
            {Visible:true},
        ),
        frameKey : "kmFrame",
        title : "科目",
        url : "/account.html"
    }],

    [MenuKeyName.csye,{
        btnsStatus : new BtnsStatus(
            {Visible:true},
            {Visible:false},
            {Visible:false},
            {Visible:false},
        ),
        frameKey : "csyeFrame",
        title : "初始余额",
        url : "/csye.html"
    }]

]);




export {menues,IMenueItem,MenuKeyName}