// 여기에 색상을 전부 넣어서 다른곳에서 불러서 사용한다.
// background: ${(props) => props.theme.bgColor};

import { DefaultTheme } from "styled-components";

// 추후 색상 변경
export const lightTheme: DefaultTheme = {
  bgColor: "#fff",
  textColor: "#000",
  borderColor: "#000",
  headerColor: "#000",
  buttonColor: "#000",
  buttonTextColor: "#fff",
  hoverColor: "#ccc",
};

export const darkTheme: DefaultTheme = {
  bgColor: "#000",
  textColor: "#fff",
  borderColor: "#fff",
  headerColor: "#fff",
  buttonColor: "#fff",
  buttonTextColor: "#000",
  hoverColor: "#ccc",
};
