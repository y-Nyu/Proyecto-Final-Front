import { useState } from "react";

const QuantityInput = () => {
  const [cantidad, setCantidad] = useState(0);

  const handleIncrement = () => {
    // Incrementar la cantidad solo si no es negativa
    if (cantidad >= 0) {
      setCantidad(cantidad + 1);
    }
  };

  const handleDecrement = () => {
    // Decrementar la cantidad solo si no es negativa
    if (cantidad > 0) {
      setCantidad(cantidad - 1);
    }
  };

  return (
    <div>
      <button onClick={handleDecrement}>-</button>
      <input
        type="number"
        value={cantidad}
        onChange={(e) => {
          const newValue = parseInt(e.target.value);
          // Asegurarse de que no se pueda establecer un valor negativo
          if (!isNaN(newValue) && newValue >= 0) {
            setCantidad(newValue);
          }
        }}
        id="cantidad"
      />
      <button onClick={handleIncrement}>+</button>
    </div>
  );
};

export default QuantityInput;
