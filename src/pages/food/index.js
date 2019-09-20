import React, { Component,Fragment } from 'react'
import {Card, Table, Button, Pagination, Spin, Popconfirm, message} from 'antd'
import qs from 'qs'
import './index.less'

class Food extends Component {
    constructor() {
        super()
        this.state = {
            dataSource: [],
            page: 1,
            pageSize: 4,
            total: 0,
            loading: true
        }
    }
    initData = (page,pageSize)=>{
        this.setState({loading: true})
        this.$axios.post('/api/admin/food/find',qs.stringify({page:page, pageSize:pageSize}))
        .then((data)=>{
            // console.log('获取数据',data)
            if(data.err === 0){
                this.setState({dataSource:data.list, total:data.count, loading:false})
            }
        })
    }
    pageChange = (page,pageSize)=>{
        // console.log('页码改变',page,pageSize)
        this.setState({page:page})
        this.initData(page,this.state.pageSize)
    }
    confirmDel = (id)=>{
        // console.log(id)
        let {page,pageSize} = this.state
        this.$axios.post('/api/admin/food/del',qs.stringify({_id:id}))
        .then((data)=>{
            if(data.err === 0){
                message.success('删除成功')
                this.initData(page,pageSize)
            }else{
                message.error('删除失败，请重试')
            }
        })
    }
    // cancelDel = ()=>{
    //     console.log('取消删除')
    // }
    componentDidMount() {
        let {page,pageSize} = this.state
        this.initData(page,pageSize)
    }
    columns = [
        {
            title: '图片',
            dataIndex: 'img',
            key: 'img',
           /*  fixed: 'left', */
            width: 150,
            render(data) {
                // console.log('图片',data)
                return (
                    <img width='70' src={data} alt=""/>
                )
            }
        },
        {
            title: '名称',
            dataIndex: 'name',
            key: 'name',
            /* fixed: 'left', */
            width: 150
        },
        {
            title: '描述',
            dataIndex: 'desc',
            key: 'desc',
            width: 150
        },
        {
            title: '类型',
            dataIndex: 'foodtype',
            key: 'foodtype',
            width: 150
        },
        {
            title: '价格',
            dataIndex: 'price',
            key: 'price',
            width: 150
        },
        {
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            /* fixed: 'right', */
            width: 150,
            render:(text,record)=>{
                // console.log(text,record)
                return (
                    <Fragment>
                        <Button type="primary" size='small'>修改</Button>
                        <Popconfirm // 气泡确认框
                            title="您确定要删除此项吗?"
                            onConfirm={this.confirmDel.bind(this,record._id)}
                            // onCancel={this.cancelDel}
                            okText="确定"
                            cancelText="取消"
                        >
                            <Button type="danger"  size='small' className='del'>删除</Button>
                        </Popconfirm>
                    </Fragment>
                )
            }
        },
      ];
    render() {
        let {total,pageSize,loading} = this.state
        return (
            <Card>
                <Spin tip='数据加载ing...' spinning={loading}>
                    <Table
                        dataSource = {this.state.dataSource}
                        columns = {this.columns}
                        scroll = {{y:426}}
                        pagination = {false}    // 干掉自带的分页器
                    />
                </Spin>
                <Pagination simple defaultCurrent={1} total={total} pageSize={pageSize} onChange={this.pageChange} />
            </Card>
        )
    }
}

export default Food