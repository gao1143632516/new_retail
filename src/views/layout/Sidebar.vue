<template>
<div>
    <el-menu mode="vertical"  background-color="#324157" text-color="#bfcbd9" active-text-color="#1AA094" :unique-opened="true" :default-active="activeMenu" :collapse="isCollapse">
      <sidebar-item :menuList='menuList'></sidebar-item>
    </el-menu>

</div>
</template>


<script>
  import { mapGetters } from 'vuex';
  import SidebarItem from './SidebarItem';
  export default {
    components: { SidebarItem },
    computed: {
      ...mapGetters([
        'menuList',
        'sidebar'
      ]),
      isCollapse() {
        return !this.sidebar.opened
      },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      // if (meta.activeMenu) {
      //   return meta.activeMenu
      // }
      return path
    }


    }


  }


</script>
