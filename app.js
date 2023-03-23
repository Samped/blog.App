const { Router } = require("express");
const express = require ("express");
const morgan = require ("morgan");
const mongoose = require("mongoose");
const { render } = require("ejs");
const blogRoutes = require("./routes/blogRoutes"); 

// express app
const app = express();


// connect dbURI to mongodb

const dbURI = ""
mongoose.connect(dbURI, {useNewUrlparser: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen(3000)
  })
  .catch((err) => {
    console.log(err)
  });
 

//register view engine
app.set("view engine", "ejs");
 


// middleware & static files

app.use(express.static("public"))
app.use(express.urlencoded({ extended: true}))
app.use(morgan("dev"));



// routes

app.get("/",(req, res) =>{
  res.redirect("/blogs");
});

app.get("/about",(req, res) =>{
  res.render("about", { title: "About"});
})


app.get("./about-us", () => {
  res.redirect("./about");
})

// blog routes

app.use("/blogs", blogRoutes)


app.use((req, res) => {
  res.status(404).render("404", { title: "about"})
});


