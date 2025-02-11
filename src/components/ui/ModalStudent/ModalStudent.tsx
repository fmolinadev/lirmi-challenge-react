import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { ModalUI } from "../Modal/ModalUI";
import styles from "./modalStudent.module.css";

interface Props {
  open: boolean;
  title: string;
  description?: string;
  buttonText: string;
  name: string | null;
  lastname: string | null;
  age: number | string;
  nameError: string | null;
  lastnameError: string | null;
  ageError: string | null;
  onClose: () => void;
  onAccept: () => void;
  onNameChange: (value: string) => void;
  onLastnameChange: (value: string) => void;
  onAgeChange: (event: SelectChangeEvent, value: number) => void;
}

export const ModalActionStudent = ({
  open,
  title,
  description,
  buttonText,
  name,
  lastname,
  age,
  nameError,
  lastnameError,
  ageError,
  onClose,
  onAccept,
  onNameChange,
  onLastnameChange,
  onAgeChange,
}: Props) => {
  return (
    <ModalUI
      open={open}
      title={title}
      descriptionModal={description}
      onClose={onClose}
      onAccept={onAccept}
      buttonText={buttonText}
    >
      <div className={styles["children-students"]}>
        <TextField
          required
          id="outlined-required"
          label="Nombre: "
          variant="standard"
          size="small"
          value={name ?? ""}
          onChange={(e) => onNameChange(e.target.value)}
          error={!!nameError}
          helperText={nameError}
        />
        <TextField
          required
          id="outlined-required"
          label="Apellido: "
          variant="standard"
          size="small"
          value={lastname ?? ""}
          onChange={(e) => onLastnameChange(e.target.value)}
          error={!!lastnameError}
          helperText={lastnameError}
        />

        <FormControl variant="standard" sx={{ minWidth: 140 }}>
          <InputLabel id="age-label">Edad</InputLabel>
          <Select
            labelId="age-label"
            id="demo-simple-select"
            value={age.toString()}
            label="Edad"
            onChange={(e) => onAgeChange(e, Number(e.target.value))}
            required
            error={!!ageError}
          >
            <MenuItem value={0}>
              <em>Seleccionar</em>
            </MenuItem>
            {[...Array(14)].map((_, index) => (
              <MenuItem key={index + 5} value={index + 5}>
                {`${index + 5} (${index + 5})`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </ModalUI>
  );
};
