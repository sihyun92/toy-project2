import { Dispatch, SetStateAction, useCallback } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// TransactionList 컴포넌트 임포트
import TransactionList from "./components/search/TransactionList";
import ErrorPage from "./pages/ErrorPage";
import MainPage from "./pages/MainPage";

interface IRouterProps {
  theme: string;
  setTheme: Dispatch<SetStateAction<string>>;
}

function Router({ theme, setTheme }: IRouterProps) {
  const isLight = theme === "light";

  const onToggleDark = useCallback(() => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, [theme, setTheme]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<MainPage isLight={isLight} onToggleDark={onToggleDark} />}
        />
        {/* TransactionList 컴포넌트를 /transactions 경로에 대한 Route로 추가 / userId 값을 전달 */}
        <Route
          path="/transactions"
          element={<TransactionList userId="user123" />}
        />

        <Route path="/*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
