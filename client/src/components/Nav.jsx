import { Link } from "react-router";
import Book from "./Book";
import Quill from "./Quill";
import "./styles/Nav.css";

export default function Nav() {
  return (
    <nav className="nav flex items-center justify-between">
      <img src="/LogoAlt.svg" alt="EverQuill Logo" className="baumans" />
      <span>
        <span>
          <Quill />
          <Link to={"/"}>Write</Link>
        </span>
        <span>
          <Book />
          <Link to={"/entries"}>View Entries</Link>
        </span>
      </span>
      <div>Change Theme</div>
    </nav>
  );
}
