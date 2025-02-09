import { driver } from "driver.js";

interface DriverConfigOptions {
  setViewDriver: (value: boolean) => void;
}

export const initializeDriver = ({ setViewDriver }: DriverConfigOptions) => {
  const driverObj = driver({
    popoverClass: "driverjs-theme",
    showProgress: true,
    animate: true,
    nextBtnText: "Siguiente —›",
    prevBtnText: "‹— Previo",
    doneBtnText: "Finalizar",
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
        confirm("¿Estás seguro de finalizar el recorrido?")
      ) {
        setViewDriver(false);
        driverObj.destroy();
      }
    },
  });

  driverObj.drive();

  return () => {
    driverObj.destroy();
  };
};
