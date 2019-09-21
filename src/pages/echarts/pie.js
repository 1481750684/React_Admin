import React,{Component} from 'react'
import {Card,Button} from 'antd'
import Echarts from 'echarts'
import ReactEcharts from 'echarts-for-react';

class Pie extends Component {
    constructor() {
        super()
        this.state = {
            option: {
                backgroundColor: '#2c343c',

                title: {
                    text: 'Customized Pie',
                    left: 'center',
                    top: 20,
                    textStyle: {
                        color: '#ccc'
                    }
                },
            
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
            
                visualMap: {
                    show: false,
                    min: 80,
                    max: 600,
                    inRange: {
                        colorLightness: [0, 1]
                    }
                },
                series : [
                    {
                        name:'访问来源',
                        type:'pie',
                        radius : '55%',
                        center: ['50%', '50%'],
                        data:[
                            {value:335, name:'直接访问'},
                            {value:310, name:'邮件营销'},
                            {value:274, name:'联盟广告'},
                            {value:235, name:'视频广告'},
                            {value:400, name:'搜索引擎'}
                        ].sort(function (a, b) { return a.value - b.value; }),
                        roseType: 'radius',
                        label: {
                            normal: {
                                textStyle: {
                                    color: 'rgba(255, 255, 255, 0.3)'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                lineStyle: {
                                    color: 'rgba(255, 255, 255, 0.3)'
                                },
                                smooth: 0.2,
                                length: 10,
                                length2: 20
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#c23531',
                                shadowBlur: 200,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        },
            
                        animationType: 'scale',
                        animationEasing: 'elasticOut',
                        animationDelay: function (idx) {
                            return Math.random() * 200;
                        }
                    }
                ]
            }
        }
    }
    updata = () => {
        /* 
        let newdata = {
            series : [
                {
                    data:[
                        {value:400, name:'直接访问'},
                        {value:235, name:'邮件营销'},
                        {value:274, name:'联盟广告'},
                        {value:310, name:'视频广告'},
                        {value:335, name:'搜索引擎'}
                    ].sort(function (a, b) { return a.value - b.value; })
                }
            ]
        }
        this.setState({option: newdata})
        */

        let options = JSON.parse(JSON.stringify(this.state.option)) // 不处理的话数据变 页面不变
        /**
         *  修改引用类型的值时，可能会导致原始值发生改变
         * 改变前的值和改变后的值相同，不会引起页面的更新
         */ 
        let newData = [
            {value:400, name:'直接访问'},
            {value:235, name:'邮件营销'},
            {value:274, name:'联盟广告'},
            {value:310, name:'视频广告'},
            {value:335, name:'搜索引擎'}
        ]
        options.series[0].data = newData
        // console.log(options)
        this.setState({option: options})
    }
    render() {
        return (
            <Card title='饼状图'>
                <ReactEcharts option={this.state.option}></ReactEcharts>
                <Button onClick={this.updata} type='primary'>更新数据</Button>
            </Card>
        )
    }
}

export default Pie