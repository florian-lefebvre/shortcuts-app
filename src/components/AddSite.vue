<template>
  <div
    class="fixed z-10 inset-0 overflow-y-auto"
    v-if="$store.state.modal.show"
    id="modal"
  >
    <div
      class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      <div class="fixed inset-0 transition-opacity" aria-hidden="true">
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
      <span
        class="hidden sm:inline-block sm:align-middle sm:h-screen"
        aria-hidden="true"
        >&#8203;</span
      >
      <div
        class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="text-center sm:mt-0 sm:text-left">
            <h3
              class="text-lg leading-6 font-medium text-gray-900"
              id="modal-headline"
            >
              Add website
            </h3>
            <div class="mt-2">
              <div class="mt-1 flex rounded-md shadow-sm">
                <span
                  class="inline-flex items-center px-3 py-2 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"
                >
                  https://
                </span>
                <input
                  v-model="url"
                  type="text"
                  v-on:keyup.enter="checkUrl"
                  :class="
                    error ? 'border-red-500 text-red-500' : 'border-gray-300'
                  "
                  class="focus:outline-none px-3 border flex-1 block w-full rounded-none rounded-r-md sm:text-sm"
                  placeholder="www.example.com"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            @click="checkUrl"
            :disabled="url == ''"
            type="button"
            :class="
              url == '' || loading
                ? 'bg-green-800 opacity-50'
                : 'bg-green-600 hover:bg-green-700'
            "
            class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
          >
            Add
          </button>
          <button
            @click="$store.commit('modal/toggle'), (url = '')"
            type="button"
            class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      url: "",
      error: false,
      loading: false,
    };
  },
  watch: {
    url() {
      this.error = false;
    },
  },
  methods: {
    checkUrl() {
      if (this.url == "") {
        return;
      }
      let xhr = new XMLHttpRequest();
      xhr.open("get", "https://" + this.url, true);
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          this.error = false;
          this.url = xhr.responseURL;
        } else {
          this.error = true;
        }
      };
      xhr.onerror = () => {
        this.error = true;
      };
      xhr.onloadend = () => {
        this.loading = false;
        if (!this.error) {
          this.$store.commit("sites/add", { url: this.url });
          this.$store.commit("sites/sync", {
            id: this.$store.state.sites.sites.length - 1,
            webviews: document.getElementsByTagName("webview"),
          });
          this.url = "";
          this.$store.state.modal.show = false;
        }
      };
      xhr.send(null);
      this.loading = true;
    },
  },
};
</script>

<style></style>
