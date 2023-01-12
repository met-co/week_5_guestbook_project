import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <StContainer>
      <p
        onClick={() => {
          navigate("/");
        }}
      >
        HOME
      </p>
      <div>방명록</div>
    </StContainer>
  );
};

export default Header;

const StContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 50px;
  border-bottom: 5px solid red;
  padding: 0px 20px;
  & > p {
    font-size: 25px;
    cursor: pointer;
  }
  & > div {
    font-size: 25px;
  }
`;
