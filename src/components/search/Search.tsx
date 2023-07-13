import React, { useState } from "react";
import styled from "styled-components";
import { getSearchConsume } from "../../lib/api/consumeAPI";
import Button from "../common/Button";

interface ISearchProps {
  userId: string;
}

const Search = ({ userId }: ISearchProps) => {
  interface ISearchResult {
    amount: number;
    userId: string;
    category: string;
    date: string;
  }
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState<ISearchResult[]>([]);

  const handleSearch = async () => {
    try {
      const data = await getSearchConsume({
        keyword: searchText,
        userId,
      });
      setSearchResults(data);
    } catch (error) {
      console.log("Error occurred while searching:", error);
    }
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
        <SearchButton onClick={handleSearch}>검색</SearchButton>
      </SearchContainer>
      {searchResults.length > 0 && (
        <ResultContainer>
          <ResultHeader>
            <ResultHeaderText>카테고리</ResultHeaderText>
            <ResultHeaderText>날짜</ResultHeaderText>
            <ResultHeaderText>금액</ResultHeaderText>
          </ResultHeader>
          {searchResults.map((result, index) => (
            <ResultItem key={index}>
              <Category>{result.category}</Category>
              <Date>{result.date}</Date>
              <Amount>{result.amount}원</Amount>
            </ResultItem>
          ))}
        </ResultContainer>
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

export default Search;
