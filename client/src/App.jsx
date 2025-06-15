import { Route, Routes } from "react-router";
import "./App.css";
import Write from "./pages/Write";
import Nav from "./components/Nav";
import { useState } from "react";

export default function App() {
  const [menu, setMenu] = useState(false);

  return (
    <>
      <Nav menu={menu} set={setMenu} />
      {menu ? <Menu set={setMenu} /> : <></>}
      <Routes>
        <Route path={"/"} element={<Write />} />
      </Routes>
      {/* <footer></footer> */}
    </>
  );
}
