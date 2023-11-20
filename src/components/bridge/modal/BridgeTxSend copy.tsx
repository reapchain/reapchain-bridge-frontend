import colors from "assets/colors";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Progress, Typography } from "antd";
import { abbrAddress } from "utils/util";
const { Link } = Typography;

const conicColors = { "0%": "#87d068", "50%": "#ffe58f", "100%": "#ffccc7" };

const StyledContainer = styled.div`
  flex: 1;
`;
const TitleWrapper = styled.div`
  margin-top: -12px;
  padding-bottom: 16px;
`;
const StyledTitleText = styled.div`
  color: ${colors.godong};
  font-size: 18px;
  font-weight: 700;
`;
const StyledSubTitleText = styled.div`
  color: ${colors.godong};
  font-size: 16px;
  font-weight: 600;
`;
const ProgressWrapper = styled.div`
  display: flex;
`;
const LinkAreaWrapper = styled.div`
  padding-top: 12px;
`;
const LinkWrapper = styled.div`
  margin-top: 8px;
`;
const StyledLinkButton = styled(Link)`
  padding: 0px;
  font-size: 16px;
  font-weight: 700;
  text-underline-offset: 3px;
`;

export interface SendTxInfo {
  isSend: boolean;
  hash: string;
  address: string;
  error: any;
}

type Props = {
  targetWallet: string;
  txInfo: SendTxInfo;
};

const BridgeTxSend: React.FC<Props> = ({ targetWallet, txInfo }) => {
  const [loading, setLoading] = useState<boolean>(true);

  const fetchTxStatus = () => {};

  const handleClickTxHash = () => {};
  const handleClickAccount = () => {};

  useEffect(() => {
    fetchTxStatus();
  }, []);

  return (
    <StyledContainer>
      <TitleWrapper>
        <StyledTitleText>Tx Sending[Reap → Token]</StyledTitleText>
      </TitleWrapper>
      <ProgressWrapper>
        <Progress
          percent={100}
          status="active"
          size={[450, 25]}
          strokeColor={conicColors}
          showInfo={false}
        />
      </ProgressWrapper>
      <LinkAreaWrapper>
        <LinkWrapper>
          <StyledSubTitleText>Tx Hash</StyledSubTitleText>
          <StyledLinkButton
            style={{ color: colors.pointPink, textDecorationLine: "underline" }}
            onClick={handleClickTxHash}
          >
            {abbrAddress(txInfo.hash, 10)}
          </StyledLinkButton>
        </LinkWrapper>
        <LinkWrapper>
          <StyledSubTitleText>Account Info</StyledSubTitleText>
          <StyledLinkButton
            style={{ color: colors.pointPink, textDecorationLine: "underline" }}
            onClick={handleClickAccount}
          >
            {txInfo.address}
          </StyledLinkButton>
        </LinkWrapper>
      </LinkAreaWrapper>
    </StyledContainer>
  );
};

export default BridgeTxSend;

// return (
//   <StyledContainer>
//     <TitleWrapper>
//       <StyledTitleText>Tx Sending[Reap → Token]</StyledTitleText>
//     </TitleWrapper>
//     <ProgressWrapper>
//       <Progress
//         percent={100}
//         status="active"
//         size={[450, 25]}
//         strokeColor={conicColors}
//         showInfo={false}
//       />
//     </ProgressWrapper>
//     <LinkAreaWrapper>
//       <LinkWrapper>
//         <StyledSubTitleText>Tx Hash</StyledSubTitleText>
//         <StyledLinkButton
//           style={{ color: colors.pointPink, textDecorationLine: "underline" }}
//           onClick={handleClickTxHash}
//         >
//           {abbrAddress(txInfo.hash, 10)}
//         </StyledLinkButton>
//       </LinkWrapper>
//       <LinkWrapper>
//         <StyledSubTitleText>Account Info</StyledSubTitleText>
//         <StyledLinkButton
//           style={{ color: colors.pointPink, textDecorationLine: "underline" }}
//           onClick={handleClickAccount}
//         >
//           {txInfo.address}
//         </StyledLinkButton>
//       </LinkWrapper>
//     </LinkAreaWrapper>
//   </StyledContainer>
// );
