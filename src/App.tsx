import { useCallback, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import ErrorPage from "./Pages/ErrorPage";
import MainPage from "./Pages/MainPage";
import GlobalStyle from "./styles/GlobalStyle";
import { darkTheme, lightTheme } from "./styles/theme";

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
          <Route path="/*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
