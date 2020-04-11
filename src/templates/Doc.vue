<template>
    <Layout style="padding-top:100px">
        <h1>Hey {{$context.name }}</h1>
        <v-flex xs12 md3 v-for="repo in $page.gitapi.organization.repositories.nodes" :key="repo.name">
            <div v-if="$context.name == repo.name">
                <p>{{$context.name}}</p>
                <div                    
                >
                <v-img 
                   v-if="repo.images !== null"
                   v-for="img in repo.images.entries"
                   p-5 class="white--text align-end" height="200px"
                   :src="getImgUrl(repo.nameWithOwner, img.name)"
                   :key="repo.id"
                >
                </v-img>
                <v-img v-else
                   p-5 class="white--text align-end" height="200px"
                   src="/resources/image/image-placeholder.png"
                >
                </v-img>
                </div>
            </div>
        </v-flex>
    </Layout>
</template>
<script>
export default {
    name:"Doc",
    metaInfo:'hello World',
    meta:[
        {name:"author", content:"John Doe"}
    ],
    methods: {
    getImgUrl: function(repoName, fileName){
      if(fileName!== null){
        return `https://raw.githubusercontent.com/${repoName}/master/docs/img/${fileName}`
      }
    },
    showContent(repoName){
       return this.$router.push({ path: `/doc/${repoName}` })
    }
  }
}
   
</script>

<page-query>
  query Jurra3 {
  gitapi {
    organization(login:"CombatCovid"){
      repositories(first:50){
        nodes {
          name
          nameWithOwner
          docs: object(expression: "master:docs") {
            ... on GitApi_Tree {
              folders: entries {
                lang: name
                ... FolderInfo
              }
            }
           }
           images: object(expression: "master:docs/img") {
             ... on GitApi_Tree {
               entries {
                 name
               }
             }
           }
           srcs: object(expression: "master:src") {
             ... on GitApi_Tree {
               entries {
                 name
               }
             }
           }
        }
      }
    }
  }
}

fragment FolderInfo on GitApi_TreeEntry {
    contents: object {
      ... on GitApi_Tree {
        files: entries {
          name
          object {
            ...on GitApi_Blob {
              isBinary
              text
            }
          }
        }
      }
    }
  }
</page-query>
