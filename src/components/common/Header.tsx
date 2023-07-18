import styled from "styled-components";
import { IoMdSunny, IoMdMoon } from "react-icons/io";

interface IHeaderProps {
  isLight: boolean;
  onToggleDark: () => void;
}

function Header({ isLight, onToggleDark }: IHeaderProps) {
  return (
    <HeaderContainer>
      <HeaderContent>
        <HeaderTitle>Keep</HeaderTitle>
      </HeaderContent>
      <HeaderToggleBtn onClick={onToggleDark}>
        {isLight ? <IoMdSunny size={30} /> : <IoMdMoon size={30} />}
      </HeaderToggleBtn>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.header`
  width: 100%;
  height: 70px;
  background: ${(props) => props.theme.bgColor};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  position: relative;
`;

const HeaderContent = styled.div`
  width: 1320px;
  height: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HeaderToggleBtn = styled.button`
  background-color: rgba(0, 0, 0, 0);
  position: absolute;
  top: 15px;
  right: 15px;
`;

const HeaderTitle = styled.h1`
  font-size: 40px;
  color: #a55eea;
`;
export default Header;
