<template>
  <div class="about">
    <div>DemoAbout</div>
  </div>
</template>

<script>
export default {
  methods: {
    goto () {
      this.$router.push({
        name: 'DemoAbout'
      })
    }
  }
}
</script>
