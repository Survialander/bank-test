import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root {
    --background: #f0f2f5;
    --box: #ffffff;
    --red: #e52e4d;
    --blue: #5429cc;
    --blue-light: #6933ff;
    --green: #33cc95;
    --text-title:#363f5f;
    --text-body: #969cb3;
  }

  * { 
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  html {
    @media (max-width: 1080px) {
      font-size: 93.75%
    }

    @media (max-width: 720px) {
      font-size: 87.5%
    }
  }

  body {
    background: var(--background);
    -webkit-font-smoothing: antialiased;
  }

  body, input, textarea, button {
    font-family: 'Poppins', sans-serif;
    font-weight: 400;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 600;
  }

  button {
    cursor: pointer
  }

  [disabled] {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .transaction-modal-overlay {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgb(0, 0, 0, 0.5);
  }

  .transaction-modal {
    position: relative;
    width: 100%;
    max-width: 576px;
    padding: 3rem;
    background: var(--background);
    border-radius: 0.25rem;

    @media (max-width: 600px) {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 60%;
      padding: 2rem 3rem;
      overflow: scroll;
      border-top-left-radius: 1rem;
      border-top-right-radius: 1rem;
    }
  }

  .modal-close-button {
    position: absolute;
    top: 1rem;
    right: 1rem;
    border: 0;
  }

  ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
    background: transparent;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: var(--blue);
    border-radius: 10px;
  }
`;