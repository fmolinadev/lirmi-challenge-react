import { TableUI } from "@/components";
import { useSubjectStore } from "@/store";
import { GridColDef } from "@mui/x-data-grid";

export const SubjectsPage = () => {
  const { subjects } = useSubjectStore();

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 60 },
    { field: "name", headerName: "Nombre", width: 280 },
    { field: "description", headerName: "Descripción", width: 490 },
  ];

  return (
    <div>
      <h1>Asignaturas</h1>
      <TableUI
        rows={subjects}
        columns={columns}
        pageSizeOptions={[5, 10, 15]}
      />
    </div>
  );
};
