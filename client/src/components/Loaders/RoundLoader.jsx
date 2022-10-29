import React from "react";
import styled from "styled-components";

function RoundLoader() {
  return <Container title="Loading Users"></Container>;
}

const Container = styled.div`
  width: 25px;
  height: 25px;
  border-top: 3px solid var(--color) !important;
  border-right: 3px solid var(--color) !important;
  border-bottom: 3px solid var(--color) !important;
  border: 4px solid transparent;
  border-radius: 50%;
  margin-left: 5px;
  animation: loader 0.5s linear infinite;
`;

export default RoundLoader;
