import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'PFStardust';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/PFStardust.woff') format('woff');
  }
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  html {
    font-size: 62.5%;
  }
  body {
    padding: 2rem;
    font-family: "PFStardust";
    font-size: 1.4rem;
  }
  input {
    appearance: none;
    border: none;
    background-color: transparent;
    font-family: "PFStardust";
    outline: none;
  }
  input[type="text"] {
    &::placeholder {
      font-family: "PFStardust"
    }
  }
  li {
    list-style: none;
  }
`;

export default GlobalStyle;
