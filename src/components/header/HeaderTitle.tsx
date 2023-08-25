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
  font-size: 28px;
  font-weight: 800;
  height: 44px;
  color: ${colors.godong};
`;

const HeaderItem: React.FC<Props> = ({ title }) => {
  return <StyledHeaderTitle>{title}</StyledHeaderTitle>;
};

export default HeaderItem;
