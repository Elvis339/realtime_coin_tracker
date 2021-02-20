import { fetchCoinPricesByDate, fetchCoins } from "../../App";
import { Router } from "express";

export default (router: Router): void => {
  router.get("/coins", fetchCoins);
  router.get("/coin/:id", fetchCoinPricesByDate);
};
