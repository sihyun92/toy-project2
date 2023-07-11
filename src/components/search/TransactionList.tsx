import React, { useEffect, useState } from "react";
import styled from "styled-components";
import client from "../../lib/api/client";
import { RiPencilFill, RiDeleteBinFill } from "react-icons/ri";
import EditModal from "../modal/EditModal";

interface ITransaction {
  amount: number;
  userId: string;
  category: string;
  date: string;
  _id: string;
}

interface ITransactionListProps {
  userId: string;
}

const TransactionList = ({ userId }: ITransactionListProps) => {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await client.get(
          `/api/expenses/search?q=${searchQuery}&userId=${userId}`,
        );
        const data = response.data as ITransaction[];
        setTransactions(data);
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
      }
    };

    fetchTransactions();
  }, [userId, searchQuery]);

  const handleSearchQueryChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSearchQuery(event.target.value);
  };

  const handleOpenEditModal = (_id: string) => {
    setOpenEditModal(true);
    setSelectedItemId(_id);
  };
  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };

  return (
    <TransactionListContainer>
      <TransactionListTitle>내역 조회</TransactionListTitle>
      <SearchBar>
        <SearchInput
          type="text"
          placeholder="검색어를 입력하세요"
          value={searchQuery}
          onChange={handleSearchQueryChange}
        />
      </SearchBar>
      <TransactionListBody
        resultsExist={searchQuery !== "" && transactions.length > 0}
      >
        {transactions.length > 0 ? (
          <TransactionListTable>
            <TransactionListTableHeader>
              <HeaderItem>카테고리</HeaderItem>
              <HeaderItem>날짜</HeaderItem>
              <HeaderItem>금액</HeaderItem>
            </TransactionListTableHeader>
            <TransactionListTableBody>
              {transactions.map((transaction, index) => (
                <TransactionItem key={index}>
                  <TransactionItemText>
                    {transaction.category}
                  </TransactionItemText>
                  <TransactionItemText>{transaction.date}</TransactionItemText>
                  <TransactionItemText>
                    {transaction.amount}원
                  </TransactionItemText>
                  <button onClick={() => handleOpenEditModal(transaction._id)}>
                    <RiPencilFill />
                  </button>
                  {openEditModal && selectedItemId === transaction._id && (
                    <EditModal
                      id={transaction._id}
                      amount={transaction.amount}
                      userId={transaction.userId}
                      category={transaction.category}
                      date={transaction.date}
                      handleCloseModal={handleCloseEditModal}
                    />
                  )}
                  <button>
                    <RiDeleteBinFill />
                  </button>
                </TransactionItem>
              ))}
            </TransactionListTableBody>
          </TransactionListTable>
        ) : (
          <NoResultsText>검색 결과가 없습니다.</NoResultsText>
        )}
      </TransactionListBody>
    </TransactionListContainer>
  );
};

const TransactionListContainer = styled.div`
  width: 100%;
  padding: 20px;
  text-align: center;
`;

const TransactionListTitle = styled.h2`
  margin-bottom: 20px;
`;

const SearchBar = styled.div`
  margin-bottom: 20px;
`;

const SearchInput = styled.input`
  width: 300px;
  padding: 10px;
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 4px;
`;

const TransactionListBody = styled.div<{ resultsExist: boolean }>`
  height: 300px;
  overflow-y: auto;
  display: ${(props) => (props.resultsExist ? "block" : "none")};
`;

const TransactionListTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TransactionListTableHeader = styled.thead`
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor};
`;

const HeaderItem = styled.th`
  padding: 10px;
  font-weight: bold;
`;

const TransactionListTableBody = styled.tbody``;

const TransactionItem = styled.tr`
  &:nth-child(even) {
    background-color: ${(props) => props.theme.bgColor};
  }
`;

const TransactionItemText = styled.td`
  padding: 10px;
`;

const NoResultsText = styled.p`
  margin-top: 20px;
  font-style: italic;
`;

export default TransactionList;
