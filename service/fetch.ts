import axios from 'axios'

const requestInstance = axios.create({
  baseURL: '/',
})

// 请求拦截器
requestInstance.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
)

// 响应拦截器
requestInstance.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      return response.data
    } else {
      return {
        code: -1,
        message: '未知错误',
        data: null,
      }
    }
  },
  (error) => Promise.reject(error)
)

export default requestInstance
