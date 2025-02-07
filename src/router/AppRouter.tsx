import { Route, Routes } from "react-router-dom";
import { RootPage, HomePage, ErrorPage, SubjectsPage } from "@/pages";
import { ErrorLayout, MainLayout } from "@/layouts";
import { CoursesRoutes } from "./CoursesRoutes";
import { StudentsRoutes } from "./StudentsRoutes";

export function AppRouter() {
  return (
    <Routes>
      <Route>
        <Route path="/" element={<RootPage />} />
      </Route>
      <Route element={<MainLayout />}>
        <Route path="/home" element={<HomePage />} />
        <Route path="/subject" element={<SubjectsPage />} />
        <Route path="/course/*" element={<CoursesRoutes />} />
        <Route path="/students/*" element={<StudentsRoutes />} />
      </Route>
      <Route element={<ErrorLayout />}>
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
}
