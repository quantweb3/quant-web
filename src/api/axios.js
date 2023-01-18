import axios from 'axios';
import React,{Component} from 'react';
import Spinner from 'react-bootstrap/Spinner';
import {createRoot} from 'react-dom/client';

const Axios = axios.create({
    // baseURL: process.env.BASE_URL, // 设置请求的base url
    timeout: 1000000, // 设置超时时长
})

// 设置post请求头
Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

// 当前正在请求的数量
let requestCount = 0

// 显示loading
function showLoading() {


    let loadStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.75)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIindex: 9999,
    }






    if(requestCount === 0) {
        var dom = document.createElement('div')
        dom.setAttribute('id','loading')
        document.body.appendChild(dom)
        // createRoot(dom).render(<Spinner animation="border" role="status">
        //     <span className="visually-hidden"></span>
        // </Spinner>);

        createRoot(dom).render(<div style={loadStyle}>
            <Spinner animation="border" role="status">
                <span className="visually-hidden"></span>
            </Spinner>
        </div>);

    }
    requestCount++
}

// 隐藏loading
function hideLoading() {
    requestCount--
    if(requestCount === 0) {
        document.body.removeChild(document.getElementById('loading'))
    }
}

// 请求前拦截
Axios.interceptors.request.use(config => {
    // requestCount为0，才创建loading, 避免重复创建
    if(config.headers.isLoading !== false) {
        showLoading()
    }
    return config
},err => {
    // 判断当前请求是否设置了不显示Loading
    if(err.config.headers.isLoading !== false) {
        hideLoading()
    }
    return Promise.reject(err)
})

// 返回后拦截
Axios.interceptors.response.use(res => {
    // 判断当前请求是否设置了不显示Loading
    if(res.config.headers.isLoading !== false) {
        hideLoading()
    }
    return res
},err => {
    if(err.config.headers.isLoading !== false) {
        hideLoading()
    }

    return Promise.reject(err)
})

// 把组件引入，并定义成原型属性方便使用
Component.prototype.$axios = Axios

export default Axios