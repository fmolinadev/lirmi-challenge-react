import { Route, Routes } from "react-router-dom";
import { RootPage, HomePage, ErrorPage, SubjectsPage } from "@/pages";
import { ErrorLayout, MainLayout } from "@/layouts";
import { AppRoutesEnum } from "@/enums";
import { CoursesRoutes } from "./CoursesRoutes";
import { StudentsRoutes } from "./StudentsRoutes";

export function AppRouter() {
  return (
    <Routes>
      <Route>
        <Route path="/" element={<RootPage />} />
      </Route>
      <Route element={<MainLayout />}>
        <Route path={`${AppRoutesEnum.HOME}/*`} element={<HomePage />} />
        <Route path={`${AppRoutesEnum.SUBJECT}/*`} element={<SubjectsPage />} />
        <Route path={`${AppRoutesEnum.COURSE}/*`} element={<CoursesRoutes />} />
        <Route
          path={`${AppRoutesEnum.STUDENTS}/*`}
          element={<StudentsRoutes />}
        />
      </Route>
      <Route element={<ErrorLayout />}>
        <Route path={`${AppRoutesEnum.ERROR}/*`} element={<ErrorPage />} />
      </Route>
    </Routes>
  );
}
