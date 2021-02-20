import { RootState } from "../reducers/rootReducer";
import { createSelector, OutputSelector } from "reselect";
import { formatNumber } from "../../utils/numberUtils";
import { MappedCoins } from "../../types";

export const getCoins = (state: RootState) => state.coins;

export const getMappedCoins: OutputSelector<
  RootState,
  MappedCoins[],
  any
> = createSelector(getCoins, (coins) => {
  return coins.map((coin, index) => ({
    index: index + 1,
    id: coin.id,
    imgSrc: coin.image,
    symbol: coin.symbol,
    name: coin.name,
    price: formatNumber(coin.current_price, 3),
    "24h": coin.market_cap_change_percentage_24h,
    market_cap: formatNumber(coin.market_cap, 3),
    volume: formatNumber(coin.total_volume, 3),
    circulating_supply: formatNumber(coin.circulating_supply, 3),
  }));
});

export const getFiveTopCoinsByPrice = createSelector(getCoins, (coins) => {
  return coins.sort((a, b) => b.current_price - a.current_price).slice(0, 5);
});

export const makeGetCoinById = (coinId: string) =>
  createSelector(getCoins, (coins) => {
    return coins.find((coin) => coin.id === coinId);
  });
