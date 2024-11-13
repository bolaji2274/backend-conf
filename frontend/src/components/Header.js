import React, { useEffect, useState } from "react";

const Header = () => {
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

//   set toggle menu option 
const toggleMenu = () => {
    setIsMenuOpened(!isMenuOpened);
}
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.addEventListener("scroll", handleScroll);
    };
  });

//   navItems Array 
  const navItems = [
      { link : "Home", path : "home" },
      { link : "About", path : "about" },
      { link : "Products", path : "product" },
      { link : "Contact", path : "contact" },
      { link : "Services", path : "services" },
      { link : "Home", path : "home" },
  ]
  return 
    <header className="w-full bg-white md:bg-transparent fixed top-0 left-0 right-0">
        <nav>
            <div>
            <a href="" className="text-2xl font-semibold flex items-center space-x-3"> <img src="" alt="logo" className="w-10 inline-block items-center"/> <span> NASFARM </span></a>
            </div>
        </nav>
      <nav className={isSticky ? "sticky" : ""}>
          <div className="container">
              <div className="logo">
                  <h1>Logo</h1>
              </div>
              <div className="menu-icon" onClick={toggleMenu}>
                  <span></span>
                  <span></span>
                  <span></span>
              </div>
              <ul className={isMenuOpened ? "active" : ""}>
                  {navItems.map((item, index) => (
                      <li key={index}>
                          <a href={`#${item.path}`}>{item.link}</a>
                      </li>
                  ))}
              </ul>
          </div>
      </nav>
  </header>;
};

export default Header;
