import BaseService from "../BaseService";
import { Coin } from "../../types";
import { API } from "../../constants";

export interface CoinRequestParams {
  vs_currency: string;
  ids?: string;
  category?: string;
  order?: string;
  per_page?: number;
  page?: number;
  sparkline?: number;
  price_change_percentage?: number;
}

export interface CoinsByDateResponse {
  market_caps: number[][];
  prices: number[][];
  total_volumes: number[][];
}

export interface CoinDateParams {
  currency: string;
  days: number;
  interval?: string;
}

export class CoinService extends BaseService {
  fetchCoins = async (params: CoinRequestParams): Promise<Coin[]> => {
    const response = await this.apiClient.get<Coin[]>(API.COINS, params);
    return response.data;
  };

  fetchCoinsByDate = async (
    coinId: string,
    params: Partial<CoinDateParams> = { currency: "usd", days: 7 }
  ): Promise<number[][]> => {
    const response = await this.apiClient.get<CoinsByDateResponse>(
      API.SINGLE.replace("{coinId}", coinId),
      params
    );
    return response.data.prices;
  };
}

export default new CoinService();
