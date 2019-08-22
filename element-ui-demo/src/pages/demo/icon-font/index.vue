<template>
  <page-layout>
    <div>
      <p>1. 从 <a href="https://www.iconfont.cn">Icon Font</a> 创建项目，并添加好图标。请注意下图中标红部分。</p>
      <p>前缀： icon-</p>
      <p>Font Family： iconfont</p>
      <img src="./img/1566467940010.jpg" style="width:400px;">
      <p>2. 下载并解压到 /src/assets/font/icon-font 中。</p>
    </div>
    <div style="margin-top-20">
      <p>使用 i 标签</p>
      <i class="icon-xitong"/>
      <p>使用 icon 组件</p>
      <icon icon="icon-xitong"/>
      <p>与其他组件结合</p>
      <el-button type="primary" icon="icon-xitong">搜索</el-button>
    </div>
  </page-layout>
</template>
