export default function Dice(props) {
  return (
    <div
      onClick={props.onClick}
      className="die"
      style={{ backgroundColor: props.isHeld ? "#59E391" : "white" }}
    >
      {props.value}
    </div>
  );
}
