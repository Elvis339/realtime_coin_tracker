import { ConfigReducerType } from "../../types";

export enum ConfigTypes {
  setConfig = "SET_CONFIG",
}

export interface SetConfigAction {
  type: ConfigTypes.setConfig;
  payload: Partial<ConfigReducerType>;
}
export const setConfigAction = (
  payload: Partial<ConfigReducerType>
): SetConfigAction => ({
  type: ConfigTypes.setConfig,
  payload,
});

export type ConfigActions = SetConfigAction;
