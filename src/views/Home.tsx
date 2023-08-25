import React from "react";
import styled from "styled-components";
import MainContent from "../components/common/MainContent";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import SwapCard from "../components/swap/SwapCard";

type Props = {};

const StyledHome = styled.div`
  width: 100%;
  flex-direction: column;
  justify-content: center;
`;

const Home: React.FC = (props: Props) => {
  return (
    <StyledHome>
      <Header />
      <MainContent content={<SwapCard />} />
      <Footer />
    </StyledHome>
  );
};

export default Home;
