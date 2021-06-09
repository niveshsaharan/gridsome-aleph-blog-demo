<!--
  This example requires Tailwind CSS v2.0+

  This example requires some changes to your config:

  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ]
  }
  ```
-->
<template>
  <layout>
    <form class="space-y-8 divide-y divide-gray-200">
      <div class="space-y-8 divide-y divide-gray-200">
        <div>
          <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div class="sm:col-span-6">
              <label for="title" class="block text-sm font-medium text-gray-700">
                Title
              </label>
              <div class="mt-1 rounded-md shadow-sm">
                <input type="text" v-model="title" id="title" placeholder="Enter a title" autocomplete="title" class="focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300" />
              </div>
            </div>

            <div class="sm:col-span-6">
              <label for="body" class="block text-sm font-medium text-gray-700">
                Post content
              </label>
              <div class="mt-1">
                <textarea id="body" v-model="body" rows="10" placeholder="Your post content" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md" />
              </div>
            </div>

            <div class="sm:col-span-4">
              <label for="category" class="block text-sm font-medium text-gray-700">
                Categories
              </label>
              <div class="mt-1">
                <select id="category" v-model="category" autocomplete="category" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md">
                  <option disabled value="">Select</option>
                  <option>Laravel</option>
                  <option>JavaScript</option>
                  <option>Php</option>
                  <option>Shopify</option>
                  <option>Random</option>
                  <option>Other</option>
                  <option>Crypto</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div class="pt-8">
          <div>
            <h3 class="text-lg leading-6 font-medium text-gray-900">
              SEO Information
            </h3>
          </div>
          <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">

            <div class="sm:col-span-6">
              <label for="meta_description" class="block text-sm font-medium text-gray-700">
                Meta description
              </label>
              <div class="mt-1">
                <textarea id="meta_description" v-model="meta_description" rows="2" maxlength="160" placeholder="Your post summary for search engines" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md" />
              </div>
            </div>

            <div class="sm:col-span-6">
              <label for="keywords" class="block text-sm font-medium text-gray-700">
                SEO Keywords / Tags
              </label>
              <div class="mt-1">
                <input type="text" v-model="tags" id="keywords" placeholder="Enter a few keywords" autocomplete="keywords" class="focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300" />
              </div>
            </div>

          </div>
        </div>

      </div>

      <div class="py-5">
        <div class="flex justify-end">
          <button v-if="can_save" @click="save" type="button" class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Save
          </button>
          <button v-else type="button" class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
            Save
          </button>
        </div>
      </div>
    </form>
  </layout>
</template>

<script>
import {posts, ethereum} from 'aleph-js';

export default {
  metaInfo: {
    title: 'Write new post'
  },
  data(){
    return {
      account: null,
      title: '',
      body: '',
      category: '',
      tags: '',
      meta_description: '',
    }
  },
  computed:{
    can_save(){
      if(this.body.trim() && this.title.trim() && this.category.trim() && this.tags.trim() && this.meta_description.trim())
      {
        return true;
      }
      return false;
    }
  },
  methods:{
    async login(){
      if (window.ethereum) {
        try{
          await window.ethereum.enable()
          this.account = await ethereum.from_provider(window['ethereum'] || window.web3.currentProvider)
        }catch (error){
          alert("Something went wrong!");
          return;
        }
      }
      else{
        alert("Not supported!");
        return;
      }

      if(! this.account)
      {
        alert("Error getting web3 account")
        return
      }
    },
    async save(){
      if(! this.can_save)
      {
        alert("Please fill all the required fields.");
        return;
      }

      const tags = this.tags.split(',').map(tag => tag.trim()).filter(tag => tag && tag.trim());

      try{
        const response = await posts.submit(
            this.account.address,
            'posts',
            {
              title: this.title,
              body: this.body,
              category: this.category,
              tags: tags,
              meta_description: this.meta_description
            }, {
              account: this.account,
              channel: 'blog',
            });


          if(process.env.GRIDSOME_DEPLOY_HOOK_URL)
          {
            if(! process.env.GRIDSOME_ADMIN_ADDRESS || this.account.address.toLowerCase() === process.env.GRIDSOME_ADMIN_ADDRESS.toLowerCase())
            {
              await fetch(process.env.GRIDSOME_DEPLOY_HOOK_URL, {
                method: 'POST'
              });

              alert("Post is created and you should see that once the next deployment is completed!");
            }
            else{
              alert("Post is created but you won't see it because you are not the authorised writer for this blog :)!");
            }
          }
          else{
            alert("Post is created but you won't see it till the blog is re-deployed!");
          }

          window.location.href = '/';
      }
      catch (error){
        alert("something went wrong: " + error);
      }
    }
  },
  mounted(){
    this.login();
  }
}
</script>
