// Test React imports step by step
console.log('🔍 Testing React imports...');

try {
  console.log('📦 Attempting to import React...');
  const { default: React } = await import('react');
  console.log('✅ React imported successfully:', React);
  
  console.log('📦 Attempting to import ReactDOM...');
  const { createRoot } = await import('react-dom/client');
  console.log('✅ ReactDOM imported successfully:', createRoot);
  
  // Now try to use them
  console.log('🏗️ Creating simple React element...');
  const element = React.createElement('div', {
    style: { 
      padding: '20px', 
      background: '#d4edda', 
      border: '1px solid #28a745',
      borderRadius: '8px',
      margin: '10px'
    }
  }, [
    React.createElement('h1', { key: 'title', style: { color: '#155724' } }, '🎉 React + ReactDOM Success!'),
    React.createElement('p', { key: 'desc' }, 'React imports and createElement work perfectly!'),
    React.createElement('p', { key: 'version' }, `React version: ${React.version || 'unknown'}`),
    React.createElement('button', {
      key: 'btn',
      onClick: () => alert('🎮 React event handling works!'),
      style: {
        padding: '10px 15px',
        background: '#28a745',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
      }
    }, 'Test Button')
  ]);
  
  console.log('🎯 Finding root element...');
  const rootElement = document.getElementById('root');
  
  if (rootElement) {
    console.log('🏗️ Creating React root...');
    const root = createRoot(rootElement);
    
    console.log('🎨 Rendering React element...');
    root.render(element);
    
    console.log('🎊 SUCCESS: React fully working!');
  } else {
    throw new Error('Root element not found');
  }
  
} catch (error) {
  console.error('❌ React import/setup failed:', error);
  
  const root = document.getElementById('root');
  if (root) {
    root.innerHTML = `
      <div style="padding: 20px; background: #f8d7da; border: 1px solid #dc3545; border-radius: 8px; margin: 10px;">
        <h1 style="color: #721c24;">❌ React Import Failed</h1>
        <p><strong>Error:</strong> ${error.message}</p>
        <p><strong>Error details:</strong> ${error.stack}</p>
        <p>This helps identify the exact import issue.</p>
      </div>
    `;
  }
}
