// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`



module.exports = function (api) {
  api.loadSource(actions => {
    actions.getCollection('GitApi')
  })

  api.createPages(async ({ graphql, createPage }) => {
    const { data } = await graphql(`{
      gitapi{
        organization(login: "CombatCovid"){
          repositories(first:50){
            nodes{
              id
              name
          }
        }
      }
    }`)

    console.log(`data is: ${data.gitapi.organization.repositories.nodes.name}`);

    data.gitapi.organization.repositories.forEach(({ nodes }) => {
      createPage({
        path: `/docs/${nodes}`,
        component: './src/templates/Docs.vue',
        context: {
          id: nodes.id
        }
      })
    })
  })
}
