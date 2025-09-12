// components/Formulas.js
import React, { useState } from 'react';
import { FaCalculator, FaSquare, FaCircle, FaCube, FaTable } from 'react-icons/fa';

const Formulas = () => {
  const [activeTab, setActiveTab] = useState('geometry');
  const [tableRows, setTableRows] = useState(5);
  const [tableCols, setTableCols] = useState(5);
  const [generatedTable, setGeneratedTable] = useState([]);
  
  const geometryFormulas = [
    {
      shape: 'Square',
      icon: <FaSquare />,
      formulas: [
        { name: 'Area', formula: 'a²' },
        { name: 'Perimeter', formula: '4a' },
        { name: 'Diagonal', formula: 'a√2' }
      ]
    },
    {
      shape: 'Rectangle',
      icon: <FaSquare />,
      formulas: [
        { name: 'Area', formula: 'l × w' },
        { name: 'Perimeter', formula: '2(l + w)' },
        { name: 'Diagonal', formula: '√(l² + w²)' }
      ]
    },
    {
      shape: 'Circle',
      icon: <FaCircle />,
      formulas: [
        { name: 'Area', formula: 'πr²' },
        { name: 'Circumference', formula: '2πr' },
        { name: 'Diameter', formula: '2r' }
      ]
    },
    {
      shape: 'Triangle',
      icon: <FaSquare />,
      formulas: [
        { name: 'Area', formula: '½ × b × h' },
        { name: 'Perimeter', formula: 'a + b + c' },
        { name: 'Heron\'s Formula', formula: '√[s(s-a)(s-b)(s-c)]' }
      ]
    },
    {
      shape: 'Cube',
      icon: <FaCube />,
      formulas: [
        { name: 'Volume', formula: 'a³' },
        { name: 'Surface Area', formula: '6a²' },
        { name: 'Diagonal', formula: 'a√3' }
      ]
    },
    {
      shape: 'Sphere',
      icon: <FaCircle />,
      formulas: [
        { name: 'Volume', formula: '⁴⁄₃πr³' },
        { name: 'Surface Area', formula: '4πr²' },
        { name: 'Circumference', formula: '2πr' }
      ]
    }
  ];
  
  const trigonometryFormulas = [
    {
      category: 'Basic Identities',
      formulas: [
        { name: 'sin²θ + cos²θ', formula: '1' },
        { name: '1 + tan²θ', formula: 'sec²θ' },
        { name: '1 + cot²θ', formula: 'csc²θ' }
      ]
    },
    {
      category: 'Angle Sum & Difference',
      formulas: [
        { name: 'sin(A + B)', formula: 'sinA cosB + cosA sinB' },
        { name: 'sin(A - B)', formula: 'sinA cosB - cosA sinB' },
        { name: 'cos(A + B)', formula: 'cosA cosB - sinA sinB' },
        { name: 'cos(A - B)', formula: 'cosA cosB + sinA sinB' },
        { name: 'tan(A + B)', formula: '(tanA + tanB) / (1 - tanA tanB)' },
        { name: 'tan(A - B)', formula: '(tanA - tanB) / (1 + tanA tanB)' }
      ]
    },
    {
      category: 'Double Angle',
      formulas: [
        { name: 'sin(2θ)', formula: '2 sinθ cosθ' },
        { name: 'cos(2θ)', formula: 'cos²θ - sin²θ = 2cos²θ - 1 = 1 - 2sin²θ' },
        { name: 'tan(2θ)', formula: '2tanθ / (1 - tan²θ)' }
      ]
    }
  ];
  
  const trigonometryTable = [
    { angle: '0°', sin: '0', cos: '1', tan: '0' },
    { angle: '30°', sin: '1/2', cos: '√3/2', tan: '1/√3' },
    { angle: '45°', sin: '1/√2', cos: '1/√2', tan: '1' },
    { angle: '60°', sin: '√3/2', cos: '1/2', tan: '√3' },
    { angle: '90°', sin: '1', cos: '0', tan: '∞' }
  ];
  
  const generateTable = () => {
    const table = [];
    for (let i = 0; i < tableRows; i++) {
      const row = [];
      for (let j = 0; j < tableCols; j++) {
        row.push(`Cell ${i+1}-${j+1}`);
      }
      table.push(row);
    }
    setGeneratedTable(table);
  };
  
  const downloadTable = () => {
    // In a real app, this would generate and download a file with the table
    alert('Table download would happen here');
  };
  
  return (
    <div className="formulas">
      <div className="formulas-header">
        <h2 className="page-title">Formulas & Tools</h2>
        <div className="tabs">
          <button 
            className={`tab ${activeTab === 'geometry' ? 'active' : ''}`}
            onClick={() => setActiveTab('geometry')}
          >
            <FaSquare /> Geometry
          </button>
          <button 
            className={`tab ${activeTab === 'trigonometry' ? 'active' : ''}`}
            onClick={() => setActiveTab('trigonometry')}
          >
            <FaCalculator /> Trigonometry
          </button>
          <button 
            className={`tab ${activeTab === 'table-generator' ? 'active' : ''}`}
            onClick={() => setActiveTab('table-generator')}
          >
            <FaTable /> Table Generator
          </button>
        </div>
      </div>
      
      {activeTab === 'geometry' && (
        <div className="geometry-container">
          <h3>Geometry Formulas</h3>
          <div className="formulas-grid">
            {geometryFormulas.map((shape, index) => (
              <div key={index} className="formula-card">
                <div className="shape-header">
                  <div className="shape-icon">{shape.icon}</div>
                  <h4>{shape.shape}</h4>
                </div>
                <div className="shape-formulas">
                  {shape.formulas.map((formula, idx) => (
                    <div key={idx} className="formula-item">
                      <div className="formula-name">{formula.name}:</div>
                      <div className="formula-expression">{formula.formula}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className="geometry-calculator">
            <h3>Geometry Calculator</h3>
            <div className="calculator-tabs">
              <button className="calc-tab active">Area Calculator</button>
              <button className="calc-tab">Volume Calculator</button>
            </div>
            <div className="calculator-content">
              <div className="calculator-form">
                <div className="form-group">
                  <label htmlFor="shape-select">Select Shape:</label>
                  <select id="shape-select">
                    <option value="square">Square</option>
                    <option value="rectangle">Rectangle</option>
                    <option value="circle">Circle</option>
                    <option value="triangle">Triangle</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="dimension1">Dimension 1:</label>
                  <input type="number" id="dimension1" placeholder="Enter value" />
                </div>
                <div className="form-group">
                  <label htmlFor="dimension2">Dimension 2:</label>
                  <input type="number" id="dimension2" placeholder="Enter value" />
                </div>
                <button className="calculate-btn">Calculate</button>
                <div className="calculation-result">
                  <label>Result:</label>
                  <div className="result-value">0</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'trigonometry' && (
        <div className="trigonometry-container">
          <h3>Trigonometry Formulas</h3>
          <div className="trig-formulas">
            {trigonometryFormulas.map((category, index) => (
              <div key={index} className="trig-category">
                <h4>{category.category}</h4>
                <div className="trig-formula-list">
                  {category.formulas.map((formula, idx) => (
                    <div key={idx} className="trig-formula-item">
                      <div className="trig-formula-name">{formula.name}</div>
                      <div className="trig-formula-expression">= {formula.formula}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className="trig-table-container">
            <h3>Trigonometry Values Table</h3>
            <div className="trig-table">
              <table>
                <thead>
                  <tr>
                    <th>Angle</th>
                    <th>sin θ</th>
                    <th>cos θ</th>
                    <th>tan θ</th>
                  </tr>
                </thead>
                <tbody>
                  {trigonometryTable.map((row, index) => (
                    <tr key={index}>
                      <td>{row.angle}</td>
                      <td>{row.sin}</td>
                      <td>{row.cos}</td>
                      <td>{row.tan}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="trig-calculator">
            <h3>Trigonometry Calculator</h3>
            <div className="calculator-form">
              <div className="form-group">
                <label htmlFor="angle-input">Enter Angle (degrees):</label>
                <input type="number" id="angle-input" placeholder="e.g., 45" />
              </div>
              <div className="calculation-results">
                <div className="result-item">
                  <label>sin:</label>
                  <div className="result-value">0</div>
                </div>
                <div className="result-item">
                  <label>cos:</label>
                  <div className="result-value">0</div>
                </div>
                <div className="result-item">
                  <label>tan:</label>
                  <div className="result-value">0</div>
                </div>
              </div>
              <button className="calculate-btn">Calculate</button>
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'table-generator' && (
        <div className="table-generator-container">
          <h3>Table Generator</h3>
          <div className="table-controls">
            <div className="control-group">
              <label htmlFor="table-rows">Rows:</label>
              <input 
                type="number" 
                id="table-rows" 
                min="1" 
                max="20" 
                value={tableRows}
                onChange={(e) => setTableRows(parseInt(e.target.value))}
              />
            </div>
            <div className="control-group">
              <label htmlFor="table-cols">Columns:</label>
              <input 
                type="number" 
                id="table-cols" 
                min="1" 
                max="20" 
                value={tableCols}
                onChange={(e) => setTableCols(parseInt(e.target.value))}
              />
            </div>
            <button className="generate-btn" onClick={generateTable}>
              Generate Table
            </button>
          </div>
          
          {generatedTable.length > 0 && (
            <div className="generated-table-container">
              <div className="table-actions">
                <button className="action-btn" onClick={downloadTable}>
                  Download
                </button>
                <button className="action-btn">
                  Copy to Clipboard
                </button>
                <button className="action-btn">
                  Print
                </button>
              </div>
              
              <div className="generated-table">
                <table>
                  <tbody>
                    {generatedTable.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {row.map((cell, cellIndex) => (
                          <td key={cellIndex}>
                            <input 
                              type="text" 
                              value={cell} 
                              onChange={(e) => {
                                const newTable = [...generatedTable];
                                newTable[rowIndex][cellIndex] = e.target.value;
                                setGeneratedTable(newTable);
                              }}
                            />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          <div className="table-templates">
            <h3>Table Templates</h3>
            <div className="template-grid">
              <div className="template-card">
                <h4>Multiplication Table</h4>
                <p>Generate a multiplication table of any size</p>
                <button className="template-btn">Use Template</button>
              </div>
              <div className="template-card">
                <h4>Periodic Table</h4>
                <p>Interactive periodic table of elements</p>
                <button className="template-btn">Use Template</button>
              </div>
              <div className="template-card">
                <h4>Unit Conversion Table</h4>
                <p>Convert between different units of measurement</p>
                <button className="template-btn">Use Template</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Formulas;