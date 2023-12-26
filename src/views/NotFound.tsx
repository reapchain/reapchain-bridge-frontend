import React from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import errorIcon from "assets/images/404error.png";
import colors from "assets/colors";

const Component = styled.div`
  padding-top: 150px;
  padding-bottom: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const StyledIcon = styled.img`
  width: 200px;
  height: 200px;
`;
const StyledTitle = styled.div`
  font-size: 100px;
  color: ${colors.white};
  font-size: 100px;
  font-family: Pretendard;
  font-weight: 650;
  margin-top: -36px;
`;
const StyledSubTitle = styled.div`
  font-size: 24px;
  color: ${colors.darkblue01};
  font-weight: 650;
`;
const StyledContents = styled.div`
  margin-top: 12px;
  font-size: 14px;
  color: ${colors.darkblue02};
`;
const StyledButton = styled.div`
  margin-top: 30px;
  width: 300px;
  height: 55px;
  border-radius: 12px;
  background-color: ${colors.blue};
  display: flex;
  cursor: pointer;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  color: ${colors.white};
  font-size: 16px;
  font-weight: 700;
`;

type Props = {};

const NotFound: React.FC = (props: Props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/bridge`);
  };

  return (
    <Component>
      <StyledIcon src={errorIcon} alt="icon" />
      <StyledTitle>404</StyledTitle>
      <StyledSubTitle>Page Not Found</StyledSubTitle>
      <StyledContents>
        The page you are looking for doesn’t exist or an other error occurred.
      </StyledContents>
      <StyledButton onClick={handleClick}>Go Home</StyledButton>
    </Component>
  );
};

export default NotFound;
