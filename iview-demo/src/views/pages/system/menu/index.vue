<template>
  <page-layout full-page>
    <div class="system-menus">
      <div class="operation">
        <!-- 顶部操作区 -->
        <Button type="primary"
                icon="md-add">添加子节点</Button>
        <Button icon="md-add">添加顶部菜单</Button>
        <Button icon="md-trash">批量删除</Button>
        <Dropdown>
          <Button>
            更多操作
            <Icon type="md-arrow-dropdown"></Icon>
          </Button>
          <DropdownMenu slot="list">
            <DropdownItem name="refresh">刷新</DropdownItem>
            <DropdownItem name="expandOne">收合所有</DropdownItem>
            <DropdownItem name="expandTwo">仅展开一级</DropdownItem>
            <DropdownItem name="expandThree">仅展开两级</DropdownItem>
            <DropdownItem name="expandAll">展开所有</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <i-switch size="large"
                  style="margin-left:5px">
          <span slot="open">级联</span>
          <span slot="close">单选</span>
        </i-switch>
      </div>
      <div class="main">
        <!-- 核心业务区 -->
        <div class="main-box">
          <Row style="height:100%"
               :gutter="20">
            <i-col span="9"
                   class="main-box-col">
              <!-- 提示区域 -->
              <div class="header">
                <Alert show-icon>
                  <template v-if="current">
                    <span>当前选择编辑：</span>
                    <span class="select-title">{{current.title}}</span>
                    <a class="margin-l-20"
                       @click="cancelSelectTree">取消选择</a>
                  </template>
                  <template v-else>
                    <span>请点击菜单进行相关操作。</span>
                  </template>
                </Alert>
                <Input suffix="ios-search"
                       placeholder="输入菜单名搜索"
                       @on-change="search"
                       v-model="keyword"
                       clearable />
              </div>
              <!-- 菜单树 -->
              <div class="tree-area">
                <div class="tree-area-box">
                  <div style="max-height:100%;overflow:auto;">
                    <Tree ref="tree"
                          :data="data"
                          show-checkbox
                          empty-text="暂无数据，请先添加"
                          :render="renderContent"
                          :check-strictly="!strict"></Tree>
                  </div>
                  <Spin size="large"
                        fix
                        v-if="loading"></Spin>
                </div>
              </div>
            </i-col>
            <!-- 表单 -->
            <i-col span="15">
              <Alert :type="`${mode==='edit'?'warning': 'info'}`"
                     v-if="current">
                <span v-if="mode==='edit'">当前进行的是编辑操作!</span>
                <span v-if="mode==='edit'">当前进行的是新增操作!</span>
                <span class="margin-l-10 margin-r-10">当前位置:</span>
                <Breadcrumb style="display:inline;font-size: 12px;">
                  <BreadcrumbItem v-for="(item, index) in current.level"
                                  :key="index">
                    <Icon :type="item.icon"
                          v-if="item.icon" />
                    <template v-else>
                      <Icon type="ios-navigate"
                            v-if="item.type==='TopMenu'" />
                      <Icon type="md-list-box"
                            v-else-if="item.type==='MenuGroup'" />
                      <Icon type="md-list"
                            v-else-if="item.type==='Menu'" />
                      <Icon type="md-radio-button-on"
                            v-else-if="item.type==='Fn'" />
                      <Icon type="md-radio-button-off"
                            v-else />
                    </template>
                    <span>{{item.title}}</span>
                  </BreadcrumbItem>
                  <BreadcrumbItem>
                    <Icon type="md-add" />
                    <span>新增</span>
                  </BreadcrumbItem>
                </Breadcrumb>
              </Alert>
              <Form ref="form"
                    :model="form.data"
                    :rules="form.rule"
                    :label-width="120">
                <!-- 类型 -->
                <Form-item label="类型："
                           prop="title">
                  <div v-if="form.data.type==='TopMenu'">
                    顶部菜单
                  </div>
                  <div v-if="form.data.type==='MenuGroup'">
                    菜单组
                  </div>
                  <div v-if="form.data.type==='Menu'">
                    菜单
                  </div>
                  <div v-if="form.data.type==='Fn'">
                    功能
                  </div>
                </Form-item>
                <!-- 标题 -->
                <Form-item label="中文标题："
                           prop="title"
                           v-if="isShowField(form.data.type, ['TopMenu','MenuGroup','Menu','Fn'])">
                  <i-input v-model="form.data.title"
                           placeholder="组件标题，会展示在浏览器标题（中文）">
                  </i-input>
                </Form-item>
                <!-- 标题（En） -->
                <Form-item label="英文标题："
                           prop="titleEn"
                           v-if="isShowField(form.data.type, ['TopMenu'])">
                  <i-input v-model="form.data.titleEn"
                           placeholder="组件标题，会展示在浏览器标题（英文）">
                  </i-input>
                </Form-item>
                <!-- 路径 -->
                <Form-item label="路径："
                           prop="path"
                           v-if="isShowField(form.data.type, ['MenuGroup'])">
                  <i-input v-model="form.data.path"
                           placeholder="地址栏中的地址路径">
                  </i-input>
                </Form-item>
                <!-- 权限类型 -->
                <Form-item label="权限类型："
                           prop="fnType"
                           v-if="isShowField(form.data.type, ['Fn'])">
                  <i-input v-model="form.data.fnType"
                           placeholder="接口请求的路径地址">
                  </i-input>
                </Form-item>
                <!-- 接口路径 -->
                <Form-item label="接口路径："
                           prop="path"
                           v-if="isShowField(form.data.type, ['Fn'])">
                  <i-input v-model="form.data.path"
                           placeholder="接口请求的路径地址">
                  </i-input>
                </Form-item>
                <!-- 图标 -->
                <Form-item label="图标："
                           prop="icon"
                           v-if="isShowField(form.data.type, ['TopMenu','MenuGroup','Menu'])">
                  <i-input v-model="form.data.icon"
                           placeholder="组件图标">
                  </i-input>
                </Form-item>
                <!-- 名称 -->
                <Form-item label="组件名称："
                           prop="name"
                           v-if="isShowField(form.data.type, ['MenuGroup','Menu'])">
                  <i-input v-model="form.data.name"
                           placeholder="组件名称，唯一">
                  </i-input>
                </Form-item>
                <!-- 组件路径 -->
                <Form-item label="组件路径："
                           prop="component"
                           v-if="isShowField(form.data.type, ['MenuGroup','Menu'])">
                  <i-input v-model="form.data.component"
                           placeholder="前端组件路径">
                  </i-input>
                </Form-item>
                <!-- 第三方页面地址 -->
                <Form-item label="第三方页面地址："
                           prop="url"
                           v-if="isShowField(form.data.type, ['Menu'])">
                  <i-input v-model="form.data.url"
                           placeholder="第三方页面地址，http(s)://...">
                  </i-input>
                </Form-item>
                <!-- 排序 -->
                <Form-item label="排序："
                           prop="sortOrder"
                           v-if="isShowField(form.data.type, ['TopMenu','MenuGroup','Menu','Fn'])">
                  <i-input v-model="form.data.sortOrder"
                           placeholder="排序">
                  </i-input>
                </Form-item>
                <!-- 是否启用 -->
                <FormItem label="是否启用"
                          prop="status"
                          v-if="isShowField(form.data.type, ['TopMenu','MenuGroup','Menu','Fn'])">
                  <i-switch size="large"
                            v-model="form.data.status"
                            :true-value="1"
                            :false-value="0">
                    <span slot="open">启用</span>
                    <span slot="close">禁用</span>
                  </i-switch>
                </FormItem>
                <!-- 是否一直显示 -->
                <FormItem label="强制显示"
                          prop="showAlways"
                          v-if="isShowField(form.data.type, ['MenuGroup'])">
                  <i-switch size="large"
                            v-model="form.data.showAlways"
                            :true-value="1"
                            :false-value="0">
                    <span slot="open">启用</span>
                    <span slot="close">禁用</span>
                  </i-switch>
                </FormItem>
                <Form-item>
                  <Button type="primary">修改</Button>
                </Form-item>
              </Form>
            </i-col>
          </Row>
        </div>
      </div>
    </div>
  </page-layout>
</template>

<script>
import Form from './form'
import * as Service from './service'
export default {
  name: 'SystemMenu',
  created () {
    this.getAllMenus()
  },
  data () {
    return {
      constants: [],
      form: Form(),
      mode: 'add',
      data: [],
      originalData: [],
      strict: false,
      loading: false,
      current: null,
      keyword: ''
    }
  },
  methods: {
    /**
     * 判断输入是否显示
     */
    isShowField (type, types) {
      return types.includes(type)
    },
    /**
     * Tree 渲染函数
     */
    renderContent (h, { root, node, data }) {
      let icon = ''
      if (data.type === 'TopMenu') {
        icon = 'ios-navigate'
      } else if (data.type === 'MenuGroup') {
        icon = 'md-list-box'
      } else if (data.type === 'Menu') {
        icon = 'md-list'
      } else if (data.type === 'Fn') {
        icon = 'md-radio-button-on'
      } else {
        icon = 'md-radio-button-off'
      }
      return h(
        'div',
        {
          style: {
            display: 'inline-block',
            cursor: 'pointer',
            width: 'calc(100% - 42px)',
            'vertical-align': 'middle'
          }
        },
        [
          h(
            'div',
            {
              style: {
                display: 'flex',
                'align-items': 'center'
              }
            },
            [
              // 图标
              h('Icon', {
                props: {
                  type: icon,
                  size: '16'
                },
                style: {
                  'margin-right': '8px'
                }
              }),
              // 标题
              h(
                'div',
                {
                  style: {
                    flex: 1
                  },
                  on: {
                    click: () => {
                      this.selectTree(data)
                    }
                  }
                },
                [
                  h(
                    'span',
                    {
                      style: {
                        color: data.highlight ? 'red' : undefined
                      },
                      class: {
                        'ivu-tree-title': true,
                        'ivu-tree-title-selected': data === this.current
                      }
                    },
                    data.title
                  )
                ]
              ),
              // 按钮
              h(
                'span',
                {
                  style: {
                    display: 'inline-block'
                    // float: 'right'
                  }
                },
                [
                  // 添加
                  h('Button', {
                    props: {
                      icon: 'ios-add',
                      type: 'default',
                      size: 'small',
                      disabled: data.type === 'Fn'
                    },
                    style: {
                      marginRight: '8px'
                    },
                    on: {
                      click: () => {}
                    }
                  }),
                  // 移除
                  h('Button', {
                    props: {
                      icon: 'ios-remove',
                      type: 'default',
                      size: 'small'
                    },
                    on: {
                      click: () => {
                        this.removeItem(data)
                      }
                    }
                  })
                ]
              )
            ]
          )
        ]
      )
    },
    /**
     * 调用接口获取所有的菜单
     */
    getAllMenus () {
      this.loading = true
      Service.getAllMenus().then(result => {
        if (result.isSuccess) {
          this.data.splice(0, this.data.length, ...result.data)
          this.originalData.splice(0, this.originalData.length, ...result.data)
        }
        this.$nextTick(() => {
          this.loading = false
        })
      })
    },
    /**
     * 选择菜单
     */
    selectTree (data) {
      Object.assign(this.form.data, data)
      this.current = data
    },
    cancelSelectTree () {
      this.current = null
    },
    removeItem (data) {
      console.log(data)
      const parent = data.parent
      if (parent) {
        const pos = parent.children.indexOf(data)
        parent.children.splice(pos, 1)
      } else {
        const pos = this.data.indexOf(data)
        this.data.splice(pos, 1)
      }
    },
    search () {
      // if (
      //   this.keyword === '' ||
      //   this.keyword === ' ' ||
      //   this.keyword === null ||
      //   this.keyword === undefined
      // ) {
      //   Service.clearHighLight(this.originalData)
      //   this.data.splice(0, this.data.length, ...this.originalData)
      // } else {
      //   this.data.splice(
      //     0,
      //     this.data.length,
      //     ...Service.filterMenuData(this.keyword, this.originalData)
      //   )
      // }
      this.loading = true
      this.data.splice(0, this.data.length, ...Service.filterMenu(this.keyword))
      this.loading = false
    }
  }
}
</script>

<style lang="less" scoped>
.system-menus {
  height: 100%;
  display: flex;
  flex-direction: column;
  .operation {
    margin-bottom: 10px;
  }
  .main {
    flex: 1;
    position: relative;
    &-box {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      overflow: auto;
      &-col {
        height: 100%;
        display: flex;
        flex-direction: column;
        .tree-area {
          flex: 1;
          position: relative;
          &-box {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
          }
        }
      }
    }
  }
}
</style>

<style lang="less">
.system-menus {
  .ivu-tree-empty {
    text-align: center;
    padding: 40px 0;
  }
}
</style>
