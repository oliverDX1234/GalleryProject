<template>
  <div>
    <page-header/>

    <router-view/>
  </div>
</template>

<script>
import PageHeader from "@/views/PageHeader";

export default {
  components: {
    PageHeader
  }
}
</script>
