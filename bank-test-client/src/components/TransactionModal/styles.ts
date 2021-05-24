import styled from 'styled-components';

interface RadioBoxProps {
  isActive: boolean;
}

export const Container = styled.div`
  h2 {
    color: var(--text-title);
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }

  form {
    input {
      width: 100%;
      padding: 1.5rem .5rem;
      height: 2rem;
      background: #e7e9ee;
      font-weight: 400;
      font-size: 1rem;
      border: 1px solid #d7d7d7;
      border-radius: 0.25rem;
  
      &::placeholder {
        color: var(--text-body);
      }

      &.mt {
        margin-top: 1rem;
      }
    }
    
    button[type="submit"] {
      width: 100%;
      padding: 0 1.5rem;
      height: 3rem;
      background: var(--green);
      color: #fff;
      border-radius: 0.25rem;
      border: 0;
      font-size: 1rem;
      margin-top: 1.5rem;
      transition: filter 0.3s;
      
      &:hover {
        filter: brightness(0.9);
      }
    }
  }
`;

export const TransactionType = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  margin-bottom: 1rem;
`

export const RadioBox = styled.button<RadioBoxProps>`
  height: 2rem;
  border: 1px solid #d7d7d7;
  border-radius: 0.25rem;
  background: ${(props) => props.isActive ? 'var(--blue)': 'transparent'};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.3s;
  pointer-events:  ${(props) => props.isActive ? 'none': 'all'};
  color:  ${(props) => props.isActive ? '#fff': ''};

  span {
    display: inline-block;
    font-size: 1rem;
  }

  &:hover {
    border-color: #aaa;
  }
`

export const BillInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem auto;
  background: #e7e9ee;
  color: var(--text-title);
  border-radius: 0.25rem;
  
  div {
    padding: 0.5rem;
  }
`