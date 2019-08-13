<template>
  <div>
    <el-button type="primary" size="mini" @click="showUploadSelectImage">插入图片</el-button>
    <UploadSelectImage v-model="uploadSelectImage.show" @insert="insertImage" />
  </div>
</template>

<script>

import UploadSelectImage from '@common/components/element-ui/upload-select-image'
export default {
  components: { UploadSelectImage },
  data () {
    return {
      uploadSelectImage: {
        show: false
      }
    }
  },
  methods: {
    showUploadSelectImage () {
      this.uploadSelectImage.show = true
    },
    insertImage (img) {
      this.$emit('insertImage', img)
    }
  }
}
</script>
