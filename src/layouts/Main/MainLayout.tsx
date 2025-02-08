import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Footer, Header, Sidebar } from "@/components";
import styles from "./mainLayout.module.css";

export const MainLayout = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState<boolean>(true);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <div
      className={`${styles["layout-container"]} ${
        isSidebarVisible ? "" : styles["sidebar-hidden"]
      }`}
    >
      <Header toggleSidebar={toggleSidebar} />
      <Sidebar isSidebarVisible={isSidebarVisible} />
      <main className={styles["main-content"]}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
