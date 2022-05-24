<template>
  <div>
    <div class="header relative on-top">
      <div class="page-container align-vertical relative">
        <h1 class="header-logo">valstock</h1>

        <select v-model="album" v-if="isAuthenticated" class="albums-header-button">
          <option disabled>MY ALBUMS</option>
          <option v-for="album in albums" :key="album.name" :value="album.name">{{ album.name }}</option>
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
  data(){
    return {
      album: "MY ALBUMS"
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
    }
  }
}
</script>
