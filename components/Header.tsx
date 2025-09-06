import React, { useState } from 'react';
import { User } from '../types';
import ZeroCodeLogo from '../images/ZeroCode_logo.png';
import { useLocation, useNavigate } from 'react-router-dom';

interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
  onBack?: () => void;
  children?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ 
  title, 
  showBackButton = false, 
  onBack,
  children 
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const getBreadcrumbs = () => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs = [];
    
    let currentPath = '';
    for (const segment of pathSegments) {
      currentPath += `/${segment}`;
      const label = segment.charAt(0).toUpperCase() + segment.slice(1).replace('-', ' ');
      breadcrumbs.push({ path: currentPath, label });
    }
    
    return breadcrumbs;
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <header className="bg-brand-surface/50 backdrop-blur-sm border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {showBackButton && (
              <button
                onClick={handleBack}
                className="p-2 text-brand-subtle-text hover:text-brand-text transition-colors"
                title="Go back"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}
            
            <div className="flex items-center space-x-2">
              <img src={ZeroCodeLogo} alt="ZeroCode" className="h-8 w-auto" />
              <span className="text-xl font-bold bg-gradient-to-r from-teal-400 to-purple-400 bg-clip-text text-transparent">
                ZeroCode
              </span>
            </div>

            {breadcrumbs.length > 0 && (
              <div className="flex items-center space-x-2 text-sm text-brand-subtle-text">
                <span>/</span>
                {breadcrumbs.map((breadcrumb, index) => (
                  <React.Fragment key={breadcrumb.path}>
                    {index > 0 && <span>/</span>}
                    <span className="text-brand-text">{breadcrumb.label}</span>
                  </React.Fragment>
                ))}
              </div>
            )}

            {title && (
              <div className="text-sm text-brand-subtle-text">
                <span className="mx-2">•</span>
                <span className="text-brand-text">{title}</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-3">
            {children}
          </div>
        </div>
      </div>
    </header>
  );
};
