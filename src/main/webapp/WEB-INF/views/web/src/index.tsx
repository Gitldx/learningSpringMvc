import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './index.css';
// import registerServiceWorker from './registerServiceWorker';
import { unregister } from './registerServiceWorker';



ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);
// registerServiceWorker();

// function test(){
//   alert("call from outsidewindow");
// }

// declare let window:any;
// window.test = test;

// (window as any).test=test;

unregister();