const express = require("express");
const path = require("path");
const hbs = require("hbs");
 
const geocode =  require("./utils/geocode");
const darkSky = require("./utils/darkSky");

const app = express();
const port = process.env.PORT || 3000;

// Paths for express config 
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
const publicDirectoryPath = path.join(__dirname, "../public");

console.log(publicDirectoryPath)
app.use(express.static(publicDirectoryPath));

// set up view engine and view location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath)

app.get("/weather", (req, res) => {
    if (!req.query.adress) {
      return res.send({
        error: "You must provide an adress"
      })
    } else {
        geocode(req.query.adress, ({longitude, lattitude, place}) =>  {
          darkSky(lattitude, longitude, forecast => {
            res.send({
              forecast,
              place
            })
          })
        })   
      }
  }
)
 
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
  })
})

app.get("/about", (req, res) => {
  res.render("About", {
    title: "About",
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term"
    })
  }
  res.send({
    products: []
  })
})

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
})
  
});

app.get("/help/*", (req, res) => {
  res.render("error", {
    header: "Page not found",
  })
})


app.get("*", (req, res) => {
  res.render("error", {
    header: "Page not found",
  })
})

app.listen(port, () => {
  console.log("Server is up on port" + port);
});
