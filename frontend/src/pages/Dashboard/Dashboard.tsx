import React, { useCallback, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "antd";
import { Breakpoint } from "antd/lib/_util/responsiveObserve";

import {
  sagaFetchCoinsAction,
  setCoinAction,
} from "../../store/actions/coinActions";
import { RootState } from "../../store/reducers/rootReducer";
import { getMappedCoins, getStatus } from "../../store/selectors";
import { StatusTypes } from "../../store/actions/statusActions";

import { Header, Loader, Name } from "../../components";
import { SocketContext } from "../../components/SocketContext/SocketContext";
import { Events } from "../../constants";
import { Coin, MappedCoins } from "../../types";
import { Link } from "../../App.styled";

export const Dashboard = () => {
  const { Column } = Table;
  const dispatch = useDispatch();
  const socket: SocketIOClient.Socket = useContext(SocketContext);

  const isFetching = useSelector((state: RootState) =>
    getStatus(state, StatusTypes.fetchingCoins)
  );
  const coins = useSelector(getMappedCoins);

  useEffect(() => {
    dispatch(
      sagaFetchCoinsAction({
        vs_currency: "usd",
      })
    );

    socket.on(Events.updateCoins, (data: Coin[]) => {
      dispatch(setCoinAction(data));
    });
  }, [dispatch, socket]);

  const renderName = useCallback((text: string, record: MappedCoins) => {
    const { id, name, symbol, imgSrc } = record;

    return <Name id={id} name={name} symbol={symbol} imgSrc={imgSrc} />;
  }, []);

  const renderPrice = useCallback((text: string, record: MappedCoins) => {
    const { id, price } = record;

    return <Link to={`/coin/${id}`}>{`$ ${price}`}</Link>;
  }, []);

  return !isFetching && coins.length > 0 ? (
    <div className="container">
      <Header />
      <Table
        style={{ width: "100%", paddingBottom: "3rem" }}
        rowKey="index"
        pagination={false}
        dataSource={coins}
        tableLayout={"fixed"}
      >
        <Column title={"Name"} dataIndex={"name"} render={renderName} />
        <Column title={"Price"} dataIndex={"price"} render={renderPrice} />
        <Column responsive={["sm"]} title={"24h"} dataIndex={"24h"} />
        <Column
          responsive={["sm"]}
          title={"Market Cap"}
          dataIndex={"market_cap"}
        />
        <Column
          responsive={["sm", "md"]}
          title={"Volume"}
          dataIndex={"volume"}
        />
        <Column
          responsive={["sm", "md"]}
          title={"Circulating Supply"}
          dataIndex={"circulating_supply"}
        />
      </Table>
    </div>
  ) : (
    <Loader />
  );
};
