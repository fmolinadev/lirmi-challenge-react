import React from "react";
import { Modal, Typography } from "@mui/material";
import { ButtonUI } from "../Button";
import styles from "./modal.module.css";

interface Props {
  open: boolean;
  onClose: () => void;
  onAccept: () => void;
  title: string;
  descriptionModal?: string;
  children: React.ReactNode;
  buttonText: string;
}

export const ModalUI: React.FC<Props> = ({
  open,
  onClose,
  onAccept,
  title,
  descriptionModal,
  children,
  buttonText,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <div className={styles["modalBox"]}>
        <Typography sx={{ mt: 1 }} variant="h5">
          {title}
        </Typography>
        {descriptionModal && (
          <Typography sx={{ mt: 1 }}>{descriptionModal}</Typography>
        )}
        <div>{children}</div>
        <div className={styles["actions"]}>
          <ButtonUI variant="outlined" onClick={onAccept} autoFocus>
            {buttonText}
          </ButtonUI>
        </div>
      </div>
    </Modal>
  );
};
