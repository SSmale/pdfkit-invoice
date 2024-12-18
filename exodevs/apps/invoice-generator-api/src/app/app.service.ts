import { Injectable } from '@nestjs/common';
import generateInvoice from '@ssmale/invoice-generator';
import { Invoice } from '@ssmale/invoice-generator/build/types/Invoice.type';

@Injectable()
export class AppService {
  getData(): { message: string } {
    return { message: 'Hello API' };
  }

  makeInvoice(data: Invoice): void {
    generateInvoice(data, `${data.invoice_nr}.pdf`);
  }
}
