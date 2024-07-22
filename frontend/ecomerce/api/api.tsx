import axios from 'axios';


const api = axios.create({
    baseURL:"http://10.0.0.248:5001"
    /*baseURL:https://fakestoreapi.com/products?limit=12 */
});

export default api; 