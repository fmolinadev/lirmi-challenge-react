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
      <div className={styles["content-layout"]}>
        <div className={styles["content-text"]}>
          <h1>El software más usado por escuelas</h1>
          <p>
            Comenzá a optimizar la gestión de tu colegio e impulsar el
            desarrollo de los docentes con Lirmi
          </p>
        </div>
      </div>
    </div>
  );
};
