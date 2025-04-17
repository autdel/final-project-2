// src/components/layout/Footer.tsx
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-br from-neutral-800 to-neutral-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">        
        <div className="mt-10 pt-6 border-t border-neutral-700 text-center">
          <p className="text-neutral-400 text-sm">
            &copy; {new Date().getFullYear()} PolyLingo. Created by Autumn.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;