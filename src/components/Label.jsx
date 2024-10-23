import styled from 'styled-components';
export default function Label({text, color, backgroundColor}) {
    return (
        <StyledLabel color={color} backgroundColor={backgroundColor}>{text}</StyledLabel>
    );
}
const StyledLabel = styled.div`
  width: fit-content;
  padding: 0 0.5rem;
  background-color: ${({ backgroundColor, theme }) =>
    theme.colors[backgroundColor] || 'var(--color-blueOp)'};
  color: ${({ color, theme }) => theme.colors[color] || 'var(--color-blue)'};
  border-radius: 0.5rem;
  text-align: center;
  font-size: 0.875rem;
`;
