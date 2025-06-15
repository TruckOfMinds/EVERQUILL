import "./styles/Sidebar.css";
import { useState } from "react";

export default function Sidebar({ setMenu }) {
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
        <form onSubmit={handleTheme}>
          <label htmlFor="theme">
            <img src="#" alt="Light theme" />
            Light
            <input
              type="radio"
              name="theme"
              id="light"
              defaultChecked={isSetTheme.bind("light")}
              onChange={selectTheme}
            />
          </label>

          <label htmlFor="theme">
            <img src="#" alt="Dark theme" />
            Dark
            <input
              type="radio"
              name="theme"
              id="dark"
              defaultChecked={isSetTheme.bind("dark")}
              onChange={selectTheme}
            />
          </label>

          <label htmlFor="theme">
            <img src="#" alt="Theme from old guestbook" />
            Veteran
            <input
              type="radio"
              name="theme"
              id="veteran"
              defaultChecked={isSetTheme.bind("veteran")}
              onChange={selectTheme}
            />
          </label>

          <button type="submit">Save</button>
        </form>

        <span className="flex items-center justify-between gap-[2rem]">
          <Link to={"/"}>
            <span className="nav-item ">
              <Quill />
              <h3 className="cagliostro">Write</h3>
            </span>
          </Link>

          <Link to={"/entries"}>
            <span className="nav-item">
              <Book />
              <h3 className="cagliostro">View Entries</h3>
            </span>
          </Link>
        </span>
      </aside>
    </>
  );
}
