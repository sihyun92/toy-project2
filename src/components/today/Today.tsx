import { useEffect, useState } from "react";
import { getCalendarConsume } from "../../lib/api/consumeAPI";
import { todayAtom } from "../../state/today";
import { useRecoilState, useRecoilValue } from "recoil";
import { styled } from "styled-components";
import { RiDeleteBinFill, RiPencilFill } from "react-icons/ri";
import EditModal from "../modal/EditModal";
import DeleteModal from "../modal/DeleteModal";
import {
  openDeleteModalAtom,
  openEditModalAtom,
  openModalAtom,
} from "../../state/modalClose";

interface IExpense {
  _id: string;
  amount: number;
  userId: string;
  category: string;
  date: string;
}

export function Today() {
  const today = useRecoilValue(todayAtom);
  const addValue = useRecoilValue(openModalAtom);
  const [todayListData, setTodayListData] = useState([]);
  const [todayList, setTodayList] = useState([]);
  const [openEditModal, setOpenEditModal] = useRecoilState(openEditModalAtom);
  const [openDeleteModal, setOpenDeleteModal] =
    useRecoilState(openDeleteModalAtom);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const nowMonth = today.getMonth();
  const nowYear = today.getFullYear();
  const nowDate = today.getDate();
  const [prevNowDate, setPrevNowDate] = useState<number | null>(null);

  useEffect(() => {
    console.log("컴온", todayList);
  }, [todayList]);

  //api 호출
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchRes = await getCalendarConsume({
          year: nowYear,
          month: nowMonth + 1,
          userId: "team1",
        });
        const result = fetchRes.data;
        setTodayListData(result);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [openEditModal, openDeleteModal, addValue, nowMonth, nowYear]);

  //선택 일 변경시 호출된 데이터 안에서 date 조회 후 reverse
  useEffect(() => {
    const listData: [] =
      todayListData[Number(nowDate)] !== undefined
        ? todayListData[Number(nowDate)]
        : [];
    if (prevNowDate !== nowDate) {
      setTodayList(listData);
    }
    setTodayList([...listData].reverse());
    setPrevNowDate(nowDate);
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todayListData, nowDate]);

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  const handleOpenDeleteModal = (_id: string) => {
    setSelectedItemId(_id);
    setOpenDeleteModal(true);
  };

  const handleOpenEditModal = (_id: string) => {
    setSelectedItemId(_id);
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };

  return (
    <Container>
      <h1>
        {nowMonth + 1}. {nowDate}
      </h1>
      <ListContainer>
        {todayList === undefined ? (
          <div className="nodata">내역없음</div>
        ) : (
          todayList.map((a: IExpense) => (
            <ListBox key={a._id}>
              <div>{a.category}</div>
              <IconBox>
                {a.amount > 0 ? (
                  <div className="posi mount">
                    +{a.amount.toLocaleString()}원
                  </div>
                ) : (
                  <div className="mount">{a.amount.toLocaleString()}원</div>
                )}
                <EditButton onClick={() => handleOpenEditModal(a._id)}>
                  <RiPencilFill />
                </EditButton>
                {openEditModal && selectedItemId === a._id && (
                  <EditModal
                    id={a._id}
                    amount={a.amount}
                    userId={a.userId}
                    category={a.category}
                    date={a.date}
                    handleCloseModal={handleCloseEditModal}
                  />
                )}
                <DeleteButton onClick={() => handleOpenDeleteModal(a._id)}>
                  <RiDeleteBinFill />
                </DeleteButton>
                {openDeleteModal && selectedItemId === a._id && (
                  <DeleteModal
                    id={a._id}
                    handleCloseModal={handleCloseDeleteModal}
                  />
                )}
              </IconBox>
            </ListBox>
          ))
        )}
      </ListContainer>
    </Container>
  );
}

const Container = styled.section`
  width: 30rem;
  background-color: ${(props) => props.theme.containerBoxColor};
  padding: 30px 40px;
  border-radius: 14px;
  h1 {
    font-weight: 700;
    padding-bottom: 24px;
  }
`;
const ListContainer = styled.div`
  height: 9rem;
  overflow: scroll;
  .nodata {
    color: #ccc;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
const ListBox = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding-top: 6px;
`;

const IconBox = styled.div`
  display: flex;
  align-items: center;

  .mount {
    padding-right: 16px;
  }
  .posi {
    color: #a55eea;
  }
`;

const EditButton = styled.button`
  margin-left: 5px;
  padding: 5px;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

const DeleteButton = styled.button`
  margin-left: 5px;
  padding: 5px;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

export default Today;
