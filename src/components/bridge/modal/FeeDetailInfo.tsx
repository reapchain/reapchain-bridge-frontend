import React from "react";
import styled from "styled-components";
import colors from "assets/colors";
import { getIconSource } from "utils/util";
import { InfoCircleOutlined } from "@ant-design/icons";
import { Popover } from "antd";
import icon from "assets/images/ellipse.svg";

type Props = {};

const StyledContainer = styled.div``;
const StyledList = styled.div`
  padding: 0px 20px;
`;
const StyledItem = styled.div`
  margin-top: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const StyledToken = styled.div`
  display: flex;
  align-items: center;
`;
const StyledRatio = styled.div`
  color: ${colors.white};
  font-size: 16px;
  font-weight: 800;
`;
const StyledImageIcon = styled.img`
  width: 16px;
  height: 16px;
  margin-left: 2px;
  margin-right: 2px;
`;
const StyledItemTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const StyledItemValue = styled.div`
  font-weight: 700;
`;
const StyledIcon = styled.img`
  margin-top: 2px;
  width: 4px;
  height: 4px;
  margin-right: 6px;
`;

const FeeDetailInfo: React.FC<Props> = () => {
  return (
    <StyledContainer>
      <StyledList>
        <StyledItem>
          <StyledItemTitle>
            <StyledIcon src={icon} />
            Bridge Rate
          </StyledItemTitle>
          <StyledToken>
            <StyledImageIcon src={getIconSource("reapchain")} alt="icon" />
            <StyledItemValue>REAP&nbsp;:&nbsp;</StyledItemValue>
            <StyledImageIcon src={getIconSource("reapchain")} alt="icon" />
            <StyledItemValue>REAPt&nbsp;=&nbsp;</StyledItemValue>
            <StyledRatio>1 : 1</StyledRatio>
          </StyledToken>
        </StyledItem>
        <StyledItem>
          <StyledItemTitle>
            <StyledIcon src={icon} />
            Fee
            <Popover
              style={{
                backgroundColor: colors.pointPink,
              }}
              content={<div>Fee...</div>}
              title="Fee"
            >
              <InfoCircleOutlined style={{ marginLeft: "6px" }} />
            </Popover>
          </StyledItemTitle>
          <StyledItemValue>2 REAP</StyledItemValue>
        </StyledItem>
        <StyledItem>
          <StyledItemTitle>
            <StyledIcon src={icon} />
            Minimum Received
            <Popover
              style={{
                backgroundColor: colors.pointPink,
              }}
              content={<div>Minimum Received...</div>}
              title="Minimum Received"
            >
              <InfoCircleOutlined style={{ marginLeft: "6px" }} />
            </Popover>
          </StyledItemTitle>
          <StyledItemValue>2 REAP</StyledItemValue>
        </StyledItem>
        <StyledItem>
          <StyledItemTitle>
            <StyledIcon src={icon} />
            Estimated Time of Arrival
            <Popover
              style={{
                backgroundColor: colors.pointPink,
              }}
              content={<div>Estimated Time of Arrival...</div>}
              title="Estimated Time of Arrival"
            >
              <InfoCircleOutlined style={{ marginLeft: "4px" }} />
            </Popover>
          </StyledItemTitle>
          <StyledItemValue>20 minutes</StyledItemValue>
        </StyledItem>
      </StyledList>
    </StyledContainer>
  );
};

export default FeeDetailInfo;
