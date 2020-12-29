<template>
  <div class="h-full bg-gray-50">
    <div class="container px-4 mx-auto py-16">
      <div class="flex justify-between items-center mb-10">
        <h1
          class="font-display text-gray-700 text-3xl leading-9 font-semibold sm:text-4xl sm:leading-10"
        >
          Settings
        </h1>
        <button
          @click="$store.commit('settings/switch', { id: 0 })"
          class="focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="h-8 w-8 text-gray-500 rounded-full p-1 transition duration-100 ease-in hover:bg-gray-200"
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
      </div>
      <div class="bg-gray-200 h-0.5 mb-5"></div>
      <div class="mb-5 text-gray-500 font-semibold flex space-x-2">
        <a
          class="cursor-pointer hover:underline"
          @click="
            require('electron').shell.openExternal(
              `https://github.com/florian-lefebvre/shortcuts-app/releases/tag/v${require('electron').remote.app.getVersion()}`
            )
          "
          target="_blank"
          >v{{ require("electron").remote.app.getVersion() }}</a
        >
        <a
          class="cursor-pointer hover:underline"
          @click="
            require('electron').shell.openExternal(
              'https://github.com/florian-lefebvre/shortcuts-app/'
            )
          "
          target="_blank"
          >Github</a
        >
      </div>
      <div class="flex justify-between items-center mb-5">
        <h2 class="flex-none text-2xl leading-6 font-medium text-gray-700 mr-3">
          Sites
        </h2>
        <button
          class="inline-flex items-center justify-center rounded-md shadow-sm px-4 py-2 bg-red-500 font-medium text-white hover:bg-red-600 transition duration-150 ease-in focus:outline-none mt-0 ml-3 w-auto text-sm"
          @click="$store.commit('settings/reset')"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="h-4 w-4 mr-2"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
          Delete all
        </button>
      </div>
      <SettingsSitesList />
    </div>
  </div>
</template>

<script>
import SettingsSitesList from "@/components/SettingsSitesList.vue";
export default {
  components: {
    SettingsSitesList,
  },
};
</script>

<style></style>
