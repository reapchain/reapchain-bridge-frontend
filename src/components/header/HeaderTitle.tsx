import React from "react";
import styled from "styled-components";
import colors from "../../assets/colors";

type Props = {
  title: string;
};

const StyledHeaderTitle = styled.div`
  display: flex;
  align-items: center;
  height: 44px;
  font-size: 30px;
  font-weight: 700;
  font-family: Federant;
  height: 44px;
  color: ${colors.white};
  line-height: auto;
  vertical-align: top;
`;

/*
const  text1 = styled.div`
  text-align: left;
  vertical-align: top;
  font-size: 30px;
  font-family: Federant;
  line-height: auto;
`
*/

const HeaderItem: React.FC<Props> = ({ title }) => {
  return <StyledHeaderTitle>{title}</StyledHeaderTitle>;
};

export default HeaderItem;
