import styled from "styled-components";
import CalendarSection from "./calendar/CalendarSection";
import { useState } from "react";
import AddModal from "./modal/AddModal";
import Button from "./common/Button";
import Chart from "./chart/Chart";

function Main() {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [userId, setUserId] = useState("");

  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <MainContainer>
      <Chart userId={userId} setUserId={setUserId} />
      <CalendarSection />
      <Button onClick={handleOpenModal}>
        <span>+</span>
        <span>내역 추가</span>
      </Button>
      {openModal && <AddModal handleCloseModal={handleCloseModal} />}
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
