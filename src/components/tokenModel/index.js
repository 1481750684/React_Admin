import React,{Component,Fragment} from 'react'
import {Card} from 'antd'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import './index.less'
import ActionCreator from '../../store/actionCreator'
import {bindActionCreators} from 'redux'

class TokenModel extends Component {
    back = ()=>{
        // this.props.test()
        this.props.changeModelState()   // 隐藏模态框
        this.props.history.push('/login')   // 跳转到登录页
    }
    render(){
        // console.log(this)
        return (
            <Fragment>
                {!this.props.modelState || 
                    <div className="tokenModel">
                        <Card className='card'>
                            <h2>token缺失，请重新登录</h2>
                            <button onClick={this.back}>返回登录</button>
                        </Card>
                    </div>
                }
            </Fragment>
        )
    }
}

// export default connect(state=>state,(dispatch)=>{
//     return {
//         test() {
//             dispatch(ActionCreator.changeModelState())
//         }
//     }
// })(TokenModel)

let newComponent = withRouter(TokenModel)
export default connect(state=>state,(dispatch)=>{
    return bindActionCreators(ActionCreator,dispatch)
})(newComponent)
