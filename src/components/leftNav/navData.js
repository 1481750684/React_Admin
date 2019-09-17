export default [
    {name:'首页', key:'0', icon:'home', path:'/admin/home'},
    /* {name:'商品管理', key:'1', icon:'shopping-cart', path:'/admin/food'}, */
    {name:'商品管理', key:'1', icon:'gift', path:'/admin/food'},
    {name:'广告管理', key:'2', icon:'sound', path:'/admin/banner'},
    {name:'购物车管理', key:'3', icon:'shopping-cart', path:'/admin/cart'},
    {name:'用户管理', key:'4', icon:'user', path:'/admin/user'},
    {name:'数据统计', key:'5', icon:'line-chart', path:'/admin/echarts', children: [
        {name:'饼状统计', key:'5-0', path:'/admin/echarts/pie'},
        {name:'折线统计', key:'5-1', path:'/admin/echarts/line'}
    ]}
    // {name:'商品管理', key:'1', icon:'shopping-cart', path:'/admin/food', children:[
    //     {name:'商品列表', key:'1-0', path:'/admin/food/list'},
    //     {name:'添加商品', key:'1-1', path:'/admin/food/add'},
    //     {name:'删除商品', key:'1-2', path:'/admin/food/del'},
    //     {name:'修改商品', key:'1-3', path:'/admin/food/set'}
    // ]},
    // {name:'用户管理', key:'2', icon:'user', path:'/admin/user', children:[
    //     {name:'用户列表', key:'2-0', path:'/admin/user/list'},
    //     {name:'添加用户', key:'2-1', path:'/admin/user/add'},
    //     {name:'删除用户', key:'2-2', path:'/admin/user/del'},
    //     {name:'修改用户', key:'2-3', path:'/admin/user/set'}
    // ]},
]