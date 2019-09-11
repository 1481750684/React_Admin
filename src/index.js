import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App';
import RootRouter from 'router/router';
import * as serviceWorker from './serviceWorker';
// import 'antd/dist/antd.css' // 全局引入antd的全局样式文件
import axios from 'utils/axios.js'

React.Component.prototype.$axios = axios

// ReactDOM.render(<App>你好，世界</App>, document.getElementById('root'));
ReactDOM.render(<RootRouter></RootRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
