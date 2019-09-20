import React,{Component} from 'react'
import {Card, Button, message} from 'antd'

class FoodAdd extends Component{
    submit = ()=>{
        let file = this.refs.file.files[0]  // 图片信息
        // console.log(file)
        let formData = new FormData()
        formData.append('img',file)
        let config = {
            headers:{'Content-Type':'multipart/form-data'}
        }
        this.$axios.post('/api/admin/file/upload',formData,config)
        .then((res)=>{
            console.log(res)
            message.success('上传成功')
        })
    }
    render() {
        return (
            <Card title='上传文件'>
                <input type="file" ref='file' />
                <p></p>
                <Button type='primary' onClick={this.submit}>提交</Button>
            </Card>
        )
    }
}

export default FoodAdd