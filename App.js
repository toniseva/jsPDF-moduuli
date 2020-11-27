import './App.css';
import React, { PureComponent } from 'react';

// npm i jspdf
import jsPDF from 'jspdf'

// npm i jspdf-autotable
import 'jspdf-autotable';

const jsPdfGenerator = () => {

  // määritellään uusi dokumentti
  var doc = new jsPDF('p', 'pt');
  doc.page=1;

  var width   = doc.internal.pageSize.getWidth();
  var height  = doc.internal.pageSize.getHeight(); 
  
  // ---------------------------------------------------
  // headerin määrittelevä funktio

  var header = function() {
       
      var imgData = ""
      // move_from_left, move_from_height, width, height 
      doc.addImage(imgData, 'JPEG', 20, 10, 279, 67)

      doc.setFontSize(14);

  };

  // footerin määrittelevä funktio

//------------------------------------------------------------------
  // Laskun luonti

  header();

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
    ["Tuote 1", 10.00, 1, 20],
 

  
  ]
//-----------------------------------------------------------------
  // luodaan valmisData-taulukko inputData-taulukon pohjalta
  var valmisData = new Array

  var i;
  for (i = 0; i < inputData.length ; i++) {
    
    valmisData[i] = [5]
    // nimike
    valmisData[i][0]=inputData[i][0]

    // yksikköhinta
    valmisData[i][1]=inputData[i][1].toFixed(2)

    // määrä
    valmisData[i][2]=inputData[i][2]

    // alv-prosentti
    valmisData[i][3]=inputData[i][3] + " %"

    // hinta yhteensä
    valmisData[i][4]=(inputData[i][1] * inputData[i][2]).toFixed(2)

  } 

// ---------------------------------------------------------------
  // tulostetaan valmisData-taulukko

  doc.setFontSize(12)

  doc.autoTable({ 
    tableWidth: 'auto',
    headStyles: {
      fillColor: [255,120,120],
    },
    margin: { top: 100 },
    columnStyles: {
      0: {cellWidth: 310},
      1: {cellWidth: 59, halign: 'center'},
      2: {cellWidth: 40, halign: 'center'},
      3: {cellWidth: 40, halign: 'center'},
      4: {cellWidth: 69, halign: 'right'},
    },
    didDrawPage: function (data) {
      // Header
      var imgData = ""
      // move_from_left, move_from_height, width, height 
      doc.addImage(imgData, 'JPEG', 20, 10, 279, 67)

      doc.setFontSize(14);

      // Footer
      var str = "Sivu " + doc.internal.getNumberOfPages()


      // jsPDF 1.4+ uses getWidth, <1.4 uses .width
      var pageSize = doc.internal.pageSize;
      var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
      doc.text(str, data.settings.margin.left, pageHeight - 20);
  },

    head: [['Nimeke', 'Kpl-hinta', 'Määrä', 'ALV%', 'Yhteensä']],
    body: valmisData
  })
    // -----------------------------------------------------------
    // lasketaan summa ilman arvonlisäveroa, alv ja verollinen summa
    var verotonKokonaisSumma = 0
    var alvitYhteensa = 0
    for (i = 1; i < valmisData.length ; i++) {
       verotonKokonaisSumma += parseFloat(valmisData[i][4])
              // alvi = (yksikköhinta * määrä) * (alvprosentti / 100)
       alvitYhteensa += (parseFloat(valmisData[i][1]) * parseFloat(valmisData[i][2])) * (parseFloat(valmisData[i][3]) / 100)

    }

    var verollinenKokonaisSumma = verotonKokonaisSumma + alvitYhteensa



    // luodaan kokonaissummataulukko

    var taulukonloppu = doc.lastAutoTable.finalY
   
    const kokonaisSummat = [
      [ "Yhteensä ilman arvonlisäveroa", verotonKokonaisSumma.toFixed(2)],
      [ "Arvonlisävero yhteensä", alvitYhteensa.toFixed(2)],
      [ "Maksettava yhteensä", verollinenKokonaisSumma.toFixed(2)]
    ]

    doc.autoTable({ 
      tableWidth: 'auto',
      margin: { top: 100 },
      columnStyles: {
        0: {cellWidth: 449, halign: 'right'},
        1: {cellWidth: 69, halign: 'right'},
      },
      body: kokonaisSummat
    })




  // Save the Data
  doc.save('Generated.pdf')
  return null
}







function App() {
  return (
    <div className="App">
      <h1>Hello</h1>
      <button onClick={jsPdfGenerator}>Tallenna PDF</button>
    </div>
  );
}

export default App;
