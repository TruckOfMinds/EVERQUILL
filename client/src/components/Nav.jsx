import { Link } from "react-router";
import "./styles/Nav.css";
import Book from "./Book";
import Quill from "./Quill";
import LogoPlain from "./LogoPlain";
import Drop from "./Drop";

export default function Nav() {
  return (
    <nav className="nav grid gap-[1rem]">
      <Link to={"/"}>
        <span className="flex items-center justify-between gap-[1rem]">
          <LogoPlain />
          <h1 className="text-inherit cagliostro text-[1.5rem]">EverQuill</h1>
        </span>
      </Link>

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

      <span className="nav-item theme rounded-full">
        <Drop />
        <h3 className="cagliostro text-[1rem]">Change Theme</h3>
      </span>
    </nav>
  );
}
