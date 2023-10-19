import { useEffect, useState } from "react";
import { Table, Button, Modal } from "antd";
import { EditFilled, DeleteFilled } from "@ant-design/icons";
import "./DashBoard.modules.css";
import FormProduct from "../../components/FomProducto/FormProduct";
import FormProductEdit from "../../components/FomProductEdit/FomProductEdit";
import FormProductDel from "../../components/FomProductDel/FomProductDel";
import {
  getAllProductsAdmin,
  searchProducts,
} from "../../redux/Actions/Products/productsActions";
import { useDispatch, useSelector } from "react-redux";
import Searchbar from "../../components/SearchBar/SearchBar";
import "./DashBoard.modules.css";
const DashBoard = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.productsAdmin);
  useEffect(() => {
    if (products.length == 0) {
      dispatch(getAllProductsAdmin());
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
      title: "Imagen",
      dataIndex: "image",
      key: "image",
      render: (image) => <img src={image} alt={image} width={50} height={50} />,
    },
    {
      title: "Marca",
      dataIndex: "brand",
      key: "brand",
    },
    {
      title: "Categoria",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Detalle",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Precio",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
    },
    {
      title: "Activo",
      dataIndex: "active",
      key: "active",
      render: (active) => (active ? "Activo" : "Inactivo"),
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

  const searchByName = (name) => {
    console.log("Searching for:", name);
    dispatch(searchProducts(name));
  };

  return (
    <div className="dashBoard">
      <div className="topBar">
        <Button
          type="primary"
          className="buttonInsert"
          onClick={handleModalIns}
        >
          Nuevo
        </Button>
        <Searchbar onClick={searchByName} className="searchdash" />
      </div>
      <Table columns={columns} dataSource={products}></Table>

      <Modal
        open={modalIns}
        destroyOnClose={true}
        onCancel={handleModalIns}
        centered
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <FormProduct closeModal={() => setModalIns(false)} />
      </Modal>
      <Modal
        open={modalEdit}
        destroyOnClose={true}
        onCancel={handleModalEdit}
        centered
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <FormProductEdit
          productEdit={selected}
          closeModal={() => setModalEdit(false)}
        />
      </Modal>
      <Modal
        open={modalDel}
        destroyOnClose={true}
        onCancel={handleModalDel}
        centered
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <FormProductDel
          productEdit={selected}
          closeModal={() => setModalDel(false)}
        />
      </Modal>
    </div>
  );
};

export default DashBoard;
