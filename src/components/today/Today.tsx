import { useEffect, useState } from "react";
import { getCalendarConsume } from "../../lib/api/consumeAPI";
import { todayAtom } from "../../state/today";
import { useRecoilValue } from "recoil";
import { styled } from "styled-components";
import { RiDeleteBinFill, RiPencilFill } from "react-icons/ri";
import EditModal from "../modal/EditModal";
import DeleteModal from "../modal/DeleteModal";

interface IExpense {
  _id: string;
  amount: number;
  userId: string;
  category: string;
  date: string;
}

export function Today() {
  const today = useRecoilValue(todayAtom);
  const [todayList, setTodayList] = useState([]);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const nowMonth = today.getMonth();
  const nowYear = today.getFullYear();
  const nowDate = today.getDate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchRes = await getCalendarConsume({
          year: nowYear,
          month: nowMonth + 1,
          userId: "team1",
        });
        const result = fetchRes.data;
        setTodayList(result[Number(nowDate)]);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [today, nowDate, nowMonth, nowYear]);

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
    setTodayList((prevResults) => [...prevResults]);
  };

  const handleOpenDeleteModal = (_id: string) => {
    setOpenDeleteModal(true);
    setSelectedItemId(_id);
  };

  const handleOpenEditModal = (_id: string) => {
    setOpenEditModal(true);
    setSelectedItemId(_id);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setTodayList((prevResults) => [...prevResults]);
  };

  return (
    <Container>
      <h1>
        {nowMonth+1}. {nowDate}
      </h1>
      <ListContainer>
        {todayList === undefined ? (
          <div className="nodata">내역없음</div>
        ) : (
          todayList.map((a: IExpense) => (
            <ListBox key={a._id}>
              <div>{a.category}</div>
              <IconBox>
                {a.amount>0?<div className="posi mount">+{a.amount}원</div>:<div className="mount">{a.amount}원</div>}
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

.mount{
  padding-right: 16px;
}
.posi{
  color: red;
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
