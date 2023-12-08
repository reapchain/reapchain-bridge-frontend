import React from "react";
import styled from "styled-components";
import colors from "../../assets/colors";
import links from "../../assets/links";
import githubIcon from "assets/images/github.svg";
import gitbookIcon from "assets/images/gitbook.svg";
import homeIcon from "assets/images/home.svg";

const StyledFooter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledContent = styled.div`
  margin-top: 16px;
  width: 600px;
`;

const StyledTitleText = styled.div`
  color: ${colors.darkblue01};
  font-weight: 500;
  font-size: 14px;
`;

const StyledLinkText = styled.div`
  cursor: pointer;
  color: ${colors.darkblue02};
  font-weight: 600;
  font-size: 13px;
  margin-right: 20px;
`;

const StyledLinkWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const StyledTextLinkItems = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 12px;
`;

const StyledIconLinkItems = styled.div`
  margin-top: auto;
  display: flex;
  flex-direction: row;
  gap: 20px;
`;

const StyledLinkIcon = styled.div`
  cursor: pointer;
`;

const StyledIconImage = styled.img`
  color: ${colors.darkblue01}
  font-style: bold;
`;

const Footer: React.FC = () => {
  const handleClickIconLink = (iconName: string) => {
    let link = "";
    if (iconName === "home") {
      link = links.homepage;
    } else if (iconName === "github") {
      link = links.github;
    } else if (iconName === "gitbook") {
      link = links.gitbook;
    }

    window.open(link, "_blank");
  };

  return (
    <StyledFooter>
      <StyledContent>
        <StyledTitleText>Powered By Reapchain Network</StyledTitleText>
        <StyledLinkWrapper>
          <StyledTextLinkItems>
            <StyledLinkText>Contact Support</StyledLinkText>
            <StyledLinkText>Terms of Service</StyledLinkText>
            <StyledLinkText>Site map</StyledLinkText>
          </StyledTextLinkItems>
          <StyledIconLinkItems>
            <StyledLinkIcon>
              <StyledIconImage
                src={homeIcon}
                onClick={() => handleClickIconLink("home")}
              />
            </StyledLinkIcon>
            <StyledLinkIcon>
              <StyledIconImage
                src={githubIcon}
                onClick={() => handleClickIconLink("github")}
              />
            </StyledLinkIcon>
            <StyledLinkIcon>
              <StyledIconImage
                src={gitbookIcon}
                onClick={() => handleClickIconLink("gitbook")}
              />
            </StyledLinkIcon>
          </StyledIconLinkItems>
        </StyledLinkWrapper>
      </StyledContent>
    </StyledFooter>
  );
};

export default Footer;
