// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/
const axios = require('axios')
const {posts: alephPosts} = require('aleph-js')

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = function (api) {

  api.loadSource( async actions => {

      const collection = actions.addCollection({
          typeName: 'BlogPosts'
      })

    let totalPages = 1;
    let perPage = 20;

    for (let i = 1; i <= totalPages; i++)
    {
        // Latest Posts
        const posts = await alephPosts.get_posts('posts', {
            pagination: perPage,
            page: i,
            addresses: [process.env.ADMIN_ADDRESS],
            channel: 'blog'
        })

        totalPages = Math.ceil(posts.pagination_total / posts.pagination_per_page);

        posts[posts.pagination_item].forEach((post, index) => {
            collection.addNode({
                ...post,
            })
        })
    }
  })

  api.createPages(async ({ graphql, createPage }) => {
      const { data } = await graphql(`{
      allBlogPosts {
        edges {
          node {
            id
            hash
            time
            content{
              title
              body
              category
              meta_description
              tags   
            }
          }
        }
      }
    }`)

      data.allBlogPosts.edges.forEach(({ node }) => {
          createPage({
              path: `/post/${node.hash}`,
              component: './src/templates/Read.vue',
              context: {
                  ...node
              }
          })
      })
  })
}
