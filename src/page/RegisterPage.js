import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { LocaleConsumer } from "../contexts/LocaleContext";
import useInput from "../customHooks/useInput";
import { register } from "../utils/api";

function RegisterPage() {
  const [name, onNameUserChange] = useInput("");
  const [email, onEmailUserChange] = useInput("");
  const [password, onPasswordUserChange] = useInput("");
  const navigate = useNavigate();

  async function onSubmitUserHandler(event) {
    event.preventDefault();

    const { error } = await register({
      name: name,
      email: email,
      password: password,
    });
    if (!error) {
      navigate("/");
    }
  }

  return (
    <LocaleConsumer>
      {({ locale }) => {
        return (
          <section className="register_page">
            <h2>{locale === "id" ? "Buat Akun" : "Create Account"}</h2>
            <div className="register_input">
              <div className="input-block">
                <label htmlFor="name">
                  {locale === "id" ? "Nama" : "Name"}
                </label>
                <input
                  type="text"
                  placeholder={
                    locale === "id" ? "Masukan Nama Anda" : "Input Your Name"
                  }
                  value={name}
                  onChange={onNameUserChange}
                />
              </div>
              <div className="input-block">
                <label htmlFor="email">
                  {locale === "id" ? "Email" : "Email"}
                </label>
                <input
                  type="text"
                  placeholder={
                    locale === "id" ? "Masukan Email" : "Input Email"
                  }
                  value={email}
                  onChange={onEmailUserChange}
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
                  onChange={onPasswordUserChange}
                />
              </div>
              <button type="button" onClick={onSubmitUserHandler}>
                {locale === "id" ? "Daftar" : "Register"}
              </button>
            </div>
            <p>
              {locale === "id" ? "Kembali ke" : "Back to"}{" "}
              <Link to="/" className="toLink">
                {locale === "id" ? "Masuk" : "Login"}
              </Link>
            </p>
          </section>
        );
      }}
    </LocaleConsumer>
  );
}

export default RegisterPage;
