/// <reference path="../jqplugins/plugin.d.ts" />



import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {AccountList} from './accountList';



ReactDOM.render(
    <AccountList canEdit={true}/>,
    document.getElementById('root') as HTMLElement
  );



