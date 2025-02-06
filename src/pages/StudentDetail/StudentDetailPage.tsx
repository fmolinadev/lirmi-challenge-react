import { useParams } from "react-router-dom";

export const StudentDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  return <div>Detalles del estudiante {id}</div>;
};
