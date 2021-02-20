export interface MappedCoins {
  index: number;
  id: string;
  imgSrc: string;
  symbol: string;
  name: string;
  price: string | number;
  "24h": number;
  market_cap: string | number;
  volume: string | number;
  circulating_supply: string | number;
}
