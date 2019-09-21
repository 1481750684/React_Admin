import React, {Component} from 'react'
import {Card,Button,message} from 'antd'
import './index.less'
import qs from 'qs'

class FoodUpdata extends Component {
    constructor(props) {
        super(props)
        this.state = props.record
        // console.log(props)
    }
    submit = () => {
        let {_id,name,desc,img,foodtype,price} = this.state
        let string = qs.stringify({_id,name,desc,img,foodtype,price})
        this.$axios.post('/api/admin/food/updata?',string)
        .then((data)=>{
            if(data.err === 0){
                this.props.refreshFun()
                message.success('修改成功')
            }
        })
    }
    upload = () => {    // 换图片
        let img = this.refs.file.files[0]
        // console.log(img)
        let formdata = new FormData()
        formdata.append('img',img)
        this.$axios.post('/api/admin/file/upload',formdata)
        .then((data)=>{
            // console.log(data)
            if(data.err === 0){
                this.setState({img:data.imgpath})
            }else{
                message.error('上传失败，请重试！')
            }
        })
    }
    render() {
        let {name,desc,img,foodtype,price} = this.state
        // console.log('更新组件',this)
        let rootPath = 'http://localhost:8080'
        return (
            <div className='updataModel'>
                <Card className='card'>
                <p>名称</p>
                <input type="text" value={name} onChange={(e)=>{
                    this.setState({name:e.target.value})
                }} />

                <p>描述</p>
                <input type="text" value={desc} onChange={(e)=>{
                    this.setState({desc:e.target.value})
                }} />

                <p>价格</p>
                <input type="number" value={price} onChange={(e)=>{
                    this.setState({price:e.target.value})
                }} />

                <p>类型</p>
                <select value={foodtype} onChange={(e)=>{
                    this.setState({foodtype:e.target.value})
                }}>
                    <option>热菜</option>
                    <option>凉菜</option>
                    <option>甜点</option>
                    <option>汤类</option>
                </select>

                <p>图片</p>
                <input type="file" ref='file' />
                <button onClick={this.upload}>上传图片</button>
                <p></p>
                <img src={rootPath+img} width='200' alt=""/>

                <p></p>
                <Button className='button' type='primary' onClick={this.submit}>提交</Button>
                </Card>
            </div>
        ) 
    }
}

export default FoodUpdata

/**
 * 1.模态框
 * 2.显示默认内容
 * 3.修改内容
 * 4.点击提交后
 *      a:关闭模态框
 *      b:刷新页面
 */