import styled from "styled-components";

export const Wrapper = styled.header`
  box-sizing: border-box;
  margin: 0px;
  padding-top: 2rem;
  padding-bottom: 2rem;
  display: flex;
  flex-direction: column;
`;

export const TextWrapper = styled.div`
  padding-right: 1rem;
`;

export const NewsWrapper = styled.div`
  width: 100%;
  max-width: 100%;
  filter: drop-shadow(rgba(88, 102, 126, 0.08) 0px 4px 24px);
`;

export const CardContentWrapper = styled.div`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
`;

export const CardTextWrapper = styled.span`
  padding-left: 0.5rem;
`;

export const CardText = styled.p`
  margin: 0;
  font-weight: 500;
`;
