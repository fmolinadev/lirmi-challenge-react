import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { ButtonUI } from "@/components";

interface Props {
  open: boolean;
  title: string;
  description: string;
  onAccept: () => void;
  onCancel: () => void;
}

export const ConfirmationDialog: React.FC<Props> = ({
  open,
  title,
  description,
  onAccept,
  onCancel,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <ButtonUI variant="outlined" onClick={onCancel}>
          Cancelar
        </ButtonUI>
        <ButtonUI variant="outlined" onClick={onAccept} autoFocus>
          Aceptar
        </ButtonUI>
      </DialogActions>
    </Dialog>
  );
};
