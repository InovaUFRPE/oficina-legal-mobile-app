import {create} from 'apisauce'
import {getUserToken} from '../auth'

const api = create ({
    baseURL: 'http://localhost:6001'
})

api.addResponseTransform(Response =>{
    if(!Response) throw Response
})

api.addAsyncRequestTransform(request = async () => {
    const token = getUserToken();
    if (token) request.headers['Authorization'] = `Bearer ${token}`;
})

export default api;