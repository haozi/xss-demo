import Home from '../Home'

export default {
  mode: 'hash',
  routes: [
    {
      path: '/',
      redirect: '/exam/0'
    },
    {
      path: '/exam/:id',
      component: Home
    },
    {
      path: '*',
      component: {
        template: '<div>404</div>'
      }
    }
  ]
}

