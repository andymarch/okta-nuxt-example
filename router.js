import Vue from 'vue'
import Router from 'vue-router'
import Auth from '@okta/okta-vue'

//these are only needed until default router can be merged.
import Login from './pages/login'
import Dash from './pages/dash'
import Protected from './pages/protected'

//register okta vue client
Vue.use(Auth, {
  issuer: process.env.VUE_APP_ISSUER,
  client_id: process.env.VUE_APP_CLIENT_ID,
  redirect_uri: process.env.VUE_APP_REDIRECT_URI,
  scope: process.env.VUE_APP_SCOPE
})

Vue.use(Router)

export function createRouter(ssrContext, createDefaultRouter) {
  var newRouter = new Router({
      mode: 'history',
      routes: [
        { path: '/implicit',component: Auth.handleCallback()},
        //TODO manually adding these routes for now
        //should be pulled from the default nuxt router
        { path: '/', component: Dash},
        { path: '/login', component: Login},
        { path: '/protected', component: Protected, meta: {requiresAuth: true}}
      ]
  })

  if(createDefaultRouter != null){
    //support the behaviour of discovering routes from the nuxt default router
    var defaultRouter = createDefaultRouter(ssrContext)
  }

  //implement the auth required check for pages tagged with requiresAuth
  const onAuthRequired = async (to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth) &&
     !(await Vue.prototype.$auth.isAuthenticated())) {
      // Navigate to custom login page
      next({ path: '/login' })
    } else {
      next()
    }
  }
  //enforce the behaviour of the the auth guard on each router call
  newRouter.beforeEach(onAuthRequired)

  return newRouter;
}