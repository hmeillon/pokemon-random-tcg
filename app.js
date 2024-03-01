//Setting up packages to make our server work properly with user interaction and the API.
import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://api.pokemontcg.io/v2/cards?q=name:";
let searched = false;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  searched = false;
  res.render("index.ejs", {
    searched: searched,
  });
});

app.post("/search", async (req, res) => {
  searched = true;
  let pokemon = req.body.name;
  console.log(pokemon);

  try {
    console.log(API_URL + pokemon);
    const response = await axios.get(API_URL + pokemon);
    const content = response.data.data;
    const random = content[Math.floor(Math.random() * content.length)];
    console.log(random);

    res.render("index.ejs", {
      searched: searched,
      cardName: "Venusaur",
      cardId: "65464",
      cardImage: "",
      cardReleaseDate: "Oct 06, 1995",
      cardSellingPrice: "90.00",
    });
  } catch {
    res.render("index.ejs", {
      searched: searched,
      cardName: "Card not found!",
      cardId: "missingno",
      cardImage: "",
      cardReleaseDate: "",
      cardSellingPrice: "",
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
