// 导入通用icon
import '../../../vue-common/icons'
// 导入本系统特有的icon
const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('./svg', false, /\.svg$/)
requireAll(req)
