import * as React from 'react';
// import * as ReactDOM from 'react-dom';
import './App.css';
// import { DatePicker } from 'antd';

import MyCls from './MyCls';

import {Button,Tabs } from 'antd';






const TabPane = Tabs.TabPane;

export default class App1 extends React.Component<{},{panes:any,activeKey:any}> {

  private newTabIndex: number;

  constructor(prop:{}) {
    super(prop);

    this.newTabIndex = 0;
    const panes = [
      <TabPane tab="选项卡" key="1">选项卡一内容</TabPane>,
      <TabPane tab="选项卡" key="2">选项卡二内容</TabPane>,
    ];
    
    this.state = {
      activeKey: panes[0].key,
      panes,
    };
  }

  public add=()=> {
    const panes = this.state.panes;
    const activeKey = `newTab${this.newTabIndex++}`;
    panes.push(<TabPane tab="新建页签" key={activeKey}>新页面</TabPane>);
    this.setState({ panes, activeKey });
    }

    public remove = (targetKey:any) => {
    let activeKey = this.state.activeKey;
    const lastIndex = this.state.panes.findIndex((pane:any) => pane.key === targetKey) - 1;
    const panes = this.state.panes.filter((pane:any)  => pane.key !== targetKey);
    if (activeKey === targetKey) {
      activeKey = panes[lastIndex >= 0 ? lastIndex : 0].key;
    }
    this.setState({ panes, activeKey });
    }

    public select = ()=>{
      this.setState({activeKey : "2"});
    }

    public render() {
      return (
        <div>
          <div style={{ marginBottom: 16 }}>
          <Button type="ghost" onClick={this.select}>激活</Button>
          </div>
          <Tabs onChange={this.onChange} activeKey={this.state.activeKey}
            type="editable-card" onEdit={this.onEdit}>
            {this.state.panes}
          </Tabs>
        </div>
       );
 }


    private onChange = (activeKey:any) =>{
    this.setState({ activeKey });
    const m = new MyCls("ldx");
    alert(m.str);
    }

    private onEdit = (targetKey:any, action:any)=> {
      this[action](targetKey);
    }






}