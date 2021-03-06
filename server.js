import express from "express";
import "dotenv/config";

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
import mongoose from "mongoose";
import Document from "./models/Document.js";

mongoose.connect(process.env.URI);

app.get("/", (req, res) => {
  const code = `Welcome to the PasteBin clone!
Use the commands in the top right corner
to create a new file to share with others!`;
  //[\n] being a new-line character

  console.log(typeof process.env.URI);
  res.render("code-display", { code, language: "plaintext" });
});

app.get("/new", (req, res) => {
  res.render("new");
});

app.post("/save", async (req, res) => {
  const value = req.body.value;
  try {
    const document = await Document.create({ value });
    res.redirect(`/${document.id}`);
  } catch (e) {
    console.log("Save failed");
    res.render("new", { value });
  }
});

app.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const document = await Document.findById(id);

    res.render("code-display", { code: document.value, id });
  } catch (e) {
    res.redirect("/");
  }
});

app.listen(3000);
