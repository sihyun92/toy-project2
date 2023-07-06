import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    bgColor: string;
    textColor: string;
    borderColor: string;
    headerColor: string;
    colors: {
      white: string;
      black: string;
      coral: string;
    };
  }
}
