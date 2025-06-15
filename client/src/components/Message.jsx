import "./styles/Message.css";

export default function Message(props) {
  return (
    <div className="message w-4/6 p-[1rem] min-h-fit rounded-[20px]">
      <h2 className="baumans msg-name">{props.name}</h2>
      <h3 className="baumans msg-tag" style={{ backgroundColor: props.colour }}>
        {props.tag}
      </h3>
      <p className="baumans msg-msg">{props.msg}</p>
      <p className="baumans msg-date">{props.date}</p>
    </div>
  );
}
