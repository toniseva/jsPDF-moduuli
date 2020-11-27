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

  var header = function () {
       
      var imgData = ""
      // move_from_left, move_from_height, width, height 
      doc.addImage(imgData, 'JPEG', 20, 10, 279, 67)

      doc.setFontSize(14);

  };

  // footerin määrittelevä funktio

  var footer = function () {
    var imgData = // Convert the image to base64 and place it here // 

    // sivunumero
    doc.text(width-350, height - 30, 'sivu ' + doc.page); 
    doc.page ++;

    // doc.addImage(imgData, 'JPEG', 5, height - 25, width-10, 30)        
    
  };
//------------------------------------------------------------------
  // Laskun luonti

  header();

  doc.line(0, 100, width, 100)
// -----------------------------------------------

  var inputData = [
  
    ["Tuote 1", 10.00, 1, 20, 198.00],
    ["Tuote 2", 10.00, 1, 20, 88.00]
  
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
  doc.line(0, 100, width, 100)

  doc.autoTable({ startY: 130,
    tableWidth: 'auto',
    headStyles: {
      fillColor: [255,120,120]
    },
    margin: { top: 10 },
    
    head: [['Nimeke', 'Yksikköhinta', 'Määrä', 'ALV%', 'Yhteensä']],
    body: valmisData
  })
    // -----------------------------------------------------------
    // lasketaan summa ilman arvonlisäveroa, alv ja verollinen summa
    var verotonKokonaisSumma = 0
    var alvitYhteensa = 0

    for (i = 0; i < valmisData.length ; i++) {
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

    doc.autoTable({ startY: taulukonloppu + 20,
      tableWidth: 'auto',
      body: kokonaisSummat
    })



  footer();

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
