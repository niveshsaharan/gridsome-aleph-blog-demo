<template>
  <Layout>
    <article class="xl:divide-y xl:divide-gray-200">
      <header class="pt-6 xl:pb-10">
        <div class="space-y-1 text-center">
          <dl class="space-y-10">
            <div>
              <dt class="sr-only">Published on</dt>
              <dd class="text-base leading-6 font-medium text-gray-500">
                <time datetime="2021-04-07T07:58:31Z">{{ moment($context.time * 1000).format('dddd, MMMM DD, YYYY')}}</time>
              </dd>
            </div>
          </dl>
          <div>
            <h1 class="text-3xl leading-9 font-extrabold text-gray-900 tracking-tight sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">{{ $context.content.title}}</h1></div>
        </div>
      </header>
      <div class="divide-y xl:divide-y-0 divide-gray-200 pb-16 xl:pb-20"
           style="grid-template-rows: auto 1fr;">
        <div class="divide-y divide-gray-200 xl:pb-0">
          <div class="prose pt-10 pb-8 max-w-none" v-html="$context.content.body">
          </div>
        </div>
      </div>
    </article>
  </Layout>
</template>


<script>
export default {
  metaInfo() {
    return {
      title: this.$context.content.title,
    }
  },

  mounted() {
    this.title = this.$context.content.title;
  }
}
</script>
