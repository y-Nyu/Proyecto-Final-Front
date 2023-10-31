import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../redux/Actions/Users/usersActions";

import { Table, Button, Modal } from "antd";
import { EditFilled, DeleteFilled } from "@ant-design/icons";

import FormUserDel from "../../components/FomUserDel/FomUserDel";
import FormUserEdit from "../../components/FomUserEdit/FomUserEdit";
// import RegisterInDash from "../../components/Register/RegisterInDash";
import "./DashBoard.modules.css";
import RegisterInDash from "../Register/RegisterInDash";

const DashBoardUsers = () => {

  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const [selected, setSelected] = useState({});
  const [modalIns, setModalIns] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDel, setModalDel] = useState(false);

  useEffect(() => {
    if (users.length == 0) {
      dispatch(getAllUsers())
    }
  }, [dispatch]);

  const userSelect = (record, option) => {
    if (option === "Edit") {
      setSelected(record)
      handleModalEdit()
    } else {
      setSelected(record)
      handleModalDel()
    }
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Celular",
      dataIndex: "celular",
      key: "celular",
    },
    {
      title: "Rol",
      dataIndex: "rol",
      key: "email",
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
          <Button onClick={() => userSelect(record, "Edit")}>
            <EditFilled className="icon" />
          </Button>
          <Button
            className="buttonTrash"
            onClick={() => userSelect(record, "Del")}
          >
            <DeleteFilled className="icon" />
          </Button>
        </>
      ),
    },
  ];

  const handleModalIns = () => {
    setModalIns(!modalIns)
  };

  const handleModalEdit = () => {
    setModalEdit(!modalEdit)
  };

  const handleModalDel = () => {
    setModalDel(!modalDel)
  };

  return (
    <div className="dashBoard">
      <Button type="primary" className="buttonInsert" onClick={handleModalIns}>
        Nuevo
      </Button>
      <Table columns={columns} dataSource={users}></Table>

      <Modal
        open={modalIns}
        destroyOnClose={true}
        onCancel={handleModalIns}
        centered
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <RegisterInDash closeModal={() => setModalIns(false)} />
      </Modal>
      <Modal
        open={modalEdit}
        destroyOnClose={true}
        onCancel={handleModalEdit}
        centered
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <FormUserEdit
          userEdit={selected}
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
        <FormUserDel
          userEdit={selected}
          closeModal={() => setModalDel(false)}
        />
      </Modal>
    </div>
  )
};

export default DashBoardUsers;