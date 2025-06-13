import { Route, Routes } from "react-router";
import "./App.css";
import Write from "./pages/Write";
import Nav from "./components/Nav";
export default function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path={"/"} element={<Write />} />
      </Routes>
      <footer></footer>
    </>
  );
}
