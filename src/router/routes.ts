import { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login/index.vue')
  },
  {
    path: '/layout',
    name: 'layout',
    component: () => import('@/Layout/index.vue'),
    redirect: '/layout/notice',
    children: [
      {
        path: 'notice',
        name: 'notice',
        component: () => import('@/Layout/Notice/index.vue'),
      },
      {
        path: 'exam',
        name: 'exam',
        component: () => import('@/Layout/Exam/index.vue'),
      },
      {
        path: 'theory',
        name: 'theory',
        component: () => import('@/Layout/Theory/index.vue'),
      }
    ]
  }
]

export default routes