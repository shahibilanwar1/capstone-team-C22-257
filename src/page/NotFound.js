import React from "react";
import { LocaleConsumer } from "../contexts/LocaleContext";

const NotFound = () => {
  return (
    <LocaleConsumer>
      {({ locale }) => {
        return (
          <div>
            <p className="note-found-page">
              {locale === "id" ? "Halaman Tidak Ditemukan" : "Page Not Found"}
            </p>
          </div>
        );
      }}
    </LocaleConsumer>
  );
};

export default NotFound;
