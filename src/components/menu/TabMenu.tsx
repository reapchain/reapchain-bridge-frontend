import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import TabButton from "components/common/button/TabButton";

const StyledTab = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  gap: 12px;
  margin: 40px 0px;
`;

const TabMenu: React.FC = () => {
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState("");

  useEffect(() => {
    let tempKey;
    if (
      location.pathname === "/" ||
      location.pathname === "/bridge" ||
      location.pathname === "/bridge/token"
    ) {
      tempKey = "bridge/token";
    } else if (location.pathname === "/bridge/reap") {
      tempKey = "bridge/reap";
    } else if (location.pathname === "/test") {
      tempKey = "test";
    } else {
      tempKey = "bridge";
    }
    setSelectedKey(tempKey);
  }, [location]);

  return (
    <StyledTab>
      <TabButton
        value={"bridge/token"}
        selected={selectedKey}
        from={"cREAP"}
        to={"REAP"}
      />
      <TabButton
        value={"bridge/reap"}
        selected={selectedKey}
        from={"REAP"}
        to={"cREAP"}
      />
    </StyledTab>
  );
};

export default TabMenu;
