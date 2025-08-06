// Ultra minimal test - no imports
console.log('🎯 Minimal script loaded!');

document.addEventListener('DOMContentLoaded', () => {
  console.log('📄 DOM ready');
  const root = document.getElementById('root');
  if (root) {
    root.innerHTML = `
      <div style="padding: 20px; background: #d4edda; border: 1px solid #28a745; border-radius: 5px;">
        <h1 style="color: #155724;">🎉 JavaScript Works!</h1>
        <p>This proves the script loading and DOM manipulation works.</p>
        <p>The issue is likely with React imports.</p>
      </div>
    `;
    console.log('✅ DOM updated successfully');
  } else {
    console.error('❌ No root element found');
  }
});
