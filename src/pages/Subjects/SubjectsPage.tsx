import { useSubjectStore } from "@/store";

export const SubjectsPage = () => {
  const { subjects } = useSubjectStore();

  return (
    <div>
      <h1>Asignaturas</h1>

      {subjects.length > 0 ? (
        <ul>
          {subjects.map((subject) => (
            <li key={subject.id}>
              {subject.name} - {subject.description}
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay asignaturas disponibles.</p>
      )}
    </div>
  );
};
