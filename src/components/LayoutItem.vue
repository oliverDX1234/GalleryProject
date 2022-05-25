<template>
  <div class="relative img-wrapper"
       >
    <img @click="showDetailedPage" class="pointer" :src="photo.url" alt="">
    <button class="add-to-album" @click="showModal" v-if="$route.name === 'gallery' && visible">ADD TO ALBUM</button>
    <button class="add-to-album" @click="showModal" v-if="$route.name !== 'gallery' && visible">DELETE ITEM</button>

    <modal v-if="$route.name === 'gallery'" @close="modalIsVisible = false" :visible="modalIsVisible" :item="photo"></modal>
    <delete-modal v-if="$route.name !== 'gallery'" @close="modalIsVisible = false" :visible="modalIsVisible" :item="photo"></delete-modal>
  </div>
</template>
<script>
import {mapActions} from "vuex";
import Modal from "@/components/Modal";
import DeleteModal from "@/components/DeleteModal";

export default {
  name: 'LayoutItem',
  components:{
    Modal,
    DeleteModal
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
