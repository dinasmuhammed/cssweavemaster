import React from 'react';
import './ShippingTable.css'; // Optional for external styling if needed

const ShippingTable = () => {
  return (
    <div>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#FFF7F0', color: '#002D26' }}>
            <th style={headerCellStyle}>Weight</th>
            <th style={headerCellStyle}>Kerala & Goa</th>
            <th style={headerCellStyle}>Delhi & Mumbai/Ahmedabad/Pune</th>
            <th style={headerCellStyle}>Roll North East, West & Central Zone</th>
            <th style={headerCellStyle}>Jammu & Kashmir, Himachal Pradesh, Guwahati</th>
            <th style={headerCellStyle}>Net Tripura/Port Blair</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr
              key={index}
              style={{
                backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#002D26',
                color: index % 2 === 0 ? '#002D26' : '#FFFFFF',
              }}
            >
              <td style={cellStyle}>{row.weight}</td>
              <td style={cellStyle}>{row.kerala}</td>
              <td style={cellStyle}>{row.delhi}</td>
              <td style={cellStyle}>{row.roll}</td>
              <td style={cellStyle}>{row.jammu}</td>
              <td style={cellStyle}>{row.netTripura}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const headerCellStyle = {
  padding: '10px',
  border: '1px solid #ddd',
  textAlign: 'center',
};

const cellStyle = {
  padding: '10px',
  border: '1px solid #ddd',
  textAlign: 'center',
};

const data = [
  { weight: '0-1 KG', kerala: 75, delhi: 100, roll: 150, jammu: 155, netTripura: 190 },
  { weight: '1.5 KG', kerala: 145, delhi: 200, roll: 350, jammu: 380, netTripura: 400 },
  { weight: '2 KG', kerala: 195, delhi: 250, roll: 400, jammu: 425, netTripura: 500 },
  { weight: '3 KG', kerala: 280, delhi: 330, roll: 520, jammu: 550, netTripura: 640 },
  { weight: '3.5 KG', kerala: 325, delhi: 375, roll: 550, jammu: 595, netTripura: 690 },
  { weight: '4 KG', kerala: 370, delhi: 420, roll: 590, jammu: 640, netTripura: 750 },
  { weight: '5 KG', kerala: 455, delhi: 500, roll: 690, jammu: 750, netTripura: 900 },
];

export default ShippingTable;
