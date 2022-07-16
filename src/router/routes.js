export default [
    {
        path: '/home',
        component: () => import('@/pages/Home/Home'),
        meta: {
            show: true
        }
    },
    {
        // 指定params参数可传可不传
        path: '/search/:keyword?',
        // path: '/search/:keyword',
        component: () => import('@/pages/Search'),
        meta: {
            show: true
        },
        name: 'search',
    },
    {
        path: '/login',
        component: () => import('@/pages/Login'),
        meta: {
            show: false
        }
    },
    {
        path: '/register',
        component: () => import('@/pages/Register'),
        meta: {
            show: false
        }
    },
    {
        path: '/detail/:skuId?',
        component: () => import('@/pages/Detail'),
        meta: {
            show: true
        }
    },
    {
        path: '/addcartsuccess',
        name: 'addcartsuccess',
        component: () => import('@/pages/AddCartSuccess'),
        meta: {
            show: true
        }
    },
    {
        path: '/shopcart',
        component: () => import('@/pages/ShopCart'),
        meta: {
            show: true
        }
    },
    {
        path: '/trade',
        component: () => import('@/pages/Trade'),
        meta: {
            show: true
        },
        beforeEnter: (to, from, next) => {
            if (from.path == '/shopcart' || '/trade') {
                next()
            } else {
                next(false)
            }
        }
    },
    {
        path: '/pay',
        component: () => import('@/pages/Pay'),
        meta: {
            show: true
        },
        beforeEnter: (to, from, next) => {
            if (from.path == '/trade' || '/pay') {
                next()
            } else {
                next(false)
            }
        }
    },
    {
        path: '/paysuccess',
        component: () => import('@/pages/PaySuccess'),
        meta: {
            show: true
        }
    },
    {
        path: '/center',
        component: () => import('@/pages/Center'),
        meta: {
            show: true
        },
        children: [
            {
                path: 'myorder',
                component: () => import('@/pages/Center/myOrder')
            },
            {
                path: 'grouporder',
                component: () => import('@/pages/Center/groupOrder')
            },
            {
                path: '/center',
                redirect: '/center/myorder'
            }
        ]
    },
    // 重定向，在项目跑起来的时候，访问/，立马让它定向到首页
    {
        path: '*',
        redirect: '/home'
    }
]