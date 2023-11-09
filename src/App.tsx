import React, { Suspense } from "react";
import styled from "styled-components";
import colors from "./assets/colors";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { MetaMask } from "@web3-react/metamask";
import {
  Web3ReactProvider,
  initializeConnector,
  useWeb3React,
  Web3ReactHooks,
} from "@web3-react/core";
import { ethers } from "ethers";
import TabMenu from "components/menu/TabMenu";
import Bridge from "views/Bridge";
import { Connector } from "@web3-react/types";
import { InjectedConnector } from "@web3-react/injected-connector";
import Web3ContextProvider from "components/common/Web3ContextProvider";

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
  background: ${colors.warmWhite};
  min-height: 100vh;
  padding: 0px 24px;
`;

const StyledApp = styled.div`
  width: 100%;
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
  // const { connector, chainId, account } = useWeb3React();

  return (
    <Web3ReactProvider connectors={[[metaMaskConnector, metaMaskHooks]]}>
      <QueryClientProvider client={queryClient}>
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
                      <Route path="/swap" element={<Swap />} />
                      <Route path="/test" element={<Test />} />
                      <Route path="/*" element={<Swap />} />
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
