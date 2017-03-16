import Exam from '../Exam'

export default {
  mode: 'hash',
  routes: [
    {
      path: '/',
      redirect: '/0x00'
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

