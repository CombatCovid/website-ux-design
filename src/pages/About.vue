<template>
  <Layout>
    <div class="master-detail formal-look horiz-center">
      <p>
        Alpha notes:  You're viewing a site out of our own latest design revision,
        where the Viewer page now opens as always with a summary, but then can
        proceed very easily to let you view all Design Documents and visual materials.

        You discover the designs from the Finder, aided by a quite intelligent and
        very rapid text and keywords search agent, behind the scenes. Speed and
        ease are the things we are after
      </p>
      <p>
        What follows, as we develop a local memoryy feature for that,
        will be the ability to Bookmark the designs you want to
        be able to immediately return to. We're looking forward to that.
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
