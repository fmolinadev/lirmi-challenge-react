import { useState } from "react";
import { toast } from "sonner";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Tooltip,
} from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { ContentLayout } from "@/layouts";
import { StudentAddIcon, StudentDeleteIcon, StudentEditIcon } from "@/assets";
import {
  ConfirmationDialog,
  HeadSection,
  ModalUI,
  TableUI,
} from "@/components";
import { StudentInterface } from "@/interface";
import { useStudentStore } from "@/store";
import { validateStudent } from "@/utils";
import styles from "./students.module.css";

export const StudentsPage = () => {
  const { students, addStudent, deleteStudent, updateStudent } =
    useStudentStore();

  const [selectedStudent, setSelectedStudent] =
    useState<StudentInterface | null>(null);
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);

  const [nameNewStudent, setNameNewStudent] = useState<string | null>(null);
  const [lastnameNewStudent, setLastnameStudent] = useState<string | null>(
    null
  );
  const [ageNewStudent, setAgeNewStudent] = useState<number | string>("");
  const [nameError, setNameError] = useState<string | null>(null);
  const [lastnameError, setLastnameError] = useState<string | null>(null);
  const [ageError, setAgeError] = useState<string | null>(null);

  const handleOpenModalAdd = () => setOpenModalAdd(true);

  const handleCloseModalAdd = () => {
    setNameNewStudent(null);
    setNameNewStudent(null);
    setAgeNewStudent("");

    setNameError(null);
    setLastnameError(null);
    setAgeError(null);

    setOpenModalAdd(false);
  };
  const handleOpenModalEdit = (student: StudentInterface) => {
    setSelectedStudent(student);
    setNameNewStudent(student.name);
    setLastnameStudent(student.lastname);
    setAgeNewStudent(student.age);
    setOpenModalEdit(true);
  };

  const handleCloseModalEdit = () => {
    setSelectedStudent(null);
    setNameNewStudent(null);
    setLastnameStudent(null);
    setAgeNewStudent("");
    setOpenModalEdit(false);
  };

  const handleClickOpenDialog = (student: StudentInterface) => {
    setSelectedStudent(student);
    setOpenDeleteDialog(true);
  };

  const handleClickCloseDialog = () => {
    setSelectedStudent(null);
    setOpenDeleteDialog(false);
  };

  const handleDeleteStudent = () => {
    if (selectedStudent) {
      deleteStudent(selectedStudent.id);
      toast.info("Se elimino la información del estudiante.");
      handleClickCloseDialog();
    }
  };

  const handleNameChange = (value: string) => {
    setNameNewStudent(value);
    if (value.trim().length >= 3) {
      setNameError(null);
    }
  };

  const handleLastnameChange = (value: string) => {
    setLastnameStudent(value);
    if (value.trim().length >= 1) {
      setLastnameError(null);
    }
  };

  const handleChangeAge = (event: SelectChangeEvent) => {
    setAgeNewStudent(event.target.value);
    if (event.target.value >= 1) {
      setAgeError(null);
    }
  };

  const handleAceptAddStudent = () => {
    const errors = validateStudent(
      nameNewStudent,
      lastnameNewStudent,
      ageNewStudent !== "" ? Number(ageNewStudent) : 0
    );

    setNameError(errors.nameError);
    setLastnameError(errors.lastnameError);
    setAgeError(errors.ageError);

    if (errors.nameError || errors.lastnameError || errors.ageError) return;

    const maxId =
      students.length > 0 ? Math.max(...students.map((stud) => stud.id)) : 0;

    if (nameNewStudent && lastnameNewStudent && ageNewStudent) {
      const newStudent: StudentInterface = {
        id: maxId + 1,
        name: nameNewStudent.trim(),
        lastname: lastnameNewStudent.trim(),
        age: Number(ageNewStudent),
      };

      addStudent(newStudent);
      setNameNewStudent(null);
      setLastnameStudent(null);
      setAgeNewStudent("");
      setNameError(null);
      setLastnameError(null);
      setAgeError(null);
      toast.success("Estudiante creado con éxito!");
      handleCloseModalAdd();
    }
  };

  const handleAceptUpdateStudent = () => {
    const errors = validateStudent(
      nameNewStudent,
      lastnameNewStudent,
      ageNewStudent !== "" ? Number(ageNewStudent) : 0
    );

    setNameError(errors.nameError);
    setLastnameError(errors.lastnameError);
    setAgeError(errors.ageError);

    if (errors.nameError || errors.lastnameError || errors.ageError) return;

    if (selectedStudent && lastnameNewStudent) {
      const updatedStudent: Partial<StudentInterface> = {
        name: nameNewStudent?.trim() ?? selectedStudent.name,
        lastname: lastnameNewStudent.trim() ?? selectedStudent.lastname,
        age:
          ageNewStudent !== undefined && ageNewStudent !== null
            ? Number(ageNewStudent)
            : selectedStudent.age,
      };
      updateStudent(selectedStudent.id, updatedStudent);
      setNameNewStudent(null);
      setLastnameStudent(null);
      setAgeNewStudent("");
      setNameError(null);
      setLastnameError(null);
      setAgeError(null);
      toast.info("Se edito la información deñ estudiante");
      handleCloseModalEdit();
    }
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 60 },
    { field: "name", headerName: "Nombre", width: 150 },
    { field: "lastname", headerName: "Apellido", width: 150 },
    { field: "age", headerName: "Edad", width: 100 },
    {
      field: "course",
      headerName: "Curso",
      width: 100,
      renderCell: (params) => {
        const course = params.row.course;
        return course ? course : "Sin asignar";
      },
    },
    {
      field: "action",
      headerName: "Acción",
      width: 110,
      renderCell: (params) => (
        <div className={styles["actions-placement"]}>
          <Tooltip title="Editar" placement="bottom-start">
            <StudentEditIcon
              style={{ cursor: "pointer" }}
              onClick={() =>
                handleOpenModalEdit(params.row as StudentInterface)
              }
            />
          </Tooltip>
          <Tooltip title="Eliminar" placement="bottom-start">
            <StudentDeleteIcon
              style={{ cursor: "pointer" }}
              onClick={() =>
                handleClickOpenDialog(params.row as StudentInterface)
              }
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <ContentLayout>
      <HeadSection
        sectionTitle="Estudiantes"
        buttonTitle="Agregar estudiante"
        iconAction={<StudentAddIcon color="#ffffff" height={30} width={30} />}
        onButtonClick={handleOpenModalAdd}
      />
      <div className={styles["table-students"]}>
        <TableUI
          rows={students}
          columns={columns}
          pageSizeOptions={[5, 10, 15]}
        />
      </div>

      <ConfirmationDialog
        title={`¿Deseas eliminar a ${selectedStudent?.name} ${selectedStudent?.lastname}?`}
        description="Al aceptar, se borrará toda la información del estudiante. Esta acción no se puede revertir."
        open={openDeleteDialog}
        onAccept={() => {
          handleDeleteStudent();
        }}
        onCancel={handleClickCloseDialog}
      />
      <ModalUI
        open={openModalAdd}
        title="Agregar nuevo estudiante"
        descriptionModal="Completa el perfil del nuevo estudiante. Recorda que puedes editar la información luego de crearlo."
        onClose={handleCloseModalAdd}
        onAccept={handleAceptAddStudent}
        buttonText="Agregar"
      >
        <div className={styles["children-students"]}>
          <TextField
            required
            id="outlined-required"
            label="Nombre: "
            variant="standard"
            size="small"
            value={nameNewStudent ?? ""}
            onChange={(e) => handleNameChange(e.target.value)}
            error={!!nameError}
            helperText={nameError}
          />
          <TextField
            required
            id="outlined-required"
            label="Apellido: "
            variant="standard"
            size="small"
            value={lastnameNewStudent ?? ""}
            onChange={(e) => handleLastnameChange(e.target.value)}
            error={!!lastnameError}
            helperText={lastnameError}
          />

          <FormControl variant="standard" sx={{ minWidth: 140 }}>
            <InputLabel id="age-label">Edad</InputLabel>
            <Select
              labelId="age-label"
              id="demo-simple-select"
              value={ageNewStudent ?? ""}
              label="Edad"
              onChange={handleChangeAge}
              required
              error={!!ageError}
              helperText={ageError}
            >
              <MenuItem value="">
                <em>Seleccionar</em>
              </MenuItem>
              <MenuItem value={5}>Cinco (5)</MenuItem>
              <MenuItem value={6}>Seis (6)</MenuItem>
              <MenuItem value={7}>Siete (7)</MenuItem>
              <MenuItem value={8}>Ocho (8)</MenuItem>
              <MenuItem value={9}>Nueve (9)</MenuItem>
              <MenuItem value={10}>Diez (10)</MenuItem>
              <MenuItem value={11}>Once (11)</MenuItem>
              <MenuItem value={12}>Doce (12)</MenuItem>
              <MenuItem value={13}>Trece (13)</MenuItem>
              <MenuItem value={14}>Catorce (14)</MenuItem>
              <MenuItem value={15}>Quince (15)</MenuItem>
              <MenuItem value={16}>Dieciséis (16)</MenuItem>
              <MenuItem value={17}>Diecisiete (17)</MenuItem>
              <MenuItem value={18}>Dieciocho (18)</MenuItem>
            </Select>
          </FormControl>
        </div>
      </ModalUI>
      <ModalUI
        open={openModalEdit}
        title="Editar estudiante"
        onClose={handleCloseModalEdit}
        onAccept={handleAceptUpdateStudent}
        buttonText="Editar"
      >
        <div className={styles["children-students"]}>
          <TextField
            required
            id="outlined-required"
            label="Nombre: "
            variant="standard"
            size="small"
            value={nameNewStudent ?? ""}
            onChange={(e) => handleNameChange(e.target.value)}
            error={!!nameError}
            helperText={nameError}
          />
          <TextField
            required
            id="outlined-required"
            label="Apellido: "
            variant="standard"
            size="small"
            value={lastnameNewStudent ?? ""}
            onChange={(e) => handleLastnameChange(e.target.value)}
            error={!!lastnameError}
            helperText={lastnameError}
          />

          <FormControl variant="standard" sx={{ minWidth: 140 }}>
            <InputLabel id="age-label">Edad</InputLabel>
            <Select
              labelId="age-label"
              id="demo-simple-select"
              value={ageNewStudent ?? ""}
              label="Edad"
              onChange={handleChangeAge}
              required
            >
              <MenuItem value="">
                <em>Seleccionar</em>
              </MenuItem>
              <MenuItem value={5}>Cinco (5)</MenuItem>
              <MenuItem value={6}>Seis (6)</MenuItem>
              <MenuItem value={7}>Siete (7)</MenuItem>
              <MenuItem value={8}>Ocho (8)</MenuItem>
              <MenuItem value={9}>Nueve (9)</MenuItem>
              <MenuItem value={10}>Diez (10)</MenuItem>
              <MenuItem value={11}>Once (11)</MenuItem>
              <MenuItem value={12}>Doce (12)</MenuItem>
              <MenuItem value={13}>Trece (13)</MenuItem>
              <MenuItem value={14}>Catorce (14)</MenuItem>
              <MenuItem value={15}>Quince (15)</MenuItem>
              <MenuItem value={16}>Dieciséis (16)</MenuItem>
              <MenuItem value={17}>Diecisiete (17)</MenuItem>
              <MenuItem value={18}>Dieciocho (18)</MenuItem>
            </Select>
          </FormControl>
        </div>
      </ModalUI>
    </ContentLayout>
  );
};
