<template>
  <div>
    <Layout>
      <div dark class="parallax">
        <v-layout py-12 row wrap justify-center>
          <v-flex class="ma-2" xs12 sm12 md4 lg4>
            <div class="header--text hero-statements">
              <h1 class="horiz-center font-weight-bold">
                Combat covid&nbsp;with hardware
              </h1>
              <h2 class="horiz-center font-weight-light">
                Search for well documented&nbsp;<span class="title-emphasis">designs</span>&nbsp;🔍
                <br/>and <span class="title-emphasis">document</span> new solutions
              </h2>
            </div>
            <v-layout xs12 md4 row wrap class="pt-2 ma-3" justify-center>
              <v-btn to="/finder" class="ma-1 centered"
                     dark color="blue">Search for designs
              </v-btn>
              <v-btn to="/documentation#prepare" class="ma-1 centered"
                     dark color="orange">Upload designs
              </v-btn>
            </v-layout>

          </v-flex>
          <v-flex py-5 xs12 sm12 md4 style="margin:1.5em;">
            <div class="iframe--shadow">
              <div class="iframe-container">
                <iframe class="iframe"
                        src="https://www.youtube.com/embed/lIPwHRS_imY"
                        frameborder="0"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen>
                </iframe>
              </div>
            </div>
          </v-flex>
        </v-layout>
      </div>
      <v-layout py-10 class="section-2" row wrap justify-center>
        <v-flex class="" xs12 sm4 md4 max-12>
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
        <v-flex class="" xs12 sm4 md4 max-12>
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
      <Footer/>
    </Layout>
  </div>
</template>

<script>

  import Footer from '~/components/Footer'

  export default {
    metaInfo: {
      title: "Home",
    },
    components: {
      Footer
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
        ],
        icons: [
          'fab fa-facebook',
          'fab fa-twitter',
          'fab fa-google-plus',
          'fab fa-linkedin',
          'fab fa-instagram',
        ],
      }
    }
  }
</script>

<style scoped>

  .parallax {
    background: #348F50; /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #56B4D3, #348F50); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #56B4D3, #348F50); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }

 .title-emphasis{
    font-weight: 700;
  }

  .iframe-container {
    overflow: hidden;
    padding-top: 56.25%;
    position: relative;
  }

  .iframe-container .iframe {
    /* padding:1em; */
    margin: 0 auto;
    border: 0;
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
  }

  .iframe--shadow {
    -moz-box-shadow: 4px 4px 14px #000;
    -webkit-box-shadow: 4px 4px 14px #000;
    box-shadow: 4px 4px 14px #000;
  }

  .iframe--shadow {
    -webkit-box-shadow: 6px 11px 53px 0px rgba(0, 0, 0, 0.59);
    -moz-box-shadow: 6px 11px 53px 0px rgba(0, 0, 0, 0.59);
    box-shadow: 6px 11px 53px 0px rgba(0, 0, 0, 0.59);
  }

  .header--text {
    padding-top: 100px;
    color: white;
    text-align: center;
  }

  .debug {
    background-color: red;
    height: 200px;
    margin: 1px;
  }

  .home-links a {
    padding-top: 2em;
    margin-right: 1rem;
  }


  @media only screen and (min-width: 1120px) {

    .section-2 {
      margin: 0 10% 0 10%;
    }

    .header--text {
      padding-top: 100px;
      color: white;
      text-align: left;
    }
  }

  .horiz-center {
    margin: 0 auto;
    text-align: center;
  }

  .hero-statements {
    padding-top: 10%;
    /*font-size: small;*/
  }

  @media only screen and (max-width: 959px) {
    .hero-statements {
      padding-top: 14%;
      /*font-size: small;*/
    }
  }


</style>
