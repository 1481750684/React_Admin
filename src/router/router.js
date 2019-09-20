import React, { Component } from 'react'
import { HashRouter,Route,Switch,Redirect } from 'react-router-dom'
import App from '../App';

import Login from 'pages/login'
import Admin from 'pages/admin'
import Food from 'pages/food'
import User from 'pages/user'
import Cart from 'pages/cart'
import Bannerlist from 'pages/banner'
import Banneradd from 'pages/banneradd'
import TokenModel from 'components/tokenModel'

class RootRouter extends Component {
    render() {
        return (
            <App>
                <HashRouter>
                    <TokenModel></TokenModel>
                    <Switch>
                        <Redirect exact from='/' to='/admin'></Redirect>
                        <Route path='/login' component={Login}></Route>
                        <Route path='/admin' render={()=>{
                            return (
                                <Admin>
                                    <Route path='/admin/food' component={Food}></Route>
                                    <Route path='/admin/user' component={User}></Route>
                                    <Route path='/admin/cart' component={Cart}></Route>
                                    <Route path='/admin/banner/list' component={Bannerlist}></Route>
                                    <Route path='/admin/banner/add' component={Banneradd}></Route>
                                </Admin>
                            )
                        }}></Route>
                    </Switch>
                </HashRouter>
            </App>
        )
    }
}

export default RootRouter