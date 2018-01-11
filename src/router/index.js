import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/HomePage'
import PlayRoom from '@/components/PlayRoom'
import PlayerOneScreen from '@/components/PlayerOneScreen'
import PlayerTwoScreen from '@/components/PlayerTwoScreen'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/play/:id',
      name: 'PlayRoom',
      component: PlayRoom,
      props: true
    },
    {
      path: '/playerone/:roomId',
      name: 'PlayerOneScreen',
      component: PlayerOneScreen,
      props: true
    },
    {
      path: '/playertwo/:roomId',
      name: 'PlayerTwoScreen',
      component: PlayerTwoScreen,
      props: true
    }
  ]
})
