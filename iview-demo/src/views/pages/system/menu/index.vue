<template>
  <system-menu-common :Service="Service" />
</template>

<script>
import SystemMenuCommon from '@vue-common/pages/iview/pages/system/menu/index.vue'
import {
  getAllMenus,
  addMenu,
  updateMenu,
  removeMenu,
  filterMenu
} from './service'
export default {
  name: 'SystemMenu',
  components: {
    SystemMenuCommon
  },
  data () {
    return {
      Service: {
        getAllMenus,
        addMenu,
        updateMenu,
        removeMenu,
        filterMenu
      }
    }
  }
}
</script>
