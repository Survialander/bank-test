import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 4rem;
`

export const TransactionsTable = styled.div`
  .table-head, .table-row {
    display: grid;
    grid-template-columns: 40% 20% 20% 20%;

    @media (max-width: 600px) {
      &.table-head {
        display: none;
      }

      grid-template-columns: 1fr;
    }
  }

  .table-head {
    color: var(--text-body);

    div {
      padding: 1rem 1rem;
    }
  }

  .table-row {
    margin-bottom: 0.5rem;
    border-radius: 0.25rem;
    background: var(--box);
    color: var(--text-body);

    div {
      display: flex;
      width: 100%;
      align-items: center;
      padding: 1rem 1rem;
      line-break: anywhere;

      &:first-child {
        color: var(--text-title);
      }

      &.deposit {
        color: var(--green);
      }

      &.withdraw {
        color: var(--red);
      }

      @media (max-width: 600px) {
        padding: 0.5rem 1rem;
      }
    }
  }
`
