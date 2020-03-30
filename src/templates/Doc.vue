<template>
    <Layout style="padding-top:100px">
        <h1>Hey {{$context.name }}</h1>
        <v-flex xs12 md3 v-for="repo in $page.gitapi.organization.repositories.nodes" :key="repo.name">
            <p v-if="$context.name == repo.name">{{$context.name}}</p>
        </v-flex>
        </div>
    </Layout>

</template>
<script>
export default {
    name:"Doc",
    metaInfo:'hello World',
    meta:[
        {name:"author", content:"John Doe"}
    ],
}
   
</script>

<page-query>
query Doc{
    gitapi{
        organization(login:"CombatCovid"){
            repositories(first:50){
                nodes{
                  name
                  nameWithOwner
                }
            }
        }
    }
}
</page-query>