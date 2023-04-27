import axios from 'axios'
import { BASE_URL, TIMEOUT } from './config'

class MyRequest {
  constructor(baseURL, timeout = 8000) {
    this.instance = axios.create({
      baseURL,
      timeout
    })
    this.instance.interceptors.request.use(
      (config) => {
        return config
      },
      (err) => {
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
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
}

export default new MyRequest(BASE_URL, TIMEOUT)
