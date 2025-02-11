import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

import { useCourseStore, useStudentStore, useSubjectStore } from "@/store";
import {
  CourseInterface,
  StudentInterface,
  SubjectInterface,
} from "@/interface";
import { BookIcon } from "@/assets";
import { ButtonUI, DividerUI, TransferList } from "@/components";
import { Tab, Tabs } from "@mui/material";
import styles from "./courseDetail.module.css";
import { ContentLayout } from "@/layouts";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export const CourseDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { fetchOneCourse, course, updateSubjectsCourse, updateStudentsCourse } =
    useCourseStore();
  const { students } = useStudentStore();
  const { subjects } = useSubjectStore();
  const [viewTab, setViewTab] = useState(0);

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setViewTab(newValue);
  };
  const [allStudents, setAllStudents] = useState<StudentInterface[]>([]);
  const [allSubjects, setAllSubjects] = useState<SubjectInterface[]>([]);

  const [linkedStudents, setLinkedStudents] = useState<number[]>([]);
  const [linkedSubjects, setLinkedSubjects] = useState<number[]>([]);

  const [selectedItemsStudents, setSelectedItemsStudents] = useState<
    StudentInterface[]
  >([]);
  const [selectedItemsSubjects, setSelectedItemsSubjects] = useState<
    SubjectInterface[]
  >([]);
  const [leftItemsStudents, setLeftItemsStudents] = useState<
    StudentInterface[]
  >([]);
  const [rightItemsStudents, setRightItemsStudents] = useState<
    StudentInterface[]
  >([]);
  const [leftItemsubjects, setLeftItemsubjects] = useState<SubjectInterface[]>(
    []
  );
  const [rightItemsubjects, setRightItemsubjects] = useState<
    SubjectInterface[]
  >([]);

  const [courseDetail, setCourseDetail] = useState<CourseInterface | null>(
    null
  );

  useEffect(() => {
    if (courseDetail) {
      const linkedStudentsList = allStudents.filter((student) =>
        linkedStudents.includes(student.id)
      );
      setRightItemsStudents(linkedStudentsList);

      const unlinkedStudentsList = allStudents.filter(
        (student) => !linkedStudents.includes(student.id)
      );
      setLeftItemsStudents(unlinkedStudentsList);
    }
  }, [allStudents, linkedStudents, courseDetail]);

  useEffect(() => {
    if (courseDetail) {
      const linkedSubjectsList = allSubjects.filter((subject) =>
        linkedSubjects.includes(subject.id)
      );
      setRightItemsubjects(linkedSubjectsList);

      const unlinkedSubjectsList = allSubjects.filter(
        (subject) => !linkedSubjects.includes(subject.id)
      );
      setLeftItemsubjects(unlinkedSubjectsList);
    }
  }, [allSubjects, linkedSubjects, courseDetail]);

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
  }, [id, fetchOneCourse, course, students, subjects]);

  const handleMoveStudentsToRight = (
    selectedItemsToMove: StudentInterface[]
  ) => {
    setRightItemsStudents([...rightItemsStudents, ...selectedItemsToMove]);
    setLeftItemsStudents(
      leftItemsStudents.filter((item) => !selectedItemsToMove.includes(item))
    );
    setSelectedItemsStudents(
      selectedItemsStudents.filter(
        (item) => !selectedItemsToMove.includes(item)
      )
    );
  };

  const handleMoveStudentsToLeft = (
    selectedItemsToMove: StudentInterface[]
  ) => {
    setLeftItemsStudents([...leftItemsStudents, ...selectedItemsToMove]);
    setRightItemsStudents(
      rightItemsStudents.filter((item) => !selectedItemsToMove.includes(item))
    );
    setSelectedItemsStudents(
      selectedItemsStudents.filter(
        (item) => !selectedItemsToMove.includes(item)
      )
    );
  };

  const handleToggleSelectionStudents = (item: StudentInterface) => {
    const updatedSelection = selectedItemsStudents.includes(item)
      ? selectedItemsStudents.filter((selectedItem) => selectedItem !== item)
      : [...selectedItemsStudents, item];
    setSelectedItemsStudents(updatedSelection);
  };

  const handleToggleAllSelectionStudents = (items: StudentInterface[]) => {
    const newSelection =
      selectedItemsStudents.length === items.length ? [] : items;
    setSelectedItemsStudents(newSelection);
  };

  const handleMoveSubjectsToRight = (
    selectedItemsToMove: SubjectInterface[]
  ) => {
    setRightItemsubjects([...rightItemsubjects, ...selectedItemsToMove]);
    setLeftItemsubjects(
      leftItemsubjects.filter((item) => !selectedItemsToMove.includes(item))
    );
    setSelectedItemsSubjects(
      selectedItemsSubjects.filter(
        (item) => !selectedItemsToMove.includes(item)
      )
    );
  };

  const handleMoveSubjectsToLeft = (
    selectedItemsToMove: SubjectInterface[]
  ) => {
    setLeftItemsubjects([...leftItemsubjects, ...selectedItemsToMove]);
    setRightItemsubjects(
      rightItemsubjects.filter((item) => !selectedItemsToMove.includes(item))
    );
    setSelectedItemsSubjects(
      selectedItemsSubjects.filter(
        (item) => !selectedItemsToMove.includes(item)
      )
    );
  };

  const handleToggleSelectionSubjects = (item: SubjectInterface) => {
    const updatedSelection = selectedItemsSubjects.includes(item)
      ? selectedItemsSubjects.filter((selectedItem) => selectedItem !== item)
      : [...selectedItemsSubjects, item];
    setSelectedItemsSubjects(updatedSelection);
  };

  const handleToggleAllSelectionSubjects = (items: SubjectInterface[]) => {
    const newSelection =
      selectedItemsSubjects.length === items.length ? [] : items;
    setSelectedItemsSubjects(newSelection);
  };

  const renderItemLabel = (item: SubjectInterface | StudentInterface) => {
    if ("lastname" in item) {
      return `${item.name} ${item.lastname}`;
    }
    return item.name;
  };

  const handleStudentsSave = () => {
    if (courseDetail) {
      const studentIds = rightItemsStudents.map((student) => student.id);
      updateStudentsCourse(courseDetail.id, studentIds);
      toast.success("Estudiantes vinculados y actualizados!");
    }
  };

  const handleSubjectsSave = () => {
    if (courseDetail) {
      const subjectIds = rightItemsubjects.map((subject) => subject.id);
      updateSubjectsCourse(courseDetail.id, subjectIds);
      toast.success("Asignaturas vinculadas y actualizadas!");
    }
  };

  return (
    <ContentLayout>
      <div className={styles.courseDetail}>
        <h1>Detalles del curso</h1>
        {courseDetail ? (
          <div>
            <div className={styles["title-placement"]}>
              <span className={styles["book-container"]}>
                <BookIcon color={courseDetail.color} height={30} width={30} />
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
            <DividerUI />
            <p className={styles["describe-text"]}>
              Selecciona la opcion de Estudiante o Asignatura para gestionar la
              vinculación al curso seleccionado.
            </p>
            <br />
            <Tabs
              value={viewTab}
              onChange={handleChangeTab}
              aria-label="tab de opciones"
            >
              <Tab
                sx={{
                  color: "#5016e1",
                  "&.Mui-selected": {
                    color: "#5016e1",
                  },
                  "&.MuiTabs-indicator": {
                    maxWidth: 40,
                    width: "100%",
                    backgroundColor: "#36bbda",
                  },
                }}
                label="Estudiantes"
                {...a11yProps(0)}
              />
              <Tab
                sx={{
                  color: "#5016e1",
                  "&.Mui-selected": {
                    color: "#5016e1",
                  },
                  "&.MuiTabs-indicator": {
                    backgroundColor: "#36bbda",
                  },
                }}
                label="Asignaturas"
                {...a11yProps(1)}
              />
            </Tabs>
            <br />
            {viewTab == 0 ? (
              <>
                <TransferList
                  leftItems={leftItemsStudents}
                  rightItems={rightItemsStudents}
                  selectedItems={selectedItemsStudents}
                  onMoveToRight={handleMoveStudentsToRight}
                  onMoveToLeft={handleMoveStudentsToLeft}
                  onToggleSelection={handleToggleSelectionStudents}
                  onToggleAllSelection={handleToggleAllSelectionStudents}
                  renderItemLabel={renderItemLabel}
                />
                <br />
                <ButtonUI onClick={handleStudentsSave}>
                  Guardar cambios
                </ButtonUI>
              </>
            ) : (
              <>
                <TransferList
                  leftItems={leftItemsubjects}
                  rightItems={rightItemsubjects}
                  selectedItems={selectedItemsSubjects}
                  onMoveToRight={handleMoveSubjectsToRight}
                  onMoveToLeft={handleMoveSubjectsToLeft}
                  onToggleSelection={handleToggleSelectionSubjects}
                  onToggleAllSelection={handleToggleAllSelectionSubjects}
                  renderItemLabel={renderItemLabel}
                />
                <br />
                <ButtonUI onClick={handleSubjectsSave}>
                  Guardar cambios
                </ButtonUI>
              </>
            )}
          </div>
        ) : (
          <p>Cargando detalles del curso...</p>
        )}
      </div>
    </ContentLayout>
  );
};
