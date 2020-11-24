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

  //-----------------------------------------------------
  // esimerkkidatan määrittely
  let data = [];
  let col = [
          { dataKey: 'count', header: 'Count' },
          { dataKey: 'c1', header: 'C1' },
          { dataKey: 'c2', header: 'C2' },
          { dataKey: 'c3', header: 'C3' },
          { dataKey: 'c4', header: 'C4' },
      ]
  let count = 1;
  
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

  // Taulukon luonti


// -----------------------------------------------

  var inputData = [
  
    ["Tuote 1", 99.00, 2, 23.3, 198.00],
    ["Tuote 2", 88.00, 1, 37.44, 88.00]
  
  ]

  console.log(inputData[0][0])
  return null
//-----------------------------------------------------------------
  // luodaan valmisData-taulukko inputData-taulukon pohjalta
  var valmisData = new Array(2)

  var i;
  for (i = 0; i < inputData.length ; i++) {
    // valmisData[i][0] = inputData[i][0]

    console.log(inputData[0][0])


  } 



// ---------------------------------------------------------------
  header();

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
