import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Footer, Header, Sidebar } from "@/components";
import { useLocalStorage } from "@/hooks";
import { initializeDriver } from "@/utils";
import "driver.js/dist/driver.css";
import styles from "./mainLayout.module.css";

export const MainLayout = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useLocalStorage<boolean>(
    "is_sidebar_visible",
    true
  );

  const [viewDriver, setViewDriver] = useLocalStorage<boolean>(
    "view_driver",
    true
  );

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  useEffect(() => {
    if (!viewDriver) return;

    const destroyDriver = initializeDriver({ setViewDriver });

    return () => {
      destroyDriver();
    };
  }, [setViewDriver, viewDriver]);

  return (
    <div
      className={`${styles["layout-container"]} ${
        isSidebarVisible ? "" : styles["sidebar-hidden"]
      }`}
    >
      <Header toggleSidebar={toggleSidebar} />
      <Sidebar isSidebarVisible={isSidebarVisible} />
      <main className={styles["main-content"]} id="main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
