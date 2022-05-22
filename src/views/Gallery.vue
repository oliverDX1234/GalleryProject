<template>
  <div>
    <div class="page-container">

      <div class="layout">
        <img v-for="(value, index) in photos" :key="index" :src="value" alt="">
      </div>

    </div>
  </div>
</template>
<script>
export default {
  name: "GalleryPage",
  data() {

    return {
      photos: []
    }
  },
  methods: {
    async getPhotos() {
      let photos = await (await fetch("https://picsum.photos/v2/list?limit=30")).json();
      photos.forEach( async x => {
        let baseurl = await this.getBase64Image(x.download_url);
        this.photos.push(baseurl);
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
          resolve(canvas.toDataURL('image/jpeg', 0.5))
        }
      });
    }
  },
  mounted() {
    this.getPhotos();
  }
}
</script>

<style scoped>

</style>
