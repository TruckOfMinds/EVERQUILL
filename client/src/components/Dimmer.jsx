import { useEffect, useState } from "react";
import "./styles/Dimmer.css";

export default function Dimmer({ setMenu }) {
  const [dimmerClicked, setDimmerClicked] = useState(false);

  // Turns off menu ergo itself too
  // Runs when dimmerClicked gets updated onClick
  useEffect(() => {
    if (dimmerClicked) {
      setMenu(false);
    }
  }, [dimmerClicked, setMenu]);

  return <div className="dimmer" onClick={() => setDimmerClicked(true)}></div>;
}
