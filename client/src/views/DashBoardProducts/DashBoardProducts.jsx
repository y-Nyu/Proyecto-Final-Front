import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../redux/Actions/Products/productsActions";
import FormProduct from "../../components/FomProducto/FormProduct";
import FormProductEdit from "../../components/FomProductEdit/FomProductEdit";
import FormProductDel from "../../components/FomProductDel/FomProductDel";
import { Table, Button, Modal } from "antd";
import { EditFilled, DeleteFilled } from "@ant-design/icons";
import "./DashBoard.modules.css";

const DashBoard = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  useEffect(() => {
    if (products.length == 0) {
      dispatch(getAllProducts());
    }
  }, [dispatch]);
  
  const [selected, setSelected] = useState({});
  const [modalIns, setModalIns] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDel, setModalDel] = useState(false);

  const productSelect = (record, option) => {
    if (option === "Edit") {
      setSelected(record);
      handleModalEdit();
    } else {
      setSelected(record);
      handleModalDel();
    }
  };
  console.log(products);
  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
    },


    {
      title: "Action",
      key: "actions",
      render: (record) => (
        <>
          <Button onClick={() => productSelect(record, "Edit")}>
            <EditFilled className="icon" />
          </Button>
          <Button
            className="buttonTrash"
            onClick={() => productSelect(record, "Del")}
          >
            <DeleteFilled className="icon" />
          </Button>
        </>
      ),
    },
  ];

  const handleModalIns = () => {
    setModalIns(!modalIns);
  };

  const handleModalEdit = () => {
    setModalEdit(!modalEdit);
  };
  const handleModalDel = () => {
    setModalDel(!modalDel);
  };

  return (
    <div className="dashBoard">
      <Button type="primary" className="buttonInsert" onClick={handleModalIns}>
        Nuevo
      </Button>
      <Table columns={columns} dataSource={products}></Table>

      <Modal
        open={modalIns}
        destroyOnClose={true}
        onCancel={handleModalIns}
        centered
        // footer={[
        //   <Button key={0} onClick={handleModalIns}>
        //     cancelar
        //   </Button>,
        //   <Button key={1} onClick={handleModalIns}>
        //     Crear
        //   </Button>,
        // ]}
      >
        <FormProduct />
      </Modal>
      <Modal
        open={modalEdit}
        destroyOnClose={true}
        onCancel={handleModalEdit}
        centered
        // okButtonProps={{ style: { display: "none" } }}
      >
        <FormProductEdit productEdit={selected} />
      </Modal>
      <Modal
        open={modalDel}
        destroyOnClose={true}
        onCancel={handleModalDel}
        centered
      >
        <FormProductDel productEdit={selected} />
      </Modal>
    </div>
  );
};

export default DashBoard;
