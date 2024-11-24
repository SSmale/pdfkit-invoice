const fs = require("fs");
const PDFDocument = require("pdfkit");

const lineSpacing = 12;
const leftIndent = 30;
const backgroundColour = '#F7F7F7';
const highlightColour = '#E4E4E4'
const headerColour = '#FFFFFF';
const primaryColour = "#CC192F";
const textColour = "#000000";

function createInvoice(invoice, path) {
  let doc = new PDFDocument({
    size: "A4", margin: leftIndent
  });

  doc.rect(0, 0, doc.page.width, doc.page.height).fill(backgroundColour);

  doc.registerFont('Bold', "fonts/Montserrat-Bold.ttf");
  doc.registerFont('Regular', "fonts/Montserrat-Regular.ttf");

  generateHeader(doc, invoice);
  generateInvoiceTable(doc, invoice);
  generateFooter(doc, invoice);

  doc.end();
  doc.pipe(fs.createWriteStream(path));
}

function generateHeader(doc, invoice) {
  const initialY = 90
  const rightCol = 200;
  doc
    .fillColor(primaryColour)
    .font("Bold")
    .fontSize(100)
    .text("hello", leftIndent - 7, 13)
    .fillColor(textColour)
    .fontSize(26)
    .font("Regular")
    .text("This is your invoice.", leftIndent, 111)
    .fontSize(12)
    .text(`Invoice #${invoice.invoice_nr}`, leftIndent, initialY + (lineSpacing * 5))
    .text(formatDate(new Date(invoice.date ?? Date.now())), leftIndent, initialY + (lineSpacing * 6))
    .fontSize(16)
    .text("Simon Smale", rightCol, initialY - 18, { align: "right" })
    .font("Regular")
    .fontSize(12)
    .text("91 Walnut Avenue", 200, initialY, { align: "right" })
    .text("Southampton", 200, initialY + (lineSpacing * 1), { align: "right" })
    .text("Hampshire", 200, initialY + (lineSpacing * 2), { align: "right" })
    .text("SO18 2QU", 200, initialY + (lineSpacing * 3), { align: "right" })
    .text("simon@smalemail.net", 200, initialY + (lineSpacing * 5), { align: "right" })
    .text("07872574140", 200, initialY + (lineSpacing * 6), { align: "right" })
    .moveDown();
}

function generateInvoiceTable(doc, invoice) {
  let i;
  const invoiceTableTop = 190;
  const startWidth = 595 - 250;
  doc.rect(leftIndent, invoiceTableTop, startWidth - 2, 16).fill(primaryColour);
  doc.rect(doc.page.width - leftIndent - 190, invoiceTableTop, 50 - 2, 16).fill(primaryColour);
  doc.rect(doc.page.width - leftIndent - 140, invoiceTableTop, 70 + 2, 16).fill(primaryColour);
  doc.rect(doc.page.width - leftIndent - 70 + 4, invoiceTableTop, 70 - 4, 16).fill(primaryColour);

  generateTableRow(
    doc,
    invoiceTableTop,
    "Description",
    "Unit Price",
    "Qty",
    "Amount",
    "Bold",
    12,
    headerColour
  );

  for (i = 0; i < invoice.items.length; i++) {
    const item = invoice.items[i];
    const position = invoiceTableTop - 6 + (i + 1) * 30;
    generateTableRow(
      doc,
      position,
      item.description,
      formatCurrency(item.amount / item.quantity),
      item.quantity,
      formatCurrency(item.amount)
    );

    generateHr(doc, position + 20);
  }
}

function generateFooter(doc, invoice) {
  const totalBarStartY = doc.page.height - 200 - 168;
  if (doc.y >= totalBarStartY) {
    doc.addPage()
  }

  doc.rect(0, totalBarStartY, doc.page.width, 168).fill(highlightColour);
  doc
    .fillColor(textColour)
    .fontSize(10)
    .text("FOR", leftIndent, totalBarStartY + 32)
    .font("Bold")
    .fontSize(14)
    .moveDown(0).text(invoice.customer.name)
    .font("Regular")
    .fontSize(12)
    .moveDown(0).text(invoice.customer.addressLine1)
    .moveDown(0).text(invoice.customer.addressLine2)
    .moveDown(0).text(invoice.customer.town)
    .moveDown(0).text(invoice.customer.postCode)
    .moveDown(0).text(invoice.customer.email)
  doc
    .strokeColor(primaryColour)
    .lineWidth(2)
    .moveTo(leftIndent + (doc.page.width / 2), doc.page.height - 200 - 83 - 26)
    .lineTo(doc.page.width - leftIndent, doc.page.height - 200 - 83 - 26)
    .stroke();
  doc
    .fillColor(textColour)
    .font("Bold")
    .fontSize(14)
    .text("Total", leftIndent + (doc.page.width / 2) + 10, doc.page.height - 200 - 83 - 8)
  const total = invoice.items.reduce((t, i) => t += (i.amount * i.quantity), 0);  
  doc
    .fillColor(textColour)
    .font("Regular")
    .fontSize(14)
    .text(formatCurrency(total), leftIndent + (doc.page.width / 2) + 130, doc.page.height - 200 - 83 - 8, { width: 100, align: "right" })
  doc
    .strokeColor(primaryColour)
    .lineWidth(2)
    .moveTo(leftIndent + (doc.page.width / 2), doc.page.height - 200 - 52)
    .lineTo(doc.page.width - leftIndent, doc.page.height - 200 - 52)
    .stroke();
  doc
    .fillColor(primaryColour)
    .font("Regular")
    .fontSize(40)
    .text("thank you!", leftIndent - 7, doc.page.height - 170)
  doc.rect(0, doc.page.height - 90, doc.page.width, 90).fill(highlightColour);
  doc
    .fontSize(10)
    .fillColor(textColour)
    .font("Bold")
    .text(
      "Bank Account",
      0,
      doc.page.height - 70,
      { align: "center", width: doc.page.width }
    ).font("Regular")
    .moveDown(0).text(
      "Account # : 53237370", { align: "center", width: doc.page.width }).moveDown(0).text(
        "Sort Code : 04-00-04", { align: "center", width: doc.page.width })
}

function generateTableRow(
  doc,
  y,
  description,
  unitCost,
  quantity,
  lineTotal,
  font = "Regular",
  fontSize = 10,
  colour = textColour
) {
  doc
    .font(font)
    .fontSize(fontSize)
    .fillColor(colour)
    .text(description, leftIndent + 2, y)
    .text(quantity, doc.page.width - leftIndent - 190 - 2, y, { width: 50, align: "center" })
    .text(unitCost, doc.page.width - leftIndent - 140 - 2, y, { width: 70, align: "right" })
    .text(lineTotal, doc.page.width - leftIndent - 70 - 2, y, { width: 70, align: "right" })
    .moveDown();
}

function generateHr(doc, y) {
  doc
    .strokeColor(primaryColour)
    .lineWidth(2)
    .moveTo(leftIndent, y)
    .lineTo(doc.page.width - leftIndent, y)
    .stroke()
    .moveDown();
}

function formatCurrency(pence) {
  return "£" + (pence / 100).toFixed(2);
}

function formatDate(date) {
  return date.toLocaleString("en-GB", { day: 'numeric', month: 'long', year: 'numeric' });
}

module.exports = {
  createInvoice
};
