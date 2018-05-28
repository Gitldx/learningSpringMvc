import {BtnsStatus} from './actions'


const MenuKeyName = {
    csye: "csye",
    custom : "custom",
    customInfo :"customInfo",   
    dlz: "dlz",
    dopz : "dopz",
    flb : "flb",
    fybg :"fybg",
    home : "home",
    km: "km",
    lrb: "lrb",
    mxz : "mxz",
    supplierInfo :"supplierInfo",
    xjllb: "xjllb",
    yfzk :"yfzk",
    yszk :"yszk",
    zcfzb : "zcfzb",
    ztInfo : "ztInfo",
    zz : "zz",
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
        url : ""
    }]

]);




export {menues,IMenueItem,MenuKeyName}