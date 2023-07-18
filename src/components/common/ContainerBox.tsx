import styled from "styled-components";

interface IContainerBox {
  [rest: string]: any;
}

function ContainerBox({ ...rest }: IContainerBox) {
  return <StyledContainerBox {...rest} />;
}

const StyledContainerBox = styled.div`
  background: ${(props) => props.theme.containerBoxColor};
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  border-radius: 14px;
`;

export default ContainerBox;
