import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import {
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

interface SingleCoinNavigationParams {
  id: string;
}

export const SingleCoin = () => {
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

  const mapAdditionalData = useMemo(() => {
    if (coin) {
      return [
        {
          title: "Price",
          data: ` $${formatNumber(coin.current_price, 3)}`,
        },
        {
          title: "Price Change",
          data: ` $${formatNumber(coin.price_change_24h, 3)}`,
        },
        {
          title: "Trading Volume",
          data: ` $${formatNumber(coin.total_volume, 3)}`,
        },
      ];
    }
  }, [coin]);

  if (error) {
    alert("Error happened, reloading...");
    window.location.reload();
    return <h3>Error</h3>;
  }

  return !loading && coin ? (
    <div className={"container"}>
      <Row wrap={true} style={{ margin: "1rem 0" }}>
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
        <Col>
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
