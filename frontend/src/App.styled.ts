import styled from "styled-components";
import { Link as AnchorLink } from "react-router-dom";

export const Link = styled(AnchorLink)`
  color: inherit;
  text-decoration: none;
  &:hover {
    background: none;
    color: none;
    cursor: pointer;
  }
`;
