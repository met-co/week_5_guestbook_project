import React, { useEffect } from "react";
import { useDispatch , useSelector} from "react-redux";
import styled from "styled-components";
import Layout from "../components/Layout";
import { __getGuestbookThunk } from "../redux/modules/guestBooksSlice";
import Card from "../components/Card";




const GuestBooks = () => {
    const dispatch = useDispatch();
    const { guestbooks, error } = useSelector((state) => state.guestbooks);


    useEffect(() => {
        dispatch(__getGuestbookThunk());
    }, [dispatch]);



    if (guestbooks.length === 0)
        return (
            <div>작성된 방명록이 없습니다.</div>
        );

    if (error)
        return (
            <div>알 수 없는 문제가 발생했습니다.</div>
        )

    return (
        <Layout>
            <StWrapper>
                <p>방명록 게시판</p>
            </StWrapper>
           <StContainer>
                {guestbooks.map((guestbook) => (
                    <Card key={guestbook.id} guestbook={guestbook} />
                ))}
            </StContainer> 
        </Layout>
    );
}


export default GuestBooks;

const StWrapper = styled.div`
    width: 100%;
`;

const StContainer = styled.div`
    height: calc(100% - 45px - 48px);
`
