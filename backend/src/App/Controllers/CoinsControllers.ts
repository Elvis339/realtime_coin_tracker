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

export const fetchCoinPricesByDate = async (request: Request, response: Response): Promise<void> => {
  try {
    const { currency, days, interval } = request.query;
    const path = "/coins/{id}/market_chart".replace("{id}", request.params.id);
    const { data } = await client.get(path, {
      params: {
        vs_currency: currency ? currency : "usd",
        days,
        interval,
      },
    });
    response.status(200).send(data);
  } catch (error) {
    console.error(error);
  }
};
