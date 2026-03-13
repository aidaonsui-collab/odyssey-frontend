import { useLocation } from "react-router-dom";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import { navigation } from "../constants";
import Button from "./Button";
import MenuSvg from "../assets/MenuSvg";
import { useState } from "react";
import AuthButton from "./AuthButton";

const Header = () => {
  const pathname = useLocation();
  const [openNavigation, setOpenNavigation] = useState(false);

  const toggleNavigation = () => {
    if (openNavigation) {
      setOpenNavigation(false);
      enablePageScroll();
    } else {
      setOpenNavigation(true);
      disablePageScroll();
    }
  };

  const handleClick = () => {
    if (!openNavigation) return;
    enablePageScroll();
    setOpenNavigation(false);
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50 border-b border-[#1f1f2e] bg-[#0a0a12]/95 backdrop-blur-xl">
      <style>{`
        .suiet-wallet-connect-button > button > div > svg:last-child,
        [class*="notification"],
        [data-icon*="bell"],
        .suiet-icon-bell { display: none !important; }
      `}</style>
      
      <div className="flex w-full items-center justify-between px-4 lg:px-8 py-3">
        {/* Logo */}
        <a className="flex items-center gap-3" href="#hero">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="text-lg font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent hidden sm:block">
            The Odyssey
          </span>
        </a>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navigation.map((item) => (
            <a
              key={item.id}
              href={item.url}
              onClick={handleClick}
              className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-all"
            >
              {item.title}
            </a>
          ))}
        </nav>

        {/* Right side buttons */}
        <div className="flex items-center gap-3">
          <a
            href="/create-coin"
            className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-purple-500/25"
          >
            <span>🚀</span>
            Launch
          </a>
          <AuthButton />
        </div>

        {/* Mobile menu button */}
        <Button className="lg:hidden" px="px-3" onClick={toggleNavigation}>
          <MenuSvg openNavigation={openNavigation} />
        </Button>
      </div>
    </div>
  );
};

export default Header;