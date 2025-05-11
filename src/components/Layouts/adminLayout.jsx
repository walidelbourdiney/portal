import React from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState, useRef, useEffect } from "react";
import useAuthStore from "../../stores/authStore";
import SearchBar from "../Search/SearchBar";

// assets
import EN from "../../assets/siteLang/EN.svg";
import AR from "../../assets/siteLang/AR.svg";
import pp from "../../assets/adminPage/pp.svg";
import arrowDown from "../../assets/adminPage/arrowDown.svg";
import logo from "../../assets/logIn/LOGO.png";
import line from "../../assets/adminPage/Line 256.svg";
import star from "../../assets/adminPage/star.png";
import clients from "../../assets/adminPage/clients.svg";
import settings from "../../assets/adminPage/settings.svg";
import home from "../../assets/adminPage/home.svg";
import hand from "../../assets/adminPage/hand-holding-heart.svg";
import users from "../../assets/adminPage/users.svg";
import burger from "../../assets/adminPage/burger.svg";

const AdminLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const { changeLanguage, t } = i18n;
  const lang = i18n.language;

  const { logout } = useAuthStore();

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const handleLanguageChange = () => {
    const newLang = lang === "en" ? "ar" : "en";
    changeLanguage(newLang);
  };

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
  }, []);

  return (
    <>
      {/* Header */}
      <header className="bg-white flex w-full mb-[24px]  py-4 px-6 justify-between items-center  z-100000 sticky transition-all duration-300 ease-in-out">
        <div className="left flex items-center gap-4 justify-start w-1/3">
          <div className="relative text-right min-w-36" ref={dropdownRef}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-4 text-gray-800 hover:text-black focus:outline-none"
            >
              <img src={arrowDown} className="w-3 h-3" alt="Arrow Down" />
              <div className="flex justify-center items-center gap-2">
                <div className="text-end">
                  <div className="font-semibold text-xs">عمرالله يوسف</div>
                  <div className="text-xs text-secondary">مدير النظام</div>
                </div>
                <img
                  src={pp}
                  alt="Profile"
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
          <img src={line} className="w-10 h-6" alt="Divider" />
          <button
            onClick={handleLanguageChange}
            className="bg-transparent text-black px-3 py-1 cursor-pointer flex items-center gap-2 w-[45px] h-[20px]"
          >
            {lang === "en" ? (
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
        <div className="center flex-1 mx-4">
          <SearchBar />
        </div>
        <div className="right flex items-center gap-4 justify-center">
          <img src={logo} alt="Site Logo" className="w-10 h-10" />
          <div className="burger">
            <img
              src={burger}
              alt="Burger"
              className="w-6 h-6 cursor-pointer md:hidden"
              onClick={() => {
                const aside = document.querySelector("aside");
                if (aside) {
                  aside.classList.toggle("hidden");
                }
              }}
            />
          </div>
        </div>
      </header>

      {/*  Main content */}

      <main
        className={`flex flex-col flex-1 h-screen ${
          lang === "ar" ? "md:ml-28" : "md:mr-28"
        }`}
      >
        <aside
          className={`hidden md:flex bg-white flex-col fixed top-0 bottom-0 ${
            lang === "ar" ? "left-0" : "right-0"
          } w-[88px] bg-transparent shadow-lg  mt-14 z-2`}
        >
          <nav className="flex  pb-98 pt-5 flex-col gap-4 mt-6 text-right">
            <button className="flex flex-col justify-center  items-center gap-2   hover:bg-gray-100 text-secondary-dark ">
              <img src={home} className="w-6 h-6" alt="Home" />
              <p className="text-xs">{t("sidebar.main")}</p>
            </button>
            <button className="flex flex-col justify-center  items-center gap-2 px-4 py-2  hover:bg-gray-100 text-secondary-dark ">
              <img src={clients} className="w-6 h-6" alt="Clients" />
              <p className="text-xs">{t("sidebar.clients")}</p>
            </button>
            <button className="flex flex-col justify-center  items-center gap-2 px-4 py-2  hover:bg-gray-100 text-secondary-dark ">
              <img src={star} className="w-6 h-6" alt="star" />
              <p className="text-xs">{t("sidebar.ratings")}</p>
            </button>
            <button className="flex flex-col justify-center  items-center gap-2 px-4 py-2  hover:bg-gray-100 text-secondary-dark ">
              <img src={hand} className="w-6 h-6" alt="hand" />
              <p className="text-xs">{t("sidebar.ourParteners")}</p>
            </button>
            <button className="flex flex-col justify-center  items-center gap-2 px-4 py-2  hover:bg-gray-100 text-secondary-dark ">
              <img src={users} className="w-6 h-6" alt="users" />
              <p className="text-xs">{t("sidebar.Operations")}</p>
            </button>
            <div className="buttom  absolute bottom-6 left-0 right-0 flex justify-center items-center gap-2">
              <button className=" flex flex-col justify-center  items-center gap-2 px-4 py-2  hover:bg-gray-100 text-secondary-dark ">
                <img src={settings} className="w-6 h-6" alt="settings" />
                <p className="text-xs">{t("sidebar.settings")}</p>
              </button>
            </div>
          </nav>
        </aside>

        <Outlet />
      </main>
    </>
  );
};

export default AdminLayout;
