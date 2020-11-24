import './App.css';
import React, { PureComponent } from 'react';

// npm i jspdf
import jsPDF from 'jspdf'

// npm i jspdf-autotable
import 'jspdf-autotable';

const JsPdfGenerator = () => {

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

  const inputData = [
    ["Tuote 1", 1, 100.90, 23.3]
    ["Tuote 2", 2, 37.44, 14.5]
  ]

  var finishedData = new Array()


//-----------------------------------------------------------------

  header();

  doc.setFontSize(12)
  doc.line(0, 100, width, 100)

  doc.autoTable({ startY: 130,
    tableWidth: 'auto',
    headerStyles: {
      fillColor: [255,120,120]
    },
    margin: { top: 10 },
    
    head: [['Nimike', 'Määrä', 'Hinta', 'Vero']],
    
    body: finishedData,
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
      <JsPdfGenerator />
    </div>
  );
}

export default App;
