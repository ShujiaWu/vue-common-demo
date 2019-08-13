import PageLayout from '@vue-common/layouts/page/index.vue'
import SvgIcon from '@vue-common/components/common/svg-icon'
import Icon from '@vue-common/components/element-ui/icon'

export default (Vue) => {
  Vue.component('page-layout', PageLayout)
  Vue.component('svg-icon', SvgIcon)
  Vue.component('icon', Icon)
}
