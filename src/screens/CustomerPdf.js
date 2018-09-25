import React from 'react'
import jsPDF from 'jspdf';
import 'jspdf-autotable';

class CustomerPdf extends React.Component {
demoFromHTML() {
  const columns = [
    {title: "ID", dataKey: "id"},
    {title: "Name", dataKey: "name"},
    {title: "Country", dataKey: "country"},
  ];
  const rows = [
    {"id": 1, "name": "Shaw", "country": "Tanzania"},
    {"id": 2, "name": "Nelson", "country": "Kazakhstan"},
    {"id": 3, "name": "Garcia", "country": "Madagascar"},
  ];

  var doc = new jsPDF('p', 'pt');
  doc.autoTable(columns, rows, {
    styles: {fillColor: [100, 255, 255]},
    columnStyles: {
    id: {fillColor: 255}
    },
    margin: {top: 60},
    addPageContent: function(data) {
    doc.text("Header", 40, 30);
    }
  });
  doc.save('table.pdf');
}

  render() {
    return (
      <button onClick={() => this.demoFromHTML()}>
        PDF FILE
      </button>
    );
  }
}
export default CustomerPdf;
