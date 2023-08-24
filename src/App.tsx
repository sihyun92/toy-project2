import { ThemeProvider } from "styled-components";
import GlobalStyle from "./styles/GlobalStyle";
import { themeState } from "./state/themeState";
import { HelmetProvider } from "react-helmet-async";
import Router from "./Router";
import { lightTheme, darkTheme } from "./styles/theme";
import { useRecoilValue } from "recoil";

function App() {
  const theme = useRecoilValue(themeState);

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyle />
      <HelmetProvider>
        <Router />
      </HelmetProvider>
    </ThemeProvider>
  );
}

export default App;
