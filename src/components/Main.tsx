import styled from "styled-components";
import CalendarSection from "./common/CalendarSection";
import { useState } from "react";
import AddModal from "./modal/AddModal";
import Button from "./common/Button";

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
      <CalendarSection />
      <Button onClick={handleOpenModal}>
        <span>+</span>
        <span>내역 추가</span>
      </Button>
      {openModal && <AddModal handleCloseModal={handleCloseModal} />}
    </MainContainer>
  );
}

const MainContainer = styled.div``;

export default Main;
