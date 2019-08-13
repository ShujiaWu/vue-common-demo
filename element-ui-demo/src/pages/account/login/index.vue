<template>
  <LoginCommonPage :login="login"/>
</template>

<script>
import LoginCommonPage from '@vue-common/pages/common/account/login'
import * as Service from './service'
export default {
  name: 'LoginPage',
  components: {
    LoginCommonPage
  },
  data () {
    return {
    }
  },
  methods: {
    login (data) {
      return Service.login(data)
    }
  }
}
</script>
