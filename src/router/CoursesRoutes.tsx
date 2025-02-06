import { Route, Routes } from "react-router-dom";
import { CoursesPage, CourseDetailPage } from "@/pages";

export const CoursesRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<CoursesPage />} />
      <Route path="/:id" element={<CourseDetailPage />} />
    </Routes>
  );
};
