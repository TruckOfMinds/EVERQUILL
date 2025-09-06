import { useEffect, useState } from "react";
import "./styles/Write.css";

export default function Write() {
  const SERVER = import.meta.env.VITE_SERVER;

  const defFormValues = {
    name: "",
    tag: null,
    msg: "",
    date: getDate(),
  };
  const [tags, setTags] = useState([]);
  const [entry, setEntry] = useState(defFormValues);

  useEffect(() => {
    /**
     * @async @function pollForTags
     * @description sets an interval to fetch the tags from the server,
     * before setting the state of {array} tags to the response.
     * Intervals are 1s apart.
     */
    const pollForTags = setInterval(async () => {
      try {
        await fetch(`${SERVER}/tags`)
          .then((response) => response.json())
          .then((json) => setTags(json));
      } catch (err) {
        throw new Error(`Failed to connect to server [Error — ${err}]`);
      }
    }, 1000);

    // returns clearing to prevent overlap — also makes it repeat idk y
    return () => clearInterval(pollForTags);
  }, [SERVER]);

  /**
   * @function getDate
   * @returns {string} DMY formatted date string from a Date object.
   */
  function getDate() {
    const timestamp = new Date();
    const day =
      // adds leading 0
      timestamp.getDate() < 10
        ? `0${timestamp.getDate()}`
        : timestamp.getDate();

    const month =
      // adds leading 0, adds 1 to correct month
      timestamp.getMonth() + 1 < 10
        ? `0${timestamp.getMonth() + 1}`
        : timestamp.getMonth() + 1;

    const year = timestamp.getFullYear();

    return `${day}/${month}/${year}`;
  }

  /**
   * @function updateState
   * @param {object} e The currently focused/changed input.
   * @description Updates object property for the input with its new value.
   */
  function updateState(e) {
    setEntry({ ...entry, [e.target.name]: e.target.value });
  }

  /**
   * @function sendUserData
   * @param {object} e The form submitted.
   * @description Sends form data to the server to be  into db
   */
  function sendUserData(e) {
    e.preventDefault();
    try {
      fetch(`${SERVER}/write`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(entry),
      });
      console.log(entry);
    } catch (err) {
      throw new Error(`Failed to send data [Error — ${err}`);
    }
  }

  // header and form
  return (
    <main className="pt-[3rem] pb-[2rem] flex flex-col items-center justify-between h-3/4">
      <h1 className="cagliostro text-[2rem] pb-[2rem]">
        Write a Message and be Remembered Forever!
      </h1>

      <form
        className="form p-[2rem] min-w-fit w-3/4 h-full"
        onSubmit={sendUserData}
      >
        <label htmlFor="name" className="cagliostro name label">
          Name:
          <input
            type="text"
            name="name"
            id="name"
            className="baumans input"
            required
            aria-required
            value={entry.name}
            onChange={updateState}
          />
        </label>

        <label htmlFor="tag" className="cagliostro tag label">
          Category:
          <select
            name="tag"
            id="tag"
            defaultValue={"def"}
            className="baumans input"
            onChange={updateState}
          >
            <option value="def" className="baumans" hidden></option>

            {tags.map((t) => (
              <option key={t.id} value={t.id} className="baumans">
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
            value={entry.msg}
            onChange={updateState}
          ></textarea>
        </label>

        <label htmlFor="date" className="cagliostro date label">
          Date:
          <input
            type="text"
            name="date"
            id="date"
            className="baumans input"
            readOnly
            aria-readonly
            value={entry.date}
            onChange={updateState}
          />
        </label>

        <button type="submit" className="cagliostro submit">
          Write
        </button>
      </form>
    </main>
  );
}
