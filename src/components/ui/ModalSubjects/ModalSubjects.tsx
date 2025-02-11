import { TextField } from "@mui/material";
import { ModalUI } from "../Modal/ModalUI";
import styles from "./modalSubjects.module.css";

interface Props {
  open: boolean;
  onClose: () => void;
  onAccept: () => void;
  title: string;
  descriptionModal?: string;
  buttonText: string;
  nameNewSubject: string | null;
  descriptionNewSubject: string | null;
  nameError?: string | null;
  descriptionError?: string | null;
  onNameChange: (name: string) => void;
  onDescriptionChange: (description: string) => void;
}

export const ModalActionSubject = ({
  open,
  onClose,
  onAccept,
  title,
  descriptionModal,
  buttonText,
  nameNewSubject,
  descriptionNewSubject,
  nameError,
  descriptionError,
  onNameChange,
  onDescriptionChange,
}: Props) => {
  return (
    <ModalUI
      open={open}
      title={title}
      descriptionModal={descriptionModal}
      onClose={onClose}
      onAccept={onAccept}
      buttonText={buttonText}
    >
      <div className={styles["children-container"]}>
        <TextField
          required
          id="outlined-required"
          label="Nombre: "
          variant="standard"
          size="small"
          value={nameNewSubject ?? ""}
          onChange={(e) => onNameChange(e.target.value)}
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
          onChange={(e) => onDescriptionChange(e.target.value)}
          error={!!descriptionError}
          helperText={descriptionError}
        />
      </div>
    </ModalUI>
  );
};
