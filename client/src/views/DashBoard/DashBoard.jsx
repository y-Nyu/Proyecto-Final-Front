import { useState } from "react";
import DashBoardProducts from "../DashBoardProducts/DashBoardProducts";
import DashBoardUsers from "../DashBoardUsers/DashBoardUsers";
import { Button } from "antd";
import "./DashBoard.modules.css";

function DashBoard() {
  const [views, setViews] = useState("DashBoardProducts");
  const productSelect = (view) => {
    setViews(view);
  };

  const userSelect = (view) => {
    setViews(view);
  };
  return (
    <div style={{ textAlign: "left" }}>
      <Button type="primary" onClick={() => productSelect("DashBoardProducts")} style={{ margin: "10px" }}>
        Productos
      </Button>
      <Button type="primary" onClick={() => userSelect("DashBoardUsers")} style={{ margin: "10px" }}>
        Usuarios
      </Button>
      {views === "DashBoardProducts" && <DashBoardProducts />}
      {views === "DashBoardUsers" && <DashBoardUsers />}
    </div>
  );
}

export default DashBoard;
