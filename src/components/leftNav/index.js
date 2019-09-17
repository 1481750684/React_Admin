import React,{Component} from 'react'
import {Menu,Icon} from 'antd'
import {withRouter} from 'react-router-dom'

import navData from './navData'

const {SubMenu} = Menu

class LeftNav extends Component {
    constructor() {
        super()
        this.state = {
            data: []
        }
    }
    componentDidMount() {
        setTimeout(()=>{
            this.setState({data: navData})
        },200)
    }
    jump = (path)=>{
        this.props.history.push(path)
    }
    renderItem(arr) {   // 递归
        if(! arr.length) {return '暂无数据'}
        return arr.map((item)=>{
            if(item.children) { // 如果有children 是子级导航
                return (
                    <SubMenu
                        title={
                            <span>
                                <Icon type={item.icon} />
                                <span>{item.name}</span>
                            </span>
                        }
                    >
                       {this.renderItem(item.children)}
                    </SubMenu>
                )
            }else{
                return (
                    <Menu.Item key={item.key}  onClick={this.jump.bind(this,item.path)}>
                        <span>
                            <Icon type={item.icon} />
                            <span>{item.name}</span>
                        </span>
                    </Menu.Item>
                )
            }
        })
    }
    render() {
        return (
            <Menu mode="vertical" theme='dark'>
                {/* 如果有多级菜单，用递归循环渲染 */}
                {this.renderItem(this.state.data)} 

                {/* 如果只有两级：判断是否有children，没有的话是一级导航，有的话是二级导航 */}
                {/* {data.map((item)=>{
                    if(! item.children){   
                        return (
                            <Menu.Item key={item.key}>
                                <span>
                                    <Icon type={item.icon} />
                                    <span>{item.name}</span>
                                </span>
                            </Menu.Item>
                        )
                    }else{
                        return (
                            <SubMenu
                                title={
                                    <span>
                                        <Icon type={item.icon} />
                                        <span>{item.name}</span>
                                    </span>
                                }
                            >
                                {item.children.map((subItem)=>{
                                    return (
                                        <Menu.Item
                                            key={subItem.key} 
                                            style={{ textAlign: "center"}}
                                            onClick={this.jump.bind(this,subItem.path)}
                                        >
                                            {subItem.name}
                                        </Menu.Item>
                                    )
                                })}
                            </SubMenu>
                        )
                    }
                })} */}
            </Menu>
        )
    }
}

export default withRouter(LeftNav)