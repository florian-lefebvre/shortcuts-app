import Vue from "vue";
import Vuex from "vuex";
const ElectronStore = require("electron-store");
const ESstore = new ElectronStore();
const { shell } = require("electron");
function IpcHandler(store, id) {
  return function(e) {
    if (e.channel == "locationchange") {
      store.commit("webviews/watchUrl", { e: e, id: id });
    } else if (e.channel == "notification") {
      console.log("notification");
      console.log(e);
    } else if (e.channel == "notification-click") {
      console.log("notification-click");
      console.log(e);
    }
  };
}
function WillNavigateHandler(store) {
  store;
  return function(e) {
    if (
      !e.url.startsWith(store.state.sites.sites[store.state.webviews.active.id])
    ) {
      store.state.webviews.active.el.stop();
      if (!store.state.webviews.openExternal) {
        store.state.webviews.openExternal = true;
        shell.openExternal(e.url);
        setTimeout(() => {
          store.state.webviews.openExternal = false;
        }, 10);
      }
    }
  };
}
function NewWindowHandler(store) {
  return function(e) {
    if (!store.state.webviews.openExternal) {
      store.state.webviews.openExternal = true;
      shell.openExternal(e.url);
      setTimeout(() => {
        store.state.webviews.openExternal = false;
      }, 10);
    }
  };
}
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    settings: {
      namespaced: true,
      state: () => ({
        pages: ["home", "settings"],
        currentPage: 0,
      }),
      mutations: {
        save() {
          ESstore.set("sites", this.state.sites.sites);
        },
        load() {
          let s = ESstore.get("sites");
          if (typeof s !== "undefined") {
            this.state.sites.sites = s;
          }
        },
        reset() {
          ESstore.delete("sites");
          this.state.sites.sites = [];
          this.commit("sites/update", { sites: [], webviews: [], id: null });
          this.commit("webviews/updateUrl", { url: "" });
          this.commit("webviews/update", { webviews: [] });
          this.commit("webviews/switch", { id: null });
        },
        switch(state, { id }) {
          state.currentPage = id;
        },
      },
    },
    sites: {
      namespaced: true,
      state: () => ({
        sites: [],
        favicons: [],
      }),
      mutations: {
        add(state, { url }) {
          state.sites.push(url);
        },
        remove(state, { id }) {
          state.sites.splice(id, 1);
        },
        update(state, { sites }) {
          state.sites = sites;
        },
        sync(state, { id, webviews }) {
          this.commit("settings/save");
          this.commit("webviews/update", { webviews: webviews });
          setTimeout(() => {
            this.commit("webviews/switch", { id: id });
          }, 10);
        },
      },
    },
    webviews: {
      namespaced: true,
      state: () => ({
        webviews: [],
        active: { id: null, el: null },
        url: "",
        lastUrls: [],
        openingExternal: false,
      }),
      mutations: {
        update(state, { webviews }) {
          state.webviews = webviews;
        },
        switch(state, { id }) {
          if (state.active.id !== null) {
            state.active.el.removeEventListener(
              "ipc-message",
              IpcHandler(this, id)
            );
            state.active.el.removeEventListener(
              "will-navigate",
              WillNavigateHandler(this)
            );
            state.active.el.removeEventListener(
              "new-window",
              NewWindowHandler(this)
            );
          }
          state.active.id = id;
          if (id !== null) {
            state.active.el = state.webviews[id];
          } else {
            state.active.el = null;
          }
          if (state.active.id !== null) {
            this.commit("webviews/updateUrl", { url: state.lastUrls[id] });
            state.active.el.addEventListener(
              "ipc-message",
              IpcHandler(this, id)
            );
            state.active.el.addEventListener(
              "will-navigate",
              WillNavigateHandler(this)
            );
            state.active.el.addEventListener(
              "new-window",
              NewWindowHandler(this)
            );
          }
        },
        watchUrl(state, { e, id }) {
          if (e.channel === "locationchange") {
            let data = e.args[0];
            this.commit("webviews/updateLastUrl", { id: id, url: data.url });
            this.commit("webviews/updateUrl", { url: data.url });
          }
        },
        updateUrl(state, { url }) {
          state.url = url;
        },
        goBack(state) {
          if (state.active.el.canGoBack()) {
            state.active.el.goBack();
          }
        },
        goForward(state) {
          if (state.active.el.canGoForward()) {
            state.active.el.goForward();
          }
        },
        reload(state) {
          state.active.el.reload();
        },
        initLastUrls(state) {
          this.state.sites.sites.forEach(function(site) {
            state.lastUrls.push(site);
          });
        },
        updateLastUrl(state, { id, url }) {
          state.lastUrls[id] = url;
        },
        toggleDevTools(state) {
          let webview = state.active.el;
          if (webview.isDevToolsOpened()) {
            webview.closeDevTools();
          } else {
            webview.openDevTools();
          }
        },
      },
    },
    modal: {
      namespaced: true,
      state: () => ({
        show: false,
      }),
      mutations: {
        toggle(state) {
          state.show = !state.show;
        },
      },
    },
  },
});
