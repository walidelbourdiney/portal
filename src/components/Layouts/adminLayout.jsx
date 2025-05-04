import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState, useRef, useEffect } from "react";
import useAuthStore from "../../stores/authStore";

// assets
import EN from "../../assets/siteLang/EN.svg";
import AR from "../../assets/siteLang/AR.svg";
import pp from "../../assets/adminPage/pp.svg";
import arrowDown from "../../assets/adminPage/arrowDown.svg";
import logo from "../../assets/logIn/LOGO.png";
import line from "../../assets/adminPage/Line 256.svg";
const AdminLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const { changeLanguage, t } = i18n;
  useEffect(() => {
    const currentLang = i18n.language;
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  const handleLanguageChange = () => {
    const newLang = i18n.language === "en" ? "ar" : "en";
    changeLanguage(newLang);
  };

  const dropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [dropdownRef]);

  const { logout } = useAuthStore();

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-white flex container mb-[24px] mx-auto py-4 px-6 justify-between items-center shadow-md">
        <div className="left flex items-center gap-4 justify-between">
          <div className="relative text-right" ref={dropdownRef}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-4  text-gray-800 hover:text-black focus:outline-none"
            >
              <img src={arrowDown} className="w-3 h-3" alt="Arrow Down" />
              <div className="flex justify-center items-center gap-2">
                <div className="text-end">
                  <div className="font-semibold">عمرالله يوسف</div>
                  <div className="text-xs text-secondary">مدير النظام</div>
                </div>
                <img
                  src={pp}
                  alt="Profile Picture"
                  className="w-8 h-8 rounded-full bg-[#f4eff6]"
                />
              </div>
            </button>

            {isOpen && (
              <ul className="absolute z-50 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg text-sm overflow-hidden">
                <li>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      logout();
                      navigate("/");
                    }}
                    className="w-full text-right px-4 py-2 text-red-600 hover:bg-red-50"
                  >
                    {t("buttons.logout")}
                  </button>
                </li>
              </ul>
            )}
          </div>
          <img src={line} className="w-10 h-6" alt="dividor" />
          <button
            onClick={handleLanguageChange}
            className="bg-transparent text-black px-3 py-1 cursor-pointer flex items-center gap-2 w-[45px] h-[20px]"
          >
            {i18n.language === "en" ? (
              <div className="flag flex items-center gap-2">
                <img src={EN} alt="English Flag" className="w-6 h-6" />
                <p className="font-bold text-xl">EN</p>
              </div>
            ) : (
              <div className="flag flex items-center gap-2">
                <img src={AR} alt="Arabic Flag" className="w-6 h-6" />
                <p className="font-bold text-xl">AR</p>
              </div>
            )}
          </button>
        </div>
        <div className="right">
          <img src={logo} alt="the site logo" className="w-10 h-10" />
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
