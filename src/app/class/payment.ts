export class Payment {
  constructor(
    public donor: String,
    public email: String,
    public donorcreditnum: String,
    public country: String,
    public City: String,
    public PostalCode: Number,
    public charity: String,
    public charityBankAccount: Number,
    public amount: Number
  ) {}
}
