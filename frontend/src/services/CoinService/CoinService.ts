import BaseService from "../BaseService";
import { Coin } from "../../types";
import { API } from "../../constants";

export class CoinService extends BaseService {
  fetchCoins = async (): Promise<Coin[]> => {
    const response = await this.apiClient.get<Coin[]>(API.COINS, {
      vs_currency: "usd",
      ids: "bitcoin,ripple,ethereum",
    });
    return response.data;
  };
}

export default new CoinService();
