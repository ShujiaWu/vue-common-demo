<template>
  <system-role-list-common :Service="Service" />
</template>

<script>
import SystemRoleListCommon from '@vue-common/pages/iview/pages/system/user/list/index.vue'
import { getList, deleteUser, setUserEnable } from './service'
export default {
  name: 'systemUserList',
  components: {
    SystemRoleListCommon
  },
  data () {
    return {
      Service: {
        getList,
        deleteUser,
        setUserEnable
      }
    }
  }
}
</script>
