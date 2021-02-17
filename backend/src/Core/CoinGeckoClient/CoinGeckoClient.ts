import axios, { AxiosInstance } from "axios";
import { CoinGeckoConstants } from "../";

interface CoinGeckoClient {
  getClient: () => AxiosInstance;
}

function CoinGeckoClient(client: AxiosInstance): CoinGeckoClient {
  client.defaults.headers.post = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  const getClient = function () {
    return client;
  };

  return {
    getClient,
  };
}

const axiosClient = axios.create({
  baseURL: `${CoinGeckoConstants.BASE}${CoinGeckoConstants.API_VERSION}`,
});

export default CoinGeckoClient(axiosClient);
