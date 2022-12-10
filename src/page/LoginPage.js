import React from "react";
import PropTypes from "prop-types";
import { login } from "../utils/api";
import { Link } from "react-router-dom";
import useInput from "../customHooks/useInput";
import { LocaleConsumer } from "../contexts/LocaleContext";

function LoginPage({ loginSuccess }) {
  const [email, onUserEmailHandler] = useInput("");
  const [password, onUserPasswordHandler] = useInput("");

  async function onLogin(event) {
    event.preventDefault();

    const { error, data } = await login({ email, password });
    if (!error) {
      loginSuccess(data);
    }
  }

  return (
    <LocaleConsumer>
      {({ locale }) => {
        return (
          <section className="login_page">
            <h2>{locale === "id" ? "Masuk ke Akun" : "Login to Account"}</h2>
            <div className="login_input">
              <div className="input-block">
                <label htmlFor="email">
                  {locale === "id" ? "Email" : "Email"}
                </label>
                <input
                  type="email"
                  placeholder={
                    locale === "id" ? "Masukan Email" : "Input Email"
                  }
                  value={email}
                  onChange={onUserEmailHandler}
                />
              </div>
              <div className="input-block">
                <label htmlFor="password">
                  {locale === "id" ? "Kata Sandi" : "Password"}
                </label>
                <input
                  type="password"
                  placeholder={
                    locale === "id" ? "Masukan Kata Sandi" : "Input Password"
                  }
                  value={password}
                  onChange={onUserPasswordHandler}
                />
              </div>
              <button type="button" onClick={onLogin}>
                {locale === "id" ? "Masuk" : "Login"}
              </button>
            </div>
            <p>
              {locale === "id" ? "Belum Punya Akun?" : "Don't Have Account?"}{" "}
              <Link to="register" className="toLink">
                {locale === "id" ? "Daftar Disini" : "Sign Up"}
              </Link>
            </p>
          </section>
        );
      }}
    </LocaleConsumer>
  );
}

LoginPage.propTypes = {
  loginSuccess: PropTypes.func.isRequired,
};

export default LoginPage;
