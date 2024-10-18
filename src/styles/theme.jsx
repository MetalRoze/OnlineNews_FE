import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root {
    --color-white: #ffffff;
    --color-black: #1c1c1c;
    --color-red: #FF3B30;
    --color-blue: #007AFF;
    --color-gray10: #F2F2F7;
    --color-gray20: #E5E5EA;
    --color-gray30: #D1D1D6;
    --color-gray40: #C7C7CC;
    --color-gray50: #AEAEB2;
    --color-gray60: #8E8E93;
  }
`;

export const theme = {
  colors: {
    white: 'var(--color-white)',
    black: 'var(--color-black)',
    red: 'var(--color-red)',
    blue: 'var(--color-blue)',
    gray10: 'var(--color-gray10)',
    gray20: 'var(--color-gray20)',
    gray30: 'var(--color-gray30)',
    gray40: 'var(--color-gray40)',
    gray50: 'var(--color-gray50)',
    gray60: 'var(--color-gray60)',
  },
};
