<template>
  <div>
    <v-app-bar sticky app dark color="dark-blue">
      <span class="hidden-md-and-up">
        <v-app-bar-nav-icon class="hidden-sg-and-up" @click="sidebar = !sidebar" color="blue">
        </v-app-bar-nav-icon>
      </span>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">
          <h1 class="bar-title">{{ $static.metadata.siteName }}</h1>
        </router-link>
      </v-toolbar-title>

      <v-list class="hidden-sm-and-down"
                       v-for="(item, key) in items"
                       :key="item.label">
          <v-btn v-if="item.label == `Finder`" style="margin-left:10px;" class="blue" text exact :to="item.name">{{item.label}}</v-btn>
          <v-btn v-else text exact :to="item.name">{{item.label}}</v-btn>     
      </v-list>
      <v-spacer></v-spacer>
      <v-list>
        <v-btn
          v-for="icon in icons"
          :key="icon"
          :to="icons.link"
          icon
        >
          <v-icon size="24px">{{ icon.name }}</v-icon>
        </v-btn>
      </v-list>
      
      <v-menu
              left
              bottom
      >
        
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on" color="yellow">
            <v-icon>{{ extrasIcon }}</v-icon>
          </v-btn>
        </template>

        <div class="below-bar">
          <DesignChoices/>
        </div>
      </v-menu>

    </v-app-bar>
    <v-navigation-drawer appf v-model="sidebar" temporary absolute width="200" id="drawer">
      <v-list dense nav>
        <div
                v-for="item in items"
                :key="item.name"
        >
          <v-btn text exact :to="item.name">{{item.label}}</v-btn>
        </div>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<static-query>
  query{
    metadata{
      siteName
    }
  }
</static-query>

<script>

  import { mdiDotsVertical, mdiDotsHorizontal } from '@mdi/js'
  import DesignChoices from './DesignChoices';
  
  import {
    mdiDiscord,
    mdiGithub,
  } from '@mdi/js'


  export default {
    name: "Nav",
    components: {DesignChoices},
    data: function () {
      return {
        sidebar: false,
        choicesBar: false,
        ccwhIcon: '/resources/images/combatcovid.png',
        extrasIcon: mdiDotsVertical,
        designIcon: mdiDotsHorizontal,
        items: [
          {name: '/', label: 'Home'},
          // {name: '/jose-connect', label: 'Jurra Connect'},
          {name: '/finder', label: 'Finder'},
          {name: '/viewer', label: 'Viewer'},
          // {name: '/documentation', label: 'Documentation'},
          // {name: '/about', label: 'About'}
        ],
        icons: [
          { name: mdiDiscord, link:"https://discord.gg/rYHCBt"},
          { name: mdiGithub, link:"https://github.com/CombatCovid/SPA-website" }
        ]
      }
    }
  };
</script>

<style scoped>
  a {
    color: white;
    text-decoration: none;
  }

  a:visited {
    color: white;
  }

  .primary-nav-btn{
      background: #348F50;  /* fallback for old browsers */
      background: -webkit-linear-gradient(to right, #56B4D3, #348F50);  /* Chrome 10-25, Safari 5.1-6 */
      background: linear-gradient(to right, #56B4D3, #348F50); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }

  .bar-title {
    font-size: large;
    padding: 0 1em;
  }
  .below-bar {
    margin-top: 60px;
    padding: 10px;
    background-color: white;
  }
  .our-bar {
    width: 100%;
  }
  .v-toolbar.v-toolbar--absolute {width: auto !important;}

  .v-toolbar__content, .v-toolbar__extension {
    padding: 0 !important;
  }
  .momento {
    background-color: white;
    height: 400px;
    padding: 10px;
  }
  .momento-text {
    text-align: center;
    vertical-align: center;
  }
</style>
