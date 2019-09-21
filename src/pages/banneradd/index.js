import React, { Component } from 'react'
import {Card,Button, message} from 'antd'
import qs from 'qs'
class Banneradd extends Component {
    constructor(){
      super()
      this.state={name:'',imgPath:'',desc:'',position:''}  
    }
    submit=()=>{
        let {name,imgPath,desc,position}=this.state
        //console.log({name,imgPath,desc,position})
          if(imgPath!==''){
            //放ajax 请求接口信息
            let query=qs.stringify({name,imgPath,desc,position})
           // console.log(query)
            this.$axios.post('api/admin/banner/add',query)
            .then((data)=>{
                if(data.err==0){
                    this.setState({imgPath:data.imgPath})
                    message.success('add ok')
                }else{
                    message.error('文件上传失败，请重试')
                }
            })
        }else{
            message.error('请先上传图片')
        }    
    }
    upload=()=>{
        //方法一：把图片打成base64
        let file=this.refs.file.files[0]
            var r=new FileReader() //本地预览
            r.onload=()=>{  //图片的base64
                //console.log(r.result)   
                this.setState({imgPath:r.result})
            }
            r.readAsDataURL(file) //本地预览对象进行读取
          
        // let file=this.refs.file.files[0]
        // let formdata=new FormData()
        // formdata.append('hehe',file)
        // let config={
        //  headers:{'content-Type':'multipart/form-data'}   
        // }
        // this.$axios.post('/admin/file/upload',formdata,config)
        // .then((data)=>{
        //     if(data.err==0){
        //         message.success('add ok')
        //     }
        // })
    }
    render() {
        let {name,imgPath,desc,position}=this.state
        return (
            <Card title='广告图添加'>
                <span>名称：</span><input type='text' value={name} onChange={(e)=>{
                    this.setState({name:e.target.value})
                }}/><br/>

                <span>缩略：</span><input type='file' ref='file'/><br/>
                <img src={imgPath} width="150" height="100" alt=""/><br/>
                <button onClick={this.upload}>上传</button><br/>

                <span>描述：</span><input type='text' value={desc} onChange={(e)=>{
                    this.setState({desc:e.target.value})
                }}/><br/>
                <span>位置：</span><input type='text' value={position} onChange={(e)=>{
                    this.setState({position:e.target.value})
                }}/><br/>
                <Button type='primary' onClick={this.submit}>提交</Button>
            </Card>
        )
    }
}

export default Banneradd