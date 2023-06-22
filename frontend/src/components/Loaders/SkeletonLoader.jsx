import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import styled from 'styled-components';
import "react-loading-skeleton/dist/skeleton.css";

export const SkeletonCircle = ({ customStyle, width, height }) => {
  return (
    <SkeletonTheme color="#5c5b5b" highlightColor="#525252">
      <SkeletonContainer style={customStyle}>
        <Skeleton width={width} height={height} circle={true} />
      </SkeletonContainer>
    </SkeletonTheme>
  );
};

export const SkeletonPlane = ({ width, height }) => {
  return (
    <SkeletonTheme color="#5c5b5b" highlightColor="#525252">
      <SkeletonContainer>
        <Skeleton width={width} height={height} />
      </SkeletonContainer>
    </SkeletonTheme>
  );
};

const SkeletonContainer = styled.div`
  
`;