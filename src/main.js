import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Index from './components/Index'
import Bar from './components/Bar'
import Foo from './components/Foo'
Vue.config.debug = true;
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.http.options.emulateJSON = true;
var router = new VueRouter(); 
Vue.filter('timeFormat',function(value){
    var date =  new Date(value * 1000);
    return date.getFullYear()+'/'+ (date.getMonth()+1)+'/'+date.getDate();
});
router.map({
	'index/token/:token/wecha_id/:wecha_id/id/:id':{
		component:Index	
	},
	'foo':{
		component:Foo,
	},
	'bar':{
		component:Bar
	}

})
router.start(App,'app');
window.router = router;

