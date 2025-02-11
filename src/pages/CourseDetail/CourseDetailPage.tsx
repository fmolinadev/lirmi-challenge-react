import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { SelectChangeEvent, Tab, Tabs } from "@mui/material";
import { useCourseStore, useStudentStore, useSubjectStore } from "@/store";
import {
  CourseInterface,
  StudentInterface,
  SubjectInterface,
} from "@/interface";
import {
  ButtonUI,
  DividerUI,
  ModalActionStudent,
  ModalActionSubject,
  TransferList,
} from "@/components";
import { BookIcon, StudentAddIcon, SubjectAddIcon } from "@/assets";
import { validateStudent, validateSubject } from "@/utils";
import { ContentLayout } from "@/layouts";
import styles from "./courseDetail.module.css";

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
  const { students, addStudent } = useStudentStore();
  const { subjects, addSubject } = useSubjectStore();
  const [viewTab, setViewTab] = useState<number>(0);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasNoResults, setHasNoResults] = useState<boolean>(false);

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    event.preventDefault();
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

  const [openModalAddStudent, setOpenModalAddStudent] = useState(false);
  const [openModalAddSubject, setOpenModalAddSubject] = useState(false);

  const [nameNewStudent, setNameNewStudent] = useState<string | null>(null);
  const [lastnameNewStudent, setLastnameNewStudent] = useState<string | null>(
    null
  );
  const [ageNewStudent, setAgeNewStudent] = useState<string | number>(0);
  const [nameNewSubject, setNameNewSubject] = useState<string | null>(null);
  const [descriptionNewSubject, setDescriptionNewSubject] = useState<
    string | null
  >(null);

  const [nameError, setNameError] = useState<string | null>(null);
  const [lastnameError, setLastnameError] = useState<string | null>(null);
  const [ageError, setAgeError] = useState<string | null>(null);

  const [nameSubjectError, setNameSubjectError] = useState<string | null>(null);
  const [descriptionSubjectError, setDescriptionSubjectError] = useState<
    string | null
  >(null);

  const existingNames = subjects.map((subject) => subject.name);

  const handleOpenModalAddStudent = () => setOpenModalAddStudent(true);

  const handleCloseModalAddStudent = () => {
    setNameNewStudent(null);
    setAgeNewStudent("");
    setNameError(null);
    setLastnameError(null);
    setAgeError(null);

    setOpenModalAddStudent(false);
  };

  const handleOpenModalAddSubject = () => setOpenModalAddSubject(true);

  const handleCloseModalAddSubject = () => {
    setNameNewSubject(null);
    setNameSubjectError(null);
    setDescriptionNewSubject(null);
    setDescriptionSubjectError(null);
    setOpenModalAddSubject(false);
  };

  const handleNameChange = (value: string) => {
    setNameNewStudent(value);
    if (value.trim().length >= 3) {
      setNameError(null);
    }
  };

  const handleLastnameChange = (value: string) => {
    setLastnameNewStudent(value);
    if (value.trim().length >= 1) {
      setLastnameError(null);
    }
  };

  const handleChangeAge = (event: SelectChangeEvent) => {
    const value = event.target.value;
    setAgeNewStudent(value);
    if (Number(value) >= 1) {
      setAgeError(null);
    }
  };

  const handleNameSubjectChange = (value: string) => {
    setNameNewSubject(value);
    if (value.trim().length >= 3) {
      setNameSubjectError(null);
    }
  };

  const handleDescriptionChange = (value: string) => {
    setDescriptionNewSubject(value);
    if (!value || value.length <= 200) {
      setDescriptionSubjectError(null);
    }
  };

  const handleAceptAddStudent = () => {
    const errors = validateStudent(
      nameNewStudent,
      lastnameNewStudent,
      ageNewStudent !== "" ? Number(ageNewStudent) : 0
    );

    setNameError(errors.nameError);
    setLastnameError(errors.lastnameError);
    setAgeError(errors.ageError);

    if (errors.nameError || errors.lastnameError || errors.ageError) return;

    const maxId =
      students.length > 0 ? Math.max(...students.map((stud) => stud.id)) : 0;

    if (nameNewStudent && lastnameNewStudent && ageNewStudent) {
      const newStudent: StudentInterface = {
        id: maxId + 1,
        name: nameNewStudent.trim(),
        lastname: lastnameNewStudent.trim(),
        age: Number(ageNewStudent),
      };

      addStudent(newStudent);
      toast.success("Estudiante creado con éxito!");
      handleCloseModalAddStudent();
    }
  };

  const handleAcceptCreateSubject = () => {
    const errors = validateSubject(
      nameNewSubject,
      descriptionNewSubject,
      existingNames
    );
    setNameSubjectError(errors.nameError);
    setDescriptionSubjectError(errors.descriptionError);

    if (errors.nameError || errors.descriptionError) return;

    const maxId =
      subjects.length > 0 ? Math.max(...subjects.map((sub) => sub.id)) : 0;

    if (nameNewSubject) {
      const newSubject: SubjectInterface = {
        id: maxId + 1,
        name: nameNewSubject.trim(),
        description: descriptionNewSubject?.trim() ?? "",
      };

      addSubject(newSubject);
      toast.success("Asignatura creada con éxito!");
      handleCloseModalAddSubject();
    }
  };

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
    const fetchData = async () => {
      try {
        setIsLoading(true);

        setAllStudents(students);
        setAllSubjects(subjects);

        if (id) {
          await fetchOneCourse(Number(id));

          if (course) {
            setCourseDetail(course);
            setLinkedStudents(course.students);
            setLinkedSubjects(course.subjects);
            setHasNoResults(false);
          } else {
            setHasNoResults(true);
          }
        }
      } catch {
        setHasNoResults(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
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

  if (isLoading) {
    return (
      <ContentLayout>
        <p>Cargando detalles del curso...</p>
      </ContentLayout>
    );
  }

  if (hasNoResults) {
    return (
      <ContentLayout>
        <p>No hay resultados para el id "{id}".</p>
      </ContentLayout>
    );
  }

  return (
    <ContentLayout>
      <div className={styles.courseDetail}>
        <h1>Detalles del curso</h1>
        {courseDetail && (
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
                <div className={styles["buttons-container"]}>
                  <ButtonUI onClick={handleStudentsSave}>
                    Guardar cambios
                  </ButtonUI>
                  <ButtonUI
                    variant="secondary"
                    startIcon={
                      <StudentAddIcon color="#ffffff" width={20} height={20} />
                    }
                    onClick={handleOpenModalAddStudent}
                  >
                    Crear estudiante
                  </ButtonUI>
                </div>
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
                <div className={styles["buttons-container"]}>
                  <ButtonUI onClick={handleSubjectsSave}>
                    Guardar cambios
                  </ButtonUI>
                  <ButtonUI
                    variant="secondary"
                    startIcon={
                      <SubjectAddIcon color="#ffffff" width={20} height={20} />
                    }
                    onClick={handleOpenModalAddSubject}
                  >
                    Crear asignatura
                  </ButtonUI>
                </div>
              </>
            )}
            <ModalActionStudent
              open={openModalAddStudent}
              title="Agregar nuevo estudiante"
              description="Completa el perfil del nuevo estudiante. Recorda que puedes editar la información luego de crearlo."
              onClose={handleCloseModalAddStudent}
              onAccept={handleAceptAddStudent}
              buttonText="Agregar"
              name={nameNewStudent}
              nameError={nameError}
              lastname={lastnameNewStudent}
              lastnameError={lastnameError}
              age={ageNewStudent}
              ageError={ageError}
              onNameChange={handleNameChange}
              onLastnameChange={handleLastnameChange}
              onAgeChange={handleChangeAge}
            />
            <ModalActionSubject
              open={openModalAddSubject}
              title="Crear nueva asignatura"
              descriptionModal="Inserta el titulo de la asignatura y en caso que cuentes conn una descripción, icorporala"
              onClose={handleCloseModalAddSubject}
              onAccept={() => handleAcceptCreateSubject()}
              buttonText="Crear"
              nameNewSubject={nameNewSubject}
              descriptionNewSubject={descriptionNewSubject}
              nameError={nameSubjectError}
              descriptionError={descriptionSubjectError}
              onNameChange={handleNameSubjectChange}
              onDescriptionChange={handleDescriptionChange}
            />
          </div>
        )}
      </div>
    </ContentLayout>
  );
};
