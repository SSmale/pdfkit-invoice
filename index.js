const { createInvoice } = require("./createInvoice.js");

const invoice = {
  date: '2024-11-30',
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
      description: "Toner Cartridge",
      quantity: 2,
      amount: 6000
    },
    {
      description: "USB Cable Extender",
      quantity: 1,
      amount: 2000
    },
    {
      description: "USB Cable Extender",
      quantity: 1,
      amount: 2000
    },
    {
      description: "USB Cable Extender",
      quantity: 1,
      amount: 2000
    },
    {
      description: "USB Cable Extender",
      quantity: 1,
      amount: 2000
    },
    {
      description: "USB Cable Extender",
      quantity: 1,
      amount: 2000
    },
    {
      description: "USB Cable Extender",
      quantity: 1,
      amount: 2000
    },
    {
      description: "USB Cable Extender",
      quantity: 1,
      amount: 2000
    },
    {
      description: "USB Cable Extender",
      quantity: 1,
      amount: 2000
    },
    {
      description: "USB Cable Extender",
      quantity: 1,
      amount: 2000
    },
    {
      description: "USB Cable Extender",
      quantity: 1,
      amount: 2000
    },
    {
      description: "USB Cable Extender",
      quantity: 1,
      amount: 2000
    },
    {
      description: "USB Cable Extender",
      quantity: 1,
      amount: 2000
    },
    {
      description: "USB Cable Extender",
      quantity: 1,
      amount: 2000
    },
    {
      description: "USB Cable Extender",
      quantity: 1,
      amount: 2000
    },
    {
      description: "USB Cable Extender",
      quantity: 1,
      amount: 2000
    },
    {
      description: "USB Cable Extender",
      quantity: 1,
      amount: 2000
    },
    {
      description: "USB Cable Extender",
      quantity: 1,
      amount: 2000
    },
    {
      description: "USB Cable Extender",
      quantity: 1,
      amount: 2000
    },
    {
      description: "USB Cable Extender",
      quantity: 1,
      amount: 2000
    }
  ],
  invoice_nr: 12534
};

createInvoice(invoice, "invoice.pdf");
