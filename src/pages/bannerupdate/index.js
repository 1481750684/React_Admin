import React, { Component } from 'react'
import {Card,Button, message} from 'antd'
import qs from 'qs'
import './index.less'
class Bannerupdata extends Component {
    constructor(props){
      super(props)
      //props，由外部传过来  父到子的通信
       this.state=props.record
    }
    submit=()=>{
        let {_id,name,imgPath,desc,position}=this.state
        let query=qs.stringify({_id,name,imgPath,desc,position})
        this.$axios.post('/api/admin/banner/update',query)
       .then((data)=>{
        console.log(data)
        this.props.refreshfun()
       })
    }
    upload=()=>{
        //方法1：文件上传
    //     let file=this.refs.file.files[0]
    //     let formdata=new FormData()
    //     formdata.append('api',file)
    //    this.$axios.post('/api/admin/file/upload',formdata)
    //     .then((data)=>{
    //         console.log(data)
    //         if(data.err==0){
    //             this.setState({imgPath:data.imgPath})
    //         }
    //     })

        //方法2：base 64  的方法
        let file=this.refs.file.files[0]
            var r=new FileReader() //本地预览
            r.onload=()=>{  //图片的base64
                //console.log(r.result)   
                this.setState({imgPath:r.result})
            }
            r.readAsDataURL(file) 
    }
    render(){
        //文件上传，需要拼路径
        //let rootPath='http://localhost:8080'
        console.log(this,'更新组件')
        let {name,imgPath,desc,position}=this.state
        
        return(
            <div className='updateModel'>
                <Card className='card'>
                <span>名称：</span><input type="text" value={name} onChange={(e)=>{
                        this.setState({name:e.target.value})
                    }}/><br/>

                    
                    <span>缩略：</span><input type="file" ref='file'/><br/>
                    {/* 文件上传的路径 */}
                    {/* <img src={rootPath+imgPath} alt="" width="150" height="100" /><br/> */}
                    <img src={imgPath} alt="" width="150" height="100" /><br/>
                    <button onClick={this.upload}>上传</button><br/>

                    <span>描述：</span><input type="text" value={desc} onChange={(e)=>{
                        this.setState({desc:e.target.value})
                    }}/><br/>
                    <span>位置：</span><input type="text" value={position} onChange={(e)=>{
                        this.setState({position:e.target.value})
                    }}/><br/>
                    <button onClick={this.submit}>修改</button><br/>
                </Card>
            </div>
        )
    }
    
}

export default Bannerupdata