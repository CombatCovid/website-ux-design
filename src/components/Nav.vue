<template>
  <div>
<!-- leaving hide-on-scroll for the moment at least, because it disturbs link targeting to take out...   -->
    <v-app-bar app dark color="dark-blue" :hide-on-scroll="hideWhen">
<!--      <v-toolbar-items max-width>-->

      <span class="hidden-md-and-up">
        <v-app-bar-nav-icon class="hidden-sg-and-up" @click="sidebar = !sidebar" color="blue">
        </v-app-bar-nav-icon>
      </span>
<!--      <v-img src="/resources/image/combatcovid.png" max-width="50px"></v-img>-->
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">
          <span class="bar-title">{{ $static.metadata.siteName }}</span>
        </router-link>
      </v-toolbar-title>
<!--      <v-spacer></v-spacer>-->

      <v-list class="hidden-sm-and-down"
                       v-for="(item, key) in items"
                       :key="item.label">
<!--        <v-list-item>-->
          <v-btn text exact :to="item.name">{{item.label}}</v-btn>
<!--        </v-list-item>-->
      </v-list>
      <v-spacer></v-spacer>

<!--      <v-btn class="hidden-md-and-up"-->
<!--              icon-->
<!--              color="yellow"-->
<!--              v-on="sidebar"-->
<!--              @click="choicesBar = !choicesBar"-->
<!--      >-->
<!--        <v-icon>{{ extrasIcon }}</v-icon>-->
<!--      </v-btn>-->
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
<!--        <v-list>-->
<!--          <v-list-item-->
<!--                  v-for="n in 5"-->
<!--                  :key="n"-->
<!--                  @click="() => {}"-->
<!--          >-->
<!--            <v-list-item-title>Option {{ n }}</v-list-item-title>-->
<!--          </v-list-item>-->
<!--        </v-list>-->
      </v-menu>
<!--            </v-toolbar-items>-->

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
<!--    <v-navigation-drawer appf v-model="choicesBar" temporary right absolute width="200" id="rdrawer">-->
<!--      <v-list dense nav>-->
<!--        <div-->
<!--                v-for="item in items"-->
<!--                :key="item.name"-->
<!--        >-->
<!--          <v-btn text exact :to="item.name">{{item.label}}</v-btn>-->
<!--        </div>-->
<!--      </v-list>-->
<!--    </v-navigation-drawer>-->
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
          {name: '/finder', label: 'Finder'},
          {name: '/viewer', label: 'Viewer'},
          {name: '/builder', label: 'Builder'},
          {name: '/build-reader', label: 'Reader Builder'},
          {name: '/documentation', label: 'Documentation'},
          {name: '/about', label: 'About'}
        ]
      }
    },
    computed: {
      hideWhen: function () {
        const w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth

        console.log ('width: ' + w);
        return w <= 640
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

  /* a:active{
    background:red;
  } */

  .bar-title {
    font-size: small;
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
