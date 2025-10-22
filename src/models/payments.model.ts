export enum PaymentStatus {
  WAITING_PAYMENT = "waiting_payment",
  PAID = "paid",
  CANCELED = "canceled",
}

export class Payment {
  constructor(
    public id: string,
    public amount_in_cents: number,
    public status: PaymentStatus,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}
}

export class TransactionLog {
  constructor(
    public id: string,
    public paymentId: string,
    public message: string,
    public createdAt: Date,
  ) {}
}
