import React from "react";
import { useContext } from "react";
import styled from "styled-components";
import { Context } from "../../context/Context";

function LogoutWarning() {
  const {dispatch} = useContext(Context);
  const handleLogout = () => {
    dispatch({type: "LOGOUT"});
  }
  return (
    <Container className="p-4">
      <h6 className="text-center py-2">Are you sure you want to Logout? 🙄</h6>
      <div className="row d-flex py-2 justify-content-center">
        <div className="col-5">
          <button id="cancel" className="btn btn-primary">
            Cancel
          </button>
        </div>
        <div className="col-5">
          <button onClick={handleLogout} className="btn btn-danger">Continue</button>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  background: var(--faded-primary-color);
  border-radius: 20px;
  width: 300px;
  position: absolute;
  transform: translate(-50%, -50%) scale(1);
  left: 50%;
  top: 50%;
  transition: 0.3s ease-in-out;
  h6 {
    color: var(--secondary-color);
    font-size: 15px;
    line-height: 30px;
  }
  .row {
    gap: 30px;
  }
`;

export default LogoutWarning;
