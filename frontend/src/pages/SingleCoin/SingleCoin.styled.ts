import styled from "styled-components";

export const Wrapper = styled.div`
  margin: 1rem 1rem;
`;

export const ChartName = styled.h2`
  font-size: 24px;
  line-height: 34px;
  font-weight: 700;
  line-height: 28px;
  font-size: 24px;
  color: rgb(34, 37, 49);
`;

export const DateControls = styled.button`
  -webkit-box-align: center;
  align-items: center;
  background: transparent;
  border: 0px;
  border-radius: 50vh;
  display: inline-flex;
  color: rgb(128, 138, 157);
  cursor: pointer;
  -webkit-box-pack: center;
  justify-content: center;
  outline: 0px;
  font-weight: 600;
  width: auto;
  height: 22px;
  font-size: 11px;
  padding: 0px 12px;
  line-height: 11px;
  &: hover {
    background: rgb(248, 250, 253);
    color: rgb(128, 138, 157);
    text-decoration: none;
  }
  &: active {
    background: transparent;
    color: rgb(128, 138, 157);
  }
`;

export const CardWrapper = styled.div`
  box-sizing: border-box;
  padding: 0 1rem;
  min-width: 33rem;
`;

export const CardInner = styled.div`
  box-sizing: border-box;
  margin: 0px;
  padding: 24px;
  background-color: #f8fafd;
  border-radius: 16px;
`;

export const CardHeaderWrapper = styled.div`
  display: inline-flex;
`;

export const Caption = styled.p`
  color: #808a9d;
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
  margin-bottom: 8px;
  margin-bottom: 0.5rem;
`;

export const CardItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 0.5px solid #d3d3d3;
  padding: 0.5rem 0;
`;

export const CardLeftItem = styled.p`
  font-weight: 700;
  align-self: center;
  margin: 0;
`;

export const CardRightItem = styled.p`
  font-weight: bold;
  align-self: center;
  margin: 0;
`;
