import { Container, Content } from "./styles";
import logo from "../../assets/logo.svg"; 

interface IHeaderProps {
    onOpenDepositModal: () => void;
}

export function Header({ onOpenDepositModal}: IHeaderProps) {
    return (
			<Container>
				<Content>
					<img src={logo} alt="TestBank"/>
					<button type="button" onClick={onOpenDepositModal}>
							Nova Transação
					</button>
				</Content>
			</Container>
    )
}