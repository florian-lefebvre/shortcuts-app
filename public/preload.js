(function() {
  if (typeof window.CustomEvent === "function") return false; // If not IE
  function CustomEvent(event, params) {
    params = params || { bubbles: false, cancelable: false, detail: null };
    var evt = document.createEvent("CustomEvent");
    evt.initCustomEvent(
      event,
      params.bubbles,
      params.cancelable,
      params.detail
    );
    return evt;
  }
  window.CustomEvent = CustomEvent;
})();

(function() {
  history.pushState = (function(f) {
    return function pushState() {
      var ret = f.apply(this, arguments);
      window.dispatchEvent(new CustomEvent("pushState"));
      window.dispatchEvent(new CustomEvent("locationchange"));
      return ret;
    };
  })(history.pushState);
  history.replaceState = (function(f) {
    return function replaceState() {
      var ret = f.apply(this, arguments);
      window.dispatchEvent(new CustomEvent("replaceState"));
      window.dispatchEvent(new CustomEvent("locationchange"));
      return ret;
    };
  })(history.replaceState);
  window.addEventListener("popstate", function() {
    window.dispatchEvent(new CustomEvent("locationchange"));
  });
})();

const { ipcRenderer } = require("electron");

window.addEventListener("locationchange", function() {
  var data = {
    title: document.title,
    url: window.location.href,
  };
  ipcRenderer.sendToHost("locationchange", data);
});

function setNotificationCallback(createCallback, clickCallback) {
  const OldNotify = window.Notification;
  const newNotify = function(title, opt) {
    createCallback(title, opt);
    const instance = new OldNotify(title, opt);
    instance.addEventListener("click", clickCallback);
    return instance;
  };
  newNotify.requestPermission = OldNotify.requestPermission.bind(OldNotify);
  Object.defineProperty(newNotify, "permission", {
    get: () => OldNotify.permission,
  });

  window.Notification = newNotify;
}

function notifyNotificationCreate(title, opt) {
  ipcRenderer.sendToHost("notification", title, opt);
}
function notifyNotificationClick() {
  ipcRenderer.sendToHost("notification-click");
}

setNotificationCallback(notifyNotificationCreate, notifyNotificationClick);
