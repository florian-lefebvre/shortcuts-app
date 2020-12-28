<template>
  <div
    class="fixed top-0 left-0 h-10 w-full bg-gray-200 flex px-2 py-1 items-center space-x-2 shadow"
  >
    <div
      class="flex space-x-1 text-gray-500"
      v-if="$store.state.webviews.active.el !== null"
    >
      <button :class="btnControl" @click="$store.commit('webviews/goBack')">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          :class="[
            svgControl,
            $store.state.webviews.active.el.canGoBack()
              ? svgAvailable
              : svgUnavailable,
          ]"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <button :class="btnControl" @click="$store.commit('webviews/goForward')">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          :class="[
            svgControl,
            $store.state.webviews.active.el.canGoForward()
              ? svgAvailable
              : svgUnavailable,
          ]"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
      <button :class="btnControl" @click="$store.commit('webviews/reload')">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          :class="[svgControl, svgAvailable]"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
      </button>
    </div>
    <div class="flex space-x-1 text-gray-500" v-else>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        :class="[svgControl, svgUnavailable]"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M15 19l-7-7 7-7"
        />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        :class="[svgControl, svgUnavailable]"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 5l7 7-7 7"
        />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        :class="[svgControl, svgUnavailable]"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
        />
      </svg>
    </div>
    <div class="bg-gray-300 h-6 px-2 rounded-2xl text-gray-700 truncate w-full">
      {{ $store.state.webviews.url }}
    </div>
    <div
      class="flex space-x-1 text-gray-500"
      v-if="$store.state.webviews.active.el !== null"
    >
      <button
        :class="btnControl"
        @click="$store.commit('webviews/toggleDevTools')"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          :class="[svgControl, svgAvailable]"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
          />
        </svg>
      </button>
    </div>
    <div class="flex space-x-1 text-gray-500" v-else>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        :class="[svgControl, svgUnavailable]"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
        />
      </svg>
    </div>
    <button
      :class="btnControl"
      @click="$store.commit('settings/switch', { id: 1 })"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        class="text-gray-500"
        :class="[svgControl, svgAvailable]"
      >
        <path
          fill-rule="evenodd"
          d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
          clip-rule="evenodd"
        />
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    test() {
      alert("TEST");
    },
  },
  computed: {
    svgControl() {
      return "w-7 rounded-full p-1 transition duration-100 ease-in";
    },
    svgAvailable() {
      return "hover:bg-gray-300 cursor-pointer";
    },
    svgUnavailable() {
      return "opacity-50";
    },
    btnControl() {
      return "focus:outline-none cursor-default";
    },
  },
};
</script>

<style></style>
