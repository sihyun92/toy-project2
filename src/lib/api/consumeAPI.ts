import client from "./client";

// 소비 내역 작성(POST)
interface IPostExpenses {
  amount: number;
  userId: string;
  category: string;
  date: string;
}
export const postConsume = ({
  amount,
  category,
  date,
  userId,
}: IPostExpenses) => {
  client.post("/api/expenses", { amount, category, date, userId });
};

// 소비 품목 API(GET)
interface IGetConsume {
  userId: string;
}
export const getConsume = ({ userId }: IGetConsume) => {
  client.get(`api/categories?userId=${userId}`);
};

// 검색어에 해당하는 소비 항목 및 금액 조회 API(GET)
interface IGetSearchConsume {
  keyword: string;
  userId: string;
}
export const getSearchConsume = ({ keyword, userId }: IGetSearchConsume) => {
  client.get(`api/expenses/search?q=${keyword}&userId=${userId}`);
};

// 일별, 주별, 월별 소비 조회 API(GET)
interface IGetPeriodConsume {
  period: string;
  userId: string;
}
export const getPeriodConsume = ({ period, userId }: IGetPeriodConsume) => {
  client.get(`api/expenses/summary?period=${period}&userId=${userId}`);
};

// 소비 기록 수정 API(PUT)
interface IPutEditConsume {
  id: string;
}
export const putEditConsume = ({ id }: IPutEditConsume) => {
  client.put(`api/expenses/${id}`);
};

// 소비 기록 삭제 API(DELETE)
interface IDeleteConsume {
  id: string;
}
export const deleteConsume = ({ id }: IDeleteConsume) => {
  client.delete(`api/expenses/${id}`);
};

// 소비 달력 호출 API(GET)
interface IGetCalendarConsume {
  year: number;
  month: number;
  userId: string;
}
export const getCalendarConsume = async ({ year, month, userId }: IGetCalendarConsume) => {
  const response = await client.get(`/api/expenses/calendar?year=${year}&month=${month}&userId=${userId}`);
  return response.data;
};
