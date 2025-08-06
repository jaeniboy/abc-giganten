import React from 'react';
import ReactDOM from 'react-dom/client';

// Basic test without external dependencies
const TestApp = () => {
  return React.createElement('div', {
    style: { 
      padding: '20px', 
      backgroundColor: '#f0f0f0', 
      minHeight: '100vh',
      fontSize: '18px'
    }
  }, [
    React.createElement('h1', { key: 'title', style: { color: 'blue' } }, 'ABC Giganten - Basic Test'),
    React.createElement('p', { key: 'text' }, 'If you see this, React is working without JSX!'),
    React.createElement('button', { 
      key: 'button', 
      onClick: () => alert('Button works!') 
    }, 'Test Button')
  ]);
};

console.log('Loading basic React test...');

const rootElement = document.getElementById('root');
if (rootElement) {
  console.log('Creating React root...');
  const root = ReactDOM.createRoot(rootElement);
  root.render(React.createElement(TestApp));
  console.log('React app rendered!');
} else {
  console.error('No root element found');
  document.body.innerHTML = '<div style="color:red">No root element found!</div>';
}
