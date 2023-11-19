import { config } from "dotenv";
config();

import express from "express";
import cors from "cors";

import fetchProducts from "./fetchProducts";
import { cacheData, getProducts } from "./db";

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());
app.get("/api", (_, res) => {
  const products = getProducts();
  if (products) {
    res.status(200).send(products);
  } else {
    res.status(500).send("Ошибка сервера");
  }
});

app.listen(PORT, "localhost", async function () {
  const response = await fetchProducts();
  cacheData(response);
  console.log("Запуск сервера http://localhost:" + PORT);
});
