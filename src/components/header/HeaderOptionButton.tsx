import { EllipsisOutlined } from "@ant-design/icons";
import { Button, Dropdown, MenuProps } from "antd";
import React from "react";
import styled from "styled-components";
import colors from "../../assets/colors";
import links from "../../assets/links";
import HeaderOptionDropdownItem from "components/header/HeaderOptionDropdownItem";

const StyledDropdown = styled(Dropdown)`
  background-color: ${colors.secondary};
  border: 1px solid transparent;
  cursor: pointer;
  font-size: 14px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  border: 1.5px solid transparent;
`;

const StyledDropdownButton = styled(Button)``;

const DropDownMenu: MenuProps = {
  items: [
    {
      label: <HeaderOptionDropdownItem href={links.faucet} text={"Faucet"} />,
      key: 1,
    },
    {
      label: (
        <HeaderOptionDropdownItem
          href={links.erc20Etherscan}
          text={"ERC-20 Token"}
        />
      ),
      key: 2,
    },
    {
      label: (
        <HeaderOptionDropdownItem
          href={links.bridgeEtherscan}
          text={"Bridge Contract"}
        />
      ),
      key: 3,
    },
  ],
  style: {
    backgroundColor: colors.secondary,
    border: `1px solid ${colors.darkblue03}`,
    borderRadius: "12px",
    marginTop: "12px",
    padding: "8px 0px",
  },
};

type Props = {};

const HeaderOptionButton: React.FC<Props> = () => {
  return (
    <StyledDropdown
      menu={DropDownMenu}
      placement={"bottomLeft"}
      trigger={["click"]}
    >
      <StyledDropdownButton
        type="link"
        icon={
          <EllipsisOutlined
            style={{ fontSize: "32px", color: colors.darkblue01 }}
          />
        }
        style={{ width: "72px", height: "44px" }}
      />
    </StyledDropdown>
  );
};

export default HeaderOptionButton;
