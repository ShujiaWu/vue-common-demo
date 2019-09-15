<template>
  <div class="login"
       @keydown.enter="login">
    <div class="login-content">
      <Card :bordered="false">
        <p slot="title">
          <Icon type="ios-log-in"></Icon>
          登录
        </p>
        <div class="form-content clear-fix">
          <Form ref="form"
                :model="form.data"
                :rules="form.rule">
            <FormItem prop="user">
              <i-input v-model="form.data.user"
                       :placeholder="form.placeholder.user"
                       :maxlength="11">
                <span slot="prepend">
                  <Icon :size="16"
                        type="ios-person-outline"></Icon>
                </span>
              </i-input>
            </FormItem>
            <FormItem prop="pwd">
              <i-input type="password"
                       v-model="form.data.pwd"
                       :placeholder="form.placeholder.pwd"
                       :maxlength="30">
                <span slot="prepend">
                  <Icon :size="14"
                        type="ios-lock-outline"></Icon>
                </span>
              </i-input>
            </FormItem>
            <FormItem>
              <Button @click="login"
                      type="primary"
                      long
                      :loading="btnStatus.login">登录</Button>
            </FormItem>
            <div style="text-align:right">
              <!-- <a href="javascript:void(0);" @click="resetPwd">忘记密码？</a> -->
            </div>
          </Form>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import Form from './form'
import Service from './service'
export default {
  name: 'Login',
  data () {
    return {
      dataSuffix: [],
      dataLoginName: [],
      form: Form(this),
      btnStatus: {
        loading: false
      }
    }
  },
  methods: {
    login () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.btnStatus.loading = true
          Service.login(this.form.data).then(result => {
            this.btnStatus.loading = false
            if (result.isSuccess) {
              this.$store
                .dispatch('user/UserLogin', result.data)
                .then(result => {
                  this.$Message.success('登录成功')
                  this.$store.dispatch('app/InitRouterAndMenu').then(() => {
                    this.$router.replace('/')
                  })
                })
              // if (this.$store.state.routes.name) {
              //   this.$router.replace({
              //     name: this.$store.state.routes.name,
              //     params: this.$store.state.routes.params,
              //     query: this.$store.state.routes.query
              //   })
              // } else if (this.$store.state.routes.prev.url) {
              //   this.$router.replace(this.$store.state.routes.prev.url)
              // } else {
              // this.$router.replace('/')
              // }
            } else {
              this.$Message.error(result.message)
            }
          })
        }
      })
    },
    resetPwd () {
      this.$router.push({
        name: 'PwdResetPhone'
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;
  background-image: url("./bg.jpg");
  background-size: cover;
  background-position: center;
  position: relative;
  &-content {
    position: absolute;
    right: 50%;
    top: 50%;
    transform: translateY(-60%) translateX(60%);
    width: 300px;
    &-header {
      font-size: 16px;
      font-weight: 300;
      text-align: center;
      padding: 30px 0;
    }
    .form-content {
      padding: 10px 0 0;
    }
    .login-tip {
      font-size: 10px;
      text-align: center;
      color: #c3c3c3;
    }
  }
}
</style>
