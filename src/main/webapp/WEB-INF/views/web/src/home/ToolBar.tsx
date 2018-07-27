/// <reference path="../jqplugins/plugin.d.ts" />

import * as React from 'react';


import { Button,Col,Dropdown,Icon, Menu,Row } from 'antd';
import {BtnsStatus} from './actions';
import QueryMxz from './queryComponent/queryMxz'
import QueryPZ from './queryComponent/queryPZ'

import IQueryParameter from './queryComponent/queryParameter'

import {MenuKeyName as Mkn} from './constants'

// import {getNavType} from '../common/util/navigatorInspector'

const ButtonGroup = Button.Group;




export {BtnsStatus};

export class BtnActions{
  public save : ()=>any;
  public add : ()=>any;
  public delete : ()=>any;
  public query : (param : any)=>any;
}

interface Iprops {actions : BtnsStatus,btnActions : BtnActions,activeTabKey : string}

interface IStates{queryOpen : boolean}

export default class ToolBar extends React.Component<Iprops,IStates>{

  private queryBtn : Button ;
  private popupCtrl : HTMLElement;
  private queryCtrl : HTMLElement;

  private queryComponent : IQueryParameter


  constructor(props : Iprops){
    super(props);
    this.state = {queryOpen : false};

    // alert(getNavType())
  }

  public render(){


    const iconStyle ={marginRight:"5px",color : "#1890ff"}
    const menu = (
      <Menu>
        <Menu.Item key="1"><Icon type="dashboard" style={iconStyle}/><span>参数设置</span></Menu.Item>
        <Menu.Item key="2"><Icon type="eye" style={iconStyle}/>操作日志</Menu.Item>
        <Menu.Item key="3"><Icon type="question-circle" style={iconStyle}/>帮助</Menu.Item>
      </Menu>
    );

    const userMenu = (
      <Menu>
      <Menu.Item key="1"><Icon type="info-circle" style={iconStyle}/>用户信息</Menu.Item>
      <Menu.Item key="2"><Icon type="logout" style={iconStyle}/>退出</Menu.Item>
      </Menu>
    );




    const saveBtn = this.props.actions.Save.Visible ? <Button disabled={this.props.actions.Save.Disable} onClick={this.props.btnActions.save}><Icon type="save" />保存</Button> : null;
    const addBtn = this.props.actions.Add.Visible ? <Button onClick={this.props.btnActions.add}><Icon type="edit" />新建 </Button> : null;
    const deleteBtn = this.props.actions.Delete.Visible ? <Button onClick={this.props.btnActions.delete}><Icon type="delete" />删除 </Button> : null;
    const searchBtn = this.props.actions.Query.Visible ? this.queryPopupControl(): null;

    return (
      
      <React.Fragment>
         <Row>
            <Col span={16}>
              <ButtonGroup  style={{marginLeft:"2px"}}>
                {addBtn}
                {saveBtn}
                {deleteBtn}
                {searchBtn}
              </ButtonGroup>

              {/* <ButtonGroup style={{marginLeft:"10px"}}>
                <Button  icon="cloud" />
                <Button  icon="cloud-download" />
              </ButtonGroup> */}
            </Col>
            <Col span={5} offset={3} style={{textAlign:"right"}}>
              
                <Dropdown overlay={menu} placement="bottomRight">
                  <a className="ant-dropdown-link" href="#" style={{marginRight:"10px"}}>
                    <Icon type="tool" style={{marginRight:"2px"}}/> 系统 
                  </a>
                </Dropdown>
                <Dropdown overlay={userMenu} placement="bottomLeft">
                  <a className="ant-dropdown-link" href="#"  style={{marginRight:"2px"}}>
                  <Icon type="user" style={{marginRight:"2px"}}/> 用户 
                  </a>
                 
                </Dropdown>
             
             
              
            </Col>
        </Row>

      </React.Fragment>


      
    );

  }


  public shouldComponentUpdate(nextProps:Iprops, nextState: IStates) {
    
    return !(this.props.activeTabKey === nextProps.activeTabKey && this.state.queryOpen === nextState.queryOpen);
  }





  public componentDidUpdate(){
    
    $(this.popupCtrl).unbind("click");

    this.setPopupQuery();

    setTimeout(() => {
      const isOpen = !$(this.queryCtrl).is(":hidden");
      if(this.state.queryOpen !== isOpen){
        this.setState({queryOpen : isOpen});
      }
    }, 100);
  }


 

  private setPopupQuery(){
    const settings = {
      'background': "#fafafa",
      'borderRadius': '10px',
      'controller': true,  
      'focusColor': '#1abc9c',
      'iconSize': '100px',
      'left': $(this.popupCtrl).prev("button").width() * 2,
      'top': $(this.popupCtrl).prev("button").height() * -1/2,
      'width': '400px',
    };
    let tempdisplay :string;
    if (settings.controller === true) {
      tempdisplay = 'none';
    } else {
      tempdisplay = 'block';
    }
    

    const tarBody = $(this.queryCtrl); // tar.next('div#queryCtrl');

    const tarCtrl = $(this.popupCtrl) // $('#popupCtrl');
  
    
    tarBody.css({
      'background': settings.background,
      'border-radius': settings.borderRadius,
      'box-shadow': '5px 5px 5px grey',
      'display': tempdisplay,
      
      'float': 'left',
      'margin-left': -settings.left,
      'margin-top': -settings.top,
      'padding': '15px',
      'position': 'absolute',
      
      'width': settings.width,
    });

    tarCtrl.click( (e)=> {

      if($(e.target).is("#queryCtrl") || $(e.target).parents("#queryCtrl").length>0){return;}

      e.preventDefault();
      const toggleFunc = this.toggleQueryFunc();
      this.setState({queryOpen : !this.state.queryOpen},
        ()=>toggleFunc() 
      )


    });
  }


  private query=()=>{
    console.log(this.queryComponent.qparams());
    this.props.btnActions.query(this.queryComponent.qparams());

  }

  private toggleQueryFunc(){
    const tarBody = $(this.queryCtrl);
    if(this.state.queryOpen){
      return ()=>tarBody.hide('fast');
    }
    else
    {
      return ()=>tarBody.show('fast');
    }
  }


  private queryCancel =()=>{
    
    const toggleFunc = this.toggleQueryFunc();
    this.setState({queryOpen : !this.state.queryOpen},
        ()=>toggleFunc()
      )
  }

 

  private qBtnClick =()=>{
    $(this.popupCtrl).trigger("click")
  }

private queryPopupControl(){

  // const c = this.isFirefox() ?
  // <Popover content={this.q_component()} trigger="click" visible={this.state.popupvisible} onVisibleChange={this.handleVisibleChange}>
  //     <Button ref={el=>this.queryBtn = el} >
  //       <Icon type="search" />查询
  //     </Button> 
  //   </Popover>
  // :
  const c = 
  <React.Fragment>
    <Button ref={el=>this.queryBtn = el} onClick={this.qBtnClick}>
        查询<Icon type={this.state.queryOpen ? "up" : "down"} style={{marginLeft:"8px"}}/>
    </Button> 
    <div id="popupCtrl" ref={el=>this.popupCtrl = el} style={{display:"inline-block"}}>
      
      <div id="queryCtrl" ref = {el=>this.queryCtrl = el}>
          {this.q_component()}
      </div>
    </div>
  </React.Fragment>;

  return c;
}




  private q_component(){

    switch(this.props.activeTabKey){
      case Mkn.home:
        break;
      case Mkn.ztInfo :
        return <QueryMxz ref={el=>this.queryComponent = el} queryCallBack = {this.query} cancelCallBack = {this.queryCancel}/>;
      case Mkn.km :
        return <QueryPZ ref={el=>this.queryComponent = el} queryCallBack = {this.query} cancelCallBack = {this.queryCancel}/>;
      case Mkn.dopz :
        return <QueryPZ ref={el=>this.queryComponent = el} queryCallBack = {this.query} cancelCallBack = {this.queryCancel}/>;
      case Mkn.mxz :
        return <QueryMxz ref={el=>this.queryComponent = el} queryCallBack = {this.query} cancelCallBack = {this.queryCancel}/>;
    }
    return null;
  }

}

