import { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login/index.vue'),
    meta: {
      title: '登录'
    }
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
        meta: {
          title: '考试须知'
        }
      },
      {
        path: 'exam',
        name: 'exam',
        component: () => import('@/Layout/Exam/index.vue'),
        meta: {
          title: 'AOPA理论考试系统'
        }
      },
      {
        path: 'theory',
        name: 'theory',
        component: () => import('@/Layout/Theory/index.vue'),
        meta: {
          title: 'AOPA理论考试系统'
        }
      }
    ]
  }
]

export default routes