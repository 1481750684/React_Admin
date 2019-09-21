import React,{Component} from 'react'
import {Card} from 'antd'
import Echarts from 'echarts'
import ReactEcharts from 'echarts-for-react';

class Line extends Component {
    constructor() {
        super()
        this.state = {
            option : {
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: [820, 932, 901, 934, 1290, 1330, 1320],
                    type: 'line',
                    areaStyle: {}
                }]
            }
        }
    }
    render() {
        return (
            <Card title='折线图'>
                <ReactEcharts option={this.state.option}>

                </ReactEcharts>
            </Card>
        )
    }
}

export default Line