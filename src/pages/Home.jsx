import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout"
import { HiArrowCircleRight } from "react-icons/hi";



const Home = () => {
    const navigate = useNavigate();

    return (
        <Layout>
            <StContainer>
                <StMain>
                    <StBox onClick={()=> {navigate("/guestbook/add")}}>
                        <p>방명록 작성하기</p>
                        <HiArrowCircleRight size="32" color="#FE531F"></HiArrowCircleRight>
                    </StBox>
                    <StBox onClick={() => {navigate("/guestbooks")}}>
                        <p>방명록 게시판</p>
                        <HiArrowCircleRight size="32" color="#FE531F"></HiArrowCircleRight>
                    </StBox>
                </StMain>
            </StContainer>
    </Layout>
    );
}


export default Home;

const StContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const StMain = styled.div`
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 24px;
`;

const StBox = styled.div`
  font-size : 28px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height : 100%;
  padding : 0 20px;
  width: 100%;
  height: 120px;
  border: 1px solid #eee;
  background-color: #fff;
  border-radius: 8px;
  cursor: pointer;
  :hover {
    box-shadow: rgba(0, 0, 0, 0.1) 1px 1px 1px;
  }
`;