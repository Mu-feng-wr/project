import router from './router'
import store from '@/store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken, getUserId } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
import { getUserInfo } from '@/api/user.js'
NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  NProgress.start()
  document.title = getPageTitle(to.meta.title)
  const hasToken = getToken()
  if (hasToken) {
    console.log(store)
    getUserInfo({ id: getUserId() }).then(res => {
      store.commit('SET_USERID', getUserId())
      store.commit('SET_TOKEN', getToken())
      store.commit('SET_SEX', res.data.sex)
      store.commit('SET_TYPE', res.data.type)
      store.commit('SET_USER', res.data.user)
      store.commit('SET_USERNAME', res.data.userName)
    })
    if (to.path === '/login') {
      next({ path: '/' })
    } else if (to.path === '/') {
      next('/home')
    } else {
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login`)
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
