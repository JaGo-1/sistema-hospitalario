import express from "express";

const PORT = 3000;
const app = express();

app.set("view engine", "pug");
app.set("views", "./src/views");

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(PORT, () => {
  console.log(`Server on PORT ${PORT}`);
});
