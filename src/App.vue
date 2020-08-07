<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script>
  export default{
    name: 'APP'
  }
</script>

<style lang="scss">
   @import "../static/css/main.css";
   @import "../static/css/color-dark.css";     /*深色主题*/
  @import './styles/index.scss'; // 全局自定义的css样式
</style>
