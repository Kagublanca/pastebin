import express from "express";

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

import Document from "./models/Document.js";
import mongoose from "mongoose";
mongoose.connect("mongodb://localhost/pastebin", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

app.get("/", (req, res) => {
  const code = `Welcome to the PasteBin clone!
Use the commands in the top right corner
to create a new file to share with others!`;
  //[\n] being a new-line character
  res.render("code-display", { code });
});

app.get("/new", (req, res) => {
  res.render("new");
});

app.post("/save", async (req, res) => {
  const value = req.body.value;
  try {
    console.log("Got here" + { ...Document });
    const document = await Document.create({ value });
    console.log("Hello this is the id " + document.id);
  } catch (e) {
    console.log("Save failed");
    res.render("new", { value });
  }
  console.log(value);
});

app.listen(3000);
