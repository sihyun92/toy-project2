import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import ReactTimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import { postConsume, putEditConsume } from "../../lib/api/consumeAPI";
import { FiPlus, FiMinus, FiX } from "react-icons/fi";

interface IEditModalProps {
  id: string;
  amount: number;
  userId: string;
  category: string;
  date: any;
  handleCloseModal: () => void;
}

function EditModal({
  id,
  amount,
  userId,
  category,
  date,
  handleCloseModal,
}: IEditModalProps) {
  const [currentAmount, setAmount] = useState<number>(amount);
  const [currentUserId, setUserId] = useState<string>(userId);
  const [currentCategory, setCategory] = useState<string>(category);
  const [time, setTime] = useState<string | null>(null);
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date>(date);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target as HTMLInputElement;
    if (name === "amount") {
      if (!isNaN(Number(value))) {
        setAmount(+value);
      }
    } else if (name === "userId") {
      setUserId(value);
    } else if (name === "category") {
      setCategory(value);
    }
  };

  const handleConvert = (operator: any) => {
    if (isNaN(currentAmount)) {
      setAmount(0);
      return;
    }
    if (operator === "+") {
      setAmount(+Math.abs(currentAmount));
    } else if (operator === "-") {
      setAmount(-Math.abs(currentAmount));
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

  const handleConfirm = () => {
    const formattedDate = selectedDate.toISOString().slice(0, 10);
    const formattedTime = time !== null ? time : "";
    const date = formattedDate + (formattedTime ? " " + formattedTime : "");
    console.log("formattedDate 날짜!!");
    console.log("formattedTime 시간!!!");

    if (
      currentAmount === 0 ||
      currentUserId === "" ||
      currentCategory === "" ||
      formattedTime === ""
    ) {
      alert("빈칸을 모두 입력해주세요");
      return;
    }

    postConsume({
      amount,
      userId,
      category,
      date,
    });
    handleCloseModal();
  };

  return (
    <ModalOverlay>
      <ModalWrapper>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>내역 추가</ModalTitle>
            <ModalCloseButton onClick={handleCloseModal}>
              <FiX />
            </ModalCloseButton>
          </ModalHeader>
          <ModalForm onSubmit={handleConfirm}>
            <ModalAmountWrap>
              <button type="button" onClick={() => handleConvert("+")}>
                <FiPlus />
              </button>

              <button type="button" onClick={() => handleConvert("-")}>
                <FiMinus />
              </button>

              <ModalInputAmount
                name="amount"
                value={currentAmount}
                onChange={onChange}
                placeholder="금액"
                required
              />
              <span>원</span>
            </ModalAmountWrap>
            <ModalInput
              type="text"
              name="userId"
              value={currentUserId}
              onChange={onChange}
              placeholder="이름"
              required
            />
            <ModalInput
              type="text"
              name="category"
              value={currentCategory}
              onChange={onChange}
              placeholder="카테고리"
              required
            />
            <ModalDateWrap>
              <ModalInput
                type="text"
                name="date"
                placeholder="날짜 및 시간"
                onClick={handleInputClick}
                value={selectedDate.toLocaleString("ko-KR", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                })}
                required
              />
              {showCalendar && (
                <Calendar
                  onChange={handleDateChange}
                  value={selectedDate}
                  onClickDay={handleDateChange}
                />
              )}
            </ModalDateWrap>

            <ReactTimePicker
              onChange={handleTimeChange}
              value={time}
              format="HH:mm"
              disableClock={true}
              clearIcon={null}
              required={true}
            />
            <ModalButtonContainer>
              <ModalButton type="button" onClick={handleCloseModal}>
                취소
              </ModalButton>
              <ModalButton type="submit" onClick={handleConfirm}>
                확인
              </ModalButton>
            </ModalButtonContainer>
          </ModalForm>
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
  background-color: rgba(0, 0, 0, 0.1);
  z-index: 9999;
`;

const ModalWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 2rem;
  z-index: 99999;
`;

const ModalContent = styled.div`
  position: relative;
`;
const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;
const ModalCloseButton = styled.button`
  position: absolute;
  top: -5px;
  right: -10px;
  font-size: 2rem;
`;
const ModalAmountWrap = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;
const ModalInput = styled.input`
  height: 30px;
  border-style: none;
  border-bottom: 1px solid #000;
  font-size: 1rem;
`;
const ModalInputAmount = styled.input`
  height: 30px;
  border-style: none;
  border-bottom: 1px solid #000;
  font-size: 1.5rem;
  text-align: right;
`;

const ModalDateWrap = styled.div``;
const ModalButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

const ModalButton = styled.button`
  margin-left: 10px;
`;

export default EditModal;
