import React from "react";
import styled from "styled-components";

type Props = {
  content: React.ReactElement;
};

const StyledMainContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 24px;
  padding: 24px;
`;

const MainContent: React.FC<Props> = ({ content }) => {
  return <StyledMainContent>{content}</StyledMainContent>;
};

export default MainContent;
