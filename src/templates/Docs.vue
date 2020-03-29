<template>
  <Layout class="content">
    <section class="section">
    
      <v-carousel>
        
      </v-carousel>

    <VueRemarkContent />
    </section>
  </Layout>
</template>

<!-- Front-matter fields can be queried from GraphQL layer -->
<page-query>
query Documentation ($id: ID!) {
  documentation(id: $id) {
    title
    excerpt
  }
}
</page-query>