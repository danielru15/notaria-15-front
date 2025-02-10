import { Button, Space, Table, TableProps, Modal, Input } from "antd";
import { useFetchUsers } from "../../hooks/useAllUsers";
import CardContainer from "../CardContainer/CardContainer";
import { User } from "../../interfaces/user.interface";
import { useDeleteUser } from "../../hooks/deleteUser";
import { ExclamationCircleFilled } from "@ant-design/icons";

const CONFIRMATION_WORD = "ELIMINAR"; // Palabra de confirmación

const ListUsers = () => {
  const { Allusers , fetchUsers } = useFetchUsers();
  const { deleteUser } = useDeleteUser();



  const showDeleteModal = (id: number) => {
    let inputValue = "";
    let modalInstance: any = null;

    modalInstance = Modal.confirm({
      title: "Confirmar Eliminación",
      icon: <ExclamationCircleFilled />,
      okText: "Eliminar",
      cancelText: "Cancelar",
      okType: "danger",
      okButtonProps: { disabled: true }, // Desactivado por defecto
      content: (
        <>
          <p>
            Para eliminar este usuario, escribe la palabra <b>{CONFIRMATION_WORD}</b> en el siguiente campo:
          </p>
          <br />
          <Input
            onChange={(e) => {
              inputValue = e.target.value.trim();
              modalInstance.update({
                okButtonProps: { disabled: inputValue !== CONFIRMATION_WORD },
              });
            }}
          />
        </>
      ),
      onOk: async () => {
        if (inputValue === CONFIRMATION_WORD) {
          await deleteUser(id, inputValue);
          fetchUsers()
        }
      },
    });
  };

  

  const columns: TableProps<User>["columns"] = [
    { title: "Id", dataIndex: "id", key: "id" },
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
      filterSearch: true,
      onFilter: (value: any, record: any) => record.name.toLowerCase().includes(value.toLowerCase()),
      filters: Array.from(new Set(Allusers.map(({ name }) => name.toLowerCase()))).map(name => ({
        text: name.toUpperCase(),
        value: name,
      })),
      render: (name: string) => name.toUpperCase(),
    },
    {
      title: "Apellido",
      dataIndex: "last_name",
      key: "last_name",
      filterSearch: true,
      onFilter: (value: any, record: any) => record.last_name.toLowerCase().includes(value.toLowerCase()),
      filters: Array.from(new Set(Allusers.map(({ last_name }) => last_name.toLowerCase()))).map(last_name => ({
        text: last_name.toUpperCase(),
        value: last_name,
      })),
      render: (last_name: string) => last_name.toUpperCase(),
    },
    { title: "Correo Electrónico", dataIndex: "email", key: "email" },
    {
      title: "Cargo",
      dataIndex: "cargo",
      key: "cargo",
      filterSearch: true,
      onFilter: (value: any, record: any) => record.cargo.toLowerCase().includes(value.toLowerCase()),
      filters: Allusers.map(({ cargo }) => ({ text: cargo.toLowerCase(), value: cargo })),
    },
    { title: "Rol", dataIndex: "rol", key: "rol" },
    {
      title: "Fecha de Creación",
      dataIndex: "created_at",
      key: "created_at",
      render: (created_at: string) => new Date(created_at).toLocaleString(),
    },
    {
      title: "Acciones",
      key: "actions",
      render: (_: any, record: any) => (
        <Space>
          <Button type="link">Editar</Button>
          <Button type="link" style={{ color: "red" }} onClick={() => showDeleteModal(record.id)}>
            Eliminar
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <CardContainer title="TODOS LOS USUARIOS">
      <Table<User> columns={columns} dataSource={Allusers} rowKey={(record) => record.id}/>
    </CardContainer>
  );
};

export default ListUsers;
