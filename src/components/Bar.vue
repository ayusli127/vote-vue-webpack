<template>
<h2>this is bar!! {{info}}</h2>
</template>
<script type="text/javascript">
	// console.log(router);
	export default {
		route: {
		  data: function (transition) {
		  	console.log("dada");
		    setTimeout(function () {
		      transition.next({
		       	info: 'data fetched!'
		      })
		    }, 1000)
		  }
		},
		data:function(){
			return {
				info:"hello world"
			}
		}

	}

</script>