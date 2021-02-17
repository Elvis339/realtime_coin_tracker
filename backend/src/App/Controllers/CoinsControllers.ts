import { CoinGeckoClient } from "../../Core";
import { Request, Response } from "express";
const client = CoinGeckoClient.getClient();

export const fetchCoins = async (request: Request, response: Response): Promise<void> => {
  try {
    const { currency, ids, per_age } = request.query;
    const { data } = await client.get(`coins/markets`, {
      params: {
        vs_currency: currency ? currency : "usd",
        ids: ids ? ids : "",
        per_page: per_age ? per_age : ids ? 3 : "",
      },
    });
    response.status(200).send(data);
  } catch (error) {
    console.error(error);
  }
};
