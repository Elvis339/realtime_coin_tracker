import React, { FC } from "react";
import { Link } from "../../../App.styled";
import {
  Wrapper,
  NameWrapper,
  CurrencyName,
  Image,
  CurrencyWrapperAlt,
  CurrencyAlt,
} from "./Name.styled";

interface Props {
  id: string;
  name: string;
  symbol: string;
  imgSrc: string;
}

export const Name: FC<Props> = ({ id, name, symbol, imgSrc }) => (
  <Link to={`coin/${id}`}>
    <Wrapper>
      <Image src={imgSrc} alt={name} />
      <NameWrapper>
        <CurrencyName>{name}</CurrencyName>
      </NameWrapper>
      <CurrencyWrapperAlt>
        <CurrencyAlt>{symbol.toUpperCase()}</CurrencyAlt>
      </CurrencyWrapperAlt>
    </Wrapper>
  </Link>
);
