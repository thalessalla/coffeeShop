import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import { useGetUsers, useDeleteUser } from "../services/api/useUsers";
import DeleteIcon from "@mui/icons-material/Delete";
import { Alert, CircularProgress, Snackbar } from "@mui/material";
import { useState } from "react";
import ModalConfirmation from "../components/modal";

const Dashboard = () => {
  const { data, isFetching } = useGetUsers();
  const { mutate: deleteUser, isPending, error } = useDeleteUser();

  const [isModalConfirmationOpen, setIsModalConfirmationOpen] = useState(false);
  const [selectedId, setSelectedId] = useState("");

  //Estado snackbar
  const [open, setOpen] = useState(false);

  // Fechar O alert de item excluido
  const handleClose = () => {
    setOpen(false);
  };

  // const submiteDelete = (id: any) => {
  //   deleteUser(
  //     { id },
  //     {
  //       onSuccess: () => {
  //         setOpen(true);
  //       },
  //       onError: () => {
  //         console.log("Erro");
  //       },
  //     }
  //   );
  // };

  const handleDeletePix = () => {
    deleteUser(selectedId, {
      onSuccess: () => {
        setIsModalConfirmationOpen(false);
        setOpen(true);
      },
    });
  };

  const handleDeleteModal = (key: any) => {
    setIsModalConfirmationOpen(true);
    setSelectedId(key);
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 1 },
    {
      field: "first_name",
      headerName: "Primeiro Nome",
      flex: 1,
    },
    {
      field: "email",
      headerName: "E-mail",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Excluir",

      renderCell: (params) => (
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => handleDeleteModal(params.id)}
          disabled={isFetching}
        />
      ),
    },
  ];

  return (
    <div className="flex p-4">
      <div className="mt-20 max-w-[100%]">
        <h1 className="text-4xl font-bold text-primary mt-4">Dashboard</h1>
        <p className="mt-2 mb-10">Bem-vindo ao painel privado!</p>
        {isFetching && <CircularProgress color="inherit" />}
        {error && <p>Erro ao carregar os dados</p>}

        {data && (
          <div className="overflow-x-auto">
            <DataGrid
              className="  w-[500px] md:w-[700px] lg:w-[900px] xl:w-[1200px] "
              rows={data.data}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
            />
          </div>
        )}

        <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            variant="filled"
            className="w-full"
          >
            O item foi excluido
          </Alert>
        </Snackbar>

        <ModalConfirmation
          isOpen={isModalConfirmationOpen}
          onCancel={() => {
            setIsModalConfirmationOpen(false);
          }}
          onConfirm={() => {
            handleDeletePix();
          }}
          handleOpenModal={(open) => setIsModalConfirmationOpen(open)}
          isPending={isPending}
        />
      </div>
    </div>
  );
};

export default Dashboard;
