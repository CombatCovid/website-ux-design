<template>
  <v-footer
          dark
          padless
  >
    <v-card
            flat
            tile
            class="dark lighten-1 white--text text-center"
    >
      <v-card-text>
        <v-btn
                v-for="(icon, i) in icons"
                :key="i"
                class="mx-4 white--text"
                icon
                target="_blank"
                :href="icon.link"
        >
          <v-icon size="24px">{{ icon.name }}</v-icon>
        </v-btn>
      </v-card-text>
      <div class="footer-text">
        <p>You're meeting the demonstration app of the Combat Covid with Hardware project.
          <!-- </br> -->
          This is a fast-moving Alpha production, so be reassured if you find that items may move, appear, disappear, and at moments perhaps not function entirely as you expected.
          <!-- </br> -->
          We're moving rapidly and constantly to add what's needed for early real use, and anything unexpected will soon be repaired.

          <!-- </br> -->
          Thank you for your patience, and especially for your interest.
        </p>
      </div>

      <v-divider></v-divider>

      <v-card-text class="white--text">
        {{ new Date().getFullYear() }} — <strong>The CombatCovid with Hardware Team License: GPL 2.0
      </strong>
      </v-card-text>
        <v-card-text>
          <a class="white--text" href="/about#impressum"><strong>Impressum</strong></a>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
  import {
    mdiDiscord,
    mdiGithub,
  } from '@mdi/js'

  export default {
    name: 'the-footer',  // don't use a name that is part of the html spec
    data: () => ({
      icons: [
        { name: mdiGithub, link: "https://github.com/CombatCovid/SPA-website" }
      ]
    }),
  }
</script>

<style scoped>
  .footer-text{
    text-align:center;
  }

  @media only screen and (min-width:1120px){
    .footer-text{
      margin:0 auto;
      width:50%;
      /* background-color:red; */
    }
  }

</style>

