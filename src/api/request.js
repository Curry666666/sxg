// 对于axios进行二次封装
import axios from 'axios'
// 引入进度条
import nProgress from 'nprogress'
import store from '@/store'
// 引入进度条样式
import 'nprogress/nprogress.css'

const requests = axios.create({
    baseURL: '/api',
    timeout: 5000
})
requests.interceptors.request.use((config) => {
    if (store.state.detail.uuid_token) {
        config.headers.userTempId = store.state.detail.uuid_token
    }
    if (store.state.user.token) {
        config.headers.token = store.state.user.token
    }
    nProgress.start()
    return config
})
requests.interceptors.response.use((res) => {
    nProgress.done()
    return res.data
}, (error) => {
    return Promise.reject(new Error('faile'))
})
export default requests