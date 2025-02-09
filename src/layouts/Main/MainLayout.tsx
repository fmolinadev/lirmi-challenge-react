import { useState } from "react";
import { Outlet } from "react-router-dom";
import { driver } from "driver.js";
import { Footer, Header, Sidebar } from "@/components";
import "driver.js/dist/driver.css";
import styles from "./mainLayout.module.css";

export const MainLayout = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState<boolean>(true);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const driverObj = driver({
    popoverClass: "driverjs-theme",
    showProgress: true,

    animate: true,
    steps: [
      {
        popover: {
          title: "Bienvenido",
          description:
            "Daremos un breve recorrido para aprender a usar la app.",
        },
      },
      {
        element: "#toggle-panel",
        popover: {
          title: "Control de panel",
          description: "Muestra u oculta el panel de navegación.",
        },
      },
      {
        element: "#panel",
        popover: {
          title: "Navegación",
          description: "Accede a los módulos de la aplicación desde aquí.",
        },
      },
      {
        element: "#main",
        popover: {
          title: "Vista principal",
          description:
            "Gestiona y visualiza los datos del módulo seleccionado.",
        },
      },
    ],
    onDestroyStarted: () => {
      if (
        !driverObj.hasNextStep() ||
        confirm("Estás seguro de finalizar el recorrido?")
      ) {
        driverObj.destroy();
      }
    },
  });

  driverObj.drive();

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
