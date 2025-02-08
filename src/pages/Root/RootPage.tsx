import { useNavigate } from "react-router-dom";
import styles from "./rootPage.module.css";
import { ButtonUI } from "@/components";
import { teachersPicture } from "@/assets/images";
import { AppRoutesEnum } from "@/enums";

export const RootPage = () => {
  const navigate = useNavigate();

  const handleButtonEnter = () => {
    navigate(AppRoutesEnum.HOME);
  };

  const handleButtonDemo = () => {
    window.open(import.meta.env.VITE_DEMO_VIEW, "_blank");
  };

  return (
    <div className={styles["root-layout"]}>
      <div className={styles["image-container"]}>
        <img
          src={teachersPicture}
          alt="profesores"
          className={styles["image-layout"]}
          aria-label="Foto de docentes"
        />
      </div>
      <div className={styles["content-layout"]}>
        <div className={styles["content-text"]}>
          <h1>El software más usado por escuelas</h1>
          <p>
            Comenzá a optimizar la gestión de tu colegio e impulsar el
            desarrollo de los docentes con Lirmi
          </p>
        </div>
        <div className={styles["content-buttons"]}>
          <ButtonUI
            variant="primary"
            onClick={handleButtonEnter}
            isLoading={false}
          >
            Ingresar ahora
          </ButtonUI>
          <ButtonUI
            variant="outlined"
            onClick={handleButtonDemo}
            isLoading={false}
          >
            Ver demo
          </ButtonUI>
        </div>
      </div>
    </div>
  );
};
