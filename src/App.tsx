import styled from "styled-components";
import Home from "./views/Home";
import colors from "./assets/colors";

const StyledApp = styled.div`
  background: linear-gradient(
    180deg,
    ${colors.secondary1} 0%,
    ${colors.primary} 18%
  );
  min-height: 100vh;
  padding: 0px 24px;
`;

const App = () => {
  return (
    <StyledApp>
      <Home />
    </StyledApp>
  );
};

export default App;
