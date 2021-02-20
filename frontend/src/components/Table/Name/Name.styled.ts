import styled from "styled-components";

export const Wrapper = styled.div`
  box-sizing: border-box;
  margin: 0px;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
`;

export const Image = styled.img`
  height: 24px;
  width: 24px;
  border-radius: 12px;
`;

export const NameWrapper = styled.div`
  box-sizing: border-box;
  margin: 0px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const CurrencyName = styled.p`
  font-size: 16px;
  margin: 0px 0px 0px 12px;
  line-height: 2rem;
  font-weight: bold;
`;

export const CurrencyWrapperAlt = styled.div`
  display: flex;
  flex-direction: row;
  -webkit-box-align: center;
  align-items: center;
`;

export const CurrencyAlt = styled.small`
  margin: 0;
  margin-left: 0.5rem;
  color: #a7a7a7;
`;
