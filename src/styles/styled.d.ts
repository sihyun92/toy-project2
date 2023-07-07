import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    bgColor: string;
    textColor: string;
    borderColor: string;
    headerColor: string;
    buttonColor: string;
    buttonTextColor: string;
    hoverColor: string;
  }
}
