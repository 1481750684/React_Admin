import React,{Component} from 'react'
import {Card, Button,message} from 'antd'
import qs from 'qs'
import './index.less'
class FoodAdd   extends Component{
  constructor(){
    super()
    this.state={name:'',price:'',img:'',desc:'',foodtype:'北京现代'}
  }
  submit=()=>{
    let {name,price,img,desc,foodtype}=this.state
    console.log({name,price,img,desc,foodtype})

    
    if(img !==''){
      let query =qs.stringify({name,price,img,desc,foodtype})
      console.log(query)
      this.$axios.post('/api/admin/food/add',query)
      .then((data)=>{
        if(data.err==0){
          message.success('添加成功')
        }
      })
    }else{
      message.error('请先上传照片')
    }




    // let query =qs.stringify({name,price,img,desc,foodtype})
    // console.log(query)
    // this.$axios.post('/hehe/admin/food/add',query)
    // .then((data)=>{
    //   if(data.err==0){
    //     message.success('添加成功')
    //   }
    // })
    
  }
  upload=()=>{
    let file=this.refs.file.files[0]
    var r =new FileReader()
    r.onload=()=>{
      console.log(r.result);
      this.setState({img:r.result})
    }
    r.readAsDataURL(file)
  }
    render(){
      let {name,price,img,desc,foodtype}=this.state
        return(
        
           <Card title='商品添加'>
             名称：<input type="text" value={name} onChange={(e)=>{
               this.setState({name:e.target.value})
             }}/><br/>
              价格：<input type="text" value={price} onChange={(e)=>{
               this.setState({price:e.target.value})
             }}/><br/>

              图片：<input type="file" ref='file'/>
              <button onClick={this.upload}>上传</button>
              <img src={img} width='100' height='80' alt=''/>

             <br/>


              描述：<input type="text" value={desc} onChange={(e)=>{
               this.setState({desc:e.target.value})
             }}/><br/>
              类型：
              <select value={foodtype} onChange={(e)=>{
               this.setState({foodtype:e.target.value})
              }}>
               <option>北京现代</option>
               <option>SUV</option>
               <option>轿车</option>
               </select><br/>
             <Button type='primary' onClick={this.submit}>提交</Button>
           </Card>
        )
    }
}
export default FoodAdd 