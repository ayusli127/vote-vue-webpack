<template>
	<h1>{{msg}}</h1>
	<a v-link="{path:'foo'}">Foo</a>
	<a v-link="{path:'bar'}">Bar</a>
	<router-view></router-view>
</template>
<script type="text/javascript">
	// console.log(router);
	export default {
		route: {
		  data: function (transition) {
		  	console.log("dada");
		    setTimeout(function () {
		      transition.next({
		        msg: 'data fetched!'
		      })
		    }, 1000)
		  }
		},
		data:function(){
			return {
				msg:"hello world"
			}
		}

	}

</script>