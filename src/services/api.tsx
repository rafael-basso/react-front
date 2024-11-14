import axios from 'axios'
const api = axios.create({
  // baseURL: 'http://localhost:3331',
  baseURL: 'https://react-back-end-gamma.vercel.app/'  
})
export default api
