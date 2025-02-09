import { GridColDef } from "@mui/x-data-grid";
import { useCourseStore } from "@/store";
import { CourseInterface } from "@/interface";
import { TableUI } from "@/components";
import { BookIcon } from "@/assets";

export const CoursesPage = () => {
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
  ];

  return (
    <div>
      <h1>Cursos</h1>
      <TableUI rows={courses} columns={columns} pageSizeOptions={[5, 10, 15]} />
    </div>
  );
};
