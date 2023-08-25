import { EllipsisOutlined } from "@ant-design/icons";
import { Button, Dropdown, MenuProps } from "antd";
import React from "react";
import styled from "styled-components";
import colors from "../../assets/colors";

const StyledContainer = styled.div`
  background-color: ${colors.white};
  border: 1px solid transparent;
  cursor: pointer;
  width: 44px;
  height: 44px;
  padding: 8px;
  font-size: 14px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  border-radius: 12px;
  border: 1.5px solid transparent;

  &: hover {
    transition: 0.5s;
    border: 1.5px solid;
    border-color: ${colors.pointPink};
  }
`;

type Props = {};

const HeaderMetamaskButtom: React.FC<Props> = () => {
  return <StyledContainer>M</StyledContainer>;
};

export default HeaderMetamaskButtom;
