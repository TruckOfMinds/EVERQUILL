import { useEffect, useState } from "react";
import "./styles/View.css";
import Message from "../components/Message";

export default function View() {
  const SERVER = import.meta.env.VITE_SERVER;

  const [msgs, setMsgs] = useState([]);
  const [tagStyle, setTagStyle] = useState([]);

  useEffect(() => {
    const pollForMessages = setInterval(async () => {
      try {
        await fetch(`${SERVER}/messages`)
          .then((response) => response.json())
          .then((json) => setMsgs(json));
      } catch (err) {
        throw new Error(`Failed to get Messages [Error — ${err}]`);
      }
      try {
        await fetch(`${SERVER}/tags`)
          .then((response) => response.json())
          .then((json) => setTagStyle(json));
      } catch (err) {
        throw new Error(`Failed to get Tags [Error — ${err}]`);
      }
    }, 500);
    return () => clearInterval(pollForMessages);
  }, [setTagStyle, SERVER]);

  return (
    <main className="pt-[3rem] pb-[2rem] flex flex-col items-center h-3/4 gap-4">
      <h1 className="cagliostro text-[2rem] pb-[2rem]">
        View our Previous Guests!
      </h1>
      {msgs.map((m) => (
        <Message
          key={m.id}
          name={m.name}
          tag={m.tag}
          msg={m.msg}
          date={m.date}
          colour={() => {
            let clr;
            tagStyle.forEach((t) => {
              if (m.tag === t.tag_name) {
                clr = t.colour;
                return clr;
              }
            });
            return clr;
          }}
        />
      ))}
    </main>
  );
}
