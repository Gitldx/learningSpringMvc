/// <reference path="../../jqplugins/plugin.d.ts" />


import * as React from "react";

import { Button } from 'antd';


declare interface IProps {
    style: any,
    prompt: string
}

export default class EjqCompanyCombogrid extends React.Component<IProps>{

    private comboElm: HTMLElement;
    private wrapper: HTMLElement;
    private btn: HTMLElement;


    constructor(props: IProps) {
        super(props);

    }




    public render() {


        return (
            <div style={{ display: "inline-block", ...this.props.style }} ref={el => this.wrapper = el}>
                <span style={{ display: 'flex', alignItems: 'center' }}>
                    <select ref={el => this.comboElm = el} style={{
                        width: "-webkit-fill-available"
                    }} />
                    <span ref={el => this.btn = el} style={{ display: 'none' }}>
                        <Button size="small" onClick={this.test}>...</Button>
                    </span>

                </span>
               
            </div>
        )
    }

    public componentDidMount() {
        $(this.comboElm).combogrid({
            
            panelWidth: 300,
            prompt: this.props.prompt,
            idField: 'id',
            // valueField:'id',
            textField: 'code',
            // method : 'get',
            loader: this.myloader,
            url: '/account/filterCompany',

            delay: 500,
            mode: 'remote',
            columns: [[
                { field: 'code', title: '公司代码', width: 100 },
                { field: 'name', title: '公司名称', width: 200 },

            ]]
        });

        $(this.wrapper).hover(() => {
            $(this.btn).toggle();
        })
    }

    public componentDidUpdate() {
        $(this.comboElm).next("span.combo").addClass("accComboFullWidth");
    }

    get SelectId() {
        return $(this.comboElm).combobox("getValue");
    }

    get SelectCode() {
        return $(this.comboElm).combobox("getText")
    }




    private test = () => {
        // const dg = $(this.comboElm).combogrid('grid');
        // dg.datagrid('reload',{
        //     q: '100',
        //     id:9
        //   });
        

    }


    private myloader = (param, success, error) => {
        const q = param.q || '';
        if (q.length <= 1) { return };
        const thiscontext = this;
        $.ajax({
            type: 'get',
            url: '/account/filterCompany',
            dataType: 'json',
            data: {
                q
            },
            success: (data) => {

                success(data);
                if (param.id) {
                    $(this.comboElm).combogrid("setValue", param.id);
                }

            },
            error() {
                error.apply(thiscontext, arguments);

            }
        });


    }



}