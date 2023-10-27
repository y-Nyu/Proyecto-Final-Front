import { useState } from "react";

import { Button } from "antd";

import DashBoardProducts from "../DashBoardProducts/DashBoardProducts";
import DashBoardUsers from "../DashBoardUsers/DashBoardUsers";
import DashBoardSales from "../DashBoardSales/DashBoardSales";
import "./DashBoard.modules.css";

function DashBoard() {

  const [views, setViews] = useState("DashBoardProducts")
  const productSelect = (view) => {
    setViews(view)
  };

  const userSelect = (view) => {
    setViews(view);
  };

  return (
    <div>
      <div className="topButtons">
        <Button
          type="primary"
          className="singleButton"
          onClick={() => productSelect("DashBoardProducts")}
        >
          Productos
        </Button>
        <Button
          type="primary"
          className="singleButton"
          onClick={() => userSelect("DashBoardUsers")}
        >
          Usuarios
        </Button>
        <Button
          type="primary"
          className="singleButton"
          onClick={() => userSelect("DashBoardSales")}
        >
          Ventas
        </Button>
      </div>

      {views === "DashBoardProducts" && <DashBoardProducts />}
      {views === "DashBoardUsers" && <DashBoardUsers />}
      {views === "DashBoardSales" && <DashBoardSales />}
    </div>
  )
};

export default DashBoard;