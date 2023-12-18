import React, { Suspense, useEffect } from "react";
import styled from "styled-components";
import colors from "./assets/colors";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { MetaMask } from "@web3-react/metamask";
import { Web3ReactProvider, initializeConnector } from "@web3-react/core";
import TabMenu from "components/menu/TabMenu";
import Bridge from "views/Bridge";
import Web3ContextProvider from "components/common/Web3ContextProvider";
import GlobalStyles from "assets/styles/GlobalStyles";
import { getEthereumTxInfo } from "apis/api";

const metaMask = initializeConnector<MetaMask>(
  (actions) => new MetaMask({ actions })
);

const connectors = {
  MetaMask: metaMask,
};

// const connections: [Connector, Web3ReactHooks][] = connectors.map(([connector, hooks]) => [connector, hooks])

const ComponentLoading: React.FC = () => {
  return (
    <div>
      <div>Loading...</div>
    </div>
  );
};

const StyledPage = styled.div`
  background: ${colors.background};
  min-height: 100vh;
`;

const StyledApp = styled.div`
  padding: 40px 40px 0px 40px;
  flex-direction: column;
  justify-content: center;
`;

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px 24px 24px 24px;
`;

const Swap = React.lazy(() => import("./views/Swap"));
const Test = React.lazy(() => import("./views/Test"));

const queryClient = new QueryClient();

const App = () => {
  const [metaMaskConnector, metaMaskHooks] = connectors["MetaMask"];

  useEffect(() => {}, []);

  return (
    <Web3ReactProvider connectors={[[metaMaskConnector, metaMaskHooks]]}>
      <QueryClientProvider client={queryClient}>
        <GlobalStyles />
        <Web3ContextProvider>
          <StyledPage>
            <StyledApp>
              <BrowserRouter>
                <Header />
                <StyledContent>
                  <TabMenu />
                  <Suspense fallback={<ComponentLoading />}>
                    <Routes>
                      <Route path="/" element={<Bridge />} />
                      <Route path="/bridge/*" element={<Bridge />} />
                      <Route path="/bridge/token" element={<Bridge />} />
                      <Route path="/bridge/reap" element={<Bridge />} />
                      {/* <Route path="/swap" element={<Swap />} /> */}
                      {/* <Route path="/test" element={<Test />} /> */}
                      <Route path="/*" element={<Bridge />} />
                    </Routes>
                  </Suspense>
                </StyledContent>
                <Footer />
              </BrowserRouter>
            </StyledApp>
          </StyledPage>
        </Web3ContextProvider>
      </QueryClientProvider>
    </Web3ReactProvider>
  );
};

export default App;
