<template>

  <div>

    <div class="page-container">

      <div class="page-section">

        <div class="mt-5 photo-description">
          <h2 class="mt-2"> {{ album.name }} </h2>
          <h5 class="mt-2 grey">Date created: {{ formatDate }}</h5>
        </div>

        <div class="mt-5 layout-list-photos">
          <layout-item

              @mouseenter="mouseEntered(index)"
              @mouseleave="mouseLeave(index)"
              v-for="(item, index) in album.items"
              :key="item.id"
              :ref="'item-' + index"
              :photo="item">

          </layout-item>
        </div>

        <div class="mt-5">
          <button @click="$router.push('/gallery')" class="button-line">GO BACK</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import {mapGetters} from "vuex";
import moment from "moment";
import LayoutItem from "@/components/LayoutItem";

export default {
  name: "AlbumPage",
  components:{
    LayoutItem
  },
  computed:{
    ...mapGetters("gallery", {allAlbums: "allAlbums"}),

    formatDate(){

      return moment(this.album.upload_date).format("Do MMM YYYY")
    }
  },
  data(){
    return {
      album: {
        id: null,
        author: null,
        url: null,
        upload_date: null,
        item: [],
        isVisible: false
      }
    }
  },

  watch:{
    '$route' () {
      this.album = this.allAlbums.find(x => x.id === Number(this.$route.params.id));
    }
  },

  methods:{
    mouseEntered(index) {
      this.$refs['item-' + index][0].visible = true;
    },

    mouseLeave(index) {
      this.$refs['item-' + index][0].visible = false;
    }
  },
  mounted(){
    this.album = this.allAlbums.find(x => x.id === Number(this.$route.params.id));
  }
}
</script>

<style scoped>

</style>
