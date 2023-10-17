import { EllipsisOutlined } from "@ant-design/icons";
import { Button, Dropdown, MenuProps } from "antd";
import React from "react";
import styled from "styled-components";
import colors from "../../assets/colors";
import links from "../../assets/links";
import HeaderOptionDropdownItem from "components/header/HeaderOptionDropdownItem";

const StyledDropdown = styled(Dropdown)`
  background-color: ${colors.white};
  border: 1px solid transparent;
  cursor: pointer;
  padding: 8px;
  font-size: 14px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  border-radius: 12px;
  border: 1.5px solid transparent;

  &: hover {
    transition: 0.5s;
    border: 1.5px solid;
    border-color: ${colors.pointPink};
  }
`;

const StyledDropdownButton = styled(Button)`
  width: 44px;
  height: 44px;
`;

const DropDownMenu: MenuProps = {
  items: [
    {
      label: <HeaderOptionDropdownItem href={links.gitbook} text={"Docs"} />,
      key: 1,
    },
    {
      label: (
        <HeaderOptionDropdownItem href={links.gitbook} text={"Tutorial"} />
      ),
      key: 2,
    },
    {
      label: <HeaderOptionDropdownItem href={links.gitbook} text={"FAQ"} />,
      key: 3,
    },
    {
      label: (
        <HeaderOptionDropdownItem href={links.gitbook} text={"Audit Reports"} />
      ),
      key: 4,
    },
    {
      label: <HeaderOptionDropdownItem href={links.gitbook} text={"SDK"} />,
      key: 5,
    },
    {
      label: (
        <HeaderOptionDropdownItem
          href={links.gitbook}
          text={"Contect Support"}
        />
      ),
      key: 6,
    },
    {
      label: (
        <HeaderOptionDropdownItem
          href={links.gitbook}
          text={"Contect Address"}
        />
      ),
      key: 7,
    },
    {
      label: (
        <HeaderOptionDropdownItem href={links.gitbook} text={"Bug Bounty"} />
      ),
      key: 8,
    },
  ],
  style: {
    backgroundColor: colors.realWhite,
    border: "1.5px solid transparent",
    borderColor: colors.pointPink,
  },
};

type Props = {};

const HeaderOptionButton: React.FC<Props> = () => {
  return (
    <StyledDropdown
      menu={DropDownMenu}
      placement={"bottomLeft"}
      trigger={["click"]}
      overlayStyle={{ color: colors.white }}
    >
      <StyledDropdownButton
        type="link"
        icon={
          <EllipsisOutlined
            style={{ fontSize: "24px", color: colors.pointPink }}
          />
        }
        style={{ width: "44px", height: "44px" }}
      />
    </StyledDropdown>
  );
};

export default HeaderOptionButton;
