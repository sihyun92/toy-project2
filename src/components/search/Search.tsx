import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getSearchConsume } from "../../lib/api/consumeAPI";
import Button from "../common/Button";
import { RiPencilFill, RiDeleteBinFill } from "react-icons/ri";
import EditModal from "../modal/EditModal";
import DeleteModal from "../modal/DeleteModal";

interface ISearchProps {
  userId: string;
}
interface ISearchResultProps {
  amount: number;
  userId: string;
  category: string;
  date: string;
  _id: string;
}

const Search = ({ userId }: ISearchProps) => {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState<ISearchResultProps[]>([]);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  useEffect(() => {
    const handleSearch = async () => {
      try {
        const result = await getSearchConsume({
          keyword: searchText,
          userId: "team1",
        });
        const data = result.data;
        console.log(data);
        setSearchResults(data);
      } catch (error) {
        console.log("Error Searching:", error);
      }
    };

    handleSearch();
  }, [searchText, searchResults]);

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
    setSearchResults((prevResults) => [...prevResults]);
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
    setSearchResults((prevResults) => [...prevResults]);
  };

  const formatDate = (dateString: string) => {
    const date = new window.Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    let hours = String(date.getHours());
    let minutes = String(date.getMinutes());
    let period = "오전";

    if (date.getHours() >= 12) {
      period = "오후";
      hours = String(date.getHours() - 12);
    }
    hours = hours.padStart(2, "0");
    minutes = minutes.padStart(2, "0");

    return `${year}-${month}-${day} ${period} ${hours}:${minutes}`;
  };

  return (
    <Container>
      <Title>내역조회</Title>
      <SearchContainer>
        <SearchInput
          type="text"
          value={searchText}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchText(e.target.value)
          }
          placeholder="검색어를 입력하세요"
        />
        <SearchButton>검색</SearchButton>
      </SearchContainer>
      {searchText === "" ? null : (
        <>
          {searchResults.length > 0 && (
            <ResultContainer>
              <>
                {/* Result header */}
                <ResultHeader>
                  <ResultHeaderText>카테고리</ResultHeaderText>
                  <ResultHeaderText>날짜</ResultHeaderText>
                  <ResultHeaderText>금액</ResultHeaderText>
                </ResultHeader>

                {/* Result items */}
                {searchResults.map((result, index) => (
                  <ResultItem key={index}>
                    <Category>{result.category}</Category>
                    <Date>{formatDate(result.date)}</Date>
                    <Amount>{result.amount}원</Amount>
                    <EditButton onClick={() => handleOpenEditModal(result._id)}>
                      <RiPencilFill />
                    </EditButton>
                    {openEditModal && selectedItemId === result._id && (
                      <EditModal
                        id={result._id}
                        amount={result.amount}
                        userId={result.userId}
                        category={result.category}
                        date={result.date}
                        handleCloseModal={handleCloseEditModal}
                      />
                    )}
                    <DeleteButton
                      onClick={() => handleOpenDeleteModal(result._id)}
                    >
                      <RiDeleteBinFill />
                    </DeleteButton>
                    {openDeleteModal && selectedItemId === result._id && (
                      <DeleteModal
                        id={result._id}
                        handleCloseModal={handleCloseDeleteModal}
                      />
                    )}
                  </ResultItem>
                ))}
              </>
            </ResultContainer>
          )}
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 10px;
  text-align: center;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

const SearchInput = styled.input`
  width: 480px;
  padding: 10px;
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 5px;
  margin-right: 10px;
`;

const SearchButton = styled(Button)`
  height: 38px;
  padding: 0 20px;
`;

const ResultContainer = styled.div`
  width: 480px;
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 5px;
  padding: 10px;
  margin-top: 20px;
`;

const ResultHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  padding-bottom: 10px;
`;

const ResultHeaderText = styled.div`
  flex: 1;
  font-weight: bold;
  text-align: left;
`;

const ResultItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  padding-bottom: 10px;
`;

const Category = styled.div`
  flex: 1;
  text-align: left;
`;

const Date = styled.div`
  flex: 1;
  text-align: left;
`;

const Amount = styled.div`
  flex: 1;
  text-align: left;
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

export default Search;
