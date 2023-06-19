import React, { useState, useContext } from "react";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Context } from "../../context/Context";
import { deleteUserRoute } from "../../utils/APIRoutes";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CloseAccountWarning() {
  const { user,dispatch } = useContext(Context);
  const [isLoading, setIsLoading] = useState(false);
  const toastOptions = {
    position: "top-right",
    autoClose: "8000",
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };
  const handleUerDelete = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const { data } = await axios.delete(`${deleteUserRoute}/${user._id}`);
      if (data.status === false) {
        toast.error(data.message, toastOptions);
        setIsLoading(false);
      }
      if (data.status === true) {
        toast.success(data.message, toastOptions);
        setTimeout(() => {
          dispatch({type: "LOGOUT"});
        }, 5000);
      }
    } catch (error) {
      toast.error(
        "Network Error, Check your network comrade and try again",
        toastOptions
      );
      setIsLoading(false);
    }
  };
  return (
    <>
      <Container className="p-4">
        <h6 className="text-center py-2">
          Are you sure you want to delete this account? This action is not
          reversible, I hope you know 🙄
        </h6>
        <div className="row d-flex py-2 justify-content-center">
          <div className="col-5">
            <button id="cancel" className="btn btn-primary">
              Cancel
            </button>
          </div>
          <div className="col-5">
            {!isLoading ? (
              <button onClick={handleUerDelete} className="btn btn-danger">
                Continue
              </button>
            ) : (
              <button
                disabled
                onClick={handleUerDelete}
                className="btn btn-danger"
              >
                deleting
              </button>
            )}
          </div>
        </div>
        {isLoading && (
          <p className="text-center py-2">
            please don't refresh or close this page
          </p>
        )}
      </Container>
      <ToastContainer />
    </>
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

export default CloseAccountWarning;
