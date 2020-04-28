<template>
  <div>
    <v-app-bar app dark color="dark-blue" :hide-on-scroll="hideWhen">
      <span class="hidden-md-and-up">
        <v-app-bar-nav-icon class="hidden-sg-and-up" @click="sidebar = !sidebar" color="blue"></v-app-bar-nav-icon>
      </span>
      <!--      <v-img src="/resources/image/combatcovid.png" max-width="50px"></v-img>-->

      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">
          <span class="bar-title">{{ $static.metadata.siteName }}</span>
        </router-link>
      </v-toolbar-title>

      <v-list class="hidden-sm-and-down" v-for="(item) in items" :key="item.label">
        <div v-if="item.label === 'Viewer' && !designRemembered">
          <v-menu
            nudge-right="-100"
            nudge-bottom="20"
            :v-model="false"
            :disabled="false"
            :absolute="false"
            :open-on-hover="true"
            :close-on-click="true"
            :close-on-content-click="true"
            :offset-x="false"
            :offset-y="true"
          >
            <template v-slot:activator="{ on }">
                <v-btn
                  text
                  v-on="on"
                  color="red"
                  :class="item.class"
                  exact
                  @click="firstTimeViewer = !firstTimeViewer"
                >{{item.label}}</v-btn>
            </template>
            <NavTipMsg/>

            <!-- <div class="menu-announcement-look horiz-center">
              <div class="menu-announcement-frame">
                <div class="menu-announcement-message">
                  <h2>Hi, looks like you're new here, Welcome...</h2>
                  <br>
                  <h3>Use the Finder, please, and you can choose a Design</h3>
                  <br>
                  <p class="">(After the first time, we'll always remember it!)</p>
                </div>
              </div>
            </div>-->
          </v-menu>
        </div>
        <div v-else>
          <v-btn text :color="item.color" :class="item.class" exact :to="item.name">{{item.label}}</v-btn>
        </div>
      </v-list>
      <v-spacer></v-spacer>
      <v-menu left bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on" color="yellow">
            <v-icon>{{ extrasIcon }}</v-icon>
          </v-btn>
        </template>
      </v-menu>
    </v-app-bar>
    <v-navigation-drawer appf v-model="sidebar" temporary absolute width="200" id="drawer">
      <v-list dense nav>
        <div v-for="item in items" :key="item.name">
          <div v-if="item.label === 'Viewer' && !designRemembered">
            <v-menu
              nudge-width="320"
              nudge-bottom
              :v-model="false"
              :disabled="false"
              :absolute="false"
              :open-on-hover="true"
              :close-on-click="true"
              :close-on-content-click="true"
              :offset-x="true"
              :offset-y="true"
            >
              <template v-slot:activator="{ on }">
                <v-btn
                  v-on="on"
                  text
                  color="red"
                  :class="item.class"
                  exact
                  @click="firstTimeViewer = !firstTimeViewer"
                >{{item.label}}</v-btn>
              </template>
              <NavTipMsg/>
            </v-menu>
          </div>
          <div v-else>
            <v-btn text :color="item.color" :class="item.class" exact :to="item.name">{{item.label}}</v-btn>
          </div>
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
import store from "~/store";
import { mdiDotsVertical, mdiDotsHorizontal } from "@mdi/js";
import BookmarksMenu from "./BookmarksMenu";
import NavTipMsg from "./NavTipMsg";

export default {
  name: "Nav",
  components: { BookmarksMenu, NavTipMsg },
  data: function() {
    return {
      sidebar: false,
      choicesBar: false,
      firstTimeViewer: false,
      ccwhIcon: "/resources/images/combatcovid.png",
      extrasIcon: mdiDotsVertical,
      designIcon: mdiDotsHorizontal,
      items: [
        { name: "/", label: "Home", color: "teal", class: "spaced-btn" },
        {
          name: "/finder",
          label: "Finder",
          color: "blue",
          class: "soft-antwerp-light"
        },
        {
          name: "/viewer",
          label: "Viewer",
          color: "blue",
          class: "soft-antwerp-light spaced-btn"
        },
        {
          name: "/documentation",
          label: "Documentation",
          color: "teal",
          class: "spaced-btn"
        },
        { name: "/about", label: "About", color: "teal", class: "spaced-btn" }
      ]
    };
  },
  computed: {
    hideWhen: function() {
      if (typeof window !== "undefined") {
        const w =
          window.innerWidth ||
          document.documentElement.clientWidth ||
          document.body.clientWidth;
        return w <= 640;
      } else {
        return false;
      }
    },
    designRemembered: function() {
      return store.getters.lastRepoName;
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
.momento {
  background-color: white;
  height: 400px;
  padding: 10px;
}
.momento-text {
  text-align: center;
  vertical-align: center;
}
.spaced-btn {
  margin: 0 2px;
}
.soft-antwerp-light {
  color: #2b8cb4 !important;
  margin: 2px;
}

.horiz-center {
  margin: 0 auto;
  text-align: center;
}

.menu-announcement-look {
  background: linear-gradient(to right, rgb(86, 180, 211), rgb(52, 143, 80));
  /*background: beige;*/
  color: lightgoldenrodyellow;
  /*color: #0c3e72;*/
  padding: 40px;
  margin: -20px;
  overflow: hidden; /* no scrollbars, thank you */
}

.menu-announcement-frame {
  max-width: 700px;
  margin: 40px auto;
}

/* .menu-announcement-message {
    margin: 40px;
  } */

@media only screen and (max-width: 640px) {
  .menu-announcement-look {
    padding: 20px;
    margin: -20px;
  }

  .menu-announcement-message {
    margin: 20px;
  }
}
</style>
