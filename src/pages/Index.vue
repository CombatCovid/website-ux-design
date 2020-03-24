<template>
  <div>
    <Layout class="content">
      <!-- Learn how to use images here: https://gridsome.org/docs/images -->
      <Carousel></Carousel>

      <h1>Hello, world!</h1>

      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Pariatur excepturi labore tempore expedita, et iste tenetur suscipit explicabo!
        Dolores, aperiam non officia eos quod asperiores</p>

      <p class="home-links">
        <a href="https://gridsome.org/docs/" target="_blank" rel="noopener">Gridsome Docs</a>
        <a href="https://github.com/gridsome/gridsome" target="_blank" rel="noopener">GitHub</a>
      </p>
    </Layout>
  </div>
</template>

<script>
import Carousel from "~/components/Carousel.vue";
export default {
  metaInfo: {
    title: "Home"
  },
  components: {
    Carousel: Carousel
  }
};
</script>

<style>
.home-links a {
  padding-top:2em;
  margin-right: 1rem;
}
</style>
