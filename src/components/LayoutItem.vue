<template>
  <div class="relative"
       >
    <img @click="showDetailedPage" class="pointer" :src="photo.url" alt="">
    <button class="add-to-album" @click="showModal" v-if="visible">ADD TO ALBUM</button>

    <modal @close="modalIsVisible = false" :visible="modalIsVisible" :item="photo"></modal>
  </div>
</template>
<script>
import {mapActions} from "vuex";
import Modal from "@/components/Modal";

export default {
  name: 'LayoutItem',
  components:{
    Modal
  },
  data(){
    return {
      visible: false,
      modalIsVisible: false
    }
  },
  props:{
    photo: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: false
    }
  },
  methods:{
    ...mapActions("gallery", {setNewItem: "setNewItem"}),

    showDetailedPage(){
      this.setNewItem({...this.photo, upload_date: new Date(), id: this.index});

      this.$router.push("/details-page/" + this.index);
    },
    showModal(){
      this.modalIsVisible = true;
    }
  }
}
</script>
