import { EllipsisOutlined } from "@ant-design/icons";
import { Button, Dropdown, MenuProps } from "antd";
import React from "react";
import styled from "styled-components";
import colors from "../../assets/colors";
import links from "../../assets/links";

const StyledContainer = styled.div`
  background-color: ${colors.primary};
  border: 1px solid transparent;
  cursor: pointer;
  height: 44px;
  padding: 0px 6px;
  font-size: 14px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  font-weight: 700;
  border-radius: 12px;

  &: hover {
    border: 1px solid transparent;
    border-color: ${colors.secondary4};
  }
`;

type MenuItemProps = {
  $first?: boolean | undefined;
};

const StyledMenuItem = styled.div<MenuItemProps>`
  padding: 4px 4px;
  margin-left: -4px;
  margin-right: -4px;
  margin-top: ${(props) => (props.$first ? "0px" : "-8px")};

  a {
    font-weight: 600;
    color: ${colors.white};
  }

  &: hover {
    border-radius: 8px;
    background-color: ${colors.secondary3};
  }
`;

const DropDownMenu: MenuProps = {
  items: [
    {
      label: (
        <StyledMenuItem $first>
          <a target="_blank" rel="noopener noreferrer" href={links.gitbook}>
            Docs
          </a>
        </StyledMenuItem>
      ),
      key: 1,
    },
    {
      label: (
        <StyledMenuItem>
          <a target="_blank" rel="noopener noreferrer" href={links.gitbook}>
            Tutorial
          </a>
        </StyledMenuItem>
      ),
      key: 2,
    },
    {
      label: (
        <StyledMenuItem>
          <a target="_blank" rel="noopener noreferrer" href={links.gitbook}>
            FAQ
          </a>
        </StyledMenuItem>
      ),
      key: 3,
    },
    {
      label: (
        <StyledMenuItem>
          <a target="_blank" rel="noopener noreferrer" href={links.gitbook}>
            Audit Reports
          </a>
        </StyledMenuItem>
      ),
      key: 4,
    },
    {
      label: (
        <StyledMenuItem>
          <a target="_blank" rel="noopener noreferrer" href={links.gitbook}>
            SDK
          </a>
        </StyledMenuItem>
      ),
      key: 5,
    },
    {
      label: (
        <StyledMenuItem>
          <a target="_blank" rel="noopener noreferrer" href={links.gitbook}>
            Contect Support
          </a>
        </StyledMenuItem>
      ),
      key: 6,
    },
    {
      label: (
        <StyledMenuItem>
          <a target="_blank" rel="noopener noreferrer" href={links.gitbook}>
            Contect Address
          </a>
        </StyledMenuItem>
      ),
      key: 7,
    },
    {
      label: (
        <StyledMenuItem>
          <a target="_blank" rel="noopener noreferrer" href={links.gitbook}>
            Bug Bounty
          </a>
        </StyledMenuItem>
      ),
      key: 8,
    },
  ],
  style: {
    marginTop: "8px",
    backgroundColor: colors.primary,
    border: "1px solid transparent",
    borderColor: colors.secondary4,
  },
};

type Props = {};

const HeaderOptionButton: React.FC<Props> = () => {
  return (
    <StyledContainer>
      <Dropdown
        menu={DropDownMenu}
        placement={"bottomLeft"}
        trigger={["click"]}
      >
        <Button
          type="link"
          icon={
            <EllipsisOutlined
              style={{ fontSize: "24px", color: colors.white }}
            />
          }
        />
      </Dropdown>
    </StyledContainer>
  );
};

export default HeaderOptionButton;
