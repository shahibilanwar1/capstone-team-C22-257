import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FiHome, FiPlusCircle, FiLogOut } from "react-icons/fi";
import { FaMoon, FaSun } from "react-icons/fa";
import { BsTranslate } from "react-icons/bs";
import ThemeContext from "../contexts/ThemeContext";
import LocaleContext from "../contexts/LocaleContext";

function Navigation({ logout, name }) {
  const { themeNote, toggleTheme } = useContext(ThemeContext);
  const { toggleLocale } = useContext(LocaleContext);

  return name ? (
    <nav className="navigation">
      <ul>
        <li><Link to="/"><FiHome /></Link></li>
        <li><Link to="/add"><FiPlusCircle /></Link></li>
        <li>
          <button onClick={toggleLocale}><BsTranslate /></button>
        </li>
        <li>
          <button onClick={toggleTheme}>
            {themeNote === "light" ? <FaMoon /> : <FaSun />}
          </button>
        </li>
        <li>
          <button onClick={logout}>
            {name}
            <FiLogOut />
          </button>
        </li>
      </ul>
    </nav>
  ) : (
    <nav className="navigation">
      <ul>
        <li>
          <button onClick={toggleLocale}>
            <BsTranslate />
          </button>
        </li>
        <li>
          <button onClick={toggleTheme}>
            {themeNote === "light" ? <FaMoon /> : <FaSun />}
          </button>
        </li>
      </ul>
    </nav>
  );
}

Navigation.propTypes = {
  logout: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

export default Navigation;
