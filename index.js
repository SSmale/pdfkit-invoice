const pdf  = import('@ssmale/invoice-generator');

const invoice = {
  date: '2024-12-01',
  customer: {
    name: "The Change Mavericks",
    addressLine1:"1 Cedar Office Park",
    addressLine2:"Cobham Road",
    town:"Ferndown",
    postCode: "BH21 7SB",
    email:"accounts@thechangemavericks.com"
  },
  items: [
    {
      description: "MDC Website Support Retainer",
      quantity: 1,
      amount: 27500
    }
  ],
  invoice_nr: 'CM010'
};

pdf.then(x =>     x.default(invoice, `${invoice.invoice_nr}.pdf`)
)