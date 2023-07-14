import styled from "styled-components";
import CalendarSection from "./calendar/CalendarSection";
import { useState } from "react";
import AddModal from "./modal/AddModal";
import Button from "./common/Button";
import Chart from "./chart/Chart";
import Search from "./search/Search";

function Main() {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <MainContainer>
      <Chart />
      <CalendarSection />
      <Button onClick={handleOpenModal}>
        <span>+</span>
        <span>내역 추가</span>
      </Button>
      {openModal && <AddModal handleCloseModal={handleCloseModal} />}
      <Search userId="user123" />
    </MainContainer>
  );
}

const MainContainer = styled.div`
  width: 100%;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: coral;
`;

export default Main;
