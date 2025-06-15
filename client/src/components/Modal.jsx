import "./styles/Modal.css";
import Dimmer from "./Dimmer";
import { useState } from "react";

export default function Modal({ setMenu }) {
  const [themeVals, setThemeVals] = useState({
    light: false,
    dark: false,
    veteran: false,
  });

  /**
   * @function handleTheme
   * @param {object} e The form.
   * @description matches selected value to a name,
   *  that gets set to the data-theme attribute as well as local storage,
   *  deactivates the modal.
   */
  function handleTheme(e) {
    e.preventDefault();

    let selected;
    switch (true) {
      case themeVals.light:
        selected = "light";
        break;
      case themeVals.dark:
        selected = "dark";
        break;
      case themeVals.veteran:
        selected = "veteran";
        break;
    }

    document.querySelector(":root").setAttribute("data-theme", selected);
    localStorage.setItem("theme", selected);
    console.log("achieved", selected);

    setMenu(false);
  }

  /**
   * @function isSetTheme
   * @param {string} theme the id (ergo the name) of the input.
   * @returns {boolean} y/n for if it is the current theme.
   */
  function isSetTheme(theme) {
    const setTheme = localStorage.getItem("theme");

    return theme === setTheme ? true : false;
  }

  /**
   *
   * @function selectTheme
   * @param {object} e Input Changed
   * @description onChange handler for radio buttons, updates values,
   *  no spread operator because we want the other options to default back to false when deselected.
   */
  function selectTheme(e) {
    setThemeVals({ [e.target.id]: e.target.checked });
  }

  return (
    <>
      <Dimmer setMenu={setMenu} />
      <aside className="modal">
        <form onSubmit={handleTheme} className="theme-form h-full">
          <label
            htmlFor="theme"
            className="theme-opt flex flex-col items-center justify-between cagliostro text-[1.5rem]"
          >
            <img
              src="/light.png"
              alt="Light theme"
              className="theme-img rounded-md h-[40%]"
            />
            Light
            <input
              className="radio-button"
              type="radio"
              name="theme"
              id="light"
              defaultChecked={isSetTheme.bind("light")}
              onChange={selectTheme}
            />
          </label>

          <label
            htmlFor="theme"
            className="theme-opt flex flex-col items-center justify-between cagliostro text-[1.5rem]"
          >
            <img
              src="/dark.png"
              alt="Dark theme"
              className="theme-img rounded-md h-[40%]"
            />
            Dark
            <input
              className="radio-button"
              type="radio"
              name="theme"
              id="dark"
              defaultChecked={isSetTheme.bind("dark")}
              onChange={selectTheme}
            />
          </label>

          <label
            htmlFor="theme"
            className="theme-opt flex flex-col items-center justify-between cagliostro text-[1.5rem]"
          >
            <img
              src="/veteran.png"
              alt="Theme from old guestbook"
              className="theme-img rounded-md h-[40%]"
            />
            Veteran
            <input
              className="radio-button"
              type="radio"
              name="theme"
              id="veteran"
              defaultChecked={isSetTheme.bind("veteran")}
              onChange={selectTheme}
            />
          </label>

          <button type="submit" className="save-theme cagliostro rounded-full">
            Save
          </button>
        </form>
      </aside>
    </>
  );
}
