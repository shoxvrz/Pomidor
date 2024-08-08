import axios from 'axios';

export const databaseOrders = axios.create({
    baseURL: 'https://66b482189f9169621ea33d7a.mockapi.io/orders'
})