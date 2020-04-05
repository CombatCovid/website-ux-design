<template>
  <Layout>
    <div class="master-detail formal-look horiz-center">
      <p>
        Alpha notes:  This display is to the point of what we want, showing
        Designs chosen out of a visual list resulting from your rapid keywords
        and title search in the Finder.
      </p>
      <p>
        What follows when we have the Vuex data foundation in,
        will be the ability to Mark chosen designs,
        and refer to them from the Chosen Designs list,
        which is sketched in mock at present.
      </p>
    </div>
  </Layout>
</template>

<script>
export default {
  metaInfo: {
    title: 'About us'
  }
}
</script>

<style scoped>
  .master-detail {
    margin: 20px;
    padding: 15px;
    color: darkslategray;
    background-color: beige;
  }
  .horiz-center {
    margin: 0 auto;
    text-align: center;
  }
  .design-image {
    width: 100%;
  }
  .design-image-hold {
    margin: 3% auto;
  }
  .doc-title {
    padding: 0 20px 20px 20px;
  }
  .formal-look {
    color: #1d5c87;
    font-family: Roboto, sans-serif;
    font-size: small;
    padding: 20px;
    max-width: 640px;
  }

</style>
