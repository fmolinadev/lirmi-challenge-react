import { teachersPicture } from "@/assets/images";
import styles from "./rootPage.module.css";

export const RootPage = () => {
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
      <div className={styles["content-layout"]}>Iniciar</div>
    </div>
  );
};
