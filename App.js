import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';

// npm i jspdf
import jsPDF from 'jspdf';

// npm i jspdf-autotable
import 'jspdf-autotable';

//------------------------------------------------------------------
const jsPdfGenerator = () => {

  // määritellään uusi dokumentti
  var doc = new jsPDF('p', 'pt');
  doc.page = 1;

  //----------------------------------------------------------------
  // logon data

  var imgData = "";

  //------------------------------------------------------------------
  // esimerkkidata

  var inputData = [

    ["Tuote 1", 10.00, 1, 20],
    ["Tuote 2", 10.00, 1, 20],
    ["Tuote 1", 10.00, 1, 20],
    ["Tuote 2", 10.00, 1, 20],
    ["Tuote 1", 10.00, 1, 20],
    ["Tuote 2", 10.00, 1, 20],
    ["Tuote 1", 10.00, 1, 20],
    ["Tuote 2", 10.00, 1, 20],
    ["Tuote 1", 10.00, 1, 20],
    ["Tuote 2", 10.00, 1, 20],
    ["Tuote 1", 10.00, 1, 20],
    ["Tuote 2", 10.00, 1, 20],
    ["Tuote 1", 10.00, 1, 20],
    ["Tuote 2", 10.00, 1, 20],
    ["Tuote 1", 10.00, 1, 20],
    ["Tuote 2", 10.00, 1, 20],
    ["Tuote 1", 10.00, 1, 20],
    ["Tuote 2", 10.00, 1, 20],
    ["Tuote 1", 10.00, 1, 20],
    ["Tuote 2", 10.00, 1, 20],
    ["Tuote 1", 10.00, 1, 20],
    ["Tuote 2", 10.00, 1, 20],
    ["Tuote 1", 10.00, 1, 20],
    ["Tuote 2", 10.00, 1, 20],
    ["Tuote 1", 10.00, 1, 20],
    ["Tuote 2", 10.00, 1, 20],
    ["Tuote 1", 10.00, 1, 20],
    ["Tuote 2", 10.00, 1, 20],

  ];
  //-----------------------------------------------------------------
  // luodaan valmisData-taulukko inputData-taulukon pohjalta
  var valmisData = new Array;

  var i;
  for (i = 0; i < inputData.length; i++) {

    valmisData[i] = [5];
    // nimike
    valmisData[i][0] = inputData[i][0];

    // yksikköhinta
    valmisData[i][1] = inputData[i][1].toFixed(2);

    // määrä
    valmisData[i][2] = inputData[i][2];

    // alv-prosentti
    valmisData[i][3] = inputData[i][3] + " %";

    // hinta yhteensä
    valmisData[i][4] = (inputData[i][1] * inputData[i][2]).toFixed(2);

  }
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
  // -----------------------------------------------------------
  // lasketaan summa ilman arvonlisäveroa, alv ja verollinen summa
  var verotonKokonaisSumma = 0;
  var alvitYhteensa = 0;
  for (i = 1; i < valmisData.length; i++) {
    verotonKokonaisSumma += parseFloat(valmisData[i][4])
    // alvi = (yksikköhinta * määrä) * (alvprosentti / 100)
    alvitYhteensa += (parseFloat(valmisData[i][1]) * parseFloat(valmisData[i][2])) * (parseFloat(valmisData[i][3]) / 100)

  };

  var verollinenKokonaisSumma = verotonKokonaisSumma + alvitYhteensa;
  //--------------------------------------------
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
