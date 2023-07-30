const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;
const cors = require("cors");
require("dotenv").config();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("dist"));

app.post("/api/analyze", (req, res) => {
  const { text } = req.body;
  const apiKey = process.env.API_KEY;

  import("node-fetch")
    .then((module) => module.default)
    .then((fetch) => {
      const url = `https://api.meaningcloud.com/sentiment-2.1?key=${apiKey}&lang=en&txt=${encodeURIComponent(
        text
      )}&model=general`;

      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          res.json(data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          res.status(500).json({ error: "Error fetching data" });
        });
    })
    .catch((error) => {
      console.error("Error importing node-fetch:", error);
      res.status(500).json({ error: "Error importing node-fetch" });
    });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

const dotenv = require("dotenv");
dotenv.config();

console.log(`Your API key is ${process.env.API_KEY}`);
