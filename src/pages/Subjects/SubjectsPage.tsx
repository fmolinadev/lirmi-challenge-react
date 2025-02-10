import { useState } from "react";
import { TextField, Tooltip } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useSubjectStore } from "@/store";
import {
  ConfirmationDialog,
  HeadSection,
  ModalUI,
  TableUI,
} from "@/components";
import { SubjectAddIcon, SubjectDeleteIcon, SubjectEditIcon } from "@/assets";
import { SubjectInterface } from "@/interface";
import { validateSubject } from "@/utils";
import styles from "./subjects.module.css";
import { toast } from "sonner";

export const SubjectsPage = () => {
  const { subjects, addSubject, deleteSubject, updateSubject } =
    useSubjectStore();
  const existingNames = subjects.map((subject) => subject.name);
  const [nameNewSubject, setNameNewSubject] = useState<string | null>(null);
  const [descriptionNewSubject, setDescriptionNewSubject] = useState<
    string | null
  >(null);
  const [nameError, setNameError] = useState<string | null>(null);
  const [descriptionError, setDescriptionError] = useState<string | null>(null);

  const [selectedSubject, setSelectedSubject] =
    useState<SubjectInterface | null>(null);
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);

  const handleClickOpenDialog = (subject: SubjectInterface) => {
    setSelectedSubject(subject);
    setOpenDeleteDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDeleteDialog(false);
    setSelectedSubject(null);
  };

  const handleDeleteSubject = () => {
    if (selectedSubject) {
      deleteSubject(selectedSubject.id);
      toast.info("Se elimino la asignatura");
      handleCloseDialog();
    }
  };

  const handleOpenModalAdd = () => setOpenModalAdd(true);

  const handleCloseModalAdd = () => {
    setNameNewSubject(null);
    setNameError(null);
    setDescriptionNewSubject(null);
    setDescriptionError(null);
    setOpenModalAdd(false);
  };

  const handleOpenModalEdit = (subject: SubjectInterface) => {
    setOpenModalEdit(true);
    setSelectedSubject(subject);
    setNameNewSubject(subject.name);
    setDescriptionNewSubject(subject.description);
  };

  const handleCloseModalEdit = () => {
    setNameNewSubject(null);
    setNameError(null);
    setDescriptionNewSubject(null);
    setDescriptionError(null);
    setOpenModalEdit(false);
  };

  const handleAcceptCreateSubject = () => {
    const errors = validateSubject(
      nameNewSubject,
      descriptionNewSubject,
      existingNames
    );
    setNameError(errors.nameError);
    setDescriptionError(errors.descriptionError);

    if (errors.nameError || errors.descriptionError) return;

    const maxId =
      subjects.length > 0 ? Math.max(...subjects.map((sub) => sub.id)) : 0;

    if (nameNewSubject) {
      const newSubject: SubjectInterface = {
        id: maxId + 1,
        name: nameNewSubject.trim(),
        description: descriptionNewSubject?.trim() ?? "",
      };

      addSubject(newSubject);
      setNameNewSubject(null);
      setDescriptionNewSubject(null);
      setNameError(null);
      setDescriptionError(null);
      toast.success("Asignatura creada con éxito!");
      handleCloseModalAdd();
    }
  };

  const handleAcceptUpdateSubject = () => {
    const errors = validateSubject(
      nameNewSubject,
      descriptionNewSubject,
      existingNames
    );
    setNameError(errors.nameError);
    setDescriptionError(errors.descriptionError);

    if (errors.nameError || errors.descriptionError) return;

    if (selectedSubject) {
      const updatedSubject: Partial<SubjectInterface> = {
        name: nameNewSubject?.trim() ?? selectedSubject.name,
        description:
          descriptionNewSubject?.trim() ?? selectedSubject.description,
      };

      updateSubject(selectedSubject.id, updatedSubject);
      setNameNewSubject(null);
      setDescriptionNewSubject(null);
      setNameError(null);
      setDescriptionError(null);
      toast.info("Se edito la asignatura correctamente");
      handleCloseModalEdit();
    }
  };

  const handleNameChange = (value: string) => {
    setNameNewSubject(value);
    if (value.trim().length >= 3) {
      setNameError(null);
    }
  };

  const handleDescriptionChange = (value: string) => {
    setDescriptionNewSubject(value);
    if (!value || value.length <= 200) {
      setDescriptionError(null);
    }
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 60 },
    { field: "name", headerName: "Nombre", width: 280 },
    { field: "description", headerName: "Descripción", width: 590 },
    {
      field: "action",
      headerName: "Acción",
      width: 120,
      renderCell: (params) => (
        <>
          <Tooltip title="Editar" placement="bottom-start">
            <SubjectEditIcon
              style={{ cursor: "pointer" }}
              onClick={() =>
                handleOpenModalEdit(params.row as SubjectInterface)
              }
            />
          </Tooltip>
          <Tooltip title="Eliminar" placement="bottom-start">
            <SubjectDeleteIcon
              style={{ cursor: "pointer" }}
              onClick={() =>
                handleClickOpenDialog(params.row as SubjectInterface)
              }
            />
          </Tooltip>
        </>
      ),
    },
  ];

  return (
    <div>
      <HeadSection
        sectionTitle="Asignaturas"
        buttonTitle="Nueva asignatura"
        iconAction={<SubjectAddIcon color="#ffffff" height={30} width={30} />}
        onButtonClick={handleOpenModalAdd}
      />
      <div className={styles["table-subjects"]}>
        <TableUI
          rows={subjects}
          columns={columns}
          pageSizeOptions={[10, 15, 30]}
        />
      </div>
      <ConfirmationDialog
        title={`¿Deseas eliminar la asignatura ${selectedSubject?.name}?`}
        description="Al aceptar, se borrará toda la información correspondiente a la asignatura. Esta acción no se puede revertir."
        open={openDeleteDialog}
        onAccept={() => {
          handleDeleteSubject();
        }}
        onCancel={handleCloseDialog}
      />
      <ModalUI
        open={openModalAdd}
        title="Crear nueva asignatura"
        descriptionModal="Inserta el titulo de la asignatura y en caso que cuentes conn una descripción, icorporala"
        onClose={handleCloseModalAdd}
        onAccept={() => handleAcceptCreateSubject()}
      >
        <div className={styles["children-container"]}>
          <TextField
            required
            id="outlined-required"
            label="Nombre: "
            variant="standard"
            size="small"
            value={nameNewSubject ?? ""}
            onChange={(e) => handleNameChange(e.target.value)}
            error={!!nameError}
            helperText={nameError}
          />
          <TextField
            id="standard-multiline-static"
            label="Descripción"
            multiline
            rows={4}
            size="small"
            variant="standard"
            value={descriptionNewSubject ?? ""}
            onChange={(e) => handleDescriptionChange(e.target.value)}
            error={!!descriptionError}
            helperText={descriptionError}
          />
        </div>
      </ModalUI>
      <ModalUI
        open={openModalEdit}
        title="Editar asignatura"
        descriptionModal="Modifica los detalles de la asignatura"
        onClose={handleCloseModalEdit}
        onAccept={() => handleAcceptUpdateSubject()}
      >
        <div className={styles["children-container"]}>
          <TextField
            required
            id="outlined-required"
            label="Nombre: "
            variant="standard"
            size="small"
            value={nameNewSubject ?? ""}
            onChange={(e) => handleNameChange(e.target.value)}
            error={!!nameError}
            helperText={nameError}
          />
          <TextField
            id="standard-multiline-static"
            label="Descripción"
            multiline
            rows={4}
            size="small"
            variant="standard"
            value={descriptionNewSubject ?? ""}
            onChange={(e) => handleDescriptionChange(e.target.value)}
            error={!!descriptionError}
            helperText={descriptionError}
          />
        </div>
      </ModalUI>
    </div>
  );
};
