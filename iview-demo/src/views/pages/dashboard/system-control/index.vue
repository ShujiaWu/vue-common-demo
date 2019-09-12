<template>
  <div>
    <h1>Dashboard Main</h1>
  </div>
</template>

<script>
export default {
  methods: {
    goto () {
      this.$router.push({
        name: 'DashboardSystemControl'
      })
    }
  }
}
</script>
