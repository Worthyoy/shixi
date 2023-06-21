import axios from 'axios'
import router from '../routers/index.js'

const HEADERS = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + sessionStorage.getItem('Authorization')
};
const http = axios.create({
    timeout: 3000,
    // 在利用http对象请求的路径前都会加上baseURL
    baseURL: 'http://43.138.12.254:9005/',
    // baseURL: 'http://172.16.113.158:5000',
    // baseURL: 'http://10.134.162.66:5000'
    headers: HEADERS
})

http.interceptors.request.use((req) => {
    // 这里代表请求前的操作
    console.log(123)
    let token = sessionStorage.getItem('Authorization')
    token && (req.headers.Authorization = `Bearer ${token}`)
    return req
})
http.interceptors.response.use((resp) => {
    // 这里代表响应前的操作
    if (resp.data.Authorization != undefined) {
        sessionStorage.setItem('token', resp.data.Authorization)
    }
    return resp
}, err => {
    let _resp = err.response
    switch (_resp.status) {
        case 401:
            sessionStorage.removeItem('Authorization')
                // sessionStorage.removeItem('user')
            router.push('/login')
            break
        default:
            console.log(_resp.data)
    }
    return Promise.reject(err)
})

export default http