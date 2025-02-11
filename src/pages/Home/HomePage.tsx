import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useGlobalStore } from "@/store";
import { ContentLayout } from "@/layouts";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";

export const HomePage = () => {
  const { totalCourses, totalStudents, totalSubjects, fetchSummary } =
    useGlobalStore();

  useEffect(() => {
    fetchSummary();
  }, [fetchSummary]);

  const data = [
    { title: "Cursos Disponibles", value: totalCourses, path: "/course" },
    {
      title: "Estudiantes Activos",
      value: totalStudents,
      path: "/students",
    },
    {
      title: "Asignaturas Ofrecidas",
      value: totalSubjects,
      path: "/subject",
    },
  ];

  return (
    <ContentLayout>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
        Bienvenido al Resumen General
      </Typography>
      <Typography
        variant="body1"
        gutterBottom
        sx={{ marginBottom: "1rem", color: "text.secondary" }}
      >
        Aquí puedes ver un resumen rápido de las estadísticas actuales de
        nuestra plataforma.
      </Typography>
      <Box
        sx={{
          width: "100%",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: 2,
        }}
      >
        {data.map((item) => (
          <Link
            to={item.path}
            key={item.title}
            style={{ textDecoration: "none" }}
          >
            {" "}
            {/* Link que envuelve la tarjeta */}
            <Card
              sx={{
                boxShadow: 3,
                borderRadius: "10px",
                transition: "transform 0.3s",
              }}
            >
              <CardActionArea
                sx={{
                  height: "100%",
                  "&:hover": {
                    boxShadow: 6,
                  },
                }}
              >
                <CardContent sx={{ height: "100%", padding: "1rem" }}>
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ fontWeight: "bold", marginBottom: "0.5rem" }}
                  >
                    {item.title}
                  </Typography>
                  <Typography variant="h5" color="text.primary">
                    {item.value}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Link>
        ))}
      </Box>
    </ContentLayout>
  );
};
