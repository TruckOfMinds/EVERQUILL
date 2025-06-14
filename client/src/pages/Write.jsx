import { useEffect, useState } from "react";
import "./styles/Write.css";

export default function Write() {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const pollForTags = setInterval(async () => {
      const response = await fetch("http://localhost:8080/tags");
      setTags(response);
    }, 1000);
    clearInterval(pollForTags);
  }, []);

  function getDate() {
    const timestamp = new Date();
    const day =
      timestamp.getDate() < 10
        ? `0${timestamp.getDate()}`
        : timestamp.getDate();
    const month =
      timestamp.getMonth() + 1 < 10
        ? `0${timestamp.getMonth() + 1}`
        : timestamp.getMonth() + 1;
    const year = timestamp.getFullYear();

    return `${day}/${month}/${year}`;
  }

  return (
    <main className="pt-[3rem] pb-[2rem] flex flex-col items-center justify-start h-3/4">
      <h1 className=" cagliostro text-[2rem] pb-[2rem]">
        Write a Message and be Remembered Forever!
      </h1>

      <form className="form p-[2rem] min-w-fit w-3/4 h-full">
        <label htmlFor="name" className="cagliostro name label">
          Name:
          <input
            type="text"
            name="name"
            id="name"
            className="baumans input"
            required
            aria-required
          />
        </label>

        <label htmlFor="tag" className="cagliostro tag label">
          Category:
          <select
            name="tag"
            id="tag"
            defaultValue={"def"}
            className="baumans input"
          >
            <option value="def" className="baumans" hidden aria-hidden></option>

            {tags.map((t) => (
              <option key={t.id} value={t.tag_name} className="baumans">
                {t.tag_name}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="msg" className="cagliostro msg label">
          Your Message:
          <textarea
            type="text"
            name="msg"
            id="msg"
            className="baumans input"
            required
            aria-required
          ></textarea>
        </label>

        <label htmlFor="date" className="cagliostro date label">
          Date:
          <input
            type="text"
            name="date"
            id="date"
            value={getDate()}
            className="baumans input"
            readOnly
            aria-readonly
          />
        </label>

        <button type="submit" className="cagliostro submit">
          Write
        </button>
      </form>
    </main>
  );
}
