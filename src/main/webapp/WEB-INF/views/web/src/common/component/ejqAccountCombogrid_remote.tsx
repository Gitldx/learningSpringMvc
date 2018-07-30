/// <reference path="../../jqplugins/plugin.d.ts" />


import * as React from "react";

import { Button } from 'antd';

import { AccountList as AccList } from '../../account/accountList'

import EjqWindow from '../../common/component/ejqWindow'

import { AccountModel } from "../../account/AccountModel"

declare interface IProps {
    style: any,
    prompt: string
}

export default class EjqAccountCombogrid extends React.Component<IProps>{

    private comboElm: HTMLElement;
    private wrapper: HTMLElement;
    private btn: HTMLElement;
    private accListWindow: EjqWindow;
    private accList: AccList;
    private hasPopupAccountList: boolean = false;


    constructor(props: IProps) {
        super(props);

    }




    public render() {


        const accListWinOptions = {
            title: "科目",
            width: 600,
            height: 500,
            closed: true,
            resizable: false,
            minimizable: false,
            maximizable: false,
            modal: true,
            onBeforeClose: () => {
                this.closeedHandler();
            }
        }

        return (
            <div style={{ display: "inline-block", ...this.props.style }} ref={el => this.wrapper = el}>
                <span style={{ display: 'flex', alignItems: 'center',position:"relative" }}>
                    <select ref={el => this.comboElm = el} style={{
                        width: "-webkit-fill-available"
                    }} />
                    <span ref={el => this.btn = el} style={{ position : "absolute",display:"none"}}>
                        <Button size="small" onClick={this.test}>...</Button>
                    </span>

                </span>
                <EjqWindow ref={el => this.accListWindow = el} winOptions={accListWinOptions} showBtn={false}>
                    <AccList ref={el => this.accList = el} canEdit={false} dbClickAccountCallback={this.onAccListItemSelectHandler} />
                </EjqWindow>
            </div>
        )
    }

    public componentDidMount() {
        $(this.comboElm).combogrid({
            comboElm : this.comboElm,
            autoSelectFirst : true,
            panelWidth: 300,
            prompt: this.props.prompt,
            idField: 'id',
            // valueField:'id',
            textField: 'accountCode',
            // method : 'get',
            loader: this.myloader,
            url: '/account/filter',

            delay: 500,
            mode: 'remote',
            columns: [[
                { field: 'accountCode', title: '代码', width: 100 },
                { field: 'accountName', title: '名称', width: 200 },

            ]]
        });

        $(this.wrapper).hover(() => {
            $(this.btn).toggle();
        })

        const btnMarginRight = $(this.btn).prev("span.combo").find("span.textbox-addon-right:first-child").width();
        $(this.btn).css("right" , (btnMarginRight + 4) + "px");
    }

    public componentDidUpdate() {
        $(this.comboElm).next("span.combo").addClass("accComboFullWidth");
        
        setTimeout(() => {
            const width = $(this.btn).prev("span.combo").find("span.textbox-addon-right:first-child").width();
            $(this.btn).css("right" , (width + 4) + "px");
        }, 200);
        
    }

    get SelectId() {
        return $(this.comboElm).combobox("getValue");
    }

    get SelectCode() {
        return $(this.comboElm).combobox("getText")
    }

    private setComboValue(accListItem : AccountModel) {
        const dg = $(this.comboElm).combogrid('grid');
        dg.datagrid('reload', {
            q: accListItem.AccountCode,
            id: accListItem.Id
        });
    }


    private test = () => {
        // const dg = $(this.comboElm).combogrid('grid');
        // dg.datagrid('reload',{
        //     q: '100',
        //     id:9
        //   });
        if (this.hasPopupAccountList) { return; }

        this.hasPopupAccountList = true;


        if (!(window as any).accList) {
            $.get("/account/list").done(
                (responseJsonData) => {
                    (window as any).accList = responseJsonData;
                    this.accListWindow.show();
                }
            )
                .fail((err) => alert(err))

        }
        else {
            this.accListWindow.show();
        }



    }


    private myloader = (param, success, error) => {
        const q = param.q || '';
        if (q.length <= 2) { return };
        const thiscontext = this;
        $.ajax({
            type: 'get',
            url: '/account/filter',
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


    private closeedHandler = () => {
        this.hasPopupAccountList = false;
    }


    private onAccListItemSelectHandler = (acc: AccountModel) => {
        this.setComboValue(acc);
        this.accListWindow.close();
        

        // const [index,field] = [this.selectedIndex,KmColumnField];
        // $(this.tableElm).datagrid("editCell",{index,field});
        // const elm = $(this.tableElm).datagrid("getEditor",{index,field});

        // $(elm.target).focus().combogrid("setValue",acc.Id);
        // const item = $(this.tableElm).datagrid("getRows")[index] as VoucherEntryModel;
        // item.AccountCode = acc.AccountCode;
        // item.AccountName = acc.AccountName;
    }


}