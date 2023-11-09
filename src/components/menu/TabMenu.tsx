import React, { useEffect, useState } from "react";
import { ConfigProvider, Tabs, TabsProps } from "antd";
import styled from "styled-components";
import colors from "assets/colors";
import { useLocation, useNavigate } from "react-router-dom";

type TabMenuItemProps = {
  title: string;
  link: string;
};

const StyledTabItem = styled.div`
  font-size: 22px;
  font-weight: 700;
`;

const TabMenuItem: React.FC<TabMenuItemProps> = ({ title }) => {
  return <StyledTabItem>{title}</StyledTabItem>;
};

const items: TabsProps["items"] = [
  {
    key: "bridge/token",
    label: <TabMenuItem title={"Token → Reap"} link={"/bridge/token"} />,
  },
  {
    key: "bridge/reap",
    label: <TabMenuItem title={"Reap → Token"} link={"/bridge/reap"} />,
  },
  {
    key: "test",
    label: <TabMenuItem title={"Test"} link={"/test"} />,
  },
];

const TabMenu: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
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

  const handleChange = (key: string) => {
    navigate(`/${key}`);
  };

  return (
    <ConfigProvider
      theme={{
        token: { colorPrimary: colors.pointPink },
      }}
    >
      <Tabs
        activeKey={selectedKey}
        tabBarStyle={{ color: colors.etcGray }}
        defaultActiveKey={"bridge"}
        size="large"
        color={colors.pointPink}
        items={items}
        onChange={handleChange}
      />
    </ConfigProvider>
  );
};

export default TabMenu;
