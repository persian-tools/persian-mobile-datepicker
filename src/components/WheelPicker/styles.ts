import styled, { createGlobalStyle } from 'styled-components';
// @ts-ignore
import styles from 'rmc-picker/assets/index.css';

export const GlobalStyle = createGlobalStyle`${styles}`;

export type CaptionProps = { columnSize: number };
export const Caption = styled.div<CaptionProps>`
  display: inline-block;
  text-align: center;
  width: ${(props) => `${100 / props.columnSize}%`};
`;
