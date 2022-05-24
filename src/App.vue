<template>

  <div>

    <page-header/>

    <router-view/>
    <alert :show="show"></alert>
  </div>
</template>

<script>
import PageHeader from "@/components/PageHeader";
import Alert from "@/components/Alert";
import {mapGetters} from "vuex";

export default {
  components: {
    PageHeader,
    Alert
  },
  computed:{
    ...mapGetters({ show: "show" })
  }
}
</script>
