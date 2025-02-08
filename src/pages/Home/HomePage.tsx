import { useEffect } from "react";
import { useGlobalStore } from "@/store";

export const HomePage = () => {
  const { totalCourses, totalStudents, totalSubjects, fetchSummary } =
    useGlobalStore();

  useEffect(() => {
    fetchSummary();
  }, [fetchSummary]);

  return (
    <div>
      <h1>Resumen General</h1>
      <p>Cursos: {totalCourses}</p>
      <p>Estudiantes: {totalStudents}</p>
      <p>Asignaturas: {totalSubjects}</p>
    </div>
  );
};
