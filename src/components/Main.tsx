import styled from "styled-components";
import CalendarSection from "./calendar/CalendarSection";
import { useState } from "react";
import Modal from "../components/modal/Modal";
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
      {openModal && <Modal handleCloseModal={handleCloseModal} />}
    </MainContainer>
  );
}

const MainContainer = styled.div``;

export default Main;
