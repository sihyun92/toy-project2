import { useCallback, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import ErrorPage from "./Pages/ErrorPage";
import MainPage from "./Pages/MainPage";
import GlobalStyle from "./styles/GlobalStyle";
import { darkTheme, lightTheme } from "./styles/theme";

// TransactionList 컴포넌트 임포트
import TransactionList from "./components/search/TransactionList";

function App() {
  const [theme, setTheme] = useState("light");

  const isLight = theme === "light";

  const onToggleDark = useCallback(() => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, [theme]);
  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyle />
      <Router>
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
      </Router>
    </ThemeProvider>
  );
}

export default App;
