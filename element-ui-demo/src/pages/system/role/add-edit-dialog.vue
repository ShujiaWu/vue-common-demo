<template>
  <el-dialog :title="mode==='add'?'添加角色': '修改角色'"
             :visible="value"
             width="480px"
             :close-on-click-modal="false"
             :close-on-press-escape="false">
    <el-form :model="form.data"
             label-width="90px"
             :rules="form.rules"
             ref="Form">
      <!-- 角色名称 -->
      <el-form-item label="角色名称:" prop="name">
        <el-input v-model="form.data.name"></el-input>
      </el-form-item>
      <!-- 页面权限 -->
      <el-form-item label="角色权限:">
        <el-tree
        ref="tree"
          :data="treedata"
          show-checkbox
          node-key="id"
          accordion
          :default-expanded-keys="[]"
          :default-checked-keys="[]"
          :props="defaultProps">
        </el-tree>
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
import { add as ServiceAdd, modify as ServiceModify, getRolePermission as ServiceGetRolePermission } from './service'
import fullRoutes from '@/router/routes'
import PageFns from '../../../page-fns'
export default {
  created () {
    // console.log(this.getRoutes(fullRoutes))
    this.getFns()
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
      treedata: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      fns: PageFns
    }
  },
  watch: {
    value (value) {
      if (this.$refs['Form']) {
        this.$refs['Form'].resetFields()
      }
      if (this.$refs.tree) {
        this.$refs.tree.setCheckedKeys([])
      }
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
              this.form.data.page = []
              this.getRolePermission(this.data.id)
            })
            break
        }
      }
    }
  },
  methods: {
    getFns () {
      for (const key in PageFns) {
        if (PageFns.hasOwnProperty(key)) {
          PageFns[key].unshift({
            id: `${key}_1`,
            name: '页面访问',
            permission: 1
          })
          PageFns[key].forEach(element => {
            element.pageName = key
            element.label = element.name
            element.id = `${key}_${element.permission}`
            element.isFn = true
          })
        }
      }
      this.treedata.splice(0, this.treedata.length, ...this.getRoutes(fullRoutes))
    },
    getRoutes (routes) {
      const res = []
      routes.forEach(route => {
        const tmp = { ...route }
        if (this.needPermission(tmp)) {
          if (tmp.children) {
            tmp.children = this.getRoutes(tmp.children)
          }
          if (tmp.name && !tmp.children) {
            // 菜单
            let item = {
              id: tmp.name,
              label: tmp.meta.title
            }
            if (this.fns[tmp.name]) {
              item.children = []
              item.children.push(...this.fns[tmp.name])
            }

            res.push(item)
          }
          if (tmp.children && tmp.children.length) {
            res.push({
              id: tmp.name,
              label: tmp.meta.title,
              children: tmp.children
            })
          }
        }
      })
      return res
    },
    needPermission (route) {
      // console.log(route)
      if (route.children && route.children.length) {
        return true
      }
      if (route.meta && route.meta.permission) {
        return true
      }

      return false
    },
    getRolePermission () {
      ServiceGetRolePermission(this.data.id).then(result => {
        if (result.isSuccess) {
          let data = []
          result.data.forEach(element => {
            if (this.fns[element.pageName]) {
              // 有功能权限
              this.fns[element.pageName].forEach(fn => {
                if (fn.permission & element.permission) {
                  data.push(fn.id)
                }
              })
            } else {
              data.push(element.pageName)
            }
          })
          this.$refs.tree.setCheckedKeys(data)
        }
      })
    },
    /**
     * 关闭
     */
    close () {
      this.$emit('input', false)
    },
    getSelectedPage () {
      let page = []
      let tObj = {}
      let selected = this.$refs.tree.getCheckedNodes()
      selected.forEach(node => {
        if (!node.children) {
          if (node.isFn) {
            // 功能点
            if (!tObj[node.pageName]) {
              tObj[node.pageName] = {
                pageName: node.pageName,
                permission: 1
              }
            }
            tObj[node.pageName].permission = tObj[node.pageName].permission | node.permission
          } else {
            // 页面
            tObj[node.id] = {
              pageName: node.id,
              permission: 1
            }
          }
        }
      })
      for (const key in tObj) {
        if (tObj.hasOwnProperty(key)) {
          const element = tObj[key]
          page.push(element)
        }
      }
      this.form.data.page = page
      return page
    },
    /**
     * 添加
     */
    add () {
      this.getSelectedPage()
      this.$refs['Form'].validate(valid => {
        this.form.loading = true
        if (valid) {
          this.getSelectedPage()
          ServiceAdd(this.form.data).then(result => {
            this.form.loading = false
            if (result.isSuccess) {
              this.close()
              this.$emit('success', 'add')
              this.$message.success(`添加成功`)
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
          this.getSelectedPage()
          ServiceModify(this.form.data).then(result => {
            this.form.loading = false
            if (result.isSuccess) {
              this.close()
              this.$emit('success', 'edit')
              this.$message.success(`修改成功`)
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
