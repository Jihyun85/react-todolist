import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'MapoFlowerIsland';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/MapoFlowerIslandA.woff') format('woff');
    font-weight: normal;
    font-style: normal;
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
    width: 100vw;
    height: 100vh;
    padding: 2rem;
    background-color: #f4eded;
    font-family: "MapoFlowerIsland";
    font-size: 1.4rem;
    font-weight: 600;
  }
  input {
    appearance: none;
    border: none;
    background-color: transparent;
    font-size: 1.6rem;
    font-family: "MapoFlowerIsland";
    outline: none;
  }
  input[type="text"] {
    &::placeholder {
      font-family: "MapoFlowerIsland"
    }
  }
  button {
    color: white;
    background-color: transparent;
    border: none;
    font-family: "MapoFlowerIsland";
    outline: none;
    cursor: pointer;

    &:hover {
    background-color: #eb2f06;
    }
    &:focus-within {
      background-color: #eb2f06;
  }

  }
  li {
    list-style: none;
  }
`;

export default GlobalStyle;
