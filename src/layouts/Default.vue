<template>
  <div class="container max-w-3xl mx-auto px-4 sm:px-6 xl:max-w-5xl xl:px-0">
    <header class="flex justify-between items-center mt-8 mb-12">
      <strong>
        <g-link class="text-2xl" to="/">{{ $static.metadata.siteName }}</g-link>
      </strong>
      <nav>
        <g-link class="ml-6" to="/write">Write</g-link>
      </nav>
    </header>
    <main class="max-w-2xl mx-auto px-4 sm:px-6 xl:max-w-4xl xl:px-0">
      <slot/>
    </main>
  </div>
</template>


<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<script>
import Login from '~/components/Login.vue';

export default {
  components: {
    Login
  }
}
</script>
