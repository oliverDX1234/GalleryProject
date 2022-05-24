<template>

  <div>

    <div v-if="visible" class="modal">

      <!-- Modal content -->
      <div class="modal-content">


        <div class="modal-body flex justify-content-center">

          <h2>Are you sure you want to delete this item?</h2>

        </div>

        <div v-if="errorMsg" class="validation mt-5">{{ errorMsg }}</div>

        <div class="mt-5">
          <div class="flex justify-content-center">
            <div class="mt-5">
              <button @click="$emit('close')" class="button-line min-width-150">CANCEL</button>
              <button @click="deleteItem" class="ml-5 min-width-150">DELETE</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {

  name: "DeleteModalPage",
  props: {
    visible: {
      default: false,
    },
    item: {}
  },
  data(){

    return {
      errorMsg: null
    }
  },
  methods: {
    ...mapActions("gallery", {addNewAlbum: "addNewAlbum", addInAlbum: "addInAlbum", deleteItemAction: "deleteItem"}),
    ...mapActions({show: "show"}),

    newTab(value) {
      this.activeTab = value
    },

    deleteItem(){

      try{
        this.deleteItemAction({
          item: this.item,
          in: this.$route.params.id
        })

        this.show();
      }catch(error){

        this.errorMsg = error.message;
      }

      this.$emit("close");
    }
  }
}
</script>

<style scoped>

</style>
