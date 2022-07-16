export const setToken = (token) => {
    localStorage.setItem('TOKEN', token)
}
export const getToken = () => {
    // 别忘了返回值啊 大仙都给你托梦了 又白费一个小时
    return localStorage.getItem('TOKEN')
}
export const removeToken = () => {
    localStorage.removeItem('TOKEN')
}