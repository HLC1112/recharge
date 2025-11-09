<template>
	<IndexPage />
</template>

<script>
	export default {
		onLaunch: function() {
			console.log('App 已启动')
		},
		onShow: function() {
			console.log('App 已显示')
		},
		onHide: function() {
			console.log('App 已隐藏')
		}
	}
</script>
<style>
  html,
  body {
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: #000;
  }
  #app {
    height: 100vh;
    width: 100vw;
  }
</style>