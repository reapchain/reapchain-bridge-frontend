import React, { useEffect, useState } from "react";
import { ConfigProvider, Tabs, TabsProps } from "antd";
import styled from "styled-components";
import colors from "assets/colors";
import { Link, useLocation, useNavigate } from "react-router-dom";

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
    key: "bridge",
    label: <TabMenuItem title={"Bridge"} link={"/bridge"} />,
  },
  {
    key: "swap",
    label: <TabMenuItem title={"Swap"} link={"/swap"} />,
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
    if (location.pathname === "/" || location.pathname === "/bridge") {
      tempKey = "bridge";
    } else if (location.pathname === "/swap") {
      tempKey = "swap";
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
