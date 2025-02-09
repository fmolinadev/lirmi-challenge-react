import Paper from "@mui/material/Paper";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

interface BaseTableProps<T> {
  rows: T[];
  columns: GridColDef[];
  pageSizeOptions?: number[];
}

export const TableUI = <T extends { id: string | number }>({
  rows,
  columns,
  pageSizeOptions = [5, 10],
}: BaseTableProps<T>) => {
  const paginationModel = { page: 0, pageSize: pageSizeOptions[0] };

  return (
    <Paper sx={{ height: "100%", width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={pageSizeOptions}
        sx={{ border: 0 }}
      />
    </Paper>
  );
};
