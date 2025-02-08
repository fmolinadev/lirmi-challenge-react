import { useCourseStore } from "@/store";

export const CoursesPage = () => {
  const { courses } = useCourseStore();

  return (
    <div>
      <h1>Cursos</h1>
      {courses.length > 0 ? (
        <ul>
          {courses.map((course) => (
            <li key={course.id}>
              {course.name} - {course.subjects}
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay cursos disponibles.</p>
      )}
    </div>
  );
};
