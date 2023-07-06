import styled from "styled-components";

interface IHeaderProps {
  isLight: boolean;
  onToggleDark: () => void;
}

function Header({ isLight, onToggleDark }: IHeaderProps) {
  return (
    <HeaderContainer>
      <HeaderContent>
        <button onClick={onToggleDark}>
          {isLight ? "다크모드" : "라이트모드"}
        </button>
      </HeaderContent>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.header`
  width: 100%;
  height: 70px;
  background: ${props => props.theme.headerColor};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
`;

const HeaderContent = styled.div`
  width: 1320px;
  height: inherit;
  background: coral;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Header;
