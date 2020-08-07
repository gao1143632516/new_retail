<template>
	<div class='menu-wrapper'>
		<template v-for="menu in menuList" >
			<template v-if="!menu.hidden">
			
		  <template v-if="!menu.is_leaf">
			  	<el-submenu :index="menu.navigation_id+''"  :key="menu.navigation_id">
				<template slot="title">
					<!--<icon-svg v-if='menu.icon' :icon-class="menu.icon"></icon-svg><span>{{menu.navigation_name}}</span>-->
					<icon v-if='menu.icon' :name="menu.icon"></icon><span style="margin-left: 8px">{{menu.navigation_name}}</span>
				</template>
				<template v-for="nmenu in menu.list" >
					<template v-if="!nmenu.hidden" >
						
					<sidebar-item class='nest-menu' v-if='!nmenu.is_leaf &&nmenu.list.length>0' :menuList='[nmenu]' :key="nmenu.navigation_id">
					</sidebar-item>
					
					<router-link v-else :to="nmenu.page_path" :key='nmenu.navigation_id'>
						<el-menu-item :index="''+nmenu.page_path">
								<!--<icon-svg v-if='nmenu.icon' :icon-class="nmenu.icon"></icon-svg><span> {{nmenu.navigation_name}}</span>-->
							<icon v-if="nmenu.icon" :name="nmenu.icon"></icon><span style="margin-left:8px">{{nmenu.navigation_name}}</span>
						</el-menu-item>
					</router-link>
					</template>	
				</template>

			</el-submenu>	
		  </template>
		
			<router-link v-else :key="menu.navigation_id" :to="menu.page_path">
				<el-menu-item :index="''+menu.page_path"  class='submenu-title-noDropdown'>
					<icon-svg v-if='menu.icon' :icon-class="menu.icon"></icon-svg><span slot-scope="title">{{menu.navigation_name}}</span>
				</el-menu-item>
			</router-link>
			</template>	

		</template>

	</div>
</template>

<script>
  export default {
      name: 'SidebarItem',
      props: {
          menuList: {
              type: Array
          }
      }

  }

</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>

