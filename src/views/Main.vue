<template>
  <div>
    <div class="flex h-full" v-show="$store.state.settings.currentPage == 0">
      <Sidebar />
      <Header />
      <div class="w-full pl-14 pt-10">
        <div class="contents" v-if="$store.state.sites.sites.length !== 0">
          <webview
            v-for="(site, index) in $store.state.sites.sites"
            :key="index"
            class="w-full h-full"
            v-show="index == $store.state.webviews.active.id"
            autosize="on"
            :src="site"
            :preload="
              `file:///${require('path').join(staticDir, './preload.js')}`
            "
          ></webview>
        </div>
        <div v-else class="flex justify-center pt-10">
          <div class="flex flex-col items-center">
            <h2
              class="font-display text-gray-500 text-3xl leading-9 font-semibold sm:text-4xl sm:leading-10 mb-5"
            >
              You have not yet added any sites...
            </h2>
            <h3
              class="flex-none text-2xl leading-6 font-medium text-gray-500 mr-3 mb-10"
            >
              Add one to get started!
            </h3>
            <button
              @click="$store.commit('modal/toggle')"
              class="focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                class="h-40 w-40 text-gray-500 bg-gray-300 rounded-full p-6 border-dashed hover:shadow-lg transition duration-150 ease-in-out"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <AddSite />
    </div>
    <transition
      enter-active-class="transition ease-out duration-100"
      enter-class="transform opacity-0 scale-50"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-50"
    >
      <Settings v-show="$store.state.settings.currentPage == 1" />
    </transition>
  </div>
</template>

<script>
/* global __static */
import Sidebar from "@/components/Sidebar.vue";
import AddSite from "@/components/AddSite.vue";
import Header from "@/components/Header.vue";
import Settings from "@/components/Settings.vue";
export default {
  name: "Main",
  components: {
    Sidebar,
    AddSite,
    Header,
    Settings,
  },
  data() {
    return {
      staticDir: __static,
    };
  },
  created() {
    window.addEventListener("DOMContentLoaded", () => {
      this.$store.commit("settings/load");
      if (this.$store.state.sites.sites.length > 0) {
        this.$store.commit("sites/sync", {
          id: 0,
          webviews: document.getElementsByTagName("webview"),
        });
        this.$store.commit("webviews/initLastUrls");
      }
    });
  },
  methods: {},
};
</script>

<style></style>
