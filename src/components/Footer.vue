<template>
  <footer class="w-screen bg-primary-100 py-24">
    <p class="text-md text-white-100 text-center">
      &copy; {{ new Date().getFullYear() }} - The CombatCovid with Hardware Team
      License: GPL 2.0, Version: {{ appVersion }}
    </p>
    <p class="text-md text-white-100 text-center">
      <b>
        <g-link to="/about#impressum">Impressum, Cookies, Cautionary Statement</g-link>
      </b>
    </p>
    <br>
    <p class="text-md text-white-100 text-center issues-msg">
      Should you find issues in using this application,
      please report them in the Open Source way, via
      <a href="https://github.com/CombatCovid/combat-covid-issues/issues" target="_blank">
        <b><u>Combat Covid Issues</u></b></a>,
      thank you.
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
  }),
  computed: {
    appVersion: function () {
      return this.pkgAppVersion() // process.env.GRIDSOME_CC_APP_VERSION
    }
  }
};
</script>

<style lang="scss" scoped>
footer {
  justify-self: flex-start;

  .footer-text {
    text-align: center;
  }
}

.issues-msg {
  width: 80%;
  max-width: 640px;
  margin: 0 auto;
}

@media only screen and (min-width: 1120px) {
  .footer-text {
    margin: 0 auto;
    width: 50%;
    /* background-color:red; */
  }
}
</style>
