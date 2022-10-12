import React, { useEffect, useState } from "react";
import styled from "styled-components";

function Welcome({ currentUser }) {
  const [currentUserName, setCurrentUserName] = useState(undefined); 

  useEffect(() => {
    async function getUser() {
      if (currentUser) {
        const user = await JSON.parse(currentUser);
        setCurrentUserName(user.firstName);
      }
    }
    getUser();
  }, [currentUser]);

  return (
    <>
      <Container className="welcome-chat col-lg-8 col-xxl-8">
          <div className="card card-chat ">
            <div className="card-body h-100">
              <h1 className="text-center">
                Welcome <span>Back 😃</span> {currentUserName}
              </h1>
              <h5 className="text-center text-white">
                Start Conversation{" "}
              </h5>
            </div>
          </div>
      </Container>
    </>
  );
}

const Container = styled.div`
  .card {
    background-color: var(--primary-color);
  }

  h1 {
    font-family: Arial, Helvetica, sans-serif !important;
    color: var(--secondary-color);
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
