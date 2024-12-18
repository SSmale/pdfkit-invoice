import { Customers } from './app.controller';

export class PostBodyDto {
  date: Date;
  invoice_nr: string;
  customer: Customers;
}
