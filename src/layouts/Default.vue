<template>
  <div class="container max-w-screen-md mx-auto px-5">
    <header class="flex justify-between items-center mt-8 mb-12">
      <strong>
        <g-link to="/">{{ $static.metadata.siteName }}</g-link>
      </strong>
      <nav>
        <g-link to="/">Home</g-link>
        <g-link class="ml-6" to="/about/">About</g-link>
        <g-link class="ml-6" to="/pages/">Pages</g-link>
      </nav>
    </header>
    <slot/>
  </div>
</template>


<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>
