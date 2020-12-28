<template>
  <div>
    <draggable tag="ul" :list="sites" handle=".handle" @change="change">
      <li
        class="px-4 py-2 flex items-center bg-white mb-2 rounded-xl shadow hover:shadow-md transition-shadow text-gray-600"
        v-for="(site, index) in sites"
        :key="index"
      >
        <div class="handle mr-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="h-6 w-6 cursor-move"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 8h16M4 16h16"
            />
          </svg>
        </div>
        <img
          class="h-4 w-4 mr-4"
          :src="`http://www.google.com/s2/favicons?domain=${site}`"
        />
        <span class="cursor-default">{{ site }}</span>
        <button @click="remove(index)" class="ml-auto focus:outline-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="h-4 w-4 transform hover:scale-150 transition-transform"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </li>
    </draggable>
  </div>
</template>

<script>
import draggable from "vuedraggable";
export default {
  components: {
    draggable,
  },
  computed: {
    sites() {
      return this.$store.state.sites.sites;
    },
  },
  methods: {
    change(e) {
      if (e.moved) {
        this.$store.commit("sites/update", {
          sites: this.sites,
        });
        this.$store.commit("sites/sync", {
          id: this.$store.state.webviews.active.id,
          webviews: document.getElementsByTagName("webview"),
        });
      }
    },
    remove(id) {
      let switchId = id;
      if (this.$store.state.sites.sites.length == 1) {
        this.$store.commit("settings/reset");
        return;
      } else if (id === this.$store.state.sites.sites.length - 1) {
        switchId = this.$store.state.sites.sites.length - 2;
      }
      this.$store.commit("sites/remove", { id: id });
      this.$store.commit("sites/sync", {
        id: switchId,
        webviews: document.getElementsByTagName("webview"),
      });
    },
  },
};
</script>
<style scoped>
.button {
  margin-top: 35px;
}
.handle {
  float: left;
  padding-top: 8px;
  padding-bottom: 8px;
}
.close {
  float: right;
  padding-top: 8px;
  padding-bottom: 8px;
}
input {
  display: inline-block;
  width: 50%;
}
.text {
  margin: 20px;
}
</style>
