import axios from 'axios'
const api = axios.create({
  // baseURL: 'http://localhost:3331',
  baseURL: 'https://react-back-1ijyzwzzv-rafael-bassos-projects.vercel.app/',
  withCredentials: true,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  }
})
export default api
