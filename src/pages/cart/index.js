import React,{Component} from 'react'
import {Card,Table,Button,Pagination,Spin,Popconfirm, message} from 'antd'
import qs from 'qs'

class Login extends Component{
    constructor(){
        super()
        this.state={
            dataSource:[],
            page:1,
            pageSize:3,
            total:0,
            loading:true,
           
        }
    }
    columns = [
        {
          title: '名称',
          dataIndex: 'name',
          key: 'name',
    
        
        },
        {
          title: '类型',
          dataIndex: 'foodtype',
          key: 'foodtype',
          
        },
        {
            title: '图片',
            dataIndex: 'img',
            key: 'img',
            render(data){
                // console.log('图片',data)
                return(<img width='150' height='80' src={data}/>)

            }
          },
        {
          title: '描述',
          dataIndex: 'desc',
          key: 'desc',
        },
        {
            title: '价格',
            dataIndex: 'price',
            key: 'price',
          },
          {
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            render:(text,record)=>{
                return(
                    <div>
    
                    <Button type="primary" Size='small'>修改</Button>
                    <Popconfirm 
                      title='确认要删除吗？'
                      onConfirm={this.confirmDel.bind(this,record._id)}
                    >
                    <Button type="danger" Size='small'>删除</Button>
                    </Popconfirm>
                    </div>

                )
            }
          },
      ];
      confirmDel=(id)=>{
        console.log(id)
        let {page,pageSize}=this.state
        this.$axios.post('/api/admin/food/del',qs.stringify({_id:id}))
        .then((data)=>{
          if(data.err==0){
            message.success('删除ok')
            this.initData(page,pageSize)
          }else{
            message.error('删除失败请重试')
          }
        })
      }
      pagechange=(page,pageSize)=>{
        console.log('页码改变',page,pageSize)
        this.setState({page:page})
        this.initData(page,this.state.pageSize)
      }
    initData=(page,pageSize)=>{
      this.setState({loading:true})
        this.$axios.post('/api/admin/food/findByTypePage',qs.stringify({page:page,pageSize:pageSize}))
        .then((data)=>{
          if(data.err==0){
              this.setState({dataSource:data.list,total:data.count,loading:false})
          }
            
        })
    }
    componentDidMount(){
      let {page,pageSize}=this.state
        this.initData(page,pageSize)
    }
    render(){
      let {total,pageSize,loading}=this.state
        return(
          <Card className="food-c">
            <Spin tip='数据加载中'
              spinning={loading}
            >
            
              <Table dataSource={this.state.dataSource} 
              columns={this.columns}
              scroll={{ y: 340 ,x:800}}
              pagination={false}
              />
              </Spin>
              <Pagination simple defaultCurrent={2} total={50} pageSize={pageSize} onChange={this.pagechange} />

          </Card>
        )
    }
}
export default Login