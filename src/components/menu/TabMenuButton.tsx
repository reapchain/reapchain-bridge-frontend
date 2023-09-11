import React from "react";
import { Tabs, TabsProps } from "antd";
import styled from "styled-components";
import colors from "assets/colors";

const items: TabsProps["items"] = [
  {
    key: "bridge",
    label: "Bridge",
    children: "Content of Tab Pane 1",
  },
  {
    key: "swap",
    label: "Swap",
    children: "Content of Tab Pane 2",
  },
];

const TabMenu: React.FC = () => {
  const onChange = (key: string) => {
    console.log(key);
  };

  return <Tabs defaultActiveKey="1" items={items} onChange={onChange} />;
};

export default TabMenu;
