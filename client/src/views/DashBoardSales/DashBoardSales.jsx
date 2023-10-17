import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSales } from "../../redux/Actions/Users/usersActions";
import { Table, Button, Modal } from "antd";
import { EyeOutlined } from "@ant-design/icons";

function DashBoardSales() {
  const dispatch = useDispatch();
  const salesReport = useSelector((state) => state.sales);
  const [modalView, setModalView] = useState(false);
  useEffect(() => {
    console.log("ventas", salesReport);
    if (salesReport.length === 0) {
      dispatch(getSales());
    }
  }, [dispatch]);

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
      dataIndex: "createdAt", // Asegúrate de que coincide con la propiedad en tus datos
      key: "createdAt",
    },
    {
      title: "valor",
      key: "total",
      render: (text, record) => {
        if (record.details.length > 0) {
          return record.details[0].total;
        }
        return "N/A"; // Otra valor predeterminado si details no contiene elementos
      },
    },
    {
      title: "Action",
      key: "actions",
      render: (record) => (
        <>
          <Button>
            <EyeOutlined className="icon" />
          </Button>
        </>
      ),
    },
  ];
  const handleModalView = () => {
    setModalView(!modalView);
  };
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
        <FormDetail
          productEdit={selected}
          closeModal={() => setModalEdit(false)}
        />
      </Modal>
    </div>
  );
}

export default DashBoardSales;
