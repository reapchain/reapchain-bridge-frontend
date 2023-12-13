import React from "react";
import styled from "styled-components";
import ExecuteButton from "components/common/button/ExecuteButton";

const StyledContainer = styled.div``;

type Props = {
  onClickExecute: () => void;
};

const TransferButton: React.FC<Props> = ({ onClickExecute }) => {
  const handleClickExecute = () => {
    onClickExecute();
  };

  return (
    <StyledContainer onClick={handleClickExecute}>
      <ExecuteButton text={"Transfer"} />
    </StyledContainer>
  );
};

export default TransferButton;
