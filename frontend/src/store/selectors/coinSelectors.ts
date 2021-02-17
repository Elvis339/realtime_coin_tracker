import { RootState } from "../reducers/rootReducer";
import { createSelector } from "reselect";
import { formatNumber } from "../../utils/numberUtils";

export const getCoins = (state: RootState) => state.coins;

export const getMappedCoins = createSelector(getCoins, (coins) => {
  return coins.map((coin, index) => ({
    index: index + 1,
    id: coin.id,
    name: coin.name,
    price: formatNumber(coin.current_price, 3),
    "24h": coin.market_cap_change_percentage_24h,
    market_cap: formatNumber(coin.market_cap, 3),
    volume: formatNumber(coin.total_volume, 3),
    circulating_supply: formatNumber(coin.circulating_supply, 3),
  }));
});
