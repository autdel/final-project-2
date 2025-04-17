import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../utils/useTheme';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <header>
      <div className="container">
        <div className="flex justify-between items-center header-h mx-4">
          {/* Logo */}
          <div className="flex-grow-0">
            <div 
              onClick={() => window.location.href = '/'} 
              className="flex items-center cursor-pointer px-2"
            >
              {/* New svg file */}
              <svg width="100" height="65" viewBox="0 0 143 95" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M141 45C141 56.5846 134.22 67.2858 122.824 75.1754C111.435 83.0596 95.5939 88 78 88C60.4061 88 44.5647 83.0596 33.1765 75.1754C21.7804 67.2858 15 56.5846 15 45C15 33.4154 21.7804 22.7142 33.1765 14.8246C44.5647 6.94041 60.4061 2 78 2C95.5939 2 111.435 6.94041 122.824 14.8246C134.22 22.7142 141 33.4154 141 45Z" fill="#089CC5" fill-opacity="0.5" stroke="#089CC5" stroke-width="4"/>
                <path d="M7.9338 86.898L19.0842 62.0503L32.826 75.8473L7.9338 86.898Z" fill="#089CC5"/>
                <path d="M39 29C39 24.5875 42.5875 21 47 21H111C115.412 21 119 24.5875 119 29V61C119 65.4125 115.412 69 111 69H47C42.5875 69 39 65.4125 39 61V29ZM79 29V61H111V29H79ZM61.2875 34.9875C60.8875 34.0875 59.9875 33.5 59 33.5C58.0125 33.5 57.1125 34.0875 56.7125 34.9875L48.7125 52.9875C48.15 54.25 48.725 55.725 49.9875 56.2875C51.25 56.85 52.725 56.275 53.2875 55.0125L54.4 52.5H63.6L64.7125 55.0125C65.275 56.275 66.75 56.8375 68.0125 56.2875C69.275 55.7375 69.8375 54.25 69.2875 52.9875L61.2875 34.9875ZM59 42.15L61.375 47.5H56.625L59 42.15ZM95 33.5C96.375 33.5 97.5 34.625 97.5 36V36.5H105C106.375 36.5 107.5 37.625 107.5 39C107.5 40.375 106.375 41.5 105 41.5H104.75L104.55 42.0625C103.438 45.1125 101.75 47.8875 99.6 50.2375C99.7125 50.3125 99.825 50.375 99.9375 50.4375L102.3 51.85C103.487 52.5625 103.862 54.1 103.162 55.275C102.462 56.45 100.912 56.8375 99.7375 56.1375L97.375 54.725C96.8125 54.3875 96.275 54.0375 95.7375 53.6625C94.4125 54.6 93 55.4125 91.4875 56.0875L91.0375 56.2875C89.775 56.85 88.3 56.275 87.7375 55.0125C87.175 53.75 87.75 52.275 89.0125 51.7125L89.4625 51.5125C90.2625 51.15 91.0375 50.75 91.775 50.2875L90.25 48.7625C89.275 47.7875 89.275 46.2 90.25 45.225C91.225 44.25 92.8125 44.25 93.7875 45.225L95.6125 47.05L95.675 47.1125C97.225 45.475 98.4875 43.575 99.4 41.4875L95 41.5H86C84.625 41.5 83.5 40.375 83.5 39C83.5 37.625 84.625 36.5 86 36.5H92.5V36C92.5 34.625 93.625 33.5 95 33.5Z" fill="white"/>
              </svg>
              {/* <svg width="60" height="40" viewBox="0 0 143 95" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M141 45C141 56.5846 134.22 67.2858 122.824 75.1754C111.435 83.0596 95.5939 88 78 88C60.4061 88 44.5647 83.0596 33.1765 75.1754C21.7804 67.2858 15 56.5846 15 45C15 33.4154 21.7804 22.7142 33.1765 14.8246C44.5647 6.94041 60.4061 2 78 2C95.5939 2 111.435 6.94041 122.824 14.8246C134.22 22.7142 141 33.4154 141 45Z" fill="#089CC5" fillOpacity="0.5" stroke="#089CC5" strokeWidth="4"/>
                <path d="M7.9338 86.898L19.0842 62.0503L32.826 75.8473L7.9338 86.898Z" fill="#089CC5"/>
                <path d="M70.8922 30.8897L71.0556 31.231L86.5343 69.1622C86.8159 69.8515 86.8232 70.6223 86.5547 71.3168C86.2863 72.0113 85.7624 72.5768 85.0905 72.8975C84.4185 73.2182 83.6494 73.2697 82.9406 73.0416C82.2319 72.8135 81.6372 72.323 81.2785 71.6706L81.1326 71.3643L77.1047 61.5002H58.7706L54.4247 71.4372C54.1378 72.0919 53.6205 72.6184 52.9714 72.9169C52.3224 73.2153 51.585 73.2648 50.9014 73.056L50.9014 73.056C50.1919 72.8279 49.5972 72.3374 49.2992 71.6849L49.1533 71.3787L49.0756 71.3939L49.1533 71.3787L65.686 31.1668C66.666 28.921 69.7518 28.8481 70.8951 30.8927L70.8922 30.8897Z" fill="white"/>
                <path d="M98.4168 14.8335C99.1312 14.8336 99.8207 15.0959 100.355 15.5706C100.888 16.0453 101.229 16.6994 101.313 17.4089L101.333 17.7502V29.4168H104.25C104.965 29.4169 105.654 29.6792 106.188 30.1539C106.722 30.6286 107.063 31.2828 107.146 31.9922L107.167 32.3335C107.167 33.0479 106.904 33.7374 106.43 34.2712C105.955 34.8051 105.301 35.1462 104.591 35.2297L104.25 35.2502H101.333V55.6668C101.333 56.3812 101.071 57.0707 100.596 57.6046C100.122 58.1384 99.4675 58.4795 98.758 58.5631L98.4168 58.5835C97.7024 58.5834 97.0129 58.3211 96.479 57.8464C95.9452 57.3717 95.6041 56.7176 95.5205 56.0081L95.5001 55.6668V17.7502C95.5001 16.9766 95.8074 16.2347 96.3544 15.6878C96.9014 15.1408 97.6432 14.8335 98.4168 14.8335ZM75.0835 14.8335H89.6668C90.3812 14.8336 91.0707 15.0959 91.6046 15.5706C92.1384 16.0453 92.4795 16.6994 92.5631 17.4089L92.5835 17.7502V26.4272C92.5835 29.5214 91.3543 32.4889 89.1664 34.6768C86.9785 36.8647 84.011 38.0939 80.9168 38.0939C80.1433 38.0939 79.4014 37.7866 78.8544 37.2396C78.3074 36.6927 78.0001 35.9508 78.0001 35.1772C78.0001 34.4037 78.3074 33.6618 78.8544 33.1148C79.4014 32.5679 80.1433 32.2606 80.9168 32.2606C82.3885 32.261 83.806 31.7052 84.8851 30.7045C85.9642 29.7039 86.6252 28.3323 86.7356 26.8647L86.7501 26.4272V20.6668H75.0835C74.3401 20.666 73.625 20.3813 73.0845 19.871C72.5439 19.3607 72.2186 18.6632 72.175 17.9211C72.1315 17.179 72.3729 16.4482 72.8501 15.8782C73.3272 15.3081 74.004 14.9417 74.7422 14.8539L75.0835 14.8335Z" fill="white"/>
              </svg> */}
              <span className="header-text px-2">PolyLingo</span>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="flex">
            <nav className="hidden-mobile">
              <ul className="flex">
                <li><Link to="/" className="link-text px-3 py-2">Home</Link></li>
                <li><Link to="./games" className="link-text px-3 py-2">Games</Link></li>
                <li><Link to="/about" className="link-text px-3 py-2">About</Link></li>
              </ul>
            </nav>
            
            {/* Theme Toggle and Mobile Menu Button */}
            <div className="flex items-center px-4">
              <button 
                onClick={toggleTheme}
                className="p-2 m-2"
                aria-label="Toggle dark mode"
              >
                {theme === 'dark' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="20" height="20">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="20" height="20">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>
              
              {/* Mobile Menu Button */}
              <button
                onClick={toggleMenu}
                className="mobile-menu-button ml-4 p-2"
                aria-label="Toggle menu"
                style={{ height: 45 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="24" height="24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="mobile-menu border-t px-4">
            <Link 
              to="/" 
              className="block py-2 px-3 mb-1"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/games" 
              className="block py-2 px-3 mb-1"
              onClick={() => setIsMenuOpen(false)}
            >
              Games
            </Link>
            <Link 
              to="/profile" 
              className="block py-2 px-3 mb-1"
              onClick={() => setIsMenuOpen(false)}
            >
              Profile
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;