<template>
  <main>
    <Nav />
    <slot />
    <Footer />
  </main>
</template>

<static-query>
  query {
    metadata {
              siteName
    }
  }
</static-query>

<script>
import Nav from "~/components/Nav.vue";
import Footer from "~/components/Footer";

export default {
  components: {
    Nav: Nav,
    Footer: Footer
  }
};
</script>

<style>
</style>
