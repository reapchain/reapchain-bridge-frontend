import React from "react";
import styled from "styled-components";
import colors from "assets/colors";
import { getIconSource } from "utils/util";
import { InfoCircleOutlined } from "@ant-design/icons";
import { Popover } from "antd";

type Props = {};

const StyledContainer = styled.div``;

const StyledList = styled.div`
  margin: 24px auto 0px auto;
  width: 80%;
`;

const StyledItem = styled.div`
  margin-top: 4px;
  display: flex;
  justify-content: space-between;
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

const FeeDetailInfo: React.FC<Props> = () => {
  return (
    <StyledContainer>
      <StyledList>
        <StyledItem>
          <div>Bridge Rate</div>
          <StyledToken>
            <StyledImageIcon src={getIconSource("reapchain")} alt="icon" />
            cREAP&nbsp;:&nbsp;
            <StyledImageIcon src={getIconSource("reapchain")} alt="icon" />
            tREAP&nbsp;=&nbsp;<StyledRatio>1 : 1</StyledRatio>
          </StyledToken>
        </StyledItem>
        <StyledItem>
          <div>
            Fee
            <Popover
              style={{
                backgroundColor: colors.pointPink,
              }}
              content={<div>Fee...</div>}
              title="Fee"
            >
              <InfoCircleOutlined style={{ marginLeft: "4px" }} />
            </Popover>
          </div>
          <div>2 REAP</div>
        </StyledItem>
        <StyledItem>
          <div>
            Minimum Received
            <Popover
              style={{
                backgroundColor: colors.pointPink,
              }}
              content={<div>Minimum Received...</div>}
              title="Minimum Received"
            >
              <InfoCircleOutlined style={{ marginLeft: "4px" }} />
            </Popover>
          </div>
          <div>2 REAP</div>
        </StyledItem>
        <StyledItem>
          <div>
            Slippage Tolerance
            <Popover
              style={{
                backgroundColor: colors.pointPink,
              }}
              content={<div>Slippage Tolerance...</div>}
              title="Slippage Tolerance"
            >
              <InfoCircleOutlined style={{ marginLeft: "4px" }} />
            </Popover>
          </div>
          <div>1.00%</div>
        </StyledItem>
        <StyledItem>
          <div>
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
          </div>
          <div>20 minutes</div>
        </StyledItem>
      </StyledList>
    </StyledContainer>
  );
};

export default FeeDetailInfo;
