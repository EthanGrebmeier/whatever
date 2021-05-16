import axios from 'axios'

export default function refreshAccessToken(setAccessToken){
    axios.interceptors.response.use( response => {
        return response
    }, async error => {
        const originalRequest = error.config;
        console.log('test')
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            return axios.post('/api/tokens/refreshToken')
                .then(res => {
                    console.log(res)
                    if (res.status === 200) {
                        // 1) put token to LocalStorage
                        setAccessToken(res.data.accessToken);
     
                        // 2) Change Authorization header
                        axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.accessToken
                        originalRequest.headers['Authorization'] = 'Bearer ' + res.data.accessToken

                        console.log(axios.defaults.headers)
                        // 3) return originalRequest object with Axios.
                        return axios(originalRequest);
                    }
                })
        }
        return Promise.reject(error);
    })
}