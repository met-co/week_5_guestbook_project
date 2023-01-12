import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { VscTrash } from "react-icons/vsc";
import { __deleteGuestbookThunk } from "../redux/modules/guestBooksSlice";
import Button from "../components/Button";

const Card = ({ guestbook }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onDeleteHandler = () => {
    dispatch(__deleteGuestbookThunk(guestbook.id));
  };

  return (
    <StCard
      onClick={() => {
        navigate(`/guestbooks/${guestbook.id}`);
      }}
    >
      <StBox>
        <div>{guestbook.title}</div>
        <Button
          size="small"
          onClick={(event) => {
            event.stopPropagation();
            const result = window.confirm("이 방명록을 지울까요?");
            if (result) {
              return onDeleteHandler();
            } else {
              return;
            }
          }}
        >
          <VscTrash color="#FE531F" />
        </Button>
      </StBox>
      <StWrapper>
        <div>작성자 : {guestbook.username}</div>
      </StWrapper>
    </StCard>
  );
};

export default Card;

const StCard = styled.div`
  padding: 12px;
  height: 90px;
  border: 1px solid #ddd;
  background-color: #fff;
  border-radius: 12px;
  width: 100%;
  margin-bottom: 12px;
`;

const StBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StWrapper = styled.div`
  display: flex;
  margin: 10px 0;
  & > div {
    justify-content: space-between;
  }
`;
