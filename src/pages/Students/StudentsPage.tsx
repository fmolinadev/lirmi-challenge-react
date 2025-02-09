import { TableUI } from "@/components";
import { useStudentStore } from "@/store";
import { GridColDef } from "@mui/x-data-grid";

export const StudentsPage = () => {
  const { students } = useStudentStore();

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 60 },
    { field: "name", headerName: "Nombre", width: 150 },
    { field: "lastname", headerName: "Apellido", width: 150 },
    { field: "age", headerName: "Edad", width: 100 },
    { field: "course", headerName: "Curso", width: 100 },
    { field: "average", headerName: "Promedio", width: 100 },
    { field: "birthday", headerName: "Cumpleaños", width: 110 },
    {
      field: "contactEmergency",
      headerName: "Contacto de Emergencia",
      width: 210,
    },
  ];

  return (
    <div>
      <h1>Estudiantes</h1>
      <TableUI
        rows={students}
        columns={columns}
        pageSizeOptions={[5, 10, 15]}
      />
    </div>
  );
};
