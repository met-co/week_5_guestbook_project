import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams} from "react-router-dom";
import styled from "styled-components";
import {
    clearGuestbook,
    __getGuestbookThunk,
    __updateGuestbookThunk
} from "../redux/modules/guestBookSlice";
import Button from "../components/Button";
import Text from "../components/Text";
import Layout from "../components/Layout";
import Comments from "../components/Comments";




const GuestBook = () => {
    const dispatch = useDispatch();
    const {id} = useParams();
    const navigate = useNavigate();

    const [isEditMode, setIsEditMode] = useState(false);
    const [updateGuestbook, setUpdateGuestbook] = useState("");
    const { guestbook } = useSelector((state) => state.guestbook);


    useEffect(() => {
        dispatch(__getGuestbookThunk(id));
        return () => dispatch(clearGuestbook());
    }, [dispatch, id]);


    // 렌더링이 일어나면 guestbook 배열의 content를 set해서 업데이트
    useEffect(() => {
        setUpdateGuestbook(guestbook.content);
    }, [guestbook]);


    const onSaveButtonHandler = () => {
        if (updateGuestbook.trim() === ""){
            return alert("입력된 내용이 없습니다.");
        }
        dispatch(
            __updateGuestbookThunk({
                ...guestbook,
                content : updateGuestbook,
            })
        );
        setIsEditMode(false);
    };


  return (
    <>
      <Layout>
        {!isEditMode && (
          <StTodoHeader>
            <Text size="24">id: ({guestbook?.id})</Text>
            <Text
              size="24"
              onClick={() => {
                navigate("/guestbooks");
              }}
            >
              이전으로
            </Text>
          </StTodoHeader>
        )}

        <Text size="32" fw="700">
          {guestbook?.title}
        </Text>
        <StBody>
          {isEditMode ? (
            <>
              <Textarea
                name="body"
                rows="10"
                maxLength={200}
                value={updateGuestbook}
                onChange={(event) => {
                    setUpdateGuestbook(event.target.value);
                }}
              />
            </>
          ) : (
            <Text size="18">{guestbook?.content}</Text>
          )}

          <StButtonGroup>
            {isEditMode ? (
              <Button size="large" onClick={onSaveButtonHandler}>
                저장
              </Button>
            ) : (
              <Button
                size="large"
                onClick={() => {
                  setIsEditMode(true);
                }}
              >
                수정
              </Button>
            )}
          </StButtonGroup>
        </StBody>
        {/* {!isEditMode && <Comments />} */}
      </Layout>
    </>
  );
};

export default GuestBook;

const StTodoHeader = styled.div`
  display: flex;
  justify-content: space-between;
  div:nth-child(2) {
    text-decoration: underline;
    color: teal;
    cursor: pointer;
  }
  margin-bottom: 32px;
`;

const StBody = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  margin-top: 50px;
  min-height: 550px;
  div {
    line-height: 1.5;
  }
`;

const StButtonGroup = styled.div`
  width: 100%;
  gap: 12px;
`;

const Textarea = styled.textarea`
  width: 100%;
  border: 1px solid #eee;
  padding: 12px;
  font-size: 14px;
`;
