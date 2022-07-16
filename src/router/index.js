import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import routes from './routes'
import store from '@/store'

// 先把VueRouter原型对象的push 保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;

// 重写push|replace
// 第一个参数：告诉原来push方法，你往哪里跳(传递哪些参数)
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject);
    } else {
        originPush.call(this, location, () => { }, () => { });
    }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject);
    } else {
        originReplace.call(this, location, () => { }, () => { });
    }
}


let router = new VueRouter({
    routes,
    // 滚动行为
    scrollBehavior(to, from, savedPosition) {
        return { y: 0 }
    }
})

// 全局守卫 前置路由守卫
router.beforeEach(async (to, from, next) => {
    let token = store.state.user.token
    let name = store.state.user.userInfo.name
    // 如果用户已经登录
    if (token) {
        // 登录后还想去登录页或注册页 给打回去首页
        if (to.path == '/login' || to.path == '/register') {
            next('/home')
        } else { //如果去的不是登录页
            // 如果已有用户名 即有用户信息
            if (name) {
                next()
            } else {
                // 没有用户信息 派发action让仓库存储用户信息再跳转
                try {
                    await store.dispatch("getUserInfo");
                    next()
                } catch (error) {  //用户信息过期 清除用户信息 返回登录页 重新登陆
                    await store.dispatch("userLogout");
                    next('/login')
                }
            }
        }
    } else {  // 游客身份 未登录
        let toPath = to.path
        if (toPath.indexOf('/pay') != -1 || toPath.indexOf('/shopcart') != -1 || toPath.indexOf('/addcartsuccess') != -1 || toPath.indexOf('/trade') != -1 || toPath.indexOf('/center') != -1) {
            next('/login?redirect=' + toPath)
        } else {
            next()
        }
    }
})
export default router