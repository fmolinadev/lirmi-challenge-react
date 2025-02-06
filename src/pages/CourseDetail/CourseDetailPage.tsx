import { useParams } from "react-router-dom";

export const CourseDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  return <div>Detalles del curso {id}</div>;
};
