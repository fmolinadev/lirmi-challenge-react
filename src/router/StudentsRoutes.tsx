import { Route, Routes } from "react-router-dom";
import { StudentsPage, StudentDetailPage } from "@/pages";

export const StudentsRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<StudentsPage />} />
      <Route path="/:id" element={<StudentDetailPage />} />
    </Routes>
  );
};
