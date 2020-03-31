<template>
  <div>
    <h3>Chosen Designs</h3>
    <v-list>
      <v-list-item v-for="(design, i) in designs" :key="i">
        <h2 class="choice-title" style="cursor: pointer" @click="select(i)">{{design.title}}</h2>
      </v-list-item>
    </v-list>
    <v-snackbar v-model="snackbar" :timeout="snackTimeout" :top="true" color="blue">
    {{ snackMessage }}
    </v-snackbar>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        designs: [ // becomes a list from data, mock here
          {title: 'Medical Shields For 3d Printing', color: 'primary', summary: 'Design 1 summary'},
          {title: 'Design As Will Appear 2', color: 'info', summary: 'Design 2 summary'},
          {title: 'Design 3', color: 'success', summary: 'Design 3 summary'},
          {title: 'Design 4', color: 'warning', summary: 'Design 4 summary'},
          {title: 'Design 5', color: 'danger', summary: 'Design 5 summary'}
        ],
        snackbar: false,
        snackMessage: 'You chose a Design...',
        snackTimeout: 2500
      }
    },
    methods: {
      select: function (index) {
        // if we do select by props, won't need this
        // alert('will soon select: ' + index)
        this.snackbar = true
      }
    }
  }
</script>

<style scoped>

  .choice-title {
    font-size: smaller;
    padding: 0 1em;
  }

</style>
