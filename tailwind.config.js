var env = process.argv.slice(6),
  state = true;

if (env == "dev") {
  state = false;
} else if (env == "prod") {
  state = true;
}

module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: {
    enabled: state,
    content: ["./src/**/*.{vue,js}"],
  },
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
};
