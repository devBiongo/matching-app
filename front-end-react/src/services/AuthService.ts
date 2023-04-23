import axios from '../configs/api'

const AuthService = {
    doAuthentication: (username: string,password: string) => {
        const params = {
            username,
            password
        };
        return axios.post('/auth/login',params);
    },
    doRegister: (username: string,password: string) => {
        const params = {
            username,
            password
        };
        return axios.post('/auth/register',params);
    },
}

export default AuthService;






