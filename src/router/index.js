import Vue from 'vue'
import Router from 'vue-router'
import Pos from '@/components/pages/Pos'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      redirect:'/Pos'
    },
    {
      path:'/Pos',
      component:Pos
    }
  ]
})
