import React, { FC } from "react";
import { Wrapper } from "./Loader.styled";
import nyan from "../../assets/nyan_cat.gif";

export const Loader: FC = () => {
  return (
    <Wrapper>
      <img src={nyan} height={300} width={300} />
    </Wrapper>
  );
};
