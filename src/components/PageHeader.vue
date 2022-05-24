<template>
  <div>
    <div class="header relative on-top">

      <div class="page-container align-vertical relative">
        <h1 @click="$router.push('/gallery')" class="header-logo pointer">valstock</h1>

        <select @change ="openAlbum" v-model="album" v-if="isAuthenticated" class="albums-header-button">

          <option disabled value="0">MY ALBUMS</option>
          <option v-for="album in albums" :key="album.name" :value="album.id">{{ album.name }}</option>
        </select>

        <button v-if="isAuthenticated" @click="logout" class="logout-header-button">LOGOUT</button>
      </div>
    </div>
  </div>
</template>
<script>
import {mapActions, mapGetters} from  "vuex";
export default {
  name: 'page-header',
  computed:{
    ...mapGetters("authentication", {isAuthenticated: "isAuthenticated"}),
    ...mapGetters("gallery", {albums: "allAlbums"})
  },
  watch:{
    '$route' (newValue) {

      if(newValue.name !== "album"){
        this.album = 0;
      }
    }
  },
  data(){
    return {
      album: 0
    }
  },
  methods:{
    ...mapActions("authentication", {logoutUser: "logoutUser"}),
    async logout(){
      try {
        await this.logoutUser();
        await this.$router.push("/login");
      }catch(error){
        //Do something about logout error
        console.log(error);
      }
    },

    openAlbum(){
      this.$router.push("/album/" + this.album);
    }
  }
}
</script>
