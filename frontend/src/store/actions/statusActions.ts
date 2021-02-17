export enum StatusTypes {
  fetchingCoins = "STATUS_FETCHING_COINS",
}

export interface IAction {
  type: string;
  payload?: any;
}

export const setStatusAction = (type: string, status: boolean): IAction => ({
  type,
  payload: status,
});
