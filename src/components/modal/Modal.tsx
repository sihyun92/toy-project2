import React, { FormEvent, useState } from "react";
import styled from "styled-components";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import ReactTimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";

interface ModalProps {
  handleCloseModal: () => void;
}

function Modal({ handleCloseModal }: ModalProps) {
  const [amount, setAmount] = useState<number>(0);
  const [userId, setUserId] = useState("");
  const [category, setCategory] = useState("");
  const [time, setTime] = useState<string | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const onChange = (event: FormEvent) => {
    const { name, value } = event.target as HTMLInputElement;
    if (name === "userId") {
      setUserId(value);
    } else if (name === "category") {
      setCategory(value);
    }
  };

  const handleInputClick = () => {
    setShowCalendar(true);
  };

  const handleDateChange = (date: any) => {
    setSelectedDate(date);
    setShowCalendar(false);
  };

  const handleTimeChange = (value: string | null) => {
    setTime(value);
  };

  return (
    <ModalOverlay>
      <ModalWrapper>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>내역 추가</ModalTitle>
            <ModalCloseButton onClick={handleCloseModal}>
              &times;
            </ModalCloseButton>
          </ModalHeader>
          <form>
            <div>
              <button>+</button>
              <button>-</button>
              <input
                type="text"
                name="amount"
                value={amount !== 0 ? `+${amount}` : ""}
                onChange={() => {}}
                placeholder="금액"
              />
            </div>
            <input
              type="text"
              name="userId"
              value={userId}
              onChange={onChange}
              placeholder="이름"
            />
            <input
              type="text"
              name="category"
              value={category}
              onChange={onChange}
              placeholder="카테고리"
            />
            <div>
              <input
                type="text"
                name="date"
                placeholder="날짜"
                onClick={handleInputClick}
                value={selectedDate.toLocaleDateString()}
              />
              {showCalendar && (
                <Calendar
                  onChange={handleDateChange}
                  value={selectedDate}
                  onClickDay={handleDateChange}
                />
              )}
            </div>

            <div>
              <ReactTimePicker
                onChange={handleTimeChange}
                value={time}
                format="HH:mm"
                disableClock={true}
                clearIcon={null}
              />
            </div>
            <ModalButtonContainer>
              <ModalButton type="button" onClick={handleCloseModal}>
                취소
              </ModalButton>
              <ModalButton type="submit">확인</ModalButton>
            </ModalButtonContainer>
          </form>
        </ModalContent>
      </ModalWrapper>
    </ModalOverlay>
  );
}

const ModalHeader = styled.div`
  width: 100%;
  height: 50px;
`;
const ModalTitle = styled.h1`
  font-size: 2rem;
`;
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
`;

const ModalWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 30px;
  z-index: 99999;
`;

const ModalContent = styled.div`
  position: relative;
`;

const ModalCloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
`;

const ModalButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

const ModalButton = styled.button`
  margin-left: 10px;
`;

export default Modal;
