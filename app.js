//Setting up packages to make our server work properly with user interaction and the API.
import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
//This is the URL that will help us to get the card data.
const API_URL = "https://api.pokemontcg.io/v2/cards?q=name:";

//searched will help EJS to identify if a searchc has been made.
let searched = false;

//These app.use will help us to indicate that static files are inside the public folder and that we are going to use body-parser.
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

//Handling the homepage, declaring that searched keeps or changes to false.
app.get("/", (req, res) => {
  searched = false;
  res.render("index.ejs", {
    searched: searched,
  });
});

//Handling after what the user inputs inside the search bar, that will render all the info about the card.
app.post("/search", async (req, res) => {
  //Search will change to true and will help us to load different information inside the index.ejs.
  searched = true;
  //Getting the info the user inputs.
  let pokemon = req.body.name;

  //Using axios to wait until the API has a respone about the pokemon card the user entered.
  try {
    const response = await axios.get(API_URL + pokemon);
    const content = response.data.data;
    //Generating a random number so we can get a random card from the array provided by the API.
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
      cardReleaseDate: "Release Date: " + cardReleaseDate,
      cardSellingPrice: "Average selling price: $" + cardSellingPrice + " USD",
    });
  } catch {
    //In case the info entered by the user is wrong or does not exists, it will show these information, and showing an old MissignNo image, a classic.
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
