<template>
  <el-dialog :title="mode==='add'?'添加用户': '修改用户'"
             :visible="value"
             width="480px"
             :close-on-click-modal="false"
             :close-on-press-escape="false">
    <el-form :model="form.data"
             label-width="90px"
             :rules="form.rules"
             ref="Form">
      <!-- 账号 -->
      <el-form-item label="账号:" prop="account">
        <el-input v-model="form.data.account" :placeholder="form.data.account"></el-input>
      </el-form-item>
      <!-- 昵称 -->
      <el-form-item label="昵称:" prop="name">
        <el-input v-model="form.data.name" :placeholder="form.data.name"></el-input>
      </el-form-item>
      <!-- 密码 -->
      <el-form-item label="密码:" prop="pwd" v-if="mode=='add'">
        <el-input v-model="form.data.pwd" :placeholder="form.data.pwd"></el-input>
      </el-form-item>
      <!-- 密码 -->
      <el-form-item label="密码:" v-else>
        <el-input v-model="form.data.pwd" placeholder="不修改则不用填写"></el-input>
      </el-form-item>
      <!-- 页面权限 -->
      <el-form-item label="角色：`">
          <el-checkbox-group v-model="form.data.roles">
            <el-checkbox :label="item.value"
                         v-for="item in roles"
                         :key="item.value">{{item.label}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>

    </el-form>
    <div slot="footer"
         class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary"
                 @click="add"
                 :loading="form.loading"
                 v-if="mode==='add'">添 加</el-button>
      <el-button type="primary"
                 @click="modify"
                 :loading="form.loading"
                 v-if="mode==='edit'">修 改</el-button>
    </div>
  </el-dialog>
</template>

<script>
import Form from './add-edit-dialog-form'
import { add as ServiceAdd, modify as ServiceModify, getAllRoles as ServiceGetAllRoles, getUserRoles as ServiceGetUserRoles } from './service'
export default {
  created () {
    this.getAllRoles()
    // console.log(this.getRoutes(fullRoutes))
  },
  components: {
  },
  props: {
    value: {
      type: Boolean,
      default: true
    },
    mode: {
      type: String,
      default: 'add'
    },
    data: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      form: Form,
      roles: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  watch: {
    value (value) {
      if (this.$refs['Form']) {
        this.$refs['Form'].resetFields()
      }
      this.form.data.roles.splice(0, this.form.data.roles.length)
      if (value) {
        switch (this.mode) {
          case 'add':
            this.$nextTick(() => {
              this.form.data.id = undefined
            })
            break
          case 'edit':
            this.$nextTick(() => {
              this.form.data.id = this.data.id
              this.form.data.name = this.data.name
              this.form.data.account = this.data.account
              this.form.data.pwd = undefined
              this.getUserRoles(this.data.id)
            })
            break
        }
      }
    }
  },
  methods: {
    getAllRoles () {
      ServiceGetAllRoles().then(result => {
        if (result.isSuccess) {
          this.roles.splice(0, this.roles.length, ...result.data)
        }
      })
    },
    getUserRoles () {
      ServiceGetUserRoles(this.data.id).then(result => {
        if (result.isSuccess) {
          this.form.data.roles.splice(0, this.form.data.roles.length, ...result.data)
        }
      })
    },
    /**
     * 关闭
     */
    close () {
      this.$emit('input', false)
    },
    /**
     * 添加
     */
    add () {
      this.$refs['Form'].validate(valid => {
        this.form.loading = true
        if (valid) {
          ServiceAdd(this.form.data).then(result => {
            this.form.loading = false
            if (result.isSuccess) {
              this.close()
              this.$emit('success', 'add')
              this.$message.success(`添加成功！`)
            } else {
              this.$message.error(`添加失败！${result.message}`)
            }
          })
        } else {
          this.form.loading = false
          this.$message.error('请检查输入是否合法')
        }
      })
    },
    /**
     * 修改
     */
    modify () {
      this.$refs['Form'].validate(valid => {
        this.form.loading = true
        if (valid) {
          ServiceModify(this.form.data).then(result => {
            this.form.loading = false
            if (result.isSuccess) {
              this.close()
              this.$emit('success', 'edit')
              this.$message.success(`修改成功！`)
            } else {
              this.$message.error(`修改失败！${result.message}`)
            }
          })
        } else {
          this.form.loading = false
          this.$message.error('请检查输入是否合法')
        }
      })
    }
  }
}
</script>
