import { IconButton, Tooltip } from "@mui/material";
import { TogleSidebarIcon } from "@/assets";
import styles from "./header.module.css";

interface HeaderProps {
  toggleSidebar: () => void;
}

export const Header = ({ toggleSidebar }: HeaderProps) => {
  return (
    <header className={styles["header"]}>
      <div className={styles["container"]}>
        <div id="toggle-panel">
          <Tooltip title="Mostrar/Ocultar panel" placement="bottom-start">
            <IconButton
              size="small"
              aria-label="toggle-sidebar"
              onClick={toggleSidebar}
            >
              <TogleSidebarIcon />
            </IconButton>
          </Tooltip>
        </div>
        <span>Sistema de Administración</span>
      </div>
    </header>
  );
};
