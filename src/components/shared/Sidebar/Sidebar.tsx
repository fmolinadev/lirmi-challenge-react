import { useNavigate } from "react-router-dom";
import { ListItemIcon, ListItemText, MenuItem, MenuList } from "@mui/material";
import { CourseIcon, HomeIcon, StudentIcon, SubjectIcon } from "@/assets";
import { AppRoutesEnum } from "@/enums";
import styles from "./sidebar.module.css";

const routes = [
  {
    path: AppRoutesEnum.HOME,
    label: "Inicio",
    icon: <HomeIcon height={30} width={30} />,
  },
  {
    path: AppRoutesEnum.SUBJECT,
    label: "Asignaturas",
    icon: <SubjectIcon height={30} width={30} />,
  },
  {
    path: AppRoutesEnum.COURSE,
    label: "Cursos",
    icon: <CourseIcon height={30} width={30} />,
  },
  {
    path: AppRoutesEnum.STUDENTS,
    label: "Estudiantes",
    icon: <StudentIcon height={30} width={30} />,
  },
];

export const Sidebar = ({
  isSidebarVisible,
}: {
  isSidebarVisible: boolean;
}) => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <aside
      className={`${styles["sidebar"]} ${
        !isSidebarVisible ? styles["sidebar-hidden"] : ""
      }`}
    >
      <MenuList>
        {routes.map((route) => (
          <MenuItem
            key={route.path}
            className={`${styles["sidebar-item"]} ${
              !isSidebarVisible ? styles["sidebar-item-hidden"] : ""
            }`}
            onClick={() => handleNavigation(route.path)}
          >
            {
              <ListItemIcon className={styles["sidebar-icon"]}>
                {route.icon}
              </ListItemIcon>
            }
            <ListItemText primary={route.label} />
          </MenuItem>
        ))}
      </MenuList>
    </aside>
  );
};
