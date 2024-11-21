import styled from 'styled-components';
export default function Label({text, color, backgroundcolor}) {
    return (
        <StyledLabel color={color} backgroundcolor={backgroundcolor}>{text}</StyledLabel>
    );
}
const StyledLabel = styled.div`
  width: fit-content;
  padding: 0 0.5rem;
  background-color: ${({ backgroundcolor, theme }) =>
    theme.colors[backgroundcolor] || 'var(--color-blueOp)'};
  color: ${({ color, theme }) => theme.colors[color] || 'var(--color-blue)'};
  border-radius: 0.5rem;
  text-align: center;
  font-size: 0.875rem;
`;
