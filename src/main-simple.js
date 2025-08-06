import React from 'react';
import ReactDOM from 'react-dom/client';

// Most basic possible React setup
console.log('JavaScript file loading...');

const App = () => {
  return React.createElement('div', {
    style: { 
      padding: '20px', 
      backgroundColor: '#e0f0ff', 
      minHeight: '100vh',
      fontSize: '24px',
      fontFamily: 'Arial, sans-serif'
    }
  }, [
    React.createElement('h1', { 
      key: 'title', 
      style: { color: '#0066cc', marginBottom: '20px' } 
    }, '🔤 ABC Giganten Works!'),
    React.createElement('p', { 
      key: 'text',
      style: { color: '#333', marginBottom: '20px' }
    }, 'React is successfully loaded and running!'),
    React.createElement('button', { 
      key: 'button',
      style: {
        padding: '10px 20px',
        fontSize: '18px',
        backgroundColor: '#0066cc',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
      },
      onClick: () => alert('🎉 Button clicked! React is working perfectly!')
    }, '🎮 Test Button')
  ]);
};

console.log('About to find root element...');
const rootElement = document.getElementById('root');
console.log('Root element found:', rootElement);

if (rootElement) {
  console.log('Creating React root...');
  const root = ReactDOM.createRoot(rootElement);
  console.log('Rendering app...');
  root.render(React.createElement(App));
  console.log('✅ App successfully rendered!');
} else {
  console.error('❌ Root element not found!');
}
