import Exam from '../Exam'

export default {
  mode: 'hash',
  routes: [
    {
      path: '/',
      redirect: '/0'
    },
    {
      path: '/:id',
      component: Exam
    },
    {
      path: '*',
      component: {
        template: '<div>404</div>'
      }
    }
  ]
}

