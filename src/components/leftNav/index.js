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
              {this.renderItem(this.state.data)} 
            </Menu>
        )
    }
}

export default withRouter(LeftNav)