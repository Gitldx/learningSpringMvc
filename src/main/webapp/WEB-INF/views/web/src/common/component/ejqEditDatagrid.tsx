/// <reference path="../../jqplugins/plugin.d.ts" />

import * as React from "react";


interface Iprops{
    columnConfigs : any,
    datasource : any,
    singlePropertyConfigs : any,
    eventHandlers:any,

}

export default class EjqEditDatagrid extends React.Component<Iprops>{

    private datagridRectXY:any;

    private tableElm:HTMLElement;

    private divElm:HTMLElement;

    public render(){
        return (
            <div ref = {el=>this.divElm = el}>
                <table className="easyui-datagrid" 
                data-options="singleSelect:true" style={{width:"100%",maxHeight:$(window).height() - 18}}
                ref={el => this.tableElm = el}/>
            </div>
        )
    }

    public componentDidMount(){

        
        this.renderTableElm();

        $(window).bind("click",this.winClick.bind(this));
    }

    public get TableElm(){
        return this.tableElm;
    }


    private renderTableElm(){
        
        $(()=>{
            $(this.tableElm).datagrid({
                ...this.dgConfig
            })
			$(this.tableElm).datagrid('enableCellEditing');
		});

        
    }


    private winClick(e:MouseEvent){
        
        this.datagridRectXY = $($(this.divElm).find("div.panel.datagrid.panel-htop").get(0)).find("div.datagrid-body")[1].getBoundingClientRect();

        
        const leftX = this.datagridRectXY.left;
        const leftY = this.datagridRectXY.top;
        const rightX = this.datagridRectXY.right;
        const rightY = this.datagridRectXY.bottom;

        const mouseX = e.clientX;
        const mouseY = e.clientY;

        const isInXY = mouseX > leftX && mouseY > leftY && mouseX < rightX && mouseY < rightY;
        // console.log(`leftx:${leftX},lefty:${leftY},rightx:${rightX},righty:${rightY},mousex:${mouseX},mouseY:${mouseY},isInXY:${isInXY}`)
        const $dg = $(this.tableElm);

        // const cell = $dg.datagrid("cell");
        

        if (!isInXY && $dg.datagrid("cell")) {
            console.log("!IsInXY")
            const cell = $dg.datagrid("cell");
            $dg.datagrid('endEdit', cell.index);

            $dg.trigger("onEndEdit",[cell.index,cell.field]);
        }
    }

    private get dgConfig() {
        return  {
            data:this.props.datasource,
            ...this.props.singlePropertyConfigs,
            columns : [this.props.columnConfigs],
            ...this.props.eventHandlers
        }
    }

    
}