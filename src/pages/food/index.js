import React, { Component,Fragment } from 'react'
import {Card,Table,Button} from 'antd'

class Food extends Component {
    constructor() {
        super()
        this.state = {
            dataSource: []
        }
    }
    initData = ()=>{
        this.$axios.post('/api/admin/food/find?page=1&pageSize=3')
        .then((data)=>{
            // console.log(data)
            if(data.err === 0){
                this.setState({dataSource:data.list})
            }
        })
    }
    componentDidMount() {
        this.initData()
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
                    <img width='70' src="http://img4.imgtn.bdimg.com/it/u=2298215949,193715893&fm=26&gp=0.jpg" alt=""/>
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
            render() {
                return (
                    <Fragment>
                        <Button type="primary" size='small'>修改</Button>
                        <Button type="danger"  size='small'>删除</Button>
                    </Fragment>
                )
            }
        },
      ];
    render() {
        return (
            <Card className='container'>
                <Table
                    dataSource = {this.state.dataSource}
                    columns = {this.columns}
                    scroll = {{y:426}}
                />
            </Card>
        )
    }
}

export default Food