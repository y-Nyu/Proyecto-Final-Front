import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSales } from "../../redux/Actions/Users/usersActions";
import { Table, Button, Modal } from "antd";
import { EyeOutlined } from "@ant-design/icons";

function DashBoardSales() {
  const dispatch = useDispatch();
  const salesReport = useSelector((state) => state.sales);

  useEffect(() => {
    console.log("ventas:", salesReport);
    if (salesReport.length == 0) {
      dispatch(getSales());
    }
  }, [dispatch]);

  const [modalView, setModalView] = useState(false);
  const [selected, setSelected] = useState({});

  const handleModalView = () => {
    setModalView(!modalView);
  };

  const viewSale = (record) => {
    setSelected(record);
    console.log(record);
    handleModalView();
  };

  const columns = [
    {
      title: "Num de venta",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Usuario",
      dataIndex: "iduser",
      key: "iduser",
    },
    {
      title: "Fecha",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "valor",
      key: "total",
      render: (text, record) => {
        if (record.details.length > 0) {
          return record.details[0].total;
        }
        return "N/A";
      },
    },
    {
      title: "Action",
      key: "actions",
      render: (record) => (
        <>
          <Button onClick={() => viewSale(record.details[0])}>
            <EyeOutlined className="icon" />
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <h1>Reporte de Ventas</h1>
      <Table columns={columns} dataSource={salesReport} />
      <Modal
        open={modalView}
        destroyOnClose={true}
        onCancel={handleModalView}
        centered
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <div>Detalle de venta</div>
        <div>
          {`Id venta:  ${selected.id}`}
          <br />
          {`Valor:  ${selected.total}`}
        </div>
        <div>
          <label>
            <strong>Productos:</strong>
          </label>
          <ul>
            {selected?.products?.map((product, index) => (
              <li key={index}>
                {`Nombre: ${product.name}`}
                <br />
                {`Cantidad: ${product.quantity}`}
                <br />
                {`Precio: ${product.price}`}
                <br />
              </li>
            ))}
          </ul>
        </div>
      </Modal>
    </div>
  );
}

export default DashBoardSales;
