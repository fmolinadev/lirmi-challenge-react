import styles from "./rootLayout.module.css";

export const RootLayout = () => {
  return (
    <div className={styles["root-layout"]}>
      <img src="" alt="profesores" className={styles["image-layout"]} />
      <div className={styles["content-layout"]}>Iniciar</div>
    </div>
  );
};
