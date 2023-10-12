import { useDispatch } from "react-redux";
import { useState } from "react";
import { ordered } from "../../../src/redux/actions";

function OrderByName() {
  const [boolean, setBoolean] = useState(false);
  const dispatch = useDispatch();

  const handleButton = () => {
    const order = !boolean;
    setBoolean(order);
    dispatch(ordered(order));
  };

  return (
    <div className="container">
      <h4>Orden Alfabético</h4>
      <button onClick={handleButton}>{boolean ? "Z -> A" : "A -> Z"}</button>
    </div>
  );
}

export default OrderByName;
