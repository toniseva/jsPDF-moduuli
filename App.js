import React from 'react';
import './App.css';

// npm i jspdf
import jsPDF from 'jspdf';

// npm i jspdf-autotable
import 'jspdf-autotable';

const logo = require("./data/cropped-redorchidlogo.png");


//------------------------------------------------------------------
const jsPdfGenerator = () => {

  // määritellään uusi dokumentti
  var doc = new jsPDF('p', 'pt');
  doc.page = 1;

  //----------------------------------------------------------------
  // logon data

  const imgData = "";

  //------------------------------------------------------------------
  // esimerkkidata

  var inputData = [
    {
      id: "Vmw5Rh73q", billName: "lasku 1", billContent: [
        { id: "sUzcDSjZC", itemName: "asia1", Price: "10", Count: "20", Tax: "20" },
        { id: "W6GNu09W5", itemName: "asia2", Price: "30", Count: "40", Tax: "20" },
        { id: "Rv__7bzV_", itemName: "asia3", Price: "10", Count: "10", Tax: "10" },
      ]
    }
  ];

  //-----------------------------------------------------------------
  // luodaan valmisData-taulukko inputData-taulukon pohjalta
  // lasketaan summa ilman arvonlisäveroa, alv ja verollinen summa

  var valmisData = new Array;
  var verotonKokonaisSumma = 0;
  var alvitYhteensa = 0;

  var i;
  for (i = 0; i < inputData[0].billContent.length; i++) {

    valmisData[i] = [5];
    // nimike
    valmisData[i][0] = inputData[0].billContent[i].itemName;

    // yksikköhinta
    valmisData[i][1] = parseFloat(inputData[0].billContent[i].Price).toFixed(2);

    // määrä
    valmisData[i][2] = inputData[0].billContent[i].Count;

    // alv-prosentti
    valmisData[i][3] = inputData[0].billContent[i].Tax + " %";

    // hinta yhteensä
    valmisData[i][4] = (inputData[0].billContent[i].Price * inputData[0].billContent[i].Count).toFixed(2);

    //----------------------
    verotonKokonaisSumma += parseFloat(valmisData[i][4])
    // alvi = (yksikköhinta * määrä) * (alvprosentti / 100)
    alvitYhteensa += (parseFloat(valmisData[i][1]) * parseFloat(valmisData[i][2])) * (parseFloat(valmisData[i][3]) / 100)

  }

  var verollinenKokonaisSumma = verotonKokonaisSumma + alvitYhteensa;

  //------------------------------------------------
  // Tulostetaan otsikkorivi 

  doc.autoTable({
    tableWidth: 'auto',
    margin: { top: 100 },
    columnStyles: {
      0: { cellWidth: 310, fillColor: [170, 170, 170] },
      1: { cellWidth: 59, halign: 'center', fillColor: [170, 170, 170] },
      2: { cellWidth: 40, halign: 'center', fillColor: [170, 170, 170] },
      3: { cellWidth: 40, halign: 'center', fillColor: [170, 170, 170] },
      4: { cellWidth: 69, halign: 'right', fillColor: [170, 170, 170] },
    },
    body: [['Nimeke', 'Kpl-hinta', 'Määrä', 'ALV%', 'Yhteensä']],
  });

  // ---------------------------------------------------------------
  // tulostetaan valmisData-taulukko

  doc.setFontSize(12);

  doc.autoTable({
    tableWidth: 'auto',
    headStyles: {
      fillColor: [255, 120, 120],
    },
    margin: { top: 100 },
    columnStyles: {
      0: { cellWidth: 310 },
      1: { cellWidth: 59, halign: 'center' },
      2: { cellWidth: 40, halign: 'center' },
      3: { cellWidth: 40, halign: 'center' },
      4: { cellWidth: 69, halign: 'right' },
    },
    // suoritetaan jos sivu vaihtuu tämän taulukon aikana
    didDrawPage: function (data) {
      // Header, move_from_left, move_from_height, width, height 
      doc.addImage(imgData, 'JPEG', 20, 10, 279, 67);

      // Footer
      var str = "Sivu " + doc.internal.getNumberOfPages();

      // jsPDF 1.4+ uses getWidth, <1.4 uses .width
      var pageSize = doc.internal.pageSize;
      var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
      doc.text(str, data.settings.margin.left, pageHeight - 20);
    },

    // head: [['Nimeke', 'Kpl-hinta', 'Määrä', 'ALV%', 'Yhteensä']],
    body: valmisData
  })

  // luodaan kokonaissummataulukko

  const kokonaisSummat = [
    ["Yhteensä ilman arvonlisäveroa", verotonKokonaisSumma.toFixed(2)],
    ["Arvonlisävero yhteensä", alvitYhteensa.toFixed(2)],
    ["Maksettava yhteensä", verollinenKokonaisSumma.toFixed(2)]
  ]

  doc.autoTable({
    tableWidth: 'auto',
    margin: { top: 100 },
    columnStyles: {
      0: { cellWidth: 449, halign: 'right' },
      1: { cellWidth: 69, halign: 'right' },
    },
    // suoritetaan jos sivu vaihtuu tämän taulukon aikana
    didDrawPage: function (data) {
      // Header, move_from_left, move_from_height, width, height 
      doc.addImage(imgData, 'JPEG', 20, 10, 279, 67);

      // Footer
      var str = "Sivu " + doc.internal.getNumberOfPages();

      // jsPDF 1.4+ uses getWidth, <1.4 uses .width
      var pageSize = doc.internal.pageSize;
      var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
      doc.text(str, data.settings.margin.left, pageHeight - 20);
    },
    body: kokonaisSummat
  })

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
