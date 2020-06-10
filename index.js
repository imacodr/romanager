require("dotenv").config();

const express = require("express");
const discord = require("./src/discord-client");

//START DISCORD BOT
const discordClient = discord();

const PORT = process.env.PORT || 4000;

const app = express();

app.get("/", async function (req, res) {
  res.send({ response: "The bot is running" });
});

app.listen(PORT, function () {
  console.log("Listening on Port " + PORT);
});
