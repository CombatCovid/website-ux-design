<!-- CurrentQuery.vue -->
<template>
  <div>
<!--    {{ query }}-->
    <div v-if="state">
    <ul>
      <li v-for="item in items" :key="item.value">
        <button @click="state.refine(item.value)">
          {{ item.label }}
        </button>
      </li>
    </ul>
    </div>
  </div>
</template>

<script>
  import { createWidgetMixin  } from 'vue-instantsearch'
  import { connectMenu } from 'instantsearch.js/es/connectors'
  export default {
    mixins: [createWidgetMixin({connectMenu}) ],
    props: {
      attribute: {
        type: String,
        required: true,
      },
    },
    computed: {
      widgetParams() {
        return {
          attribute: this.attribute,
        }
      },
      query() {
        return this.searchStore.query
      },
      items() {
        // no if needed here if we v-if in the template
        // only labels of three character long allowed
        console.log('state: ' + JSON.stringify(this.state))
        return this.state.items.filter(item => item.label.length === 3)
      },
    },
  }
</script>

<style scoped>

</style>
