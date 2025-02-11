import { useState } from "react";
import { toast } from "sonner";
import { SelectChangeEvent, Tooltip } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { ContentLayout } from "@/layouts";
import { StudentAddIcon, StudentDeleteIcon, StudentEditIcon } from "@/assets";
import {
  ConfirmationDialog,
  HeadSection,
  ModalActionStudent,
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
  const [lastnameNewStudent, setLastnameNewStudent] = useState<string | null>(
    null
  );
  const [ageNewStudent, setAgeNewStudent] = useState<string | number>(0);

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
    setLastnameNewStudent(student.lastname);
    setAgeNewStudent(student.age);
    setOpenModalEdit(true);
  };

  const handleCloseModalEdit = () => {
    setSelectedStudent(null);
    setNameNewStudent(null);
    setLastnameNewStudent(null);
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
    setLastnameNewStudent(value);
    if (value.trim().length >= 1) {
      setLastnameError(null);
    }
  };

  const handleChangeAge = (event: SelectChangeEvent) => {
    const value = event.target.value;
    setAgeNewStudent(value);
    if (Number(value) >= 1) {
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
      setLastnameNewStudent(null);
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
      setLastnameNewStudent(null);
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
        return course || "Sin asignar";
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
      <ModalActionStudent
        open={openModalAdd}
        title="Agregar nuevo estudiante"
        description="Completa el perfil del nuevo estudiante. Recorda que puedes editar la información luego de crearlo."
        onClose={handleCloseModalAdd}
        onAccept={handleAceptAddStudent}
        buttonText="Agregar"
        name={nameNewStudent}
        nameError={nameError}
        lastname={lastnameNewStudent}
        lastnameError={lastnameError}
        age={ageNewStudent}
        ageError={ageError}
        onNameChange={handleNameChange}
        onLastnameChange={handleLastnameChange}
        onAgeChange={handleChangeAge}
      />
      <ModalActionStudent
        open={openModalEdit}
        title="Editar estudiante"
        onClose={handleCloseModalEdit}
        onAccept={handleAceptUpdateStudent}
        buttonText="Editar"
        name={nameNewStudent}
        nameError={nameError}
        lastname={lastnameNewStudent}
        lastnameError={lastnameError}
        age={ageNewStudent}
        ageError={ageError}
        onNameChange={handleNameChange}
        onLastnameChange={handleLastnameChange}
        onAgeChange={handleChangeAge}
      />
    </ContentLayout>
  );
};
