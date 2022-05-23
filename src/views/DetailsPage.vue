<template>

  <div>

    <div class="page-container">

      <div class="page-section">

        <div class="flex justify-content-center">
          <button @click="modalIsVisible = true" class="button-line">ADD TO ALBUM</button>
          <button class="ml-2">DOWNLOAD</button>
        </div>

        <div class="mt-5">
          <img :src="item.url" alt="">
        </div>

        <div class="mt-5 photo-description">
          <h3 class="upload">UPLOADED BY</h3>
          <h2 class="mt-2"> {{ item.author }} </h2>
          <h5 class="mt-2 grey">{{ formatDate  }}</h5>
        </div>

        <div class="mt-5">
          <button @click="$router.push('/gallery')" class="button-line">GO BACK</button>
        </div>
        <modal @close="modalIsVisible = false" :visible="modalIsVisible" :item="item"></modal>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import moment from 'moment'
import Modal from "@/components/Modal";

export default {

  name: "DetailsPage",
  components:{
    Modal
  },
  computed: {
    //Note: Opening details from url without clicking on photo will not work since we do not have actual database
    //and vuex is used and filled on click
    //This could have been implemented, but would require filling the state with all items everytime new photos are fetched

    ...mapGetters("gallery", {item: "selectedDetailedItem"}),

    formatDate(){

      return moment(this.item.upload_date).format("Do MMM YYYY")
    }
  },

  data(){

    return {
      modalIsVisible: false
    }
  }
}
</script>

<style scoped>

</style>
