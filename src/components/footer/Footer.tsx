import React from "react";
import styled from "styled-components";
import colors from "../../assets/colors";
import {
  FileTextOutlined,
  GithubOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import FooterLinkButton from "./FooterLinkButton";
import links from "../../assets/links";

const StyledFooter = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  color: ${colors.white};
  font-weight: 600;
  font-size: 12px;
  padding-bottom: 24px;
`;

const StyledFooterItem = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 16px;
`;

const StyledHrefArea = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 8px;
`;

const StyledHrefWrapper = styled.div`
  margin: 0px 12px;
  cursor: pointer;
  text-decoration: underline;
  text-underline-offset: 3px;
`;

const footerIconStyle = { fontSize: "16px", color: colors.white };

const Footer: React.FC = () => {
  return (
    <StyledFooter>
      <StyledFooterItem>Powered By Reapchain Network</StyledFooterItem>
      <StyledFooterItem>
        <FooterLinkButton
          href={links.homepage}
          icon={<HomeOutlined style={footerIconStyle} />}
        />
        <FooterLinkButton
          href={links.github}
          icon={<GithubOutlined style={footerIconStyle} />}
        />
        <FooterLinkButton
          href={links.gitbook}
          icon={<FileTextOutlined style={footerIconStyle} />}
        />
      </StyledFooterItem>
      <StyledFooterItem>
        <StyledHrefArea>
          <StyledHrefWrapper>Contact Support</StyledHrefWrapper>
          <StyledHrefWrapper>Terms of Service</StyledHrefWrapper>
          <StyledHrefWrapper>Site map</StyledHrefWrapper>
        </StyledHrefArea>
      </StyledFooterItem>
    </StyledFooter>
  );
};

export default Footer;
