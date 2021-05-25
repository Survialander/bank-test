import styled from 'styled-components';

export const Container = styled.div`
  margin-top: -9rem;

  h3 {
    color: #fff;
    line-height: 2.5rem;
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;

  div {
    background: var(--box);
    padding: 1.5rem 2rem;
    border-radius: 5px;
    color var(--text-title);

    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    strong {
      display: block;
      margin-top: 1rem;
      font-size: 1.7rem;
    }

    &.total-card {
      background: var(--green);
      color: #fff;
    }
  }

  @media (max-width: 600px) {
    overflow-y: scroll;
    gap: 1rem;
    margin-right: -1rem;
    div {
      padding: 1rem 1rem;
      min-width: 250px;
    }
  }
`