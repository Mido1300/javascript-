// main.js
// Main JavaScript file to import and demonstrate all modules

// Import modules
import { transformEmployeeData, employees } from './transform.js';
import { fetchProjectData, fetchWithErrorHandling } from './fetch.js';
import { createStateManager } from './state.js';

// DOM content loaded event listener
document.addEventListener('DOMContentLoaded', () => {
  // Create console log display area
  const consoleOutput = document.getElementById('console-output');
  const originalConsoleLog = console.log;
  const originalConsoleError = console.error;
  const originalConsoleTable = console.table;
  
  // Override console methods to display in the UI
  console.log = function(...args) {
    originalConsoleLog.apply(console, args);
    const message = args.map(arg => 
      typeof arg === 'object' ? JSON.stringify(arg, null, 2) : arg
    ).join(' ');
    appendToConsole('log', message);
  };
  
  console.error = function(...args) {
    originalConsoleError.apply(console, args);
    const message = args.map(arg => 
      typeof arg === 'object' ? JSON.stringify(arg, null, 2) : arg
    ).join(' ');
    appendToConsole('error', message);
  };
  
  console.table = function(data, columns) {
    originalConsoleTable.apply(console, [data, columns]);
    
    // Create a simple table representation
    let tableHTML = '<table class="console-table"><thead><tr>';
    const keys = columns || Object.keys(data[0] || {});
    
    // Add headers
    keys.forEach(key => {
      tableHTML += `<th>${key}</th>`;
    });
    tableHTML += '</tr></thead><tbody>';
    
    // Add rows
    data.forEach(item => {
      tableHTML += '<tr>';
      keys.forEach(key => {
        tableHTML += `<td>${item[key]}</td>`;
      });
      tableHTML += '</tr>';
    });
    tableHTML += '</tbody></table>';
    
    appendToConsole('table', tableHTML);
  };
  
  function appendToConsole(type, message) {
    const entry = document.createElement('div');
    entry.className = `console-${type}`;
    
    if (type === 'table') {
      entry.innerHTML = message;
    } else {
      entry.textContent = message;
    }
    
    consoleOutput.appendChild(entry);
    // Auto-scroll to bottom
    consoleOutput.scrollTop = consoleOutput.scrollHeight;
  }
  
  // Set up tab functionality
  const tabs = document.querySelectorAll('.tab');
  const codeBlocks = document.querySelectorAll('.code-block');
  
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active class from all tabs and blocks
      tabs.forEach(t => t.classList.remove('active'));
      codeBlocks.forEach(block => block.classList.remove('active'));
      
      // Add active class to current tab
      tab.classList.add('active');
      
      // Show corresponding code block
      const blockId = tab.getAttribute('data-block');
      document.getElementById(blockId).classList.add('active');
    });
  });
  
  // Set up button functionality
  document.getElementById('run-transform').addEventListener('click', () => {
    consoleOutput.innerHTML = ''; // Clear previous output
    console.log('Running Data Transformation Example:');
    const result = transformEmployeeData(employees);
    console.log('Transformation complete!');
  });
  
  document.getElementById('run-fetch').addEventListener('click', async () => {
    consoleOutput.innerHTML = ''; // Clear previous output
    console.log('Running Async Fetch Example:');
    try {
      const result = await fetchWithErrorHandling();
      console.log('Fetch operation complete!');
    } catch (error) {
      console.error('Error in fetch demonstration:', error);
    }
  });
  
  document.getElementById('run-state').addEventListener('click', () => {
    consoleOutput.innerHTML = ''; // Clear previous output
    console.log('Running State Management Example:');
    
    // Create a new state manager for the demo
    const demoState = createStateManager({
      count: 0,
      items: [],
      isLoading: false
    });
    
    // Subscribe to changes
    const unsubscribe = demoState.subscribe(state => {
      console.log('State updated:', state);
    });
    
    // Demo a sequence of state changes
    console.log('Initial state:', demoState.getState());
    
    demoState.setState({ isLoading: true });
    demoState.setState({ count: 1 });
    
    demoState.setState(prevState => ({
      items: [...prevState.items, 'Item ' + prevState.count]
    }));
    
    demoState.setState({ count: 2 });
    demoState.setState(prevState => ({
      items: [...prevState.items, 'Item ' + prevState.count]
    }));
    
    demoState.setState({ isLoading: false });
    
    console.log('State history:', demoState.getHistory());
    unsubscribe();
    
    console.log('State management demonstration complete!');
  });
  
  // Initialize with the first tab active
  tabs[0].click();
});
