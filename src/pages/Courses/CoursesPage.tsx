import { useNavigate } from "react-router-dom";
import { GridColDef } from "@mui/x-data-grid";
import { Tooltip } from "@mui/material";
import { useCourseStore } from "@/store";
import { CourseInterface } from "@/interface";
import { TableUI } from "@/components";
import { BookIcon, EyeViewIcon } from "@/assets";

export const CoursesPage = () => {
  const navigate = useNavigate();
  const { courses } = useCourseStore();

  const columns: GridColDef[] | CourseInterface[] = [
    { field: "name", headerName: "Nombre", width: 160 },
    {
      field: "color",
      headerName: "Icono",
      width: 110,
      renderCell: (params) => <BookIcon color={params.value} />,
    },
    {
      field: "subjects",
      headerName: "Asig. Vinculadas",
      width: 140,
      valueGetter: (params: number[]) => {
        return Array.isArray(params) ? params.length : 0;
      },
    },
    {
      field: "students",
      headerName: "Estud. Vinculados",
      width: 140,
      valueGetter: (params: number[]) => {
        return Array.isArray(params) ? params.length : 0;
      },
    },
    {
      field: "action",
      headerName: "Acción",
      width: 120,
      renderCell: (params) => (
        <Tooltip title="Ver detalles del curso" placement="bottom-start">
          <EyeViewIcon
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`/course/${params.row.id}`)}
          />
        </Tooltip>
      ),
    },
  ];

  return (
    <div>
      <h1>Cursos</h1>
      <section>
        <TableUI
          rows={courses}
          columns={columns}
          pageSizeOptions={[5, 10, 15]}
        />
      </section>
    </div>
  );
};
