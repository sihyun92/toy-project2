// 여기에 색상을 전부 넣어서 다른곳에서 불러서 사용한다.
// background: ${(props) => props.theme.bgColor};

import { DefaultTheme } from "styled-components";

export const lightTheme: DefaultTheme = {
  bgColor: "#fff",
  textColor: "#000",
  borderColor: "#000",
  headerColor: "#000",
  colors: {
    black: "#000",
    coral: "coral",
    white: "#fff",
  },
};

export const darkTheme: DefaultTheme = {
  bgColor: "#000",
  textColor: "#fff",
  borderColor: "#fff",
  headerColor: "#fff",
  colors: {
    black: "#000",
    coral: "coral",
    white: "#fff",
  },
};
