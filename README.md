# Bank-Test

## Aplicação que simula uma conta bancária realizando operações como depósito, saque e pagamentos.

### Features

- [x] Depósitos
- [x] Saques
- [x] Pagamentos

### Pré-requisitos

Para começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Docker](https://www.docker.com) e [Docker-compose](https://docs.docker.com/compose/).

### 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

- [React](https://pt-br.reactjs.org/)
- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [TypeOrm](https://typeorm.io/)

### 🎲 Rodando a aplicação:

```bash
# Clone este repositório
$ git clone https://github.com/Survialander/bank-test

# Acesse a pasta do projeto no terminal/cmd
$ cd bank-test

# Rode o comando
$ docker-compose up

# Acesse a seguinte url em seu navegador
## Essa url irá rodar os seeds
$ http://localhost:3333/seed

# Após o passo anterior basta acessar a seguinte url
& http://localhost:8080
```

### Funcionalidade de pagamento:
Na funcionalidade de pagamento o campo "Código" é de preenchimento opcional mas existem algumas contas a pargar, para descobrir quais são basta digitar um dos códigos abaixo:
<p>7947212</p>
<p>4721930</p>
<p>583010</p>


