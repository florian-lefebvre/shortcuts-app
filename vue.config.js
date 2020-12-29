const appName = "Shortcuts app";

module.exports = {
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      builderOptions: {
        appId: "com.florian-lefebvre.shortcuts-app",
        productName: appName,
        copyright: "Copyright © Florian LEFEBVRE",
        publish: [
          {
            provider: "github",
            owner: "florian-lefebvre",
            repo: "shortcuts-app",
          },
        ],
      },
    },
  },
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = appName;
      return args;
    });
  },
};
