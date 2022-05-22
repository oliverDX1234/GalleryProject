<template>
  <div>
    <div v-if="loading" class="overlay">
      <div class="overlay__inner">
        <div class="overlay__content"><span class="spinner"></span></div>
      </div>
    </div>
    <div class="page-container">

      <div class="layout">
        <div @click="viewDetailedPage(index)" @mouseenter="mouseEntered(index)" @mouseleave="mouseLeave(index)" class="relative" v-for="(value, index) in photos" :key="index">
          <img class="pointer" :src="value.url" alt="">
          <button class="hide" :ref="'img_' + index">ADD TO ALBUM</button>
        </div>
      </div>

      <button @click="getPhotos" class="mt-5">LOAD MORE</button>

    </div>
  </div>
</template>
<script>
export default {
  name: "GalleryPage",
  data() {

    return {
      photos: [],
      loading: false
    }
  },
  methods: {
    async getPhotos() {
      this.loading = true;
      let photos = await (await fetch("https://picsum.photos/v2/list?limit=30")).json();
      photos.forEach( async (x, idx, array) => {
        let baseurl = await this.getBase64Image(x.download_url);
        this.photos.push({
          author: x.author,
          download_url: x.download_url,
          url: baseurl
        });

        if(idx === array.length - 1){
          setTimeout(() => {
            this.loading = false;
          }, 1000)
        }
      })

    },
    getBase64Image(url){
      return new Promise((resolve) => {
        const img = new Image();
        img.setAttribute('crossOrigin', 'anonymous');
        img.src = url;

        img.onload = () => {
          const canvas = document.createElement("canvas");
          let MAX_WIDTH = 500;
          let MAX_HEIGHT = 500;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }
          canvas.width = width;
          canvas.height = height;
          let ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', 0.7))
        }
      });
    },

    mouseEntered(index){
      this.$refs["img_" + index][0].classList.remove("hide")
    },

    mouseLeave(index){
      this.$refs["img_" + index][0].classList.add("hide")
    },

    viewDetailedPage(){
      // let selected = null;
      //
      // let index = this.photos.findIndex((x, idx) => i === idx);
      //
      // if(index !== -1){
      //   selected = this.photos[index];
      // }
      //
      // if(selected){
      //
      // }
    }
  },
  mounted() {
    this.getPhotos();

    window.onscroll = () => {
      if ((window.innerHeight + window.scrollY - 50) >= document.body.offsetHeight) {
        this.getPhotos();
      }
    };
  }
}
</script>

<style scoped>

</style>
