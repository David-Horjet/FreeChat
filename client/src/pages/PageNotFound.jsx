import React, { useEffect, useContext } from "react";
import styled from "styled-components";
import PageNotFoundContainer from "../components/404/PageNotFoundContainer";
import { Context } from "../context/Context";

function PageNotFound() {
  const user = useContext(Context);

  useEffect(() => {
    document.title = "Profile - FreeChat";
  });
  return (
    <>
      <Container>
        <div className="h-100 chat wrapper">
          <div className="h-100 chat-container">
            <div className="h-100 row">
              <PageNotFoundContainer user={user} />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

const Container = styled.div`
  height: 100vh;
`;

export default PageNotFound;
