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

  try {
    const response = await axios.get(API_URL + pokemon);
    const content = response.data.data;
    const random = content[Math.floor(Math.random() * content.length)];
    console.log(random);

    let cardName = random.name;
    let cardRarity = random.rarity;
    let cardImage = random.images.large;
    let cardReleaseDate = random.set.releaseDate;
    let cardSellingPrice = random.cardmarket.prices.averageSellPrice;

    res.render("index.ejs", {
      searched: searched,
      cardName: cardName,
      cardRarity: cardRarity,
      cardImage: cardImage,
      cardReleaseDate: cardReleaseDate,
      cardSellingPrice: "Average selling price: $" + cardSellingPrice + " USD",
    });
  } catch {
    res.render("index.ejs", {
      searched: searched,
      cardName: "Card not found!",
      cardRarity: "",
      cardImage: "/images/missingno.png",
      cardReleaseDate: "",
      cardSellingPrice: "",
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
