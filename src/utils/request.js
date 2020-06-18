import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

const https = (url, method = 'POST', data = {}) => {
  return new Promise((resolve, reject) => {
    // create an axios instance
    const service = axios.create({
      baseURL: process.env.VUE_APP_BASE_ROOT, // url = base url + request url
      // withCredentials: true, // send cookies when cross-domain requests
      timeout: 5000 // request timeout
    })

    // request interceptor
    service.interceptors.request.use(
      config => {
        // do something before request is sent
        if (store.getters.token) {
          // let each request carry token
          // ['X-Token'] is a custom headers key
          // please modify it according to the actual situation
          config.headers['logintoken'] = getToken()
        }
        return config
      },
      error => {
        // do something with request error
        // console.log(error) // for debug
        return reject(error)
      }
    )

    // response interceptor
    service.interceptors.response.use(
      /**
       * If you want to get http information such as headers or status
       * Please return  response => response
      */

      /**
       * Determine the request status by custom code
       * Here is just an example
       * You can also judge the status by HTTP Status Code
       */
      response => {
        // response =  JSON.parse(response);
        const res = response.data
        // if the custom code is not 20000, it is judged as an error.
        if (res.code !== 20000) {
          Message({
            message: res.message || 'Error',
            type: 'error',
            duration: 2 * 1000
          })

          // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
          if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
            // to re-login
            MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
              confirmButtonText: 'Re-Login',
              cancelButtonText: 'Cancel',
              type: 'warning'
            }).then(() => {
              store.dispatch('user/resetToken').then(() => {
                return location.reload()
              })
            })
          }
          // 30000:字段错误或找不到
          // if(res.code === 30000){
          //   Message({
          //     message: res.message || 'Error',
          //     type: 'error',
          //     duration: 2 * 1000
          //   })
          // }
          return reject(new Error(res.message || 'Error'))
        } else {
          return resolve(res)
        }
      },
      error => {
        console.log('err' + error) // for debug
        Message({
          message: error.message,
          type: 'error',
          duration: 5 * 1000
        })
        return reject(error)
      }
    )
    console.log(data)
    if (method == 'POST') {
      service({
        url,
        method,
        data
      })
    } else {
      service({
        url,
        method,
        params: data
      })
    }
  })
  //
}

export default {
  get: (url, data) => https(url, 'GET', data),
  post: (url, data) => https(url, 'POST', data)
}
