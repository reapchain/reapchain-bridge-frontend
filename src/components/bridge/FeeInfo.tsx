import React from "react";
import styled from "styled-components";
import colors from "assets/colors";
import { getIconSource } from "utils/util";
import { InfoCircleOutlined } from "@ant-design/icons";
import { Popover } from "antd";

type Props = {};

const StyledContainer = styled.div`
  margin-top: 36px;
  border: dashed transparent;
  border-width: 5px 0px 0px 0px;
  border-color: ${colors.pointPink};
`;

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
  color: ${colors.pointPink};
  font-weight: 800;
`;

const StyledImageIcon = styled.img`
  width: 16px;
  height: 16px;
  margin-left: 2px;
  margin-right: 2px;
`;

const FeeInfo: React.FC<Props> = () => {
  return (
    <StyledContainer>
      {/* <StyledDivideLine /> */}
      <StyledList>
        <StyledItem>
          <div>
            Bridge Rate
            <Popover
              style={{
                backgroundColor: colors.pointPink,
              }}
              content={<div>Bridge Rate.........</div>}
              title="Bridge Rate"
            >
              <InfoCircleOutlined style={{ marginLeft: "4px" }} />
            </Popover>
          </div>
          <StyledToken>
            <StyledImageIcon src={getIconSource("reapchain")} alt="icon" />
            cREAP&nbsp;:&nbsp;
            <StyledImageIcon src={getIconSource("reapchain")} alt="icon" />
            tREAP&nbsp;=&nbsp;<StyledRatio>1 : 1</StyledRatio>
          </StyledToken>
        </StyledItem>
        <StyledItem>
          <div>
            Layer Fee
            <Popover
              style={{
                backgroundColor: colors.pointPink,
              }}
              content={<div>Layer Fee.........</div>}
              title="Layer Fee"
            >
              <InfoCircleOutlined style={{ marginLeft: "4px" }} />
            </Popover>
          </div>
          <div>0.1 REAP</div>
        </StyledItem>
        <StyledItem>
          <div>
            Bridge Fee
            <Popover
              style={{
                backgroundColor: colors.pointPink,
              }}
              content={<div>Bridge Fee.........</div>}
              title="Bridge Fee"
            >
              <InfoCircleOutlined style={{ marginLeft: "4px" }} />
            </Popover>
          </div>
          <div>0.2 REAP</div>
        </StyledItem>
      </StyledList>
      {/* <div>FeeInfo~</div>
      <div>2222</div>
      <div>333</div>
      <div>444</div> */}
    </StyledContainer>
  );
};

export default FeeInfo;
