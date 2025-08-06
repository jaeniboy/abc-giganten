import React from 'react';

const App: React.FC = () => {
  console.log('App component rendering...');
  
  return (
    <div style={{ padding: '20px', backgroundColor: '#f0f0f0', minHeight: '100vh' }}>
      <h1 style={{ color: 'blue' }}>ABC Giganten - Test</h1>
      <p>If you see this, React is working!</p>
      <button onClick={() => alert('Button clicked!')}>Test Button</button>
    </div>
  );
};

export default App;
