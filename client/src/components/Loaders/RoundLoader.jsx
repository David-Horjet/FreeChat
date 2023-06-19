import React from "react";
import styled from "styled-components";

function RoundLoader() {
  return (
    <Container title="Loading Users">
      <div className="loader"></div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  .loader {
    width: 25px;
    height: 25px;
    border-top: 3px solid #ffffff !important;
    border-right: 3px solid #ffffff !important;
    border-bottom: 3px solid #ffffff !important;
    border: 4px solid transparent;
    border-radius: 50%;
    margin-left: 5px;
    animation: loader 1s linear infinite;
  }
  @keyframes loader {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

export default RoundLoader;
