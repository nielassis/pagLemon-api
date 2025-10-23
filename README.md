# PagLemon API - Desafio Lemon Tech

[![Node.js](https://img.shields.io/badge/Node.js-18.x-green)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue)](https://www.postgresql.org/)
[![Vercel](https://img.shields.io/badge/Vercel-Serverless-black)](https://vercel.com/)
[![License](https://img.shields.io/badge/License-MIT-blue)](LICENSE)

API de pagamentos simples com logs de transações, construída com **Node.js**, **Express**, **PostgreSQL** e **Prisma**, com **deploy serverless** na Vercel.

⚠ Tentei muito fazer com que swagger Ui funcionasse no deploy da vercel, mas não consegui, por isso se quiser ver a documentação swagger será necessário visualizar em localhost.

---

## Funcionalidades

- Criar pagamento com status inicial `waiting_payment`.
- Atualizar pagamento para `paid` após confirmação.
- Registrar logs de todas as transações.
- Documentação interativa com **Swagger UI**.

---

## Tabelas no PostgreSQL

```sql
CREATE TYPE payment_status AS ENUM ('paid', 'waiting_payment', 'failed');

CREATE TABLE Payment (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  amount_in_cents INT NOT NULL,
  status payment_status NOT NULL DEFAULT 'waiting_payment',
  createdAt TIMESTAMP DEFAULT now(),
  updatedAt TIMESTAMP DEFAULT now()
);

CREATE TABLE TransictionLog (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  payment_id UUID REFERENCES Payment(id),
  message TEXT NOT NULL,
  createdAt TIMESTAMP DEFAULT now()
);
```

---

## Endpoints

| Método | Endpoint                    | Descrição                                       | Body/Params                   |
| ------ | --------------------------- | ----------------------------------------------- | ----------------------------- |
| POST   | `/api/payments`             | Criar um pagamento com status `waiting_payment` | `{ "amount_in_cents": 1200 }` |
| PATCH  | `/api/payments/:id/confirm` | Atualizar status do pagamento para `paid`       | -                             |
| GET    | `/api/payments/:id/logs`    | Listar logs de transações de um pagamento       | -                             |

## Fluxo Lógico

1. **Criar pagamento**:
   - Recebe valor (`amount_in_cents`).
   - Cria registro em `Payment` com `status = waiting_payment`.
   - Cria log inicial em `TransictionLog`.

2. **Confirmar pagamento**:
   - Atualiza status para `paid`.
   - Cria log de confirmação.

3. **Registrar logs**:
   - Cada ação relevante gera uma entrada em `TransictionLog`.

---

## Executando localmente

1. Clone o repositório:

```bash
git clone https://github.com/nielassis/pagLemon-api
cd pagLemon-api
```

2. Instale dependências:

```bash
npm install
```

3. Crie o arquivo `.env`:

```env
PORT=3333
DATABASE_URL=postgresql://usuario:senha@host:porta/banco?sslmode=require
```

4. Gere o Prisma Client e aplique migrations:

```bash
npx prisma generate
npx prisma migrate dev --name init
```

5. Rode a aplicação local:

```bash
npm run dev
```

- API: `http://localhost:3333`
- Swagger UI: `http://localhost:3333/docs`

---

## Deploy na Vercel

Você pode acessar api em:

```
https://pag-lemon-api.vercel.app
```

## Tecnologias

- **Node.js** + **Express**
- **PostgreSQL**
- **Prisma ORM**
- **Swagger UI / swagger-jsdoc**
- **Vercel (Serverless)**
