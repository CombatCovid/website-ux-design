<template>
  <div>
    <Layout class="">
      <div class="formal-look">
        <h2>Greetings</h2>
        <br>

        <p>You're meeting the demonstration app of the Combat Covid with Hardware project.</p>
        <p>This is a fast-moving Alpha production, so be reassured if you find that
          items may move, appear, disappear, and at moments perhaps not function entirely
          as you expected.</p>
        <p>We're moving rapidly and constantly to add what's needed for early real use, and anything
          unexpected will soon be repaired.</p><p>Thank you for your patience, and especially for your interest.</p>
        <p class="sig-indent">The Combat Covid with Hardware Team</p>

        <p class="home-links">
          <!--        <a href="https://gridsome.org/docs/" target="_blank" rel="noopener">Gridsome Docs</a>-->
          <!--        <a href="https://github.com/gridsome/gridsome" target="_blank" rel="noopener">GitHub</a>-->
        </p>
      </div>
    </Layout>
  </div>
</template>

<script>
export default {
  metaInfo: {
    title: "Home"
  }
};
</script>

<style>
.home-links a {
  padding-top:2em;
  margin-right: 1rem;
}
.sig-indent {
  margin-left: 24px;
}
.formal-look {
  color: #1d5c87;
  font-family: Roboto, sans-serif;
  font-size: small;
  padding: 20px;
  max-width: 640px;
}
</style>
