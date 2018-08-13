interface JQuery {
    datagrid(obj:{}):any;
    datagrid(method:string,param:{}):any;
    combogrid(str:string):any;
    combogrid(obj:{}):any;
    combogrid(method:string,param:{}):any;
    window(obj:{}):any;
    numberspinner(obj:{}):any;
    numberspinner(method:string,param:{}):any;
    datebox(obj:{}):any;
    datebox(method:string,param:{}):any;
    combobox(obj:{}):any;
    combobox(method:string,param:{}):any;
    linkbutton(obj:{}):any;
    linkbutton(method:string,param:{}):any;
    treegrid(obj:{}):any;
    treegrid(method:string,param:{}):any;
    tabs(obj?:{}):any;
    tabs(method:string,param:{}):any;
    textbox(obj:{}):any;
    textbox(method:string,param:{}):any;
    switchbutton(obj:{}):any;
    switchbutton(method:string,param:{}):any;
    form(method:string,param?:{}):any;
    

    popmenu():any;
    panel(obj:{}):any;

    jexcel(obj:{}) : any;
    jexcel(method : string,...param) : any;
}
