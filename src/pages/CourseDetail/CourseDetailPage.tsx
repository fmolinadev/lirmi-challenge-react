import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useCourseStore, useStudentStore, useSubjectStore } from "@/store";
import {
  CourseInterface,
  StudentInterface,
  SubjectInterface,
} from "@/interface";
import { BookIcon } from "@/assets";
import styles from "./courseDetail.module.css";

export const CourseDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { fetchOneCourse, course } = useCourseStore();
  const { students } = useStudentStore();
  const { subjects } = useSubjectStore();

  const [allStudents, setAllStudents] = useState<StudentInterface[]>([]);
  const [allSubjects, setAllSubjects] = useState<SubjectInterface[]>([]);

  const [linkedStudents, setLinkedStudents] = useState<number[]>([]);
  const [linkedSubjects, setLinkedSubjects] = useState<number[]>([]);

  const [courseDetail, setCourseDetail] = useState<CourseInterface | null>(
    null
  );

  useEffect(() => {
    setAllStudents(students);
    setAllSubjects(subjects);
    if (id) {
      fetchOneCourse(Number(id)).then(() => {
        if (course) {
          setCourseDetail(course);
          setLinkedStudents(course.students);
          setLinkedSubjects(course.subjects);
        }
      });
    }
  }, [id, fetchOneCourse, course]);

  return (
    <div className={styles.courseDetail}>
      <h1>Detalles del curso</h1>
      {courseDetail ? (
        <div>
          <div className={styles["title-placement"]}>
            <span className={styles["book-container"]}>
              <BookIcon color={courseDetail.color} height={40} width={40} />
            </span>
            <h2>{courseDetail.name}</h2>
          </div>
          <div className={styles["top-section"]}>
            <p>Estudiantes Vinculados: {courseDetail.students.length}</p>
            <p>Materias Vinculadas: {courseDetail.subjects.length}</p>
            <p className={styles["color-view"]}>
              Color:
              <s style={{ display: "flex", color: courseDetail.color }}>
                {courseDetail.color}
              </s>
            </p>
          </div>
        </div>
      ) : (
        <p>Cargando detalles del curso...</p>
      )}
    </div>
  );
};
