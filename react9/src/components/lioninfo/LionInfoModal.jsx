import React, { useState } from "react";
import styled from "styled-components";
import FilterButton from "./FilterButton";
import UserDataSection from "./UserDataSection";
import { getAllPage } from "../../apis/lioninfo";
import Pagination from "./pagination";

const LionInfoModal = () => {
  const [userData, setUserData] = useState([]);
  const [pageNum, setPageNum] = useState([
    { id: 1, clicked: false },
    { id: 2, clicked: false },
    { id: 3, clicked: false },
    { id: 4, clicked: false },
    { id: 5, clicked: false },
    { id: 6, clicked: false },
    { id: 7, clicked: false },
  ]);

  const [page, setPage] = useState(false);

  const category = [
    {
      type: "page",
      title: "All",
    },
    {
      type: "gender",
      title: "male",
    },
    {
      type: "gender",
      title: "female",
    },
    {
      type: "stack",
      title: "frontend",
    },
    {
      type: "stack",
      title: "backend",
    },
    {
      type: "stack",
      title: "design",
    },
    {
      type: "stack",
      title: "pm",
    },
  ];

  const clickPage = async (id) => {
    const datas = await getAllPage();
    const userData = datas.data.data.slice((id - 1) * 4, id * 4);
    setUserData(userData);
    setPageNum(
      pageNum.map((i) =>
        i.id === id ? { ...i, clicked: true } : { ...i, clicked: false }
      )
    );
  };

  return (
    <Dom>
      <Title>🦁 LikeLion 11th 🦁</Title>
      <ButtonDom>
        {category.map((c, i) => (
          <FilterButton
            key={i}
            title={c.title}
            type={c.type}
            setUserData={setUserData}
            clickPage={clickPage}
            setPage={setPage}
          />
        ))}
      </ButtonDom>
      <UserDataSection userData={userData} />
      {page && (
        <Pagination
          userData={userData}
          setUserData={setUserData}
          pageNum={pageNum}
          clickPage={clickPage}
        />
      )}
    </Dom>
  );
};

export default LionInfoModal;

const Title = styled.div`
  font-size: 40px;
  color: #535353;
  font-weight: 700;
`;

const ButtonDom = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`;

const Dom = styled.div`
  gap: 30px;
  background-color: #ffd9b6;
  width: 90vw;
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 30px 0;
  border-radius: 20px;
  box-shadow: 5px 5px 5px lightgray;
`;
