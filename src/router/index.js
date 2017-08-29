import Vue from 'vue'
import Router from 'vue-router'
import List from '../components/List'
Vue.use(Router)

export default new Router({
	mode:'history',
  routes: [
    {
    	path:'/',
    	component: List
    }
  ]
})
