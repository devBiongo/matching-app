import { AxiosRequestConfig, AxiosResponse } from "axios";
import { message } from 'antd';
import SessionStorage from '@/utils/SessionUtil';
import axios from "axios"

const api = axios.create({ baseURL: '/api', timeout: 10000 });

const requestInterceptor = (config: AxiosRequestConfig<any>) => {
    if (SessionStorage.get('event-token')) {
        (config.headers as any)['Authorization'] = SessionStorage.get('event-token');
    }
    return config;
}

const requestInterceptorCatch = () => {
    message.info("请求没能发出去,请联系管理员");
}

const responseInterceptor = (response: AxiosResponse<any, any>) => {
    if (response.data.code === 200) {
        return response.data;
    } else if (response.data.code === 1001) {
        SessionStorage.remove('event-token');
        message.error('令牌过期，请重新登录！');
        setTimeout(() => {
            window.location.reload();
        }, 1500);
        return;
    }
    message.error(response.data.msg);
    return;
}

const responseInterceptorCatch = () => {
    message.info("响应超时，请联系管理员");
}

api.interceptors.request.use(requestInterceptor, requestInterceptorCatch);
api.interceptors.response.use(responseInterceptor, responseInterceptorCatch);

export default api;