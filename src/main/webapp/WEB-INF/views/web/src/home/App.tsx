/// <reference path="../jqplugins/plugin.d.ts" />



import * as React from 'react';


import './style.css'; 
import ToolBar,{BtnActions,BtnsStatus} from './ToolBar'



import {Col,Icon,Layout,Menu } from 'antd';

import {SelectParam} from 'antd/lib/menu'

import {IMenueItem,menues,MenuKeyName as Mkn} from './constants'

interface IAppStates{
    collapsed:boolean,
    btnStatus: BtnsStatus,
    btnActions :BtnActions,
    activeTabKey : string
}

const { Header, Content, Sider } = Layout;

const SubMenu = Menu.SubMenu;


const HomePageTitle : string = menues.get(Mkn.home).title;


export default class App extends React.Component<{},IAppStates> {

    private tabs:HTMLElement;
    private defaultBtnActions :BtnActions = new BtnActions() ;
    private defaultBtnStatus : BtnsStatus = new BtnsStatus(
        {Visible:false},
        {Visible:false},
        {Visible:false},
        {Visible:false},
    );
    

    constructor(prop:{}) {

        super(prop);


        this.state = {
        activeTabKey : Mkn.home,
        btnActions : this.defaultBtnActions,
        btnStatus : this.defaultBtnStatus,
        collapsed: false,
        
        };

        
    }

    public componentDidMount(){
        $(this.tabs).tabs({
            onSelect : (tabTitle,tabIndex)=>{
                this.onTabActivated(tabTitle,tabIndex);
            }
        }
            
        );
        
    }




    

    public render() {

        
        
        
        const siderProps = {
            trigger:null,
            collapsible:true,
            collapsed:this.state.collapsed,
            // onCollapse:this.onCollapse
        }

        const toolBarProps ={
            actions : this.state.btnStatus, 
            activeTabKey : this.state.activeTabKey,
            btnActions : this.state.btnActions,
            
        }

        return (
            <Layout style={{ minHeight: '100vh' }} >
                <Sider {...siderProps} style={{ overflow: 'auto', height: '100vh'}}>
                    <div className="logo">小黎财务</div>
                    {this.renderMenus()}
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0}} >
                        <Col span={1}>
                            <Icon style={{fontSize: "20px"}}
                                className="trigger"
                                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                                onClick={this.toggle}
                            />
                        </Col>
                        <Col span={23}>
                            <ToolBar {...toolBarProps}/>
                        </Col>
                    </Header>
                    <Content id="mainContent" style={{ margin: '0',height: "100%" }}>
                        <div style={{ padding: 0, background: '#fff',height: "100%"  }}>
                            {this.renderTab()}        
                        </div>
                    </Content>
                    <div style={{ textAlign: 'center'}}>
                        小黎财务 ©2016 Created by 禅格科技
                    </div>
                    {/* <Footer style={{ textAlign: 'center'}} >
                        小黎财务 ©2016 Created by 禅格科技
                    </Footer> */}
                </Layout>
                {/* <Sider width={100}>s</Sider> */}
            </Layout>
            );
    }


    // public onCollapseChange=()=> {
    //     this.setState({
    //     collapsed: !this.state.collapsed
    //     })
    // }

    
    
    // public onCollapse = (collapsed:boolean) => {
    //     // console.log($(this.tabs).width());
    //     // console.log($("#mainContent").width());

    //     this.setState({ collapsed });
    // }


    private toggle = () => {

        // console.log($("#menuSider").width()) 

        this.setState({
          collapsed: !this.state.collapsed,
        });

        setTimeout(() => {
            // console.log($("#menuSider").width());
            $(this.tabs).tabs("resize");
        }, 300);
    }

    private activate = (param :SelectParam )=>{

        

        const {title,frameKey,url,btnsStatus} = menues.get(param.key);
        
        if(title === HomePageTitle) {
            $(this.tabs).tabs('select', title);
        }
        else{
            this.addTab(title,frameKey,url);
            this.bindingAction(frameKey);
        }

        // this.actions.Save.Visible=true;
        
        
        this.setState({
            activeTabKey : param.key,
            btnStatus :btnsStatus
        })
    }


    private onTabActivated(tabTitle : string,tabIndex:number){
        

        let tabItem : [string,IMenueItem];
        
        
        for(const item of Array.from(menues.entries())){
            if(item[1].title === tabTitle){
                tabItem = item;
            }
        }

        if(tabTitle !== HomePageTitle){
            const frameKey : string = tabItem[1].frameKey;
            this.bindingAction(frameKey);
            
        }
 
        this.setState({
            activeTabKey : tabItem[0],
            btnStatus : tabItem[1].btnsStatus
        })
    }

  
    private renderTab(){
        return  (
            
            <div ref={el => this.tabs = el}  data-options="tabPosition:'bottom'" className="easyui-tabs" style={{height:"100%"}}>
                <div title={HomePageTitle} style={{padding:"20px"}}>
                    首页
                </div>
                
            </div>
        )
    }

    private addTab(title,frameKey,url) {
        if ($(this.tabs).tabs('exists', title)) {
            $(this.tabs).tabs('select', title);
        } else {
            const content = `<iframe id="${frameKey}" frameborder="0" src="${url}" style="width:100%;height:99.0%"></iframe>`;
            
            $(this.tabs).tabs('add', {
                closable: true,
                content,
                title
            });
        }
    }


    private bindingAction(frameKey : string){
        this.defaultBtnActions.save = ()=>{
            ($("#" + frameKey)[0] as any).contentWindow.saveAction();
        }
        this.defaultBtnActions.add= ()=>{ 
            ($("#" + frameKey)[0] as any).contentWindow.addAction();
        }
        this.defaultBtnActions.query = (param)=>{
            ($("#" + frameKey)[0] as any).contentWindow.queryAction(param);
        }
        this.defaultBtnActions.delete = ()=>{
            ($("#" + frameKey)[0] as any).contentWindow.deleteAction();
        }
    }



    private renderMenus(){
        return (
            <Menu theme="dark" selectedKeys={[this.state.activeTabKey]} defaultSelectedKeys={[Mkn.home]} mode="inline" onSelect={this.activate}>

                <Menu.Item key={Mkn.home}>
                    <Icon type="home" />
                    <span>主页</span>
                </Menu.Item>
                <SubMenu key="settings" title={<span><Icon type="setting" /><span>设置</span></span>}>
                    <Menu.Item key={Mkn.ztInfo}>账套信息</Menu.Item>
                    <Menu.Item key={Mkn.km}>科目</Menu.Item>
                    <Menu.Item key={Mkn.csye}>初始余额</Menu.Item>
                </SubMenu>

                <SubMenu key="pz" title={<span><Icon type="credit-card" /><span>凭证</span></span>}>
                    <Menu.Item key={Mkn.dopz}>制凭证</Menu.Item>
                    <Menu.Item key={Mkn.flb}>分录簿</Menu.Item>
                    
                </SubMenu>

                <SubMenu key="zb" title={<span><Icon type="book" /><span>账簿</span></span>}>
                    <Menu.Item key={Mkn.zz}>总账</Menu.Item>
                    <Menu.Item key={Mkn.mxz}>明细账</Menu.Item>
                    <Menu.Item key={Mkn.dlz}>多栏账</Menu.Item>
                </SubMenu>

                <SubMenu key="report" title={<span><Icon type="solution" /><span>报表</span></span>}>
                    <Menu.Item key={Mkn.zcfzb}>资产负债表</Menu.Item>
                    <Menu.Item key={Mkn.lrb}>利润表</Menu.Item>
                    <Menu.Item key={Mkn.xjllb}>现金流量表</Menu.Item>
                    <Menu.Item key={Mkn.fybg}>费用报告</Menu.Item>
                    <Menu.Item key={Mkn.custom}>自定义</Menu.Item>
                </SubMenu>

                <SubMenu key="wl" title={<span><Icon type="swap" /><span>往来</span></span>}>
                    <SubMenu key="receivable" title={<span><Icon type="swap-left" /><span>应收</span></span>}>
                        <Menu.Item key={Mkn.customerInfo}>客户资料</Menu.Item>
                        <Menu.Item key={Mkn.yszk}>应收账款</Menu.Item>
                    </SubMenu>
                    <SubMenu key="payable" title={<span><Icon type="swap-right" /><span>应付</span></span>}>
                        <Menu.Item key={Mkn.supplierInfo}>供应商资料</Menu.Item>
                        <Menu.Item key={Mkn.yfzk}>应付账款</Menu.Item>
                    </SubMenu>
                </SubMenu>
            </Menu>
        );
    }

  
}





