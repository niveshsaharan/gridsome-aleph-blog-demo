<template>
  <Layout>
        <div class="divide-y divide-gray-200">
          <div class="pt-6 pb-8 space-y-2 md:space-y-5">
            <h1 class="text-xl leading-9 font-bolder text-gray-900 tracking-tight sm:text-xl sm:leading-10 md:text-2xl md:leading-14">Latest Posts</h1>
          </div>
          <ul class="divide-y divide-gray-200">
            <li class="py-12" v-for="edge in $page.posts.edges" :key="edge.node.id">
              <article class="space-y-2 xl:grid xl:grid-cols-4 xl:space-y-0 xl:items-baseline">
                <dl>
                  <dt class="sr-only">Published on</dt>
                  <dd class="text-base leading-6 font-medium text-gray-500">
                    <time datetime="2021-04-07T07:58:31Z">{{ moment(edge.node.time * 1000).format('MMMM DD, YYYY') }}</time>
                  </dd>
                </dl>
                <div class="space-y-5 xl:col-span-3">
                  <div class="space-y-6">
                    <h2 class="text-2xl leading-8 font-bold tracking-tight">
                      <g-link data-gtm="Read post" class="text-gray-900" :to="'/post/' + edge.node.hash">{{edge.node.content.title}}</g-link>
                  </h2>
                    <div class="prose text-gray-500">
                      {{edge.node.content.meta_description}}
                    </div>
                  </div>
                  <div class="text-base leading-6 font-medium">
                    <g-link data-gtm="Read full post"
                        class="text-green-500 hover:text-green-600"
                        :aria-label="edge.node.content.title"
                        :to="'/post/' + edge.node.hash">Read full post →</g-link>
                  </div>
                </div>
              </article>
            </li>
          </ul>
        </div>

    <Pager :info="$page.posts.pageInfo"/>

  </Layout>
</template>

<page-query>
query($page: Int) {
  posts: allBlogPosts(perPage: 100, page: $page, sortBy: "time", order: DESC) @paginate {
    pageInfo {
      totalPages
      currentPage
    }
    edges {
      node {
        id
        time
        hash
        content {
          title
          body
          category
          meta_description
          tags
        }
      }
    }
  }
}
</page-query>


<script>
import {Pager} from 'gridsome';

export default {
  metaInfo: {
    title: 'Hello, world!'
  },
  components: {
    Pager,
  },
}
</script>
