import React, { Component } from 'react'
import './index.less'
import { Form, Icon, Input, Button, Card, message } from 'antd';

class Login extends Component {
    login = ()=>{
        // let value = this.props.form.getFieldsValue()
        this.props.form.validateFields((error,data)=>{
            // console.log(error,data)
            if(error) { // 前端验证有误
                message.error('账号错误，请重新输入',1)
            }else{  // 前端验证成功，调用Ajax接口
                // this.$axios.post(`/api/admin/user/login?user=${data.username}&psd=${data.password}`)
                this.$axios.post(`/api/admin/user/login?us=${data.us}&ps=${data.ps}`)
                .then((data)=>{
                    // console.log(data)
                    if(data.err === 0){
                        localStorage.setItem('token',data.token)
                        message.success('登录成功，1秒后跳转到首页！', 1, ()=>{
                            this.props.history.push('./admin/home')
                        })
                    }else{
                        message.error(data.msg)
                    }
                })
            }
        })
        // console.log(value)
    }
    render() {
        // console.log('登录页',this)
        const { getFieldDecorator } = this.props.form;
        return (
            <Card className='login'>
                <Form.Item>
                    {getFieldDecorator('us', {//username
                        rules: [
                            { required: true, message: '请输入您的账号~' },
                            { max: 12, message: '不能大于12个字符~' },
                            { min: 6, message: '不能小于6个字符~' }
                        ],
                    })(
                        <Input 
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            // placeholder="用户名: admin or user"
                            placeholder="Username"
                        />
                    )}
                </Form.Item>

                <Form.Item>
                    {getFieldDecorator('ps', {})(//password
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="密码: ant.design"
                            type="password"
                        />
                    )}
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-button" onClick={this.login}>
                        登录
                    </Button>
                </Form.Item>
          </Card>
        )
    }
}

export default Form.create()(Login);    // 高阶组件