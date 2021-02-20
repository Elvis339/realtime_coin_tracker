import React, { FC } from "react";
import { Row, Col, Carousel, Card } from "antd";
import {
  Wrapper,
  TextWrapper,
  CardContentWrapper,
  CardText,
  CardTextWrapper,
} from "./Header.styled";
import { useSelector } from "react-redux";
import { getFiveTopCoinsByPrice } from "../../store/selectors";
import { Image } from "../Table/Name/Name.styled";
import { formatNumber } from "../../utils/numberUtils";

export const Header: FC = () => {
  const fiveTopCoins = useSelector(getFiveTopCoinsByPrice);

  return (
    <Wrapper>
      <Row align="middle" wrap={true}>
        <Col>
          <TextWrapper>
            <h1 style={{ fontSize: "24px" }}>Top Prices by NyanCatTrader</h1>
          </TextWrapper>
        </Col>
        <Col xs={2} sm={4} md={6} lg={8} xl={10}>
          <Carousel autoplay dots={false}>
            {fiveTopCoins.map((coin) => (
              <Card
                size="small"
                key={coin.id}
                bordered={false}
                bodyStyle={{ background: "#EEEEEE" }}
              >
                <CardContentWrapper>
                  <Image src={coin.image} alt={coin.name} />
                  <CardTextWrapper>
                    <CardText>{coin.name}</CardText>
                    <small>{coin.symbol.toUpperCase()}</small>
                    <CardText>${formatNumber(coin.current_price, 3)}</CardText>
                  </CardTextWrapper>
                </CardContentWrapper>
              </Card>
            ))}
          </Carousel>
        </Col>
      </Row>
    </Wrapper>
  );
};
