import { useStudentStore } from "@/store";

export const StudentsPage = () => {
  const { students } = useStudentStore();

  return (
    <div>
      <h1>Estudiantes</h1>
      <ul>
        {students.length > 0 ? (
          students.map((student) => (
            <li key={student.id}>
              {student.name} {student.lastname}, Edad: {student.age}
            </li>
          ))
        ) : (
          <p>No hay estudiantes para mostrar.</p>
        )}
      </ul>
    </div>
  );
};
