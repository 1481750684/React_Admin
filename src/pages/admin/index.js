import React, { Component } from 'react'
import './index.less'

import LeftNav from 'components/leftNav'

class Admin extends Component {
    render() {
        return (
            <div className='admin'>
                <div className='admin-left'>
                    <LeftNav></LeftNav>
                </div>
                <div className='admin-right'>
                    <div className='admin-right-top'>后 台 管 理 系 统</div>
                    <div className='admin-right-middle'>
                        {this.props.children}
                    </div>
                    <div className='admin-right-bottom'>iPhone 11 Pro Max</div>
                </div>
            </div>
        )
    }
}

export default Admin