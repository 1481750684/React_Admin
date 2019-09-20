import React,{Component} from 'react'
import {Card, Button} from 'antd'

class FoodAdd extends Component{
    constructor() {
        super()
        this.state = {
            imgPath: ''
        }
    }
    submit = ()=>{
       let file = this.refs.file.files[0]
       let r = new FileReader() // 本地预览
       r.onload = ()=>{
        //    console.log(r.result)    // 图片的base64
           this.setState({imgPath:r.result})
       }
       r.readAsDataURL(file)    // 本地预览对象进行读取
    }
    render() {
        return (
            <Card title='上传Base64'>
                <input type="file" ref='file' />
                <p></p>
                <img src={this.state.imgPath} width='200' alt=""/>
                <p></p>
                <Button type='primary' onClick={this.submit}>提交</Button>
            </Card>
        )
    }
}

export default FoodAdd