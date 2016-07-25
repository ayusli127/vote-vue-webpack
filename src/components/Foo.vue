<template>
<h2>this is Foo</h2>
</template>
<script type="text/javascript">
	export default{
		route:{
			data(){
				console.log(this.$route.token);
			}
		}
		
	}
</script>