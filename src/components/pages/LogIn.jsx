import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { Input } from "../ui/input";
import axiosInstance from "../../lib/axiosInstance";
import useAuthStore from "../../stores/authStore";

import logo from "../../assets/logIn/logo.png";
import envelope from "../../assets/logIn/envelope.svg";
import lock from "../../assets/logIn/lock.svg";
import signUp from "../../assets/logIn/houseChimneyMedical.svg";
import { routingPaths } from "../../App";

const LogIn = () => {
  const { t } = useTranslation();
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const validationSchema = () => {
    return Yup.object({
      email: Yup.string()
        .email(t("validation.email.invalid"))
        .required(t("validation.email.required")),
      password: Yup.string().required(t("validation.password.required")),
    });
  };

  const loginMutation = useMutation({
    mutationFn: async (values) => {
      const res = await axiosInstance.post("/login", {
        ...values,
        user_type: "admin",
      });
      return res.data;
    },
    onSuccess: (data) => {
      console.log("Login successful:", data);

      localStorage.setItem("token", data.data.token);

      login(data.data);
      navigate(routingPaths.home);
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      loginMutation.mutate(values);
    },
  });

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
        onSubmit={formik.handleSubmit}
        className="flex flex-col items-center gap-4 w-full max-w-xs mx-auto"
      >
        <div className="w-full  space-y-1">
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
              name="email"
              placeholder={t("logIn.email")}
              className="px-10"
              {...formik.getFieldProps("email")}
              // error={formik.touched.email ? formik.errors.email : ""}
            />
          </div>
          {formik.touched.email && formik.errors.email && (
            <p className="text-sm text-destructive">{formik.errors.email}</p>
          )}
        </div>

        <div className="w-full  space-y-1">
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
              name="password"
              placeholder={t("logIn.password")}
              className="px-10"
              {...formik.getFieldProps("password")}
              // error={formik.touched.password ? formik.errors.password : ""}
            />
          </div>
          {formik.touched.password && formik.errors.password && (
            <p className="text-sm text-destructive">{formik.errors.password}</p>
          )}
        </div>

        <div className="w-full text-left">
          <a href="#" className="text-primary text-sm hover:underline">
            {t("logIn.forget")}
          </a>
        </div>

        <button
          type="submit"
          disabled={loginMutation.isPending}
          className="w-full py-2 rounded-lg text-white bg-primary hover:bg-primary/90 transition-colors disabled:opacity-60"
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
