<template>
  <div
    class="fixed top-10 w-14 bg-gray-200 h-screen p-2 text-gray-800 overflow-y-auto custom-scrollbar shadow"
  >
    <button
      v-for="(site, index) in $store.state.sites.sites"
      :key="index"
      @click="switchWebview(index)"
      class="hover:scale-105 transform transition-transform focus:outline-none w-full"
    >
      <div
        class="bg-white rounded-full shadow mb-1"
        :class="
          $store.state.webviews.active.id === index
            ? 'ring-2 ring-gray-400 ring-opacity-75'
            : ''
        "
      >
        <img
          class="w-full p-2.5"
          :src="`http://www.google.com/s2/favicons?domain=${site}`"
        />
      </div>
    </button>
    <button
      @click="$store.commit('modal/toggle')"
      class="hover:scale-105 transform transition-transform focus:outline-none"
    >
      <div class="w-full p-3 rounded-full bg-white shadow mb-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          class="w-full transform scale-150"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      </div>
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    switchWebview(index) {
      this.$store.commit("webviews/switch", { id: index });
    },
  },
};
</script>

<style>
.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #eee;
  border-radius: 20px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #9ca3af;
  border-radius: 20px;
}
</style>
