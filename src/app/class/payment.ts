export class Payment {
  constructor(
    public donor: String,
    public email: String,
    public donorcreditnum: String,
    public country: String,
    public City: String,
    public PostalCode: String,
    public charity: String,
    public charityBankAccount: String,
    public amount: Number
  ) {}
}
