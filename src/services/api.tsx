import axios from 'axios'
const api = axios.create({
  // baseURL: 'http://localhost:3331',
  baseURL: 'https://react-backend-production-5c9e.up.railway.app/',
  timeout: 1000
})
export default api
