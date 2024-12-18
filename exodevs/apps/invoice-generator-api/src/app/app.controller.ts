import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Customer } from '@ssmale/invoice-generator/build/types/Customer';
import { Item } from '@ssmale/invoice-generator/build/types/Item.type';
import { PostBodyDto } from './PostBody.dto';

export enum Customers {
  CM = 'CM',
}

@Controller()
export class AppController {
  private customers: Map<Customers, Customer> = new Map();
  private items: Item[] = [];
  constructor(private readonly appService: AppService) {
    this.customers.set(Customers.CM, {
      name: 'The Change Mavericks',
      addressLine1: '1 Cedar Office Park',
      addressLine2: 'Cobham Road',
      town: 'Ferndown',
      postCode: 'BH21 7SB',
      email: 'accounts@thechangemavericks.com',
    });
    this.items.push({
      description: 'MDC Website Support Retainer',
      quantity: 1,
      amount: 27500,
    });
    this.items.push({
      description: 'MDC Website Support Retainer - Additional Hours',
      quantity: 1,
      amount: 8500,
    });
  }

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Post()
  makeInvoice(
    @Body()
    { date, invoice_nr, customer }: PostBodyDto
  ): void {
    const invoice = {
      date: date.toString(),
      customer: this.customers.get(customer),
      items: [
        {
          description: 'MDC Website Support Retainer',
          quantity: 1,
          amount: 27500,
        },
      ],
      invoice_nr: `${customer}${invoice_nr}`,
    };
    this.appService.makeInvoice(invoice);
  }
}
