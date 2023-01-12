import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import {__addGuestbookThunk } from "../redux/modules/guestBooksSlice";
import styled from "styled-components";





const AddGuestBook = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isSuccess = useSelector((state) => state.guestbooks.isSuccess);

    const [guestbook, setGuestbook] = useState({
        title : "",
        content : "",
        username : "",
    });

    // useEffect(() => {
    //     if (!isSuccess) return;
    //     // isSuccess 가 false면 pending 상태니까 그냥 여기서 return
    //     if (isSuccess) navigate("/guestbooks");
    //     // 왜 계속 guestbooks로 이동하나 했더니 이거때문이었음 ㅠㅠ 한참 헤맴
    //     // isSuccess 가 true면 fulfilled 상태니까 /works로 페이지 이동
    
    //     return () => dispatch(clearGuestbook());
    //     // 그리고 클린업 실행해서 reducer의 clearTodo 함수로 가서 isSuccess
    //     // 상태를 false로 바꿈
    //   }, [dispatch, isSuccess, navigate]);
    //     // 의존성 배열
    //     // 이 값이 바뀔 때만 useEffect 실행

   
  
    const onChangeHandler = (event) => {
      const {name, value} = event.target;
      setGuestbook({
          ...guestbook,
          [name] : value,
      })
    };
 

    return (
        <Layout>
        <StContainer>
          <StForm
            onSubmit={(event) => {
              event.preventDefault();
              if (
                guestbook.content.trim() === "" ||
                guestbook.username.trim() === "" ||
                guestbook.title.trim() === ""
              ) {
                return alert("모든 항목을 입력해주세요.");
              }
              dispatch(__addGuestbookThunk(guestbook));
              setGuestbook({ title: "", content: "", username: "" });
              navigate("/guestbooks")
            }}
          >
            <StMain>
              <div>
                <p>작성자</p>
              </div>
              <input
                type="text"
                onChange={onChangeHandler}
                placeholder="작성자의 이름을 입력해주세요. (5자 이내)"
                value={guestbook.username}
                name="username"
                maxLength={5}
              />
              <div>
                <p>제목</p>
              </div>
              <input
                type="text"
                onChange={onChangeHandler}
                placeholder="제목을 입력해주세요. (50자 이내)"
                value={guestbook.title}
                name="title"
                maxLength={50}
              />
              <div>
                <p>내용</p>
              </div>
              <StTextarea
                name="content"
                rows="10"
                maxLength={200}
                onChange={onChangeHandler}
                placeholder="내용을 입력해주세요. (200자 이내)"
                value={guestbook.content}
              />
            </StMain>
            <Stbutton>
              <button>추가하기</button>
            </Stbutton>
          </StForm>
        </StContainer>
        </Layout>
      );
    };

export default AddGuestBook;

const StForm = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
`;

const StContainer = styled.div`
  height: 100%;
`;

const StTextarea = styled.textarea`
  width: 70%;
  border: 1px solid #eee;
  padding: 12px;
  font-size: 14px;
`;

const StMain = styled.div`
  width: 100%;
  & > div > p {
    margin-top: 40px;
    font-size: 25px;
  }
`;

const Stbutton = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  & > button {
  width : 500px;
  height: 50px;
  border: none;
  margin-top: 50px;
  }
`