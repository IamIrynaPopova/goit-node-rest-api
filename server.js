const mongoose = require("mongoose");
const app = require("./app");
const DB_HOST =
  "mongodb+srv://Iryna:M2nID0YouQ0CD1mN@clusters.hojpaui.mongodb.net/db-contacts?retryWrites=true&w=majority";

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000);
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
