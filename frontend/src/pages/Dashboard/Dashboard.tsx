import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Table } from "antd";
import { Wrapper } from "./Dashboard.styled";

import {
  sagaFetchCoinsAction,
  setCoinAction,
} from "../../store/actions/coinActions";
import { RootState } from "../../store/reducers/rootReducer";
import { getMappedCoins, getStatus } from "../../store/selectors";
import { StatusTypes } from "../../store/actions/statusActions";

import { Loader } from "../../components";
import { SocketContext } from "../../components/SocketContext/SocketContext";
import { Events } from "../../constants";
import { Coin } from "../../types";
import { getCoins } from "../../store/selectors";

export const Dashboard = () => {
  const { Column } = Table;
  const dispatch = useDispatch();
  const socket: SocketIOClient.Socket = useContext(SocketContext);
  const history = useHistory();

  const isFetching = useSelector((state: RootState) =>
    getStatus(state, StatusTypes.fetchingCoins)
  );
  const coins = useSelector(getMappedCoins);

  useEffect(() => {
    dispatch(sagaFetchCoinsAction());

    socket.on(Events.updateCoins, (data: any) => {
      dispatch(setCoinAction(data));
    });
    return () => {
      socket.disconnect();
    };
  }, [dispatch, socket]);

  return !isFetching && coins.length > 0 ? (
    <div className="container">
      <Table
        // columns={[
        //   {
        //     title: "Name",
        //     dataIndex: "name",
        //     sorter: (a, b) => a.name.length - b.name.length,
        //   },
        // ]}
        style={{ width: "100%" }}
        rowKey="index"
        onRow={(record: object, rowIndex: number | undefined) => {
          return {
            onClick: (e) => history.push(`coin/${coins[rowIndex || 0].id}`),
          };
        }}
        pagination={false}
        dataSource={coins}
      >
        <Column title={"#"} dataIndex={"index"} />
        <Column title={"Name"} dataIndex={"name"} />
        <Column
          title={"Price"}
          dataIndex={"price"}
          render={(text) => `$${text}`}
        />
        <Column title={"24h"} dataIndex={"24h"} />
        <Column title={"Market Cap"} dataIndex={"market_cap"} />
        <Column title={"Volume"} dataIndex={"volume"} />
        <Column title={"Circulating Supply"} dataIndex={"circulating_supply"} />
      </Table>
    </div>
  ) : (
    <Loader />
  );
};
