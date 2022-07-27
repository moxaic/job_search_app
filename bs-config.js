module.exports = {
  port: 5000,
  proxy: "localhost:3000",
  reloadDelay: 2000,
  browser: "chrome",
  ui: false,
  notify: false,
  files: ["public/**/*", "public/***/**/*", "src/views/*"],
  ignore: ["node_modules"],
};
