import axios from 'axios'

export default () => {
    return axios.create({
        baseURL: 'http://localhost:8000',
        withCredentials: true         // ! to set cookies from request calls (allow)
    })
}
