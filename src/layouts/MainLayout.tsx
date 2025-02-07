import { Footer, Header, Sidebar } from "@/components";
import { Outlet } from "react-router-dom";
import styles from "./mainLayout.module.css";

export const MainLayout = () => {
  return (
    <div className={styles["layout-container"]}>
      <Header />
      <Sidebar />
      <main className={styles["main-content"]}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
