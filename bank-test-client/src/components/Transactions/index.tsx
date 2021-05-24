import { useTransaction } from "../../hooks/useTransaction";
import { Container, TransactionsTable } from "./styles";

interface TypesObject {
  withdraw: string
  payment: string
  deposit: string
}

export function Transactions () {
  const { transactions } = useTransaction();

  const types: TypesObject = {
    withdraw: 'Saque',
    payment: 'Pagamento',
    deposit: 'Depósito'
  }
  
  const typeNames = (type: keyof TypesObject): string => {
    return types[type];
  }

  return (
    <Container>
      <TransactionsTable>
        <div className="table-head">
          <div>Titulo</div>
          <div>Valor</div>
          <div>Categoria</div>
          <div>Data</div>
        </div>

        <div className="table-body">
          {transactions.map(transaction => (
            <div className="table-row" key={transaction.id} data-testid="transaction-row">
              <div>{transaction.description}</div>
              <div className={`${transaction.type}`}>
                {new Intl.NumberFormat('pt-Br', {style: 'currency', currency: 'BRL' }).format(Number(transaction.amount))}
              </div>
              <div>{typeNames(transaction.type as keyof TypesObject)}</div>
              <div>{new Intl.DateTimeFormat('pt-BR').format(new Date(transaction.created_at))}</div>
            </div>
          ))}
        </div>
      </TransactionsTable>
    </Container>    
  )
}