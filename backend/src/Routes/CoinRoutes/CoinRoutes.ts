import { fetchCoins } from "../../App";
import { Router } from "express";

export default (router: Router): void => {
  router.get("/coins", fetchCoins);
};
