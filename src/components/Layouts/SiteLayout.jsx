import React from "react";
import { Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

const SiteLayout = () => {
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
      <header className="bg-white flex container ">
        <button onClick={handleLanguageChange}>
          {i18n.language === "en" ? "AR" : "EN"}
        </button>
      </header>
      <Outlet />
    </>
  );
};

export default SiteLayout;
