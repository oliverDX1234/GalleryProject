<template>

  <div>
    <transition>
      <div v-if="show" class="alert">
        The action was successfully done
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "AlertPage",
  props:{

    show: {
      default: false
    }
  }
}
</script>

<style scoped>

</style>
