import React from "react";
import { BsHouseDoorFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import styled from "styled-components";

function PageNotFoundContainer() {
  return (
    <>
      <Container className="profileContainer">
        <div className="h-100 body-card">
          <h1>404</h1>
          <h2>Page Not Found</h2>
          <p>
            Finally, You completely lost your way comrade 😏, <br /> You can
            start to regain your track by hitting the button Below
          </p>
          <Link to="/">
            <button>
              <BsHouseDoorFill /> Home{" "}
            </button>
          </Link>
        </div>
      </Container>
    </>
  );
}

const Container = styled.div`
  flex: 0 0 auto;
  width: 100%;
  background: var(--primary-color);
  .body-card {
    display: flex;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    color: var(--faded-secondary-color);
    h1 {
      font-size: 100px;
      color: var(--secondary-color);
    }
    button {
      width: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 5px;
      border-radius: 10px;
      padding: 10px;
      margin: 0 auto;
      border: none;
      background: var(--gradient);
      color: #fff;
    }
  }
`;

export default PageNotFoundContainer;
