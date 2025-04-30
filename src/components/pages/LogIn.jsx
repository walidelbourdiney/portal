import React from "react";
import { useTranslation } from "react-i18next";
import { Input } from "../ui/input";
import logo from "../../assets/logIn/LOGO.png";
import envelope from "../../assets/logIn/envelope.svg";
import lock from "../../assets/logIn/lock.svg";
import signUp from "../../assets/logIn/house-chimney-medical.svg";

const LogIn = () => {
  const { t } = useTranslation();

  return (
    <main className="w-full px-4">
      <header className="text-center my-12 w-full flex justify-center items-center gap-4">
        <img src={logo} alt="logo" width={50} />
        <h1 className="text-3xl font-bold text-primary">{t("welcome")}</h1>
      </header>

      <section className="text-center mb-6">
        <h2 className="text-3xl font-semibold text-foreground">
          {t("logIn.title")}
        </h2>
      </section>

      <form
        action="#"
        className="flex flex-col items-center gap-4 w-full max-w-xs mx-auto"
      >
        {/* Email Input with Icon */}
        <div className="w-full">
          <label htmlFor="email" className="block mb-1 text-foreground">
            {t("logIn.email")}
          </label>
          <div className="relative">
            <img
              src={envelope}
              alt="envelope icon"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 opacity-60 ltr:left-3 rtl:right-3"
            />
            <Input
              id="email"
              type="email"
              placeholder={t("logIn.email")}
              className="px-10"
            />
          </div>
        </div>

        {/* Password Input with Icon */}
        <div className="w-full">
          <label htmlFor="password" className="block mb-1 text-foreground">
            {t("logIn.password")}
          </label>
          <div className="relative">
            <img
              src={lock}
              alt="lock icon"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 opacity-60 ltr:left-3 rtl:right-3"
            />
            <Input
              id="password"
              type="password"
              placeholder={t("logIn.password")}
              className="px-10"
            />
          </div>
        </div>

        <div className="w-full text-left">
          <a href="#" className="text-primary text-sm hover:underline">
            {t("logIn.forget")}
          </a>
        </div>

        <button
          type="submit"
          className="w-full py-2 rounded-lg text-white bg-primary hover:bg-primary/90 transition-colors"
        >
          {t("buttons.signIn")}
        </button>

        <button
          type="button"
          className="w-full py-2 rounded-lg border border-primary text-primary bg-white hover:bg-primary/5 transition-colors mb-[137px] flex items-center justify-center gap-2"
        >
          {t("buttons.signUp")}
          <img src={signUp} alt="sign up logo" />
        </button>
      </form>

      <footer className="mt-8">
        <ul className="flex justify-center items-center gap-2 flex-row-reverse rtl:space-x-reverse space-x-2 text-sm text-secondary">
          <li>
            <a href="#" className="hover:underline">
              {t("footer.contact")}
            </a>
          </li>
          <li aria-hidden className="text-border">
            •
          </li>
          <li>
            <a href="#" className="hover:underline">
              {t("footer.terms")}
            </a>
          </li>
          <li aria-hidden className="text-border">
            •
          </li>
          <li>
            <a href="#" className="hover:underline">
              {t("footer.privacy")}
            </a>
          </li>
        </ul>
      </footer>
    </main>
  );
};

export default LogIn;
