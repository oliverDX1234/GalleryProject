<template>

  <div>

    <div v-if="visible" class="modal">

      <!-- Modal content -->
      <div class="modal-content">


        <div class="modal-body flex justify-content-center">
          <h5 @click="newTab(1)" :class="{'grey': activeTab !== 1}" class="tab">CREATE NEW ALBUM</h5>
          <h5 @click="newTab(2)" :class="{'grey': activeTab !== 2}" class="tab ml-5">ADD TO EXISTING</h5>
        </div>

        <div class="mt-5">
          <div v-if="activeTab === 1">
            <input @input="errorMsg = null" class="new-album-input" v-model="albumTitle" type="text"
                   placeholder="Enter title here">
          </div>
          <div v-else>

            <select v-model="selected">
              <option value="Select an album" disabled>Select an album...</option>
              <option v-for="album in albums" :key="album.name" :value="album.name">{{ album.name }}</option>
            </select>
          </div>

          <div v-if="errorMsg" class="validation mt-5">{{ errorMsg }}</div>
          <div class="flex justify-content-center">
            <div class="mt-5">
              <button @click="$emit('close')" class="button-line min-width-150">CANCEL</button>
              <button @click="saveAlbum" class="ml-5 min-width-150">SAVE</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {

  name: "ModalPage",
  props: {
    visible: {
      default: false,
    },
    item: {}
  },
  computed: {
    ...mapGetters("gallery", {albums: "allAlbums"})
  },
  data() {
    return {
      activeTab: 1,
      selected: "Select an album",
      albumTitle: null,
      errorMsg: null
    }
  },
  methods: {
    ...mapActions("gallery", {addNewAlbum: "addNewAlbum", addInAlbum: "addInAlbum"}),
    ...mapActions({show: "show"}),

    newTab(value) {
      this.errorMsg = null;
      this.activeTab = value
    },
    saveAlbum() {

      if (this.activeTab === 1) {

        if(this.albumTitle === null){
          this.errorMsg = "Please enter an album name"
          return;
        }

        try {
          this.addNewAlbum({
            name: this.albumTitle,
            item: this.item,
            id: this.albums.length + 1,
            upload_date: new Date()
          });

          this.show();
        } catch (error) {
          this.errorMsg = error.message;
          this.albumTitle = null;
          return;
        }

        this.albumTitle = null;
      }else{
        if(this.selected === "Select an album"){

          this.errorMsg = "Please select item in dropdown";
          return;
        }
        this.addInAlbum({
          name: this.selected,
          item: this.item
        });

        this.show();
      }

      this.$emit("close");

    }
  }
}
</script>

<style scoped>

</style>
