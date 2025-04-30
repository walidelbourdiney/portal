import React from "react";
import { useTranslation } from "react-i18next";
import { Input } from "../ui/input";

const LogIn = () => {
  const { t } = useTranslation();

  return (
    <main className="w-full px-4">
      <header className="text-center my-12">
        <h1 className="text-3xl font-bold text-primary">RAFAD LOGO</h1>
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
        <div className="w-full">
          <label htmlFor="email" className="block mb-1 text-foreground">
            {t("logIn.email")}
          </label>
          <Input id="email" type="email" placeholder={t("logIn.email")} />
        </div>

        <div className="w-full">
          <label htmlFor="password" className="block mb-1 text-foreground">
            {t("logIn.password")}
          </label>
          <Input
            id="password"
            type="password"
            placeholder={t("logIn.password")}
          />
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
          className="w-full py-2 rounded-lg border border-primary text-primary bg-white hover:bg-primary/5 transition-colors mb-[137px]"
        >
          {t("buttons.signUp")}
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
