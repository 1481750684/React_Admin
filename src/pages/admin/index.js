import React, { Component } from 'react'
import './index.less'

class Admin extends Component {
    render() {
        return (
            <div className='admin'>
                <div className='admin-left'>左边</div>
                <div className='admin-right'>
                    <div className='admin-right-top'>上</div>
                    <div className='admin-right-middle'>
                        {this.props.children}
                    </div>
                    <div className='admin-right-bottom'>下</div>
                </div>
            </div>
        )
    }
}

export default Admin