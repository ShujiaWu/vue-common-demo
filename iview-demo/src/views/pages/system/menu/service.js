import data from './data'
export function getAllMenus () {
  const dat = data()
  initMenuData(dat)
  return Promise.resolve({
    isSuccess: true,
    data: dat
  })
}

// function initMenuData (menus) {
//   console.log(menus)
//   menus.forEach(item => {
//     initMenuNodeData(item)
//   })
// }

// function initMenuNodeData (item, menu) {
//   // 设置树的状态
//   item.expand = true
//   item.checked = true
//   item.selected = false
//   if (item.children && item.children.length) {
//     // 有下一级
//     // 递归处理
//     item.children.forEach(children => {
//       initMenuNodeData(children, item)
//     })
//     // 子节点处理完 ===》处理当前的节点
//     // 计算当前节点的类型
//     if (item.children.some(value => value.type === 'Fn')) {
//       // 子节点中有 功能点 =》菜单
//       if (menu) {
//         // 有父级 == 》 菜单
//         item.type = 'Menu'
//       } else {
//         // 没有父级 == 》 顶部菜单
//         item.type = 'TopMenu'
//       }
//     } else {
//       if (menu) {
//         // 有父级 == 》 菜单组
//         item.type = 'MenuGroup'
//       } else {
//         // 没有父级 == 》 顶部菜单
//         item.type = 'TopMenu'
//       }
//     }
//   } else {
//     // 没有下一级
//     // 判断当前节点的类型
//     if (item.fnType) {
//       // 已经指定了功能类型 == 》 功能点
//       item.type = 'Fn'
//     } else {
//       if (menu) {
//         // 有父级 == 》 菜单
//         item.type = 'Menu'
//       } else {
//         // 没有父级 == 》 顶部菜单
//         item.type = 'TopMenu'
//       }
//     }
//   }
//   // 记录父级
//   item.parent = menu
// }

function initMenuData (menus, parent) {
  menus.forEach(item => {
    // 设置树的状态
    item.expand = true
    item.checked = true
    item.selected = false
    item.level = parent ? [].concat(parent.level) : []
    item.level.push(item)
    if (item.children && item.children.length) {
      // 有下一级
      // 递归处理
      initMenuData(item.children, item)
      // 子节点处理完 ===》处理当前的节点
      // 计算当前节点的类型
      if (item.children.some(value => value.type === 'Fn')) {
        // 子节点中有 功能点 =》菜单
        if (parent) {
          // 有父级 == 》 菜单
          item.type = 'Menu'
        } else {
          // 没有父级 == 》 顶部菜单
          item.type = 'TopMenu'
        }
      } else {
        if (parent) {
          // 有父级 == 》 菜单组
          item.type = 'MenuGroup'
        } else {
          // 没有父级 == 》 顶部菜单
          item.type = 'TopMenu'
        }
      }
    } else {
      // 没有下一级
      // 判断当前节点的类型
      if (item.fnType) {
        // 已经指定了功能类型 == 》 功能点
        item.type = 'Fn'
      } else {
        if (parent) {
          // 有父级 == 》 菜单
          item.type = 'Menu'
        } else {
          // 没有父级 == 》 顶部菜单
          item.type = 'TopMenu'
        }
      }
    }
    // 记录父级
    item.parent = parent
  })
}

export function filterMenu (keyword) {
  const dat = data()
  initMenuData(dat)
  return filterMenuData(keyword, dat)
}

function filterMenuData (keyword, menus) {
  if (keyword === '' || keyword === ' ' || keyword === null || keyword === undefined) {
    return menus
  }
  const children = []
  menus.forEach(item => {
    item.highlight = false
    // 深度优先
    if (item.children) {
      // 有子节点
      if (item.title.indexOf(keyword) >= 0) {
        // 当前菜单包含关键字
        console.log(item.title, '✅当前菜单包含关键字：', `_${keyword}_`, item.title.indexOf(keyword))
        item.highlight = true
        setHighLight(keyword, item)
        children.push(item)
      } else {
        console.log(item.title, '❎当前菜单没有关键字：', `_${keyword}_`, '遍历下一层')
        item.children = filterMenuData(keyword, item.children)
        if (item.children && !item.children.length) {
          console.log(item.title, '❎当前菜单没有子节点移除')
          // delete item.children
        } else {
          console.log(item.title, '✅当前菜单有子节点')
          children.push(item)
        }
      }
    } else {
      // 没有子节点
      if (item.title.indexOf(keyword) >= 0) {
        item.highlight = true
        children.push(item)
        console.log(item.title, '✅最底层节点包含关键字', `_${keyword}_`)
      } else {
        console.log(item.title, '❎最底层节点没有关键字', `_${keyword}_`)
      }
    }
  })
  console.log('-------------', children)
  return children
}

function setHighLight (keyword, menu) {
  if (menu.children) {
    // 有子节点
    menu.children.forEach(item => {
      setHighLight(keyword, item)
    })
  } else {
    if (menu.title.indexOf(keyword) >= 0) {
      menu.highlight = true
    }
  }
}

export function clearHighLight (menus) {
  menus.forEach(item => {
    item.highlight = false
    if (menus.children && menus.children.length) {
      clearHighLight(menus.children)
    }
  })
}
