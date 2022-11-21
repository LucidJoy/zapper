const Moralis = require("moralis").default;
const express = require("express");
const app = express();
const cors = require("cors");
const port = 8000;
require("dotenv").config();

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.get("/native-balance", async (req, res) => {
  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

  try {
    const { address, chain } = req.query;

    const response = await Moralis.EvmApi.balance.getNativeBalance({
      address: address,
      chain: chain,
    });

    const nativeBalance = response.data;

    let nativeCurrency;

    if (chain == "0x1") {
      nativeCurrency = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
    } else if (chain == "0x89") {
      nativeCurrency = "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270";
    }

    const nativePrice = await Moralis.EvmApi.token.getTokenPrice({
      address: nativeCurrency,
      chain: chain,
    });

    nativeBalance.usd = nativePrice.data.usdPrice;

    res.send(nativeBalance);
  } catch (error) {
    res.send(error);
  }
});

app.get("/token-balances", async (req, res) => {
  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

  try {
    const { address, chain } = req.query;

    const response = await Moralis.EvmApi.token.getWalletTokenBalances({
      address: address,
      chain: chain,
    });

    let tokens = response.data;

    let legitTokens = [];
    for (i = 0; i < tokens.length; i++) {
      const priceResponse = await Moralis.EvmApi.token.getTokenPrice({
        address: tokens[i].token_address,
        chain: chain,
      });

      // console.log(priceResponse);

      if (priceResponse.data.usdPrice > 0.01) {
        tokens[i].usd = priceResponse.data.usdPrice;
        legitTokens.push(tokens[i]);
      } else {
        console.log(`💩 coin`);
      }
    }

    res.send(legitTokens);
  } catch (error) {
    res.send(error);
  }
});
