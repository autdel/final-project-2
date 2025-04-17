import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="text-white pb-6">
      <div className="container mx-auto">        
        <div className="text-center">
          <p className="text-neutral-400 text-sm">
            &copy; {new Date().getFullYear()} PolyLingo. Created by Autumn.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;