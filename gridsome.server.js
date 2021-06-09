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
    let totalPostsCreated = 0;

    for (let i = 1; i <= totalPages; i++)
    {
        const configs = {
            pagination: perPage,
            page: i,
            channel: 'blog'
        };

        const addresses = [process.env.GRIDSOME_ADMIN_ADDRESS].filter(Boolean);

        if(addresses && addresses.length){
            configs.addresses = addresses;
        }

        // Latest Posts
        const posts = await alephPosts.get_posts('posts', configs)

        totalPages = Math.ceil(posts.pagination_total / posts.pagination_per_page);

        posts[posts.pagination_item].forEach((post, index) => {
            collection.addNode({
                ...post,
            });

            totalPostsCreated++;
        });
    }

    // Just a demo post
    if( !totalPostsCreated)
    {
        // Latest Posts
        const posts = await alephPosts.get_posts('posts', {
            pagination: 1,
            page: 1,
            hashes: ['8b4473c20beddd89ccec1b7d81a11fdbd6a56e9f59ff6a856fc9dd6c3f8123cd']
        })

        posts[posts.pagination_item].forEach((post, index) => {
            collection.addNode({
                ...post,
            });
        });
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

      if(data && data.allBlogPosts)
      {
          data.allBlogPosts.edges.forEach(({ node }) => {
              createPage({
                  path: `/post/${node.hash}`,
                  component: './src/templates/Read.vue',
                  context: {
                      ...node
                  }
              })
          })
      }

  })
}
