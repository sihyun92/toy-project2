import { useEffect, useState } from "react"
import { getCalendarConsume } from "../../lib/api/consumeAPI";
import { todayAtom } from "../../state/today";
import { useRecoilState } from "recoil";
import { styled } from "styled-components";
import { RiDeleteBinFill, RiPencilFill } from "react-icons/ri";
import EditModal from "../modal/EditModal";
import DeleteModal from "../modal/DeleteModal";

interface IExpense{
  _id: string;
  amount: number;
  userId: string;
  category: string;
  date: string;
}

export function Today() {
  const [today, setToday] = useRecoilState(todayAtom);
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
        console.log(result[Number(nowDate)]);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [today, todayList]);

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
  
  return(
    <Container>
      <h1>{nowMonth}.{nowDate}</h1>
      <ListContainer>
        {todayList === undefined ? (
          <div>내역없음</div>
        ) : (
          todayList.map((a: IExpense) => (
            <ListBox key={a._id}>
              <TextBox>
                <div>{a.category}</div>
                <div>{a.amount}원</div>
              </TextBox>
              <IconBox>
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
  )
}

const Container = styled.section`
width: 30rem;
background-color: ${(props) => props.theme.bgColor};
padding: 30px 40px;
border-radius: 14px;
h1{
  font-weight: 700;
}
`;
const ListContainer = styled.div`
height: 9rem;
overflow: scroll;
`;
const ListBox = styled.div`
display: flex;
justify-content: space-between;
padding-top: 6px;
`;
const TextBox = styled.div`
display: flex;
`
const IconBox = styled.div`
`

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