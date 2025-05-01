import React from "react";
import { Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import EN from "../../assets/siteLang/EN.svg";
import AR from "../../assets/siteLang/AR.svg";

const AuthLayout = () => {
  const { i18n } = useTranslation();
  const { changeLanguage } = i18n;
  useEffect(() => {
    const currentLang = i18n.language;
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  const handleLanguageChange = () => {
    const newLang = i18n.language === "en" ? "ar" : "en";
    changeLanguage(newLang);
  };
  return (
    <>
      <header className="bg-white flex container mb-[64px]">
        <button
          onClick={handleLanguageChange}
          className="bg-transparent text-black px-3 py-1 rounded-3xl absolute top-4 left-4 border-1 border-secondary-light cursor-pointer flex items-center gap-2"
        >
          {i18n.language === "en" ? (
            <div className="flag flex items-center gap-2">
              <img src={EN} alt="English Flag" className="w-3 h-3" />
              <p>EN</p>
            </div>
          ) : (
            <div className="flag flex items-center gap-2">
              <img src={AR} alt="Arabic Flag" className="w-3 h-3 " />
              <p>AR</p>
            </div>
          )}
        </button>
      </header>
      <Outlet />
    </>
  );
};

export default AuthLayout;
