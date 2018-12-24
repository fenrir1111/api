/* eslint-disable */ 
import axios from 'axios'

const baseURL = 'http://blueapidir.tpaas.youedata.com/'
import { MessageBox } from 'element-ui'

const service = axios.create({
    baseURL:baseURL,
    timeout: 5000,
    crossDomain: true == !(document.all)
})
service.defaults.retry = 4;
service.defaults.retryDelay = 5000;

service.interceptors.request.use(config => {
    config.headers['content-type']='application/json; charset=UTF-8' 
    return config
}, error => {
    Promise.reject(error)
})

service.interceptors.response.use(
    response => {
        const res = response.data
        //登录异常或者未知错误
        if (res.code==110401||res.code==9999||res.code==7500||res.code==110302){
            var backoff = new Promise((resolve)=> {
                resolve();
            })
            let config=response.config
            config.__retryCount = config.__retryCount || 0;
            config.__retryCount += 1;
        
            var backoff = new Promise((resolve)=> {
                setTimeout(()=> {
                    resolve();
                }, config.retryDelay || 1);
            });
            return backoff.then(()=> {
                return service(response.config);
            });
        }else{
          
            return response.data
        }
                
    },err => {
        let config=err.config
        if(!config || !config.retry) {
            MessageBox.alert("网络超时",'提示',{
                type:'warning',
                confirmButtonText: '确定',
                callback: () => {
                }
            })
            return Promise.reject(err);
        }
        config.__retryCount = config.__retryCount || 0;
        if(config.__retryCount >= config.retry) {
            MessageBox.alert("网络超时",'提示',{
                type:'warning',
                confirmButtonText: '确定',
                callback: () => {
                }
            })
            return Promise.reject(err);
        }
        config.__retryCount += 1;
        
        var backoff = new Promise((resolve)=> {
            setTimeout(()=> {
                resolve();
            }, config.retryDelay || 1);
        });
        return backoff.then(()=> {
            return service(config);
        });
    }
)

export default service
