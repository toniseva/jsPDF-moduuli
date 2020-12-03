import React from 'react';
import './App.css';

// npm i jspdf
import jsPDF from 'jspdf';

// npm i jspdf-autotable
import 'jspdf-autotable';

import logo from './logo.png';

//------------------------------------------------------------------
const jsPdfGenerator = () => {

  // create new PDF document
  var doc = new jsPDF('p', 'pt');
  doc.page = 1;

  // coordinates & sizes
  const leftMargin = 40;
  const rightMargin = doc.internal.pageSize.getWidth() - 40;
  const tabWidth = doc.internal.pageSize.getWidth() - 80;
  const col2Pos = 200;
  const col3Pos = 300;
  const col4Pos = 420;
  const firstTableStartY = 190;
  const bottomTableMargin = 80;
  const topTableMargin = 80;
  const logoWidth = 102;
  const logoHeight = 23;
  const footerStartY = doc.internal.pageSize.getHeight() - 80;

  //----------------------------------------------------------------
  // image data
  var imgData = new Image();

  imgData.crossOrigin = "Anonymous";
  imgData.src = logo;

  //------------------------------------------------------------------
  // example data

  var inputData = [
    {
      id: "Vmw5Rh73q", billName: "lasku 1", billContent: [
        { id: "sUzcDSjZC", itemName: "asia1", Price: "10", Count: "20", Tax: "20" },
        { id: "W6GNu09W5", itemName: "asia2", Price: "30", Count: "40", Tax: "20" },
        { id: "Rv__7bzV_", itemName: "asia3", Price: "10", Count: "10", Tax: "10" },
        { id: "sUzcDSjZC", itemName: "asia1", Price: "10", Count: "20", Tax: "20" },
        { id: "W6GNu09W5", itemName: "asia2", Price: "30", Count: "40", Tax: "20" },
        { id: "Rv__7bzV_", itemName: "asia3", Price: "10", Count: "10", Tax: "10" },
        { id: "sUzcDSjZC", itemName: "asia1", Price: "10", Count: "20", Tax: "20" },
        { id: "W6GNu09W5", itemName: "asia2", Price: "30", Count: "40", Tax: "20" },
        { id: "Rv__7bzV_", itemName: "asia3", Price: "10", Count: "10", Tax: "10" },
        { id: "sUzcDSjZC", itemName: "asia1", Price: "10", Count: "20", Tax: "20" },
        { id: "W6GNu09W5", itemName: "asia2", Price: "30", Count: "40", Tax: "20" },
        { id: "Rv__7bzV_", itemName: "asia3", Price: "10", Count: "10", Tax: "10" },
        { id: "sUzcDSjZC", itemName: "asia1", Price: "10", Count: "20", Tax: "20" },
        { id: "W6GNu09W5", itemName: "asia2", Price: "30", Count: "40", Tax: "20" },
        { id: "Rv__7bzV_", itemName: "asia3", Price: "10", Count: "10", Tax: "10" },
        { id: "sUzcDSjZC", itemName: "asia1", Price: "10", Count: "20", Tax: "20" },
        { id: "W6GNu09W5", itemName: "asia2", Price: "30", Count: "40", Tax: "20" },
        { id: "Rv__7bzV_", itemName: "asia3", Price: "10", Count: "10", Tax: "10" },
        { id: "sUzcDSjZC", itemName: "asia1", Price: "10", Count: "20", Tax: "20" },
        { id: "W6GNu09W5", itemName: "asia2", Price: "30", Count: "40", Tax: "20" },
      ]
    }
  ];

  // ------------------------------------------------------
  // first page info field

  doc.setFontSize(10);

  doc.text(leftMargin, 95, 'Ostajafirma');
  doc.text(leftMargin, 105, 'Matti Meikäläinen');
  doc.text(leftMargin, 115, 'Bulevardi 15');
  doc.text(leftMargin, 125, '00180, Helsinki');

  doc.text(col3Pos, 50, "Laskun numero");
  doc.text(col3Pos, 60, "Viitenumero");
  doc.text(col3Pos, 70, "Laskun pvm");
  doc.text(col3Pos, 80, "Eräpäivä");
  doc.text(col3Pos, 90, "Toimituspvm");
  doc.text(col3Pos, 100, "Toimitustapa");
  doc.text(col3Pos, 110, "Maksuehto");
  doc.text(col3Pos, 120, "Viitteemme");
  doc.text(col3Pos, 130, "Viitteenne");
  doc.text(col3Pos, 140, "Ostajan tilausnumero");
  doc.text(col3Pos, 150, "Viivästyskorko");
  doc.text(col3Pos, 160, "Huomautusaika");

  doc.text(col4Pos, 50, "<Laskun numero>");
  doc.text(col4Pos, 60, "<Viitenumero>");
  doc.text(col4Pos, 70, "<Laskun pvm>");
  doc.text(col4Pos, 80, "<Eräpäivä>");
  doc.text(col4Pos, 90, "<Toimituspvm>");
  doc.text(col4Pos, 100, "<Toimitustapa>");
  doc.text(col4Pos, 110, "<Maksuehto>");
  doc.text(col4Pos, 120, "<Viitteemme>");
  doc.text(col4Pos, 130, "<Viitteenne>");
  doc.text(col4Pos, 140, "<Ostajan tilausnumero>");
  doc.text(col4Pos, 150, "<Viivästyskorko>");
  doc.text(col4Pos, 160, "<Huomautusaika>");

  //-----------------------------------------------------------------
  // create table invoiceData
  // calculate prices & taxes

  var invoiceData = new Array;
  var totalPriceNoTaxes = 0;
  var taxesTotal = 0;

  var i;
  for (i = 0; i < inputData[0].billContent.length; i++) {

    invoiceData[i] = [5];
    // item name
    invoiceData[i][0] = inputData[0].billContent[i].itemName;

    // item price
    invoiceData[i][1] = parseFloat(inputData[0].billContent[i].Price).toFixed(2);

    // amount
    invoiceData[i][2] = inputData[0].billContent[i].Count;

    // tax %
    invoiceData[i][3] = inputData[0].billContent[i].Tax + " %";

    // total price
    invoiceData[i][4] = (inputData[0].billContent[i].Price * inputData[0].billContent[i].Count).toFixed(2);

    //----------------------
    totalPriceNoTaxes += parseFloat(invoiceData[i][4])
    // taxes = (item price * count) * (tax % / 100)
    taxesTotal += (parseFloat(invoiceData[i][1]) * parseFloat(invoiceData[i][2])) * (parseFloat(invoiceData[i][3]) / 100)

  }

  var totalPriceWithTaxes = totalPriceNoTaxes + taxesTotal;

  //------------------------------------------------
  // table header

  doc.line(leftMargin, 175, rightMargin, 175, 'DF');

  doc.autoTable({
    theme: 'plain',
    tableWidth: tabWidth,
    margin: { top: firstTableStartY, bottom: bottomTableMargin },
    columnStyles: {
      0: { cellWidth: 310 },
      1: { cellWidth: 59, halign: 'center' },
      2: { cellWidth: 40, halign: 'center' },
      3: { cellWidth: 40, halign: 'center' },
      4: { cellWidth: 69, halign: 'right' },
    },
    body: [['Kuvaus', 'Kpl-hinta', 'Määrä', 'ALV%', 'Yhteensä']],
  });

  // ---------------------------------------------------------------
  // create invoice data table

  doc.setFontSize(10);

  doc.autoTable({
    theme: 'plain',
    tableWidth: tabWidth,
    margin: { top: topTableMargin, bottom: bottomTableMargin },
    columnStyles: {
      0: { cellWidth: 310 },
      1: { cellWidth: 59, halign: 'center' },
      2: { cellWidth: 40, halign: 'center' },
      3: { cellWidth: 40, halign: 'center' },
      4: { cellWidth: 69, halign: 'right' },
    },
    body: invoiceData
  })

  // start new page if table does not fit on page

  let finalY = doc.lastAutoTable.finalY;
  if (finalY > 650) {
    doc.addPage();
  };

  // create total sums table

  const kokonaisSummat = [
    ["Yhteensä ilman arvonlisäveroa", totalPriceNoTaxes.toFixed(2)],
    ["Arvonlisävero yhteensä", taxesTotal.toFixed(2)],
    ["Maksettava yhteensä", totalPriceWithTaxes.toFixed(2)]
  ]

  doc.autoTable({
    theme: 'plain',
    tableWidth: tabWidth,
    margin: { top: topTableMargin, bottom: bottomTableMargin },
    columnStyles: {
      0: { cellWidth: 449, halign: 'right' },
      1: { cellWidth: 69, halign: 'right' },
    },
    body: kokonaisSummat
  })

  // Create header and footer, add page numbers
  var pageCount = doc.internal.getNumberOfPages();
  for (i = 0; i < pageCount; i++) {
    doc.setPage(i);

    // Page header
    doc.addImage(imgData, 'PNG', leftMargin, 15, logoWidth, logoHeight);

    doc.textSize = 10;
    doc.text(leftMargin, 55, 'Viherkallionkuja 3 I 59');
    doc.text(leftMargin, 65, '02710, Espoo');

    doc.text(col3Pos, 30, 'Lasku');

    // page footer
    doc.text(leftMargin, footerStartY + 15, "Red Orchid Consulting Oy Ltd");
    doc.text(leftMargin, footerStartY + 25, "Viherkallionkuja 3 I 59");
    doc.text(leftMargin, footerStartY + 35, "02710, Espoo9");
    doc.text(leftMargin, footerStartY + 45, "Puh");
    doc.text(leftMargin, footerStartY + 55, "E-mail");

    doc.text(col3Pos, footerStartY + 15, "Y-tunnus");
    doc.text(col3Pos, footerStartY + 25, "ALV-numero");

    // page number
    doc.line(leftMargin, footerStartY, rightMargin, footerStartY, 'DF');
    doc.text(col4Pos, 30, doc.internal.getCurrentPageInfo().pageNumber + "(" + pageCount + ")");
  }


  // Save the Data
  doc.save('Generated.pdf');
  return null;
}

//---------------------------------------------------------------

function App() {
  return (
    <div className="App">
      <h1>Hello</h1>
      <button onClick={jsPdfGenerator}>Tallenna PDF</button>
    </div>
  );
}

export default App;
