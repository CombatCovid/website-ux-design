<template>
  <div>
    <Layout>
      <!-- Learn how to use images here: https://gridsome.org/docs/images -->
      <!-- <Carousel></Carousel> -->
      <v-parallax dark class="parallax">
        <v-layout py-12 row wrap justify-center>
          <v-flex class="header--text" xs12 sm12 md4>
            <div class="">
              <h1 class="font-weight-bold">Combat covid with hardware</h1>
              <h2 class="font-weight-light">Search for well documented designs </br>and document new solutions</h2>
            </div>  
          </v-flex>
          <v-flex py-5 xs12 sm12 md2>
            <div class="iframe__wrapper">
              <div class="iframe">
                <iframe width="560" height="315" 
                  src="https://www.youtube.com/embed/lIPwHRS_imY" 
                  frameborder="0" 
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                  allowfullscreen>
                </iframe>
            </div>
          </div>
          </v-flex>
        </v-layout>
      </v-parallax>

      <v-layout py-10 class="section-2" row wrap justify-center>
        <v-flex class="" xs12 sm4 md3 max-12>
           <v-list>
            <v-subheader class="font-weight-bold">HOW THE APP WORKS</v-subheader>
            <v-list-item v-for="(item, i) in appFeatures" :key="i">
              <v-list-item-content>
                <v-list-item-title class="font-weight-bold" v-html="item.title"></v-list-item-title>
                <v-list-item-subtitle v-html="item.subtitle"></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>


        </v-flex>
        <v-flex class="" xs12 sm4 md3 max-12>
          <v-list>
            <v-subheader class="font-weight-bold">HOW TO DOCUMENT A SOLUTION</v-subheader>
            <v-list-item v-for="(item, i) in documentation" :key="i">
              <v-list-item-content>
                <v-list-item-title class="font-weight-bold" v-html="item.title"></v-list-item-title>
                <v-list-item-subtitle v-html="item.subtitle"></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-flex>
        <v-flex class="" xs12 sm3 md3 max-12>
          <v-list>
            <v-subheader class="font-weight-bold">CONTRIBUTE TO CODE AND MORE</v-subheader>
            <v-list-item v-for="(item, i) in contribute" :key="i">
              <v-list-item-content>
                <v-list-item-title class="font-weight-bold" v-html="item.title"></v-list-item-title>
                <v-list-item-subtitle v-html="item.subtitle"></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-flex>
      </v-layout>
    </Layout>
  </div>
</template>

<script>
import Layout from "~/layouts/Lander.vue";

export default {
  metaInfo: {
    title: "Home",
  },
  components: {
    // Carousel: Carousel
  },
  data(){
    return {
      appFeatures:[
        { title:"Instant search", subtitle:"Go to FINDER and search for keywords like mask" },
        { title: "Download", subtitle: "Download instantly the design you have chosen"},
        { title: "Complete documentation", subtitle: "Find guides, bill of materials, and images"},
        { title: "Github based content delivery", subtitle: "We use github powerful apis to build documents"}

      ],
      documentation:[
        { title: "Find validated solutions", subtitle: "Make sure we are uploading a solution that is effective"},
        { title: "Community guidance", subtitle: "We have a team of contributors that can help you"},
        { title:"Standard", subtitle:"Follow conventions for simple documentation" },

      ],
      contribute:[
        { title:"Code", subtitle:"Help us work on new features" },
        { title: "Clinical feedback", subtitle: "Help us get feedback from experts on solutions"},
        { title: "Translate", subtitle: "Translate to new languages"},
        { title: "Identify new solutions", subtitle: "Help us adding more solutions to the list"},
        { title: "Contact authors", subtitle: "Help us reach the authors of solutions to update the content"},

      ]
    }
  }
};
</script>

<style>
.parallax{
  background: #348F50;  /* fallback for old browsers */
background: -webkit-linear-gradient(to right, #56B4D3, #348F50);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to right, #56B4D3, #348F50); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

}

.header--text{
  padding-top:100px;
}

.debug{
  background-color:red;
  height:200px;
  margin:1px;
}

.home-links a {
  padding-top: 2em;
  margin-right: 1rem;
}

.iframe{
}



@media only screen and (min-width:1120px){
  .home__container{
    width:50%;
  }
  .section-2{
    margin: 0 10% 0 10%;
  }

}

</style>
