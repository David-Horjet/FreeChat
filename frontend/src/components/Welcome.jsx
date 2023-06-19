import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { host } from "../utils/APIRoutes";

function Welcome({ user }) {
  return (
    <>
      <Container className="welcome-chat">
        <div className="card card-chat ">
          <div className="card-body h-100">
            <div className="d-flex justify-content-center">
              <Link to={`/${user.username}`} className="avatar">
                <img src={`${host}/${user.image}`} alt="" />
              </Link>
            </div>
            <h3 className="text-center">
              Welcome <span>Back</span> {user.username}
            </h3>
            <p className="text-center">
              Please select a user to start chatting{" "}
            </p>
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

  .avatar {
    width: 60px;
    height: 60px;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      overflow: hidden;
      cursor: pointer;
      object-fit: cover;
    }
  }

  h3 {
    margin-top: 20px;
    color: var(--secondary-color);
    overflow: hidden;
  }

  p {
    margin-top: 10px;
    color: var(--faded-secondary-color);
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
