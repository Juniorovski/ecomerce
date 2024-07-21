import axios from 'axios';


const api = axios.create({
    baseURL:"https://backend-seven-sooty.vercel.app/"
    /*baseURL:https://fakestoreapi.com/products?limit=12 */
});

export default api; 