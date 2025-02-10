import { CourseInterface } from "@/interface";

export const validateCourse = (
  course: Partial<CourseInterface>,
  existingCourses: CourseInterface[]
) => {
  const errors: {
    nameError: null | string;
    colorError: null | string;
  } = { nameError: null, colorError: null };

  if (!course.name || course.name.trim().length < 3) {
    errors.nameError = "El nombre debe tener al menos 3 caracteres.";
  } else if (
    existingCourses.some(
      (existingCourse) =>
        existingCourse.name.toLowerCase() ===
          course.name?.trim().toLowerCase() && existingCourse.id !== course.id
    )
  ) {
    errors.nameError = "El nombre del curso ya está en uso.";
  }

  const hexColorRegex = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;
  if (!course.color || !hexColorRegex.test(course.color.trim())) {
    errors.colorError = "El color debe ser un valor hexadecimal válido.";
  } else if (
    existingCourses.some(
      (existingCourse) =>
        existingCourse.color === course.color?.trim() &&
        existingCourse.id !== course.id
    )
  ) {
    errors.colorError = "El color ya está en uso.";
  }

  return errors;
};
