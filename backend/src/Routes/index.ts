import { Router } from "express";
import CoinRoutes from "./CoinRoutes/CoinRoutes";

export default (router: Router) => {
  CoinRoutes(router);
  return router;
};
