import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
    withCredentials: true
})

// User APIs
export const insertUser = payload => api.post(`/user`, payload)
export const getAllUsers = () => api.get(`/user/users`)
export const updateUserById = (id, payload) => api.put(`/user/${id}`, payload)
export const deleteUserById = id => api.delete(`/user/${id}`)
export const getUserById = id => api.get(`/user/${id}`)

// Login APIs
export const login = payload => api.post(`/login`, payload)

// Order APIs
export const getAllOrders = () => api.get(`/order/orders`)
export const startPick = id => api.post(`/order/startpick/${id}`)
export const stopPick = id => api.post(`/order/stoppick/${id}`)
export const startPack = id => api.post(`/order/startpack/${id}`)
export const stopPack = id => api.post(`/order/stoppack/${id}`)
export const seedDatabase = () => api.post('/order/seed')

// Analytics APIs
export const getAnalytics = () => api.get('/analytics')

const apis = {
    insertUser,
    getAllUsers,
    updateUserById,
    deleteUserById,
    getUserById,
    login,
    getAllOrders,
    startPick,
    stopPick,
    startPack,
    stopPack,
    getAnalytics,
    seedDatabase
}

export default apis
