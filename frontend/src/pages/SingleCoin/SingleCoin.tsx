import React, { useContext, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  Wrapper,
  ChartName,
  DateControls,
  CardWrapper,
  CardInner,
  CardHeaderWrapper,
  Caption,
  CardItemWrapper,
  CardLeftItem,
  CardRightItem,
} from "./SingleCoin.styled";
import { makeGetCoinById } from "../../store/selectors";
import { Chart, Loader } from "../../components";
import { CoinService } from "../../services";
import { Row, Col } from "antd";
import { formatNumber } from "../../utils/numberUtils";
import { Coin } from "../../types";
import { Events } from "../../constants";
import { setCoinAction } from "../../store/actions/coinActions";
import { SocketContext } from "../../components/SocketContext/SocketContext";

interface SingleCoinNavigationParams {
  id: string;
}

export const SingleCoin = () => {
  const socket: SocketIOClient.Socket = useContext(SocketContext);
  const { id } = useParams<SingleCoinNavigationParams>();
  const coin = useSelector(makeGetCoinById(id));

  const [data, setData] = useState<number[][]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const onStart = () => {
    setLoading(true);
    setError(null);
  };

  const onError = (error: Error) => {
    setLoading(false);
    setError(error);
  };

  const onSuccess = (response: number[][]) => {
    setLoading(false);
    setError(null);
    setData(response);
  };

  const execute = (days = 7) => {
    onStart();
    return CoinService.fetchCoinsByDate(id, { days })
      .then((response) => onSuccess(response))
      .catch((error) => onError(error));
  };

  useEffect(() => {
    execute();
    return () => {
      setLoading(false);
      setError(null);
    };
  }, [id]);

  useEffect(() => {
    socket.on(Events.updateCoins, (data: Coin[]) => {
      console.log("Refreshing...");
    });
  });

  const mapAdditionalData = useMemo(() => {
    if (coin) {
      return [
        {
          title: "Price",
          data: `$ ${formatNumber(coin.current_price, 3)}`,
        },
        {
          title: "Price Change",
          data: `$ ${formatNumber(coin.price_change_24h, 3)}`,
        },
        {
          title: "Trading Volume",
          data: `$ ${formatNumber(coin.total_volume, 3)}`,
        },
      ];
    }
  }, [coin]);

  if (error) {
    return <h3>ERROR!</h3>;
  }

  return !loading && coin ? (
    <div className={"container"}>
      <Row style={{ margin: "1rem 0" }}>
        <Col>
          <ChartName>{coin?.name} Chart</ChartName>
          <Row justify="end">
            <DateControls onClick={() => execute(7)}>Week</DateControls>
            <DateControls onClick={() => execute(30)}>Month</DateControls>
            <DateControls onClick={() => execute(90)}>3 Months</DateControls>
            <DateControls onClick={() => execute(365)}>1 Year</DateControls>
          </Row>
          <Chart data={data} />
        </Col>
        <Col span={6}>
          <CardWrapper>
            <CardInner>
              <CardHeaderWrapper>
                <img src={coin.image} alt={coin.name} width={32} height={32} />
                <h2 style={{ marginLeft: "0.5rem" }}>
                  {coin.name.toUpperCase()} STATISTICS
                </h2>
              </CardHeaderWrapper>
              <Caption>{coin.name} Price Today</Caption>
              {mapAdditionalData?.map((additional, index) => (
                <CardItemWrapper key={index}>
                  <CardLeftItem>{additional.title}</CardLeftItem>
                  <CardRightItem>{additional.data}</CardRightItem>
                </CardItemWrapper>
              ))}
            </CardInner>
          </CardWrapper>
        </Col>
      </Row>
    </div>
  ) : (
    <Loader />
  );
};
