import { Route, Routes } from "react-router-dom";
import { RootPage, HomePage, ErrorPage, SubjectsPage } from "@/pages";
import { CoursesRoutes } from "./CoursesRoutes";
import { StudentsRoutes } from "./StudentsRoutes";

export function AppRouter() {
  return (
    <Routes>
      <Route>
        <Route path="/" element={<RootPage />} />
      </Route>
      <Route>
        <Route path="/home" element={<HomePage />} />
        <Route path="/subject" element={<SubjectsPage />} />
        <Route path="/course/*" element={<CoursesRoutes />} />
        <Route path="/students/*" element={<StudentsRoutes />} />
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}
