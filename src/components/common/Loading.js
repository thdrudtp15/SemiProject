import React from "react";
import Spinner from "../../assets/images/spinner.gif";
import styled from "styled-components";

const LoadingText = styled.div`
  font: 1.5rem "Noto Sans KR";
  text-align: center;
`;
const Background = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: #ffffffb7;
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: ${(props) => (props.isLoading ? "1" : "0")};
  transition: opacity 1s ease-out;
  pointer-events: ${(props) => (props.isLoading ? "auto" : "none")};
`;
const Loading = ({ isLoading }) => {
  return (
    <Background isLoading={isLoading}>
      <LoadingText>잠시만 기다려 주세요.</LoadingText>
      <img src={Spinner} alt="LoadingImg" width="10%" />
    </Background>
  );
};
export default Loading;
