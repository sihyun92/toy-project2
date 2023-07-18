import styled from "styled-components";
import CalendarSection from "./calendar/CalendarSection";
import { useState } from "react";
import AddModal from "./modal/AddModal";
import Chart from "./chart/Chart";
import Search from "./search/Search";
import Today from "./today/Today";
import ContainerBox from "./common/ContainerBox";

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
      <ContainerBox>
        <Chart />
      </ContainerBox>

      <ContainerFlex>
        <ContainerFlexCol>
          <ContainerBox>
            <AddButton onClick={handleOpenModal}>
              <span>+ </span>
              <span> 내역 추가</span>
            </AddButton>
            {openModal && <AddModal handleCloseModal={handleCloseModal} />}
          </ContainerBox>
          <ContainerBox>
            <Today />
          </ContainerBox>
        </ContainerFlexCol>

        <ContainerBox>
          <CalendarSection />
        </ContainerBox>
      </ContainerFlex>

      <ContainerBox>
        <Search userId="user123" />
      </ContainerBox>
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
  background: ${(props) => props.theme.bgColor};
  gap: 3rem;
`;
const ContainerFlex = styled.div`
  display: flex;
  gap: 3rem;
`;
const ContainerFlexCol = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
`;
const AddButton = styled.button`
  width: 30rem;
  border-radius: 14px;
  font-size: 1.5rem;
  height: 50px;
  background-color: ${(props) => props.theme.containerBoxColor};
  border: 1px solid ${(props) => props.theme.borderColor};
`;
export default Main;
