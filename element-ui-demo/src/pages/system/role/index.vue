<template>
  <page-layout>
    <list-data-filter :data="FilterConfig">
      <div>
        <el-button type="primary"
                   size="mini"
                   icon="el-icon-refresh-right"
                   @click="refresh">刷新</el-button>
        <el-button type="primary"
                   size="mini"
                   icon="el-icon-plus"
                   @click="add">添加</el-button>
      </div>
    </list-data-filter>
    <el-table :data="table.data"
              v-loading="table.loading"
              stripe
              style="width: 100%">
      <!-- ID -->
      <el-table-column prop="id"
                       label="ID"
                       width="300" />
      <!-- 角色名称 -->
      <el-table-column prop="name"
                       label="角色名称"
                       min-width="120">
        <div class="text-one-line"
             slot-scope="props">{{props.row.name}}</div>
      </el-table-column>
      <!-- 是否启用 -->
      <el-table-column prop="enable"
                       label="是否启用"
                       align="center"
                       width="100">
        <template slot-scope="props">
          <el-switch :value="props.row.enable"
                     :active-value="true"
                     :inactive-value="false"
                     @change="changeEnable(props.row)" />
        </template>
      </el-table-column>
      <!-- 添加时间 -->
      <el-table-column prop="createTime"
                       label="添加时间"
                       align="center"
                       width="160">
        <template slot-scope="props">
          {{props.row.createTime | datetime('yyyy-MM-dd HH:mm:ss')}}
        </template>
      </el-table-column>
      <!-- 操作 -->
      <el-table-column width="100px" fixed="right">
        <template slot-scope="params">
          <el-button @click="edit(params.row)"
                     type="text"
                     size="small">修改</el-button>
          <el-button @click="del(params.row)"
                     type="text"
                     size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div style="text-align: center; padding: 20px 0 10px 0;">
      <el-pagination @size-change="pageSizeChange"
                     @current-change="pageChange"
                     :current-page="pagination.current"
                     :page-sizes="pagination.pageSizeOpts"
                     :page-size="pagination.size"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="pagination.total" />
    </div>
    <add-edit-dialog v-model="dialogAddEdit.show"
                     :mode="dialogAddEdit.mode"
                     :data="dialogAddEdit.data"
                     @success="success" />
  </page-layout>
</template>

<script>
import FilterConfig from './filter'
import TableMixin from '@vue-common/mixins/element-ui/table-all'
import {
  getList,
  modify as ServiceChangeEnable,
  del as ServiceDelete
} from './service'
import AddEditDialog from './add-edit-dialog'
export default {
  name: 'SystemRoleList',
  mixins: [TableMixin],
  components: {
    'add-edit-dialog': AddEditDialog
  },
  created () {
    this.FilterConfig = FilterConfig(this)
  },
  data () {
    return {
      FilterConfig: null,
      Service: {
        getList,
        delete: ServiceDelete
      },
      constants: {},
      dialogAddEdit: {
        show: false,
        mode: 'add',
        data: {}
      }
    }
  },
  methods: {
    add () {
      this.dialogAddEdit.show = true
      this.dialogAddEdit.mode = 'add'
      this.$set(this.dialogAddEdit, 'data', {})
    },
    edit (data) {
      this.dialogAddEdit.mode = 'edit'
      this.$set(this.dialogAddEdit, 'data', data)
      this.dialogAddEdit.show = true
    },
    changeEnable (target) {
      let enable = !target.enable
      ServiceChangeEnable({
        id: target.id,
        enable: enable
      }).then(result => {
        if (result.isSuccess) {
          this.$message.success('修改成功')
          target.enable = enable
        } else {
          this.$message.error(`修改失败，${result.message}`)
        }
      })
    },
    del (data) {
      this.$confirm('此操作将删除指定的角色，是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          ServiceDelete(data).then(result => {
            if (result.isSuccess) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.getList()
            } else {
              this.$message({
                type: 'error',
                message: `删除失败，${result.message}`
              })
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '取消操作'
          })
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.server-img {
  width: 22px;
  height: 22px;
  border-radius: 50%;
}
</style>
