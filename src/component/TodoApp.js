import React, { useEffect, useMemo, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Navigation from "./Navigation";
import HomePage from "../page/HomePage";
import AddPage from "../page/AddPage";
import NotFound from "../page/NotFound";
import RegisterPage from "../page/RegisterPage";
import LoginPage from "../page/LoginPage";
import {
  getActiveNotes,
  getUserLogged,
  putAccessToken,
} from "../utils/api";
import { ThemeProvider } from "../contexts/ThemeContext";
import { LocaleProvider } from "../contexts/LocaleContext";
import { DataProvider } from "../contexts/DataContext";

function NoteApp() {
  const [authedUser, setAuthedUser] = useState(null);
  const [allNotes, setAllNotes] = useState([]);
  const [initializing, setInitializing] = useState(true);
  const navigate = useNavigate();

  const dataContext = useMemo(() => {
    return {
      notes: allNotes,
      setNotes: setAllNotes,
    };
  }, [allNotes]);

  const [locale, setLocaleNote] = useState(
    localStorage.getItem("localeNote") || "id"
  );

  const toggleLocale = () => {
    setLocaleNote((prevLocale) => {
      const changeLocale = prevLocale === "id" ? "en" : "id";
      localStorage.setItem("localeNote", changeLocale);
      return changeLocale;
    });
  };

  const localeNoteContext = useMemo(() => {
    return {
      locale,
      toggleLocale,
    };
  }, [locale]);

  const [themeNote, setThemeNote] = useState(
    localStorage.getItem("themeNote") || "light"
  );

  const toggleTheme = () => {
    setThemeNote((prevTheme) => {
      const changeTheme = prevTheme === "light" ? "dark" : "light";
      localStorage.setItem("themeNote", changeTheme);
      return changeTheme;
    });
  };

  const themeNoteContext = useMemo(() => {
    return {
      themeNote,
      toggleTheme,
    };
  }, [themeNote]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", themeNote);
  }, [themeNote]);

  useEffect(() => {
    getUserLogged().then(({ data }) => {
      setAuthedUser(data);
      setFullNote();
      setInitializing(false);
    });
  }, []);

  function setFullNote() {
    getActiveNotes().then(({ data }) => {
      setAllNotes(data);
    });
  }

  async function onLoginSuccess({ accessToken }) {
    putAccessToken(accessToken);

    const { data } = await getUserLogged();
    setAuthedUser(data);
    navigate("/");
  }

  function onLogout() {
    setAuthedUser(null);
    navigate("/");
    putAccessToken("");
  }

  if (initializing) {
    return null;
  }

  if (authedUser === null) {
    return (
      <LocaleProvider value={localeNoteContext}>
        <ThemeProvider value={themeNoteContext}>
          <div className="note-app">
            <header className="note-app_header">
              <h1>
                {localeNoteContext.locale === "id" ? "Aplikasi Todo List" : "Todo List Apps"}
              </h1>
              <Navigation logout={onLogout} name={""} />
            </header>
            <main>
              <Routes>
                <Route
                  path="/*"
                  element={<LoginPage loginSuccess={onLoginSuccess} />}
                />
                <Route path="/register" element={<RegisterPage />} />
              </Routes>
            </main>
          </div>
        </ThemeProvider>
      </LocaleProvider>
    );
  }

  return (
    <DataProvider value={dataContext}>
      <LocaleProvider value={localeNoteContext}>
        <ThemeProvider value={themeNoteContext}>
          <div className="note-app">
            <header className="note-app_header">
              <h1>{locale === "id" ? "Aplikasi Todo List" : "Todo List Apps"}</h1>
              <Navigation logout={onLogout} name={authedUser.name} />
            </header>
            <main>
              <Routes>
                <Route path="*" element={<NotFound />} />
                <Route path="/" element={<HomePage />} />
                <Route path="/add" element={<AddPage />} />
              </Routes>
            </main>
          </div>
        </ThemeProvider>
      </LocaleProvider>
    </DataProvider>
  );
}

export default NoteApp;
