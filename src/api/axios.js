//SETUP OF AXIOS
import axios from "axios"
const api=axios.create({
    baseURL:import.meta.env.VITE_BASE_URL,
    withCredentials:true
});

api.interceptors.response.use(
    (response)=> response,
    (error) => {
    if (error.response?.status === 401) {
      return Promise.resolve({ data: { success: false, user: null } });
    }
    return Promise.reject(error);
  }
)
export default api 