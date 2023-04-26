const connectToMongo = require("./db");
const express = require("express");
const app = express();
const port = 5001;

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });
app.use(express.json());
app.use("/app/auth", require("./routes/auth"));
app.use("/app/notes", require("./routes/notes"));

app.listen(port, () => {
  connectToMongo();
  console.log(`My app is listening on port ${port}`);
});
