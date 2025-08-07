import React from 'react';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'success' | 'danger' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ 
  onClick, 
  children, 
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  className = ''
}) => {
  // Base styling from "Spiel starten" button
  const baseClasses = "text-white font-bold rounded-full shadow-lg transition-all";
  
  // Variant colors
  const variantClasses = {
    primary: 'bg-blue-500 hover:bg-blue-600',
    success: 'bg-green-500 hover:bg-green-600', 
    danger: 'bg-red-500 hover:bg-red-600',
    secondary: 'bg-gray-500 hover:bg-gray-600'
  };
  
  // Size classes
  const sizeClasses = {
    small: 'py-2 px-4 text-base',
    medium: 'py-3 px-6 text-lg', 
    large: 'py-4 px-8 text-xl'
  };
  
  // Width classes
  const widthClasses = fullWidth ? 'w-full' : '';
  
  const buttonClasses = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${widthClasses}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <button 
      onClick={onClick}
      className={buttonClasses}
    >
      {children}
    </button>
  );
};

export default Button;
