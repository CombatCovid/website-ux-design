<template>
  <footer class="w-screen bg-primary-100 py-24">
    <p class="text-md text-white-100 text-center">
      &copy; {{ new Date().getFullYear() }} - The CombatCovid with Hardware Team
      License: GPL 2.0
      <b>
        <g-link to="/about#impressum">Impressum</g-link>
      </b>
    </p>
  </footer>
</template>

<script>
import { mdiDiscord, mdiGithub } from "@mdi/js";

export default {
  name: "the-footer", // don't use a name that is part of the html spec
  data: () => ({
    icons: [
      { name: mdiDiscord, link: "https://discord.gg/rYHCBt" },
      { name: mdiGithub, link: "https://github.com/CombatCovid/SPA-website" }
    ]
  })
};
</script>

<style lang="scss" scoped>
footer {
  justify-self: flex-start;

.footer-text {
  text-align: center;
}
}

@media only screen and (min-width: 1120px) {
  .footer-text {
    margin: 0 auto;
    width: 50%;
    /* background-color:red; */
  }
}
</style>
