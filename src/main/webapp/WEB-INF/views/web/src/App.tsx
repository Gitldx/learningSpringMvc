// import * as React from 'react';
// import './App.css';

// import logo from './logo.svg';

// class App extends React.Component {
//   public render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h1 className="App-title">Welcome to React</h1>
//         </header>
//         <p className="App-intro">
//           To get started, edit <code>src/App.tsx</code> and save to reload.
//         </p>
//       </div>
//     );
//   }
// }

// export default App;




// import * as React from 'react';

// import Button from 'antd/lib/button';

// import './App.css';

// class App extends React.Component {
//   public render() {
//     return (
//       <div className="App">
//         <Button type="primary">Button</Button>
//       </div>
//     );
//   }
// }

// export default App;










/* import * as React from 'react';
import './App.css';
import logo from './logo.svg';
import MyCls from './MyCls';

class App extends React.Component<{},{}> {

  private m : MyCls;
  constructor(){
    super({});

    this.m = new MyCls("fd");
  }

  

  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.{this.m.str}
        </p>
      </div>
    );
  }
}

export default App;
 */






import * as React from 'react';

import './App.css';



import {Breadcrumb, Icon,Layout,Menu } from 'antd';

// import App1 from './App1'



const { Header, Content, Footer, Sider } = Layout;







const SubMenu = Menu.SubMenu;




class App extends React.Component<{},{collapsed:boolean}> {

  // private app1:App1;

  constructor(prop:{}) {

    super(prop);

    this.state = {

      collapsed: false
    };


    (window as any).saveAction=this.save;
    
  }

  public render() {
    
  const prop1 = {
    collapsed:this.state.collapsed,
    collapsible:true,
    
    onCollapse:this.onCollapse
  }    



    return (
      <Layout style={{ minHeight: '100vh' }} >
        <Sider
          // collapsible={true}
          // collapsed={this.state.collapsed}
          // onCollapse={this.onCollapse}
          {...prop1}
        >
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" onSelect={this.activate}>
            <Menu.Item key="1">
              <Icon type="pie-chart" />
              <span>Option 1</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="desktop" />
              <span>Option 2</span>
            </Menu.Item>
            <SubMenu
              key="sub1"
              title={<span><Icon type="user" /><span>User</span></span>}
            >
              <Menu.Item key="3">Tom</Menu.Item>
              <Menu.Item key="4">Bill</Menu.Item>
              <Menu.Item key="5">Alex</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={<span><Icon type="team" /><span>Team</span></span>}
            >
              <Menu.Item key="6">Team 1</Menu.Item>
              <Menu.Item key="8">Team 2</Menu.Item>
            </SubMenu>
            <Menu.Item key="9">
              <Icon type="file" />
              <span>File</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} >hgsldjfsdljggjeg</Header>
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              Bill is a cat.
              {/* <App1 ref={el=>this.app1 =  el}/> */}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2016 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    );
  }


  public onCollapseChange=()=> {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }


  public onCollapse = (collapsed:boolean) => {
    
    console.log(collapsed);

    this.setState({ collapsed });
  }

  private activate = (param :any )=>{
    // console.log("Tom clicked")
    // this.app1.select();
  }

  

  private save(){
    alert("App save");
  }

  
}



export default App;

