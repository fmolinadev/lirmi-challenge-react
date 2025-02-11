import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { GridColDef } from "@mui/x-data-grid";
import { TextField, Tooltip } from "@mui/material";
import { useCourseStore } from "@/store";
import { CourseInterface } from "@/interface";
import { HeadSection, ModalUI, TableUI } from "@/components";
import { BookIcon, CourseAddIcon, CourseEditIcon, EyeViewIcon } from "@/assets";
import { validateCourse } from "@/utils";
import styles from "./course.module.css";

export const CoursesPage = () => {
  const navigate = useNavigate();
  const { courses, addCourse, updateCourse } = useCourseStore();

  const [selectedCourse, setSelectedCourse] = useState<CourseInterface | null>(
    null
  );
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);

  const [nameNewCourse, setNameNewCourse] = useState<string>("");
  const [colorNewCourse, setColorNewCourse] = useState<string>("#b32aa9");

  const [nameError, setNameError] = useState<string | null>(null);
  const [colorError, setColorError] = useState<string | null>(null);

  const handleOpenModalAdd = () => setOpenModalAdd(true);

  const handleOpenModalEdit = (course: CourseInterface) => {
    setSelectedCourse(course);
    setNameNewCourse(course.name);
    setColorNewCourse(course.color);
    setOpenModalEdit(true);
  };

  const resetModalState = () => {
    setColorError(null);
    setNameError(null);
    setNameNewCourse("");
    setColorNewCourse("#b32aa9");
  };

  const handleCloseModal = (
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    resetModalState();
    setOpenModal(false);
  };

  const handleNameChange = (value: string) => {
    setNameNewCourse(value);
    if (value.trim().length >= 3) {
      setNameError(null);
    }
  };

  const handleAcceptCreateCourse = () => {
    const dataCourse: Partial<CourseInterface> = {
      name: nameNewCourse,
      color: colorNewCourse,
    };
    const error = validateCourse(dataCourse, courses);

    setNameError(error.nameError);
    setColorError(error.colorError);

    if (error.nameError || error.colorError) return;

    const maxId =
      courses.length > 0 ? Math.max(...courses.map((cour) => cour.id)) : 0;

    if (nameNewCourse) {
      const newCourse: CourseInterface = {
        id: maxId + 1,
        name: nameNewCourse.trim(),
        color: colorNewCourse?.trim() ?? "",
        subjects: [],
        students: [],
      };

      addCourse(newCourse);
      toast.success("Curso creada satisfactoriamente!");
      handleCloseModal(setOpenModalAdd);
    }
  };

  const handleAcceptUpdateCourse = () => {
    const dataCourseUpdate: Partial<CourseInterface> = {
      name: nameNewCourse,
      color: colorNewCourse,
    };
    const error = validateCourse(dataCourseUpdate, courses);

    setNameError(error.nameError);
    setColorError(error.colorError);

    if (error.nameError || error.colorError) return;

    if (selectedCourse) {
      const updatedCourse: Partial<CourseInterface> = {
        name: nameNewCourse?.trim() ?? selectedCourse.name,
        color: colorNewCourse?.trim() ?? selectedCourse.color,
      };

      updateCourse(selectedCourse.id, updatedCourse);
      toast.success("Curso actualizado con éxito!");
      handleCloseModal(setOpenModalEdit);
    }
  };

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
        <>
          <Tooltip title="Editar" placement="bottom-start">
            <CourseEditIcon
              style={{ cursor: "pointer" }}
              onClick={() => handleOpenModalEdit(params.row as CourseInterface)}
            />
          </Tooltip>
          <Tooltip title="Ver detalles del curso" placement="bottom-start">
            <EyeViewIcon
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`/course/${params.row.id}`)}
            />
          </Tooltip>
        </>
      ),
    },
  ];

  return (
    <div>
      <HeadSection
        sectionTitle="Cursos"
        buttonTitle="Agregar Curso"
        iconAction={<CourseAddIcon color="#ffffff" height={30} width={30} />}
        onButtonClick={handleOpenModalAdd}
      />
      <section className={styles["table-courses"]}>
        <TableUI
          rows={courses}
          columns={columns}
          pageSizeOptions={[10, 15, 30]}
        />
      </section>
      <ModalUI
        open={openModalAdd}
        title="Crear curso"
        descriptionModal="Difine un nuevo curso para administrar en tu colegio"
        onClose={() => handleCloseModal(setOpenModalAdd)}
        onAccept={() => handleAcceptCreateCourse()}
        buttonText="Crear"
      >
        <div className={styles["define-course-container"]}>
          <TextField
            required
            id="outlined-required"
            label="Nombre: "
            variant="standard"
            size="small"
            value={nameNewCourse ?? ""}
            onChange={(e) => handleNameChange(e.target.value)}
            error={!!nameError}
            helperText={nameError}
          />
          <p>Selecciona el color:</p>
          <HexColorPicker color={colorNewCourse} onChange={setColorNewCourse} />
          {colorError && <p>{colorError}</p>}
        </div>
      </ModalUI>
      <ModalUI
        open={openModalEdit}
        title="Editar curso"
        onClose={() => handleCloseModal(setOpenModalEdit)}
        onAccept={() => handleAcceptUpdateCourse()}
        buttonText="Editar"
      >
        <div className={styles["define-course-container"]}>
          <TextField
            required
            id="outlined-required"
            label="Nombre: "
            variant="standard"
            size="small"
            value={nameNewCourse ?? ""}
            onChange={(e) => handleNameChange(e.target.value)}
            error={!!nameError}
            helperText={nameError}
          />
          <p>Selecciona el color:</p>
          <HexColorPicker color={colorNewCourse} onChange={setColorNewCourse} />
          {colorError && <p>{colorError}</p>}
        </div>
      </ModalUI>
    </div>
  );
};
