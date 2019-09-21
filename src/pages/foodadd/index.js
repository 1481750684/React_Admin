import React,{Component} from 'react'
import {Card, Button, message} from 'antd'
import qs from 'qs'
import './index.less'

class FoodAdd extends Component{
    constructor() {
        super()
        this.state = {
            name: '',
            desc: '',
            img: '',
            foodtype: '热菜',
            price: ''
        }
    }
    /* 
    upload = ()=>{  // Base64 上传
        let file = this.refs.file.files[0]
        let r = new FileReader() // 本地预览
        r.onload = ()=>{
            // console.log(r.result)    // 图片的base64
            this.setState({img:r.result})
        }
        r.readAsDataURL(file)    // 本地预览对象进行读取
    }
    */
    upload = ()=>{  // 文件上传
        let file = this.refs.file.files[0]
        let formdata = new FormData()
        
        formdata.append('img',file) // 将文件信息以img为key添加到formdata对象中
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

    submit = ()=>{
        let {name,desc,img,foodtype,price} = this.state
        // console.log({name,desc,foodtype,price,img})
        if(img === ''){
            message.error('请上传图片')
        }else{
            let query = qs.stringify({name,desc,img,foodtype,price})
            // console.log(query)
            this.$axios.post('/api/admin/food/add',query)
            .then((data)=>{
                // console.log('获取数据',data)
                if(data.err === 0){
                    message.success('添加成功')
                }
            })
        }
    }
    
    render() {
        let {name,desc,img,foodtype,price} = this.state
        let rootPath = 'http://localhost:8080'
        return (
            <Card className='add' title='添加商品'>
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
                <Button type='primary' onClick={this.submit}>提交</Button>
            </Card>
        )
    }
}

export default FoodAdd