export default [
    {name:'首页', key:'0', icon:'home', path:'/admin/home'},
    {name:'商品管理', key:'1', icon:'gift', path:'/admin/food', children:[
        {name:'商品列表', key:'1-0', path:'/admin/food/list'},
        {name:'商品添加', key:'1-1', path:'/admin/food/add'},
        {name:'上传文件', key:'1-2', path:'/admin/food/file'},
        {name:'上传Base64', key:'1-3', path:'/admin/food/base64'},
        {name:'上传antd', key:'1-4', path:'/admin/food/antd'}
    ]},
    {name:'广告管理', key:'2', icon:'sound', path:'/admin/banner',children:[
        {name:'广告列表', key:'2-0', path:'/admin/banner/list'},
        {name:'广告添加', key:'2-1', path:'/admin/banner/add'}
    ]},
    {name:'购物车管理', key:'3', icon:'shopping-cart', path:'/admin/cart',children:[
        {name:'商品列表',path:'/admin/cart/list',key:'3-0'},
        {name:'商品添加',path:'/admin/cart/add',key:'3-1'},
        {name:'商品删除',path:'/admin/cart/del',key:'3-3'},
    ]},
    {name:'用户管理', key:'4', icon:'user', path:'/admin/user'},
    {name:'数据统计', key:'5', icon:'line-chart', path:'/admin/echarts', children: [
        {name:'饼状统计', key:'5-0', path:'/admin/echarts/pie'},
        {name:'折线统计', key:'5-1', path:'/admin/echarts/line'}
    ]}
]