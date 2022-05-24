<template>

  <div>

    <div class="page-container">

      <div class="page-section">

        <div class="flex justify-content-center">

          <button @click="modalIsVisible = true" class="button-line">ADD TO ALBUM</button>

          <select class="download pointer ml-1" @change="download" v-model="forDownload">

            <option disabled value="DOWNLOAD">DOWNLOAD</option>
            <option :value="[size]">{{ size[0] + " x " + size[1] }}</option>
            <option :value="[1920, 2400]">1920 x 2400</option>
            <option :value="[1280, 1600]">1280 x 1600</option>
            <option :value="[640, 800]">640 x 800</option>
          </select>
        </div>

        <div class="mt-5">
          <img :src="item.url" :alt="'image ' + item.id">
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

    size(){
      let split = this.item.download_url.split("/");
      return [split.at(-1), split.at(-2)];
    },

    formatDate(){

      return moment(this.item.upload_date).format("Do MMM YYYY")
    }
  },

  data(){

    return {
      forDownload: "DOWNLOAD",
      modalIsVisible: false
    }
  },

  methods:{
    async download(){
      let url = await this.getBase64Image(this.item.download_url, this.forDownload[0], this.forDownload[1]);
      var a = document.createElement("a"); //Create <a>
      a.href = url; //Image Base64 Goes here
      a.download = "Image.png"; //File name Here
      a.click(); //Downloaded file
    },

    getBase64Image(url, width, height) {
      return new Promise((resolve) => {
        const img = new Image();
        img.setAttribute('crossOrigin', 'anonymous');
        img.src = url;
        let iSizeWidth = width;
        let iSizeHeight = height;

        img.onload = () => {
          const canvas = document.createElement("canvas");

          canvas.width = iSizeWidth;
          canvas.height = iSizeHeight;
          let ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, iSizeWidth, iSizeHeight);
          resolve(canvas.toDataURL('image/jpeg', 0.7))
        }
      });
    },
  }
}
</script>

<style scoped>

</style>
