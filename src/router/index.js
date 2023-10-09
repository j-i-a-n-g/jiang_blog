import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/article',
    name: 'Article',
    component: () => import('@/views/Article.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/About.vue')
  },
  {
    path: '/message',
    name: 'Message',
    component: () => import('@/views/Message.vue')
  },
  {
    path: '/music',
    name: 'Music',
    component: () => import('@/views/Music/index.vue')
  },
  {
    path: '/onlineEdit',
    name: 'onlineEdit',
    component: () => import('@/views/OnlineEdit.vue')
  },
  {
    path: '/hanabi',
    name: 'Canvas',
    component: () => import('@/views/Canvas/index.vue')
  },
  {
    path: '/qrCode',
    name: 'Canvas',
    component: () => import('@/views/QrCode/index.vue')
  },
  {
    path: '/link',
    name: 'Link',
    component: () => import('@/views/Link.vue')
  },
  {
    path: '/admin',
    name: 'Admin',
    // beforeEnter: (to, from, next) => {
    //   let root = router.app.$store?.state.rootName
    //   if(root) {
    //     next()
    //   } else {
    //     next({path:'/'})
    //   }
    // },
    component: () => import('@/views/Admin.vue')
  },
  {
    path: '/userInformation',
    name: 'UserInformation',
    beforeEnter: (to, form, next) => {
      let id = router.app.$store?.state.userInfo._id
      if (id) {
        next()
      } else {
        next({ path: '/' })
      }
    },
    component: () => import('@c/HomeComponent/UserInformation.vue')
  },
  {
    path: '/article/:id',
    name: 'FullText',
    component: () => import('@/components/HomeComponent/FullText.vue')
  },
  {
    path: '/articleContent/:id',
    name: 'ArticleContent',
    component: () => import('@/components/HomeComponent/Root/ArticleContent.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
