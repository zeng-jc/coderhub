import axios from 'axios'
// hooks
import { authInfoClear } from '@/hooks/authInfo'
// arco-design
import { Message } from '@arco-design/web-vue'
// 路由
import router from '@/router'
import { BASE_URL, TIMEOUT } from './config'
class MyRequest {
  constructor(baseURL, timeout = 8000) {
    this.instance = axios.create({
      baseURL,
      timeout
    })
    this.instance.interceptors.request.use(
      (config) => {
        config.headers.Authorization = localStorage.getItem('token')
        return config
      },
      (err) => {
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        if (res.data.code === -1006 || res.data.msg === '无效token，请登录') {
          Message.error('登录已失效，请重新登录')
          router.push('/signin')
          authInfoClear()
        }
        return res
      },
      (err) => {
        return err
      }
    )
  }
  request(config) {
    return new Promise((resolve, reject) => {
      this.instance
        .request(config)
        .then((res) => {
          // 封装一层，可以从res.data获取返回的对象
          resolve(res.data)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
  post(config) {
    return this.request({ ...config, methods: 'post' })
  }
}

export default new MyRequest(BASE_URL, TIMEOUT)
