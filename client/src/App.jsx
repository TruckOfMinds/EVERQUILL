import { Route, Routes } from "react-router";
import { useState, useEffect } from "react";
import "./App.css";
import Write from "./pages/Write";
import Nav from "./components/Nav";
import MediaQuery from "react-responsive";
import Modal from "./components/Modal";
import Sidebar from "./components/Sidebar";
import View from "./pages/View";

export default function App() {
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem("theme") || "light";
    document.querySelector(":root").setAttribute("data-theme", theme);
  }, []);

  return (
    <>
      <MediaQuery maxWidth={950}>
        {menu ? <Sidebar setMenu={setMenu} /> : <></>}
      </MediaQuery>
      <MediaQuery minWidth={950}>
        {menu ? <Modal setMenu={setMenu} /> : <></>}
      </MediaQuery>

      <Nav menu={menu} setMenu={setMenu} />
      <Routes>
        <Route path={"/"} element={<Write />} />
        <Route path={"/entries"} element={<View />} />
      </Routes>
      {/* <footer></footer> */}
    </>
  );
}
