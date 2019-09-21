import React, { Component } from 'react'
import {Card,Table,Button,Pagination,Spin,Popconfirm, message} from 'antd'
import qs from 'qs'
 import './index.less'
import Bannerupdate from '../bannerupdate/index.js'
class Banner extends Component {
    constructor(){
        super()
        this.state={
            dataSource:[],
            page:1,
            pageSize:3,
            total:0,
            loading:true,
            updateShow:false, //修改模态框的显示
            record:{} //要修改的数据
        }
    }
    columns=[
      {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
       width:140,
       fixed:'left'
      },
       {
          title: '地址',
          dataIndex: 'imgPath',
          key: 'imgPath',
          width:200,
          fixed:'left',
          render(data){
            //console.log('image',data)
            return(
                <img width='120' height='80' src={data}/>
            )
        }
        },
          {
            title: '描述',
            dataIndex: 'desc',
            key: 'desc',
            width:360,
          },
          {
            title: '位置',
            dataIndex: 'position',
            key: 'position',
            width:260,
          },
          {
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            width:140,
            fixed:'right',
            render:(text,record)=>{
                //console.log('删除数据',text,record)
                return(
                    <div>
                        <Button type='primary' size='small' 
                        onClick={this.update.bind(this,record)}>修改</Button>
                        <Popconfirm
                        title='确定要删除吗？'
                        onConfirm={this.confirmDel.bind(this,record._id)}
                        >
                            <Button type='danger' size='small'>删除</Button>
                        </Popconfirm>
                    </div>
                )
            }
          }
    ]
    //修改函数
    update=(record)=>{
        console.log('修改数据',record)
        this.setState(
            {updateShow:!this.state.updateShow,
             record:record
            })
    }
    confirmDel=(_id)=>{
        console.log(_id)
        let query=qs.stringify({_id})
        let {page,pageSize}=this.state
        this.$axios.post('/api/admin/banner/del',query)
        .then((data)=>{
            if(data.err==0){
                message.success('删除成功')
                this.initData(page,pageSize)
            }else{
                message.error('删除失败，请重新尝试')
            }
        })
    }
    pageChange=(page,pageSize)=>{
        //console.log('页码改变',page,pageSize)
        this.setState({page:page})
        this.initData(page,this.state.pageSize)
    }
    initData=(page,pageSize)=>{
        this.setState({loading:true})
        //注意这里的接头暗号是 api
        let query=qs.stringify({page,pageSize})
        // this.$axios.post(`api/admin/banner/findByPage?page=${page}&pageSize=${pageSize}`)
        this.$axios.post('api/admin/banner/findByPage',query)
        .then((data)=>{
            console.log(data)
            if(data.err===0){
                // 渲染dataSource 为请求到的列表
                this.setState({
                    dataSource:data.list,
                    total:data.total,
                    loading:false
                })
            }
        })
    }
    refresh=()=>{
        //列表的刷新方法
        //1.关掉模态框
        
        this.setState({
            updateShow:false
        })
        //2.数据更新，刷新页面
        this.initData(this.state.page,this.state.pageSize)
    }
    componentDidMount(){
        let {page,pageSize}=this.state
        this.initData(page,pageSize)
    }
    render() {
        let {total,pageSize,loading,updateShow,record}=this.state
        return (
            <Card class='banner-container'>
                <Spin tip='数据加载中'
                spinning={loading}
                >
                    {/*Bannerupdate 组件传2个东西 record：要更改的数据 refreshfun：父组件的刷新方法*/}
                {!updateShow || <Bannerupdate record={record} refreshfun={this.refresh}></Bannerupdate>}
               <Table dataSource={this.state.dataSource} 
               columns={this.columns}
               className='test' 
               scroll={{x:1100}}
               pagination={false}
               />
               </Spin>
               <Pagination simple defaultCurrent={1} total={total} pageSize={pageSize} onChange={this.pageChange}/>
            </Card>
        )
    }
}

export default Banner