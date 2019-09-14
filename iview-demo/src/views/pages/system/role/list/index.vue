<template>
  <system-role-list-common :Service="Service" />
</template>

<script>
import SystemRoleListCommon from '@vue-common/pages/iview/pages/system/role/list/index.vue'
import { getList, deleteRole } from './service'
export default {
  name: 'systemRoleList',
  components: {
    SystemRoleListCommon
  },
  data () {
    return {
      Service: {
        getList,
        deleteRole
      }
    }
  }
}
</script>
