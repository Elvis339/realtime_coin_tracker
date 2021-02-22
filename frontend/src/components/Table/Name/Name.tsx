import React, { FC } from "react";
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
  <Wrapper>
    <Image src={imgSrc} alt={name} />
    <NameWrapper>
      <CurrencyName>{name}</CurrencyName>
    </NameWrapper>
    <CurrencyWrapperAlt>
      <CurrencyAlt>{symbol.toUpperCase()}</CurrencyAlt>
    </CurrencyWrapperAlt>
  </Wrapper>
);
