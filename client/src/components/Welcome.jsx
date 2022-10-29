import React from "react";
import styled from "styled-components";

function Welcome({ user }) {

  return (
    <>
      <Container className="welcome-chat">
        <div className="card card-chat ">
          <div className="card-body h-100">
            <h1 className="text-center">
              Welcome <span>Back</span> {user.username} 😃
            </h1>
            <h5 className="text-center">
              Select a friend to start conversation{" "}
            </h5>
          </div>
        </div>
      </Container>
    </>
  );
}

const Container = styled.div`
  flex: 0 0 auto;
  width: 68.66666667%;
  background-color: var(--faded-primary-color);

  h1 {
    font-family: Arial, Helvetica, sans-serif !important;
    color: #ffffff;
    overflow: hidden;
  }

  h5 {
    font-family: "Times New Roman", Times, serif !important;
  }

  .card {
    height: 100%;
  }

  .card-body {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  span {
    color: var(--color);
  }
`;

export default Welcome;
