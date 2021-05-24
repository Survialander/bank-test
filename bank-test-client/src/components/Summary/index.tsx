import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import totalImg from '../../assets/total.svg';
import { useTransaction } from '../../hooks/useTransaction';
import { useUser } from '../../hooks/useUser';
import { Container, Grid } from "./styles";

export function Summary() {
  const { transactions } = useTransaction();
  const { user } = useUser();

  const summary = transactions.reduce((acc, transaction) => {
    if(transaction.type === 'deposit') {
      acc.income += transaction.amount;
      acc.total += transaction.amount;
    } else {
      acc.outcome -= transaction.amount;
      acc.total -= transaction.amount;
    }

    return acc;
  }, {
    income: 0,
    outcome: 0,
    total: 0
  });

  return (
    <>
      <Container>
        <h3>Bem vindo {user?.name} .</h3>
        <Grid>
          <div>
            <header>
              <p>Entradas</p>
              <img src={incomeImg} alt="entradas"/>
            </header>
            <strong>{new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(summary.income)}</strong>
          </div>
          <div>
            <header>
              <p>saidas</p> 
              <img src={outcomeImg} alt="saidas" />
            </header>
            <strong>{new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(summary.outcome)}</strong>
          </div>
          <div className="total-card">
            <header>
              <p>total</p> 
              <img src={totalImg} alt="total" />
            </header>
            <strong>{new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(summary.total)}</strong>
          </div>
        </Grid>
      </Container>
    </>
  )
}