"use strict";

const app = require("./src/configs/app");

app.listen(process.env.PORT || 3000, () => {
  console.log("Start server");
  console.log("Server is running");
});
