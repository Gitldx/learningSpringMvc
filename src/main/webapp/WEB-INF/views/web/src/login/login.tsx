import * as React from 'react';


import { FormComponentProps } from 'antd/lib/form';

import {Button,  Checkbox, Form, Icon, Input } from 'antd';

import './index.css';

const FormItem = Form.Item;




class NormalLoginForm extends React.Component<FormComponentProps, any> {

  public handleSubmit = (e) => {
    e.preventDefault();
    
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        window.location.href="/home.html"
      }
      
    
    });
  }
  public render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: '请输入登录名!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名随便填" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码随便填" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            
            initialValue: true,
            valuePropName: 'checked',
          })(
            <Checkbox>记住我</Checkbox>
          )}
          <a className="login-form-forgot" href="">忘记密码</a>
          <Button type="primary" htmlType="submit" className="login-form-button">
            登录
          </Button>
          或 <a href="">注册!</a>
        </FormItem>
      </Form>
    );
  }
}

export const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

