// 对于axios进行二次封装
import axios from 'axios'
// 引入进度条
import nProgress from 'nprogress'
// 引入进度条样式
import 'nprogress/nprogress.css'

const mockRequests = axios.create({
    baseURL: '/mock',
    timeout: 5000
})
mockRequests.interceptors.request.use((config) => {
    nProgress.start()
    return config
})
mockRequests.interceptors.response.use((res) => {
    nProgress.done()
    return res.data
}, (error) => {
    return Promise.reject(new Error('faile'))
})
export default mockRequests