import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { host } from "../utils/APIRoutes";
import { authAxios } from "../utils/Axios";
import { SkeletonCircle, SkeletonPlane } from "./Loaders/SkeletonLoader";
import { userRoute } from "../utils/APIRoutes";
import { Context } from "../context/Context";

function Welcome() {
  const [profile, setProfile] = useState("");
  const [loading, setLoading] = useState(false);
  
  const { user } = useContext(Context);

  useEffect(() => {
    async function fetchUserData() {
      setLoading(true);
      const res = await authAxios.get(`${userRoute}/${user.username}`);
      if (res.data.status === false) {
        setLoading(false);
      }
      if (res.data.status === true) {
        setLoading(false);
        setProfile(res.data.user);
      }
    }
    fetchUserData();
  }, []);
  return (
    <>
      <Container className="welcome-chat">
        <div className="card card-chat ">
          <div className="card-body h-100">
            <div className="d-flex justify-content-center">
              {loading ? (
                <SkeletonCircle width={60} height={60} />
              ) : (
                <Link to={`/${profile.username}`} className="avatar">
                  <img src={profile.image} alt="profileImage" />
                </Link>
              )}
            </div>
            <div className="text-center">
              {loading ? (
                <SkeletonPlane width={100} height={15} />
              ) : (
                <h3>
                  Welcome <span>Back</span> {profile.username}
                </h3>
              )}
            </div>
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
  background-color: var(--primary-color);

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
