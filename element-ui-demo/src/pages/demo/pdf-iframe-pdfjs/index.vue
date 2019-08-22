<template>
  <page-layout full-page>
    <div class="box">
      <h1>使用 iframe + PDF.js 展示 PDF</h1>
      <iframe :src="src" frameborder="0"></iframe>
    </div>
  </page-layout>
</template>

<script>
export default {
  name: 'PDF_PDFJS_Page',
  data () {
    return {
      src: '/pdfjs/web/viewer.html?file=/file/pdf/test.pdf'
    }
  }
}
</script>

<style lang="less" scoped>
.box {
  display: flex;
  flex-direction: column;
  height: 100%;
  iframe {
    width: 100%;
    flex: 1;
  }
}
</style>
